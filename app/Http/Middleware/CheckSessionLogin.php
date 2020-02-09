<?php

namespace App\Http\Middleware;

use Closure;

class CheckSessionLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Retrieves the session user
        $userAPI = (session()->get('user') !== null) ? $request->session()->get('user') : 0 ;

        // Checks if you are on, if you don't have redirects
        if ( count( $userAPI ) >= 1 ):
            return redirect()->route('home.index');
        endif;

        return $next($request);
    }
}
