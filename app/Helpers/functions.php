<?php

if(!function_exists('formatMessage')) {
    /**
     * Format message response
     *
     * @param number $code
     * @param string $message
     * @return array
     *
     */
    function formatMessage($code, $message)
    {
        return ['code' => $code, 'message' => $message];
    }
}

if(!function_exists('parseHeaders')) {

    /**
     * Função analisadora para obter cabeçalhos formatados (com código de resposta)
     * @link https://www.php.net/manual/en/reserved.variables.httpresponseheader.php
     *
     * @param  array $headers
     * @return array
     */
    function parseHeaders( $headers )
    {
        $head = array();
        foreach( $headers as $k=>$v )
        {
            $t = explode( ':', $v, 2 );
            if( isset( $t[1] ) )
                $head[ trim($t[0]) ] = trim( $t[1] );
            else
            {
                $head[] = $v;
                if( preg_match( "#HTTP/[0-9\.]+\s+([0-9]+)#",$v, $out ) )
                    $head['reponse_code'] = intval($out[1]);
            }
        }
        return $head;
    }

    //print_r(parseHeaders($http_response_header));
}


if(!function_exists('getCurlRequest')) {
    /**
     * cURL request GET
     *
     * @param url $url
     * @param string $token
     * @return array json
     *
     */
    function getCurlRequest($url, $token)
    {
        $authorization = "Authorization: Bearer $token";
        $ch   = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization ));
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_POST, FALSE);

       return checkCurlRequest($ch);
    }
}

if(!function_exists('postCurlRequest')) {
    /**
     * cURL request POST
     *
     * @param url $url
     * @param string $token
     * @return array json
     *
     */
    function postCurlRequest($url, $token, $data)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_POST, 1);
        //curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        //curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            //'Content-Type:          application/json'
            //'Content-Type:      application/multipart/form-data',
            "Authorization:     Bearer ". $token,
        ));

        return  checkCurlRequest($ch);
    }
}

if(!function_exists('deleteCurlRequest')) {
    /**
     * cURL request DELETE
     *
     * @link https://tonyspiro.com/curl-get-post-put-and-delete-using-php/
     *
     * @param url $url
     * @param string $token
     * @return string $data_string
     *
     */
    function deleteCurlRequest($url, $token, $data_string = false)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string),
            'Authorization: Bearer '. $token,
        ));

        return  checkCurlRequest($ch);
    }
}

if(!function_exists('putCurlRequest')) {
    /**
     * cURL request  PUT
     *
     * https://tonyspiro.com/curl-get-post-put-and-delete-using-php/
     *
     * @param url $url
     * @param string $token
     * @return array
     *
     */
    function putCurlRequest($url, $token, $data_string){

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        //curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            //'Content-Type:      application/multipart/form-data',
            'Content-Length: ' . strlen($data_string),
            'Authorization: Bearer '. $token,
        ));

        return checkCurlRequest($ch);
    }
}

if(!function_exists('checkCurlRequest')) {
    /**
     * Check cURL request  status code
     *
     * https://tonyspiro.com/curl-get-post-put-and-delete-using-php/
     *
     * @param object $ch
     * @return string or json
     *
     */
    function checkCurlRequest($ch)
    {
        //# Resolve error operation timed-out
        //# https://stackoverflow.com/questions/21501159/curl-error-operation-timed-out
        @set_time_limit(0);
        curl_setopt($ch, CURLOPT_TIMEOUT,5000); // 5000 seconds
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);

        $result = curl_exec($ch);

        /** Verifica se houve erros e exibe a mensagem de erro */
        if($errno = curl_errno($ch)) {
            $error_message = curl_strerror($errno);
        }

        $error_message = curl_strerror($errno);
        $error = curl_error($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);;

        curl_close($ch);

        /** Check the HTTP Status code */
        switch ($httpCode):
            case 200:
                $error_status = "200: Success";
                return  json_decode($result);
                break;
            case 201:
                $error_status = "201: Success created resource";
                return json_decode($result);
                break;
            case 400:
                $error_status = "400: Errors validation fomrs";
                return  json_decode($result);
                break;
            case 403:
                $error_status = "403: Token is Expired";
                break;
            case 404:
                $error_status = "404: API Not found";
                break;
            case 405:
                $error_status = "405: Method not allowed API";
                break;
            case 500:
                $error_status = "500: servers replied with an error.";
                break;
            case 502:
                $error_status = "502: servers may be down or being upgraded. Hopefully they'll be OK soon!";
                break;
            case 503:
                $error_status = "503: service unavailable. Hopefully they'll be OK soon!";
                break;
            default:
                $error_status = "Undocumented error: " . $httpCode . " : " . $error ;
                break;
        endswitch;

        echo $error_status;
        die;
    }
}
