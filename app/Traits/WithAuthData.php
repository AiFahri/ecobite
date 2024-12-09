<?php

namespace App\Traits;

trait WithAuthData
{
    protected function getAuthData()
    {
        $user = auth()->user();
        if (!$user) {
            return null;
        }

        return [
            'id' => $user->id,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'photo_url' => $user->photo_url,
        ];
    }
} 