<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Exception;

class OauthController extends Controller
{

    public function googleLogin()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Cari atau buat pengguna berdasarkan email
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'id' => (string) \Illuminate\Support\Str::ulid(),
                    'full_name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'photo_url' => $googleUser->getAvatar(),
                    'is_google_account' => true,
                ]
            );

            event(new Registered($user));

            // Login user
            Auth::login($user);

            return redirect()->intended(route('catalog.index'));
        } catch (Exception $e) {

            dd($e);

            return redirect('/login')->withErrors('Login gagal, coba lagi.');
        }
    }

    public function facebookLogin()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function facebookCallback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            // Cari atau buat pengguna berdasarkan email
            $user = User::firstOrCreate(
                ['email' => $facebookUser->getEmail()],
                [
                    'id' => (string) \Illuminate\Support\Str::ulid(),
                    'full_name' => $facebookUser->getName(),
                    'email' => $facebookUser->getEmail(),
                    'photo_url' => $facebookUser->getAvatar(),
                    'is_facebook_account' => true,
                ]
            );

            event(new Registered($user));

            // Login user
            Auth::login($user);

            return redirect()->intended(route('catalog.index'));
        } catch (Exception $e) {

            dd($e);

            return redirect('/login')->withErrors('Login gagal, coba lagi.');
        }
    }
}
