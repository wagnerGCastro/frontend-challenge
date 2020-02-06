<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Http\Requests\ProductFormRequest;


class ProductController extends Controller
{

    private $baseUrlAPI = "http://localhost:8007";

     public function index()
    {
        // User session
        $user   =  (object) session()->get('user');
        $token  =  $user->api_token;
        $url    =  "{$this->baseUrlAPI}/api/v1/product";
        
        // All products
        $resp = getCurlRequest($url, $token);

        return view('/product/index', compact('resp'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $prod =  (object) array();

        $attrib = (object) [
            'title'     => 'Create new product', 
            'btnSubmit' => 'Create product',
            'route'     => 'product.store',

        ];

        return view('/product/create',compact('prod', 'attrib'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
    
        $filtered = $request->all();

        if($request->color_variation== 'N'):
            $filtered = array_except( $request->all(), ['color_name','color_hexa','_token','_method']);
        endif;
        
        // User session
        $user   =  (object) session()->get('user');
        $token  =  $user->api_token;
        $url    =  "{$this->baseUrlAPI}/api/v1/product";

        // cURl Post API
        $result =  postCurlRequest($url,  $token,  $filtered );

        // 400 -> Erros Validations Client
        if ($result->code == '201'):

            \Session::flash('message.success',"Product {$request->input('name')} was successfully created");
            return redirect()->route('product.index');

        // 400 -> Errors Validation Client
        elseif ($result->code == '400'):
            foreach ($result->message as $key => $value) {
               $error[] = $value;
            }
            return redirect('/product/create')->withErrors($error)->withInput();
        endif;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($id) 
    {
         $attrib = (object) [
            'title'     => 'Edit product', 
            'btnSubmit' => 'Edit product',
            'route'     => "product.update",
            'param'     => "{$id}",
            'method'    => "PUT",
        ];

        // Checks if parameter was passed with $id of type Integer
        if( $response = $this->checkParamId($id) ) { return $response; };

        // User session
        $user   =  (object) session()->get('user');
        $token  =  $user->api_token;
        $url    =  "{$this->baseUrlAPI}/api/v1/product/{$id}";
        
        // cURl GET API - return all products
        $result =  getCurlRequest($url, $token);

        // Check Status Code
        if ( isset($result->code)  ){

            if ($result->code == '400'):
                return response()->view('/errors/400', [], 400); 
            elseif ($result->code == '403'):
                return response()->view('/errors/403', [], 403); 

            elseif ($result->code == '404'):
               return response()->view('/errors/404', [], 404); 
            endif;
        }

        if ( count($result) == 0 ) {
           return response()->view('/errors/500', [], 500); 
        }
         
        return view('/product/create', ['prod' => $result, 'attrib' => $attrib]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Checks if parameter was passed with $id of type Integer
        if( $response = $this->checkParamId($id) ) { return $response; };

        $filtered = array_except( $request->all(), ['_token','_method']);

        // User session
        $user   =  (object) session()->get('user');
        $token  =  $user->api_token;
        $url    =  "{$this->baseUrlAPI}/api/v1/product/{$id}";

        // Checks if parameter was passed with $id of type Integer
        if( $response = $this->checkParamId($id) ) { return $response; };

        if($request->color_variation== 'N'):
            $filtered = array_except( $filtered , ['color_name','color_hexa']);
        endif;

        // Request cURL PUT
        $result =  putCurlRequest($url, $token, json_encode($filtered));

        // 200 -> Success update
        if ($result->code == '200'):
            \Session::flash('message.success',"Product {$request->input('name')} was updated");
            return redirect()->route('product.index');

        // 400 -> Errors Validation Client
        elseif ($result->code == '400'):
            if( gettype($result->message) == 'string' ) {
                    return redirect()->back()->withErrors(['error' => $result->message] )->withInput();
            }
            foreach ($result->message as $key => $value) {
                 $error[] = $value;
            }
            return redirect()->route('product.edit', $id)->withErrors($error)->withInput();
        endif;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Validator
        $validator = Validator::make(['id' => $id], [ 'id' => 'required|integer']);

        if ($validator->fails()) {
             return response()->view('/errors/404', [], 404); 
        } 

        // User session
        $user   =  (object) session()->get('user');
        $token  =  $user->api_token;
        $url    =  "{$this->baseUrlAPI}/api/v1/product/{$id}";

        // Request cURL DELETE
        $result =  deleteCurlRequest($url, $token);

        /** Status Code */
        if ( isset($result->code)  ){
            // Success
            if ( $result->code == '200' ):

                 \Session::flash('message.success', $result->message);
                 return redirect()->route('product.index');
            endif;
        }

    }

    /**
    * Check if $id parameter exists
    *
    * @param  $id)
    * @return \Illuminate\Http\Response
    */
    private function checkParamId($id)
    {
        $validator = Validator::make(['id'=> $id], ['id' => 'integer']);
        if ($validator->fails()) {
             return response()->view('/errors/404', [], 404); 
        } 
    }
}
