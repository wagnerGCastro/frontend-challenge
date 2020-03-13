<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;


class HomeController extends Controller
{
    /**
    * Base URL API
    *
    * @var string
    */
    private $baseUrlAPI;


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       //$this->middleware('auth');
       $this->baseUrlAPI = (!empty(getenv('APP_API_URL'))) ? getenv('APP_API_URL') : config('app.api_url'); 
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $total = (object) ['user'=> 0, 'product'=> 0];

        // User session
        $user = (object) session()->get('user');
        $urlUser    = $this->baseUrlAPI . '/v1/user';
        $urlProduct = $this->baseUrlAPI . '/v1/product';

        // Get total Users
        $users = getCurlRequest($urlUser, $user->api_token);

        // Get total  products
        $products = getCurlRequest($urlProduct, $user->api_token);

        if ( ! isset($users->code) ) {
            $total->user = count($users);
        } 

        if ( ! isset($users->code) ) {
             $total->product = count($products);
        }

        return view('home', compact('total'));
    }
}
