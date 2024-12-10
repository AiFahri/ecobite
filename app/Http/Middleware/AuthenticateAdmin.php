<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthenticateAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Periksa apakah user terautentikasi sebagai admin
        if (!Auth::guard('admin')->check()) {
            // Redirect ke halaman login admin jika tidak terautentikasi
            return redirect()->route('admin.login');
        }

        // Lanjutkan ke permintaan berikutnya
        return $next($request);
    }
}
