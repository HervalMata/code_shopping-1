<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use CodeShopping\Models\User;

class ChatMessageFbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->groupHasUser() || $this->hasSeller();
    }
    
    private function groupHasUser(){
        $chatGroup = $this->route('chat_group');
        $user = \Auth::guard('api')->user();
        
        return $chatGroup->users()->where('user_id', $user->id)->exists();
    }
    
    private function hasSeller(){
        $user = \Auth::guard('api')->user();
        return $user->role == User::ROLE_SELLER;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => 'required|in:text,audio,image',
            'content' => 'required'
        ];
    }
    
    public function getValidatorInstance()
    {
        $validator = parent::getValidatorInstance();
        
        $validator->sometimes('content', 'required|string', function($input){
            return $input->type === 'text';
        });
        
        $validator->sometimes('content', 'required|image|max:' . (3 * 1024), function($input){
            return $input->type === 'image';
        });
        
        $validator->sometimes('content', 'required|mimetypes:audio/wav,audio/x-hx-aac-adts|max:' . (3 * 1024), function($input){
            return $input->type === 'audio';
        });
        
        return $validator;
    }
}
