<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Friendship;
use Illuminate\Http\Request;

class ConnectionController extends Controller
{
    public function showConnections(Request $request)
    {
        $userFriendId = auth()->user()->friends()->pluck('friend_id')->toArray();
        $connections = auth()->user()->friends()->with('friend')
                ->skip($request->skipCounter)->take($request->takeAmount)->get();
        $connectionsData = [];

        foreach ($connections as $key => $data) {
            $connectionsData[] =
                [
                    'id' => $data->friend->id,
                    'name' => $data->friend->name,
                    'email' => $data->friend->email,
                    'common_friends' => $this->getCount($data->friend->id, $userFriendId),

                ]
            ;
        }

        return $connectionsData;
    }

    public function removeConnection(Request $request)
    {
        \DB::beginTransaction();
        try {
            $friend = Friendship::where('user_id','=' , $request->userId)
            ->where('friend_id','=' , auth()->id())
            ->where('accepted','=' , 1)
            ->first();

            $friend->accepted = 0;
            $friend->save();

            $user = Friendship::where('user_id','=' , auth()->id())
            ->where('friend_id','=' , $request->userId)
            ->where('accepted','=' , 1)
            ->first();

            $user->accepted = 0;
            $user->save();

            \DB::commit();

        } catch (\Exception $e) {
            \DB::rollback();
            throw $e;
        }
    }

    protected function getCount($id, $userFriendId)
    {

        $commonFriendsId = Friendship::where('user_id', $id)->pluck('friend_id')->toArray();
        $result = array_intersect($userFriendId,$commonFriendsId);
        return  count($result);

    }
}
