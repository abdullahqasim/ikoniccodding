<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = auth()->user();
        $connection = $user->friends();
        $friends = $connection->pluck('friend_id')->toArray();
        $requestSent = $user->sentRequests();
        $sentRequests = $requestSent->pluck('connection_id')->toArray();
        $requestReceived = $user->receivedRequests();
        $receivedRequests = $requestReceived->pluck('user_id')->toArray();
        $allRequest = array_merge($sentRequests, $receivedRequests, $friends);


        $suggestion = User::where('id', '!=', auth()->id())->whereNotIn('id', $allRequest)->count();
        $requestSent = $requestSent->count();
        $requestReceived = $requestReceived->count();
        $connection = $connection->count();


        return view('home', compact('suggestion', 'requestSent', 'requestReceived', 'connection'));
    }


}
