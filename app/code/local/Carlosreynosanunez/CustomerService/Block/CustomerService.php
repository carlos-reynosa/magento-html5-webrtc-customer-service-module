<?php

/*
 * Generates a configuration object for the front end application and prints out the bootstrap html
 * element that starts the customer service application.
 */
class Carlosreynosanunez_CustomerService_Block_CustomerService
    extends Mage_Core_Block_Abstract
    implements Mage_Widget_Block_Interface
{


    /**
     * @var [array]  Contains the frontend application configuration
     */
    protected $customerServiceApplicationConfig;

    /*
     *Purpose: Initialize the layout for when this block is loaded by adding
     * The correct JS to the head
     * Outcome: The layout should contain the right JS in order to render the video
     */
    public function _construct()
    {

        //Generate the configuration for the application
        $this->customerServiceApplicationConfig=$this->getApplicationConfig();

    }

    protected function _toHtml()
    {

        //Display the bootstrap html and js for the customer service application
        echo $this->getCustomerServiceInitHtml($this->customerServiceApplicationConfig);

    }

    /**
     * This function returns initial configuration values necessary in order to bootstrap the front end application.
     * @returns [array] An array of configuration values to be processed by the front end application
     */
    protected function getApplicationConfig(){

        $adminEmail=Mage::getStoreConfig('customerservice_options/admin_configuration/admin_vline_id');

        $customerEmail='wcg1b6hbtvm19ju2';


        $adminFeatures=array('video','audio','text','person-selector');

        $configuredFeatures=$this->getFeaturesVisible();

        if(stripos($configuredFeatures,',') !== false){

            $customerFeatures= explode(',',$configuredFeatures);
        }else{
            $customerFeatures=array($configuredFeatures);
        }


        $applicationConfig['serviceId']=Mage::getStoreConfig('customerservice_options/api_configuration/service_id');

        if(Mage::getDesign()->getArea() == 'adminhtml' || Mage::app()->getStore()->isAdmin()){

            $applicationConfig['localEmail']= $adminEmail;
            $applicationConfig['remoteEmail']= $customerEmail;
            $applicationConfig['viewType']='adminhtml';
            $applicationConfig['defaultPerson']='';
            $applicationConfig['featuresVisible']=$adminFeatures;

        }else{

            $applicationConfig['localEmail']= $customerEmail;
            $applicationConfig['remoteEmail']= $adminEmail;
            $applicationConfig['viewType']='frontend';
            //Default person id should come from admin configuration.
            $applicationConfig['defaultPerson']=$adminEmail;
            $applicationConfig['featuresVisible']=$customerFeatures;

        }

        return $applicationConfig;
    }

    /**
     * Returns the initial front end application configuration html.
     * The configuration is meant to be processed and become values used for front end application configuration.
     * @param $applicationConfig [array] Contains initial configuration for the front end application.
     * @return  Initial configuration javascript that bootstraps the state of the front end application.
     */
    protected function getInitConfigHtml($applicationConfig){

        $appConfigJson=json_encode($applicationConfig);

        $customerServiceConfigHtml='<script> window.Carlosreynosanunez_CustomerService_Config='.$appConfigJson.'</script>';

        return $customerServiceConfigHtml;
    }

    /**
     * @param $applicationConfig Contains the intial values used by the front end in order to bootstrap the application
     * @return Initial|string Returns the initial htlm that the frontend javascript will use to bootstrap the application.
     */
    protected function getCustomerServiceInitHtml($applicationConfig) {

        /**
         * Store the customer service config in a global in order to add the values as providers within the front end
         */
       $initHtml= $this->getInitConfigHtml($applicationConfig);

       $initHtml .='<div data-customer-service-directive class="bootstrap-styles"></div>';

       return $initHtml;

    }

}

?>
