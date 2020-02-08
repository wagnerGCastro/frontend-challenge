<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\ApiTokenControlle; 
use Validator;
use Illuminate\Http\Request;
use  Session;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
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
       $this->baseUrlAPI = getenv('APP_API_URL');
    }

     /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // User session
        $user = (object) session()->get('user');
        $url  =  $this->baseUrlAPI . '/v1/user';

        // Get All Users
        $users = getCurlRequest($url, $user->api_token);

        // if( !empty($error) ) { echo $error;  die;}

        if (isset( $users->code )) {
            if(  $users->code == '403') {
                \Session::flash('message.error', $users->message );
                return view('/partials/alerts/danger');
            }
        }

        return view('/user/listar', compact('users'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function login(Request $request)
    {   
        $apiUrl = $request->apiUrl;

        //Rules 
        $rules = [ 'email' => 'required', 'password' => 'required', 'apiUrl' => 'required'];

        // Validator
        $validator = Validator::make($request->all() , $rules);

        if ($validator->fails()) {
            return response()->json(formatMessage(400, $validator->messages()), 400);

        } if (!filter_var( $apiUrl , FILTER_VALIDATE_URL)) {
            return response()->json(formatMessage( 400, $apiUrl .' is not a valid URL'), 200);
        }

        // Request parameters
        $content = http_build_query( array(
            'email' => $request->email,
            'password' => $request->password,
        ));

        $context = stream_context_create(array(
            'http' => array(
                'method' => 'POST',                    
                'header' => "Connection: close\r\n".
                            "Content-type: application/x-www-form-urlencoded\r\n".
                            "Content-Length: ".strlen($content)."\r\n",
                'content' => $content                               
            )
        ));
       
        $contents = file_get_contents($apiUrl, null, $context);
        $response = json_decode($contents);
        
        // Unauthorized logged out
        if ( isset($response->code) && $response->code == 401) {
           return response()->json( $response , 200);     
        }

        $request->session()->put('user', [
            'name'               => strtok( $request->email, " @" ),
            'email'              => $request->email,
            'password'           => Hash::make($request->password),
            //'api_token'        => hash('sha256', $response->access_token),
            'api_token'          => $response->access_token,
            'api_token_expires'  => $response->expires_in,
            'api_token_type'     => $response->token_type,
        ]);

        // User session
        $user = $request->session()->get('user');

        return response()->json(['code'=> 200, 'user'=> $user] , 200); 
    }



}
