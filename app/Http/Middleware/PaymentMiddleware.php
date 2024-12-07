<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;

class PaymentMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Log::info('Payment Middleware Session:', Session::get('instant-buy') ?? ['No session']);

        if (!Session::has('instant-buy')) {
            return redirect()->route('catalog.index');
        }

        return $next($request);
    }
}
