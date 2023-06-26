<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'connection_id');
    }


    public function requestUser()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }



}
