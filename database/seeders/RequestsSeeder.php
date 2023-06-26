<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RequestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('connections')->upsert([
            ['user_id' => 22, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 2, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 3, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 4, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 6, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 7, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 8, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 9, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 10, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 11, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 12, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 13, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 14, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 16, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 17, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 18, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 19, 'connection_id' => 1, 'status' => 'pending'],
            ['user_id' => 20, 'connection_id' => 1, 'status' => 'pending'],
        ],['user_id', 'connection_id'], ['status']);
    }
}
