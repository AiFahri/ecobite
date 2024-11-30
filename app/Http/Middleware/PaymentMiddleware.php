<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // dd($request->session());
        if ($request->routeIs('instant-buy') && !$request->session()->has('instant-buy')) {
            return redirect()->route('products.index');
        }

        // dd($request->routeIs('instant-buy'));

        return $next($request);
    }
}
