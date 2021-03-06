<?php

namespace CodeShopping\Providers;

use Illuminate\Support\ServiceProvider;
use CodeShopping\ProductInput;
use CodeShopping\Models\ProductOutput;
use Kreait\Firebase;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Factory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Schema::defaultStringLength(191);
        ProductInput::created(function($input){
            $product = $input->product;
            $product->stock += $input->amount;
            $product->save();
            
            //outras possibilidades
            //observes
            //event eloquent
        });
        
        ProductOutput::created(function($input){
            $product = $input->product;
            $product->stock -= $input->amount;
            
            if($product->stock < 0){
                throw new \Exception("Estoque de {$product->name} não pode ser negativo!");
            }
            
            $product->save();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        #app(Firebase::class)
        $this->app->bind(Firebase::class, function(){
            $serviceAccount = ServiceAccount::fromJsonFile(base_path('firebase-admin.json'));
            return (new Factory())->withServiceAccount($serviceAccount)->create();
        });
    }
}
