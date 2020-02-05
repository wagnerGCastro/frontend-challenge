<?php

namespace App\Http\Middleware;

use Closure;

class CheckSessionUserApi
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
        $userAPI = $request->session()->get('user');

        // Checks if you are on, if you don't have redirects
        if ( count( $userAPI ) <= 0 ):
            return redirect()->route('login');
        endif;

        // Permite que continue (Caso não entre em nenhum dos if acima)...
        return $next($request);


    }
}
