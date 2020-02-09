<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Http\Controllers\UserController;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
   
        $this->middleware('guest')->except('logout');

        // Retrieves the session user
        $userAPI = (session()->get('user') !== null) ? $request->session()->get('user') : 0 ;

        // Checks if you are on, if you don't have redirects
        if ( count( $userAPI ) >= 1 ):
            return redirect()->route('home.index');
        endif;

    }
}
