<?php
/*
 *TODO: Add video JS to page where video is rendered
 *
 */
require_once(Mage::getBaseDir('lib') . '/Carlosreynosanunez/CustomerService/jwt/JWT.php');

class Carlosreynosanunez_CustomerService_Block_Video
    extends Mage_Core_Block_Abstract
    implements Mage_Widget_Block_Interface
{


    /*
     *Purpose: Initialize the layout for when this block is loaded by adding
     * The correct JS to the head
     * Outcome: The layout should contain the right JS in order to render the video
     */
    public function _construct()
    {

        //Add angular JS to the layout for the current pages head


    }

    protected function _toHtml()
    {
        $adminToken=$this->getAuthToken('creynosa9@gmail.com');
        $customerToken=$this->getAuthToken('raveash9@gmail.com');

        //print out key
        echo '<div data-customer-service ng-controller="CustomerServiceController" auth-token-admin="'.$adminToken.'" auth-token-customer="'.$customerToken.'" > Value: {{raveash}}</div></br>';
    }

    protected function getAuthToken($userEmail)
    {
        $serviceId = 'magento-customerservice';
        $userId = $userEmail;
        $apiSecret = '7IwIJoepeOQRpnsita7ZV6DNy0LWhVpjp1R_qcL_ahY';
        $expiry = 48 * 60 * 60;

        $sub = $serviceId . " : " . $userId;

        $exp = time() + $expiry;

        $apiSecretKey = JWT::urlsafeB64Decode($apiSecret);

        $payload = array("sub" => $sub, "iss" => $serviceId, "exp" => $exp);

        $jwt = JWT::encode($payload, $apiSecretKey);

        return $jwt;

    }

}

?>
