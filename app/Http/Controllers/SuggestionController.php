<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Friendship;
use App\Models\User;
use Illuminate\Foundation\Console\StubPublishCommand;
use Illuminate\Foundation\Providers\FoundationServiceProvider;
use Illuminate\Http\Request;

class SuggestionController extends Controller
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

    public function index(Request $request)
    {
        $user = auth()->user();
        $friends = $user->friends()->pluck('friend_id')->toArray();
        $sentRequests = $user->sentRequests()->pluck('connection_id')->toArray();
        $receivedRequests = $user->receivedRequests()->pluck('user_id')->toArray();
        $allRequest = array_merge($sentRequests, $receivedRequests, $friends);

        $friendsSuggestions = User::where('id', '!=', auth()->id())->whereNotIn('id', $allRequest)
        ->skip($request->skipCounter)->take($request->takeAmount)->get();
        return $friendsSuggestions;
    }

    public function sendRequest(Request $request){
        $connection = new Connection();
        $connection->user_id = auth()->id();
        $connection->connection_id = $request->suggestionId;
        $connection->status = "pending";
        $connection->save();

        $data = array();
        $data['status'] = 'success';
        $data['message'] = 'Request sent successfully!';
        return response()->json($data);
    }

    public function showRequests(Request $request)
    {
        $sentRequestsData = [];
        $sentRequests = auth()->user()->sentRequests()->with('user')->skip($request->skipCounter)->take($request->takeAmount)->get();
        foreach ($sentRequests as $key => $data) {
            $sentRequestsData[] =
                ['id' => $data->user->id, 'name' => $data->user->name, 'email' => $data->user->email]
            ;
        }

        return $sentRequestsData;
    }

    public function receivedRequests(Request $request)
    {
        $receivedRequestsData = [];
        $receivedRequests = auth()->user()->receivedRequests()->with('requestUser')->skip($request->skipCounter)->take($request->takeAmount)->get();
        foreach ($receivedRequests as $key => $data) {
            $receivedRequestsData[] =
                ['id' => $data->requestUser->id, 'name' => $data->requestUser->name, 'email' => $data->requestUser->email]
            ;
        }

        return $receivedRequestsData;
    }


    public function acceptRequest(Request $request)
    {
        $connection = Connection::where('connection_id', '=', auth()->id())->where('user_id', '=', $request->userId)->first();

        if ($connection && $connection->status === 'pending') {
            \DB::beginTransaction();
            try {
                $connection->status = 'accepted';
                $connection->save();

                $friendship = new Friendship();

                $friendship->user_id = $request->userId;
                $friendship->friend_id = auth()->id();
                $friendship->accepted = true;
                $friendship->save();

                $friendship = new Friendship();

                $friendship->user_id = auth()->id();
                $friendship->friend_id = $request->userId;
                $friendship->accepted = true;
                $friendship->save();
                \DB::commit();

            } catch (\Exception $e) {
                \DB::rollback();
                throw $e;
            }

            return response()->json(['message' => 'Friend request accepted successfully']);
        }
    }

    public function deleteRequest(Request $request){
        $connection = Connection::where('user_id', auth()->id())
        ->where('connection_id', $request->userId)
        ->where('status', 'pending')->first();
        if($connection){

            $connection->status = 'canceled';
            $connection->save();

            return response()->json(['message' => 'Friend request accepted successfully']);
        }
    }
}
