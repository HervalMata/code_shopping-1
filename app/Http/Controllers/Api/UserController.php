<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CodeShopping\User;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Events\UserCreatedEvent;

class UserController extends Controller
{
    use OnlyTrashed;
    
    public function index(Request $request)
    {
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        
//         $users = $query->paginate(5);
//         return UserResource::collection($users);
        
        $users = $request->has('all') ? $query->all() : $query->paginate();
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }
}
