<?php
/**
 * Created by PhpStorm.
 * User: carlos
 * Date: 1/11/14
 * Time: 7:19 PM
 * Purpose: This class generates a token in order to communicate with the vline API.
 */

//JWT library used to generate JWT tokens that will be used to authorize with a service API
require_once(Mage::getBaseDir('lib') . '/Carlosreynosanunez/CustomerService/jwt/JWT.php');

class Carlosreynosanunez_CustomerService_Model_Apiauthorizer extends Mage_Core_Model_Abstract
{

    //Service id is a unique API ID that is given by the API provider
    protected $serviceId;
    protected $apiSecret;

    //Authentication expiration in number of seconds
    protected $expiry;

    public function __construct(){

        $this->serviceId = Mage::getStoreConfig('customerservice_options/api_configuration/service_id');
        $this->apiSecret = Mage::getStoreConfig('customerservice_options/api_configuration/api_secret');

        Mage::log(__CLASS__." : ".__FUNCTION__." : "." Using Api Service Id: ".$this->serviceId);
        Mage::log(__CLASS__." : ".__FUNCTION__." : "." Using Api Secret: ".$this->apiSecret);

        $this->expiry = 48 * 60 * 60;

    }

    //Wrapper function to abstract JWT API for decoding the api secret
    private function decodeApiSecret($apiSecret){

       return JWT::urlsafeB64Decode($apiSecret);
    }

    //Wrapper function to abstract JWT API for encoding a token
    private function encodeAuthorizationToken($payload,$apiSecretKey){

        return JWT::encode($payload, $apiSecretKey);

    }

    public function getAuthorizationToken($userEmail){


        Mage::log(__CLASS__." : ".__FUNCTION__." : "."Getting authorization token for $userEmail");

        $sub = $this->serviceId . " : " . $userEmail;

        $exp = time() + $this->expiry;

        $apiSecretKey = $this->decodeApiSecret($this->apiSecret);

        $payload = array("sub" => $sub, "iss" => $this->serviceId, "exp" => $exp);

        $jwt = $this->encodeAuthorizationToken($payload,$apiSecretKey);

        Mage::log(__CLASS__." : ".__FUNCTION__." : "."Returning token: '$jwt''");

        return $jwt;
    }

}