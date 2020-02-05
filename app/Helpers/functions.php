<?php

if (!function_exists('dateFormat')) {
    /**
     * Formata uma data para o formato de SQL ou para o formato normal, 
     * o segundo parâmetro define se a data vai vir completa (com o tempo)
     *
     * @param [string] $dt
     * @param [boolean] $isFull
     * @return [string] date
     */
    function dateFormat($dt, $isFull = true)
    {
        $auxDt = date('d/m/Y');
        if (strpos($dt, '-') !== false) {
            $auxDt = explode(' ', $dt);
            $strDt = implode('/', array_reverse(explode('-', $auxDt[0]))) . ($isFull && sizeof($auxDt) > 1 && isset($auxDt[1]) ? ' ' . $auxDt[1] : '');
        } else {
            $auxDt = explode(' ', $dt);
            $strDt = implode('-', array_reverse(explode('/', $auxDt[0]))) . ($isFull && sizeof($auxDt) > 1 && isset($auxDt[1]) ? ' ' . $auxDt[1] : '');
        }
        return $strDt;
    }
}

if(!function_exists('limitaTexto')) {
    /**
     * Limita texto
     * Se o texto for maior que o limite, ele corta o texto e adiciona 3 pontinhos. 
     *
     * @param string $var
     * @param integer $limite
     * @return string
     */
    function limitaTexto( $var, $limite )
    {	
        if ( strlen($var) > $limite ) {		
            $var = substr($var, 0, $limite);		
            $var = trim($var) . "...";	
        }
        
        return $var;
    }
}

if(!function_exists('formatNumToMysql')) {
    /**
     * Formata números reais para o formato mysql
     * 
     * @link https://pt.stackoverflow.com/questions/349990/formatar-valor-do-real-br-para-decimal10-2-do-mysql
     * 
     * @return float
     *
     */
    function formatNumToMysql($real, $casasDecimais = 2) 
    {

        // Se já estiver no formato USD, retorna como float e formatado
        if(preg_match('/^\d+\.{1}\d+$/', $real)) {
            return (float) number_format($real, $casasDecimais, '.', '');
        }
        // Tira tudo que não for número, ponto ou vírgula
        $real = preg_replace('/[^\d\.\,]+/', '', $real);
        // Tira o ponto
        $decimal = str_replace('.', '', $real);
        // Troca a vírgula por ponto
        $decimal = str_replace(',', '.', $decimal);
        
        return (float) number_format($decimal, $casasDecimais, '.', '');
        
        // var_dump(formatNumToMysql('150.99', 2)); // float(150.99)
        // var_dump(formatNumToMysql('10.123456789', 3)); // float(10.123)
        // var_dump(formatNumToMysql('R$ 10,99', 2)); // float(10.99)
        // var_dump(formatNumToMysql('89,999', 3)); // float(89.999)
        // var_dump(formatNumToMysql('1.089,90')); // float(1089.9)
        // var_dump(formatNumToMysql('1.089,99')); // float(1089.99)
    }
}

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

if(!function_exists('getcURrequest')) {
    /**
     * Get cURL request GET
     * 
     * @param url $url
     * @param string $token
     * @return array
     *
     */
    function getcURrequest($url, $token)
    {
        $authorization = "Authorization: Bearer $token";
        $ch   = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_POST, FALSE);
        
       return checkcCurlRequest($ch);
    }
}

if(!function_exists('postcURrequest')) {
    /**
     * Get cURL request GET
     * 
     * @param url $url
     * @param string $token
     * @return array
     *
     */
    function postcURrequest($url, $token, $data)
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

        return  checkcCurlRequest($ch);
    }
}

if(!function_exists('deleteCurlRequest')) {
    /**
     * DELETE cURL request  
     * 
     * https://tonyspiro.com/curl-get-post-put-and-delete-using-php/
     * 
     * @param url $url
     * @param string $token
     * @return array
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
         
        return  checkcCurlRequest($ch);
    }
}

if(!function_exists('putCurlRequest')) {
    /**
     * putCurlRequest cURL request  PUT
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
         
        return checkcCurlRequest($ch);
    }
}

if(!function_exists('checkcCurlRequest')) {
    /**
     * checkcCurlRequest cURL request  status code
     * 
     * https://tonyspiro.com/curl-get-post-put-and-delete-using-php/
     * 
     * @param url $url
     * @param string $token
     * @return array
     *
     */
    function checkcCurlRequest($ch) 
    {
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
            case 404:
                $error_status = "404: API Not found";
                break;
            case 403:
                $error_status = "403: Token is Expired";
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