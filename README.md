#About

This repository contains the source code files for my Master of Science in Software Engineering final project.

##Project Objectives

The project was designed and implemented with the following objectives:

* Design and implement a complete solution for a modern e-commerce framework.

    * Provide module administration configuration
    * Provide provide easy installation of features
    * Documentation and analysis of requirements and architectural solution

* Utilize modern front-end web application technologies and tools.

    * JavaScript MVC Frameworks
    * HTML5
    * CSS frameworks
    * JavaScript unit testing frameworks
    * Front-end package management tools
    * JavaScript module tools


#Module Configuration & Installation

##WebRTC API & User Configuration

![Customer Service Module Admin Configuration](https://googledrive.com/host/0BzeRIFydrcV6THNBR0JiLUlXY1k/module-config.png)

The image illustrates the module configuration form. The form contains text boxes for entering an API Secret, Service ID, and Person ID (User ID). These values must be configured in order for the Developer to have installed the module properly.

##Widget Installation

![Customer Service Module Magento Widget Installation] (https://googledrive.com/host/0BzeRIFydrcV6THNBR0JiLUlXY1k/widget-config-cropped)

The image illustrates the Magento widget configuration page. The page contains two sections. The first section allows users to decide what widget they would like to insert into a CMS page. For this project the user will select the widget type ‘Customer Service: Video, Audio, and Text Communication’. Once the widget type has been selected the second section appears asking the Developer to choose what features of the application they would like to have visible to Customers.

#Module Features

##Customer & Customer Service Representative Common Features

![Customer Service Module Common Features] (https://googledrive.com/host/0BzeRIFydrcV6ODVEa1ZJeU1QQ00/app-common-features.png)

1. The video communication widget where the video feed of the remote Customer Service Application User is displayed.
2. The audio communication widget that manages the remote audio feed from the remote Customer Service Application User.
3. The text communication widget that renders the text conversation with the current remote Customer Service Application User. It also points to the widget that allows a Customer Service Application User to enter a text message and post it to a remote Customer Service Application User.
4. The application controls that allow the Customer Service Application User to manage their connection with the vLine WebRTC platform, as well as their direct WebRTC connection with the remote Customer Service Application User.
5. The visual components that represent the application's connection state to the vLine WebRTC platform and the logged in status of the Customer Service Application User within that platform.

##Customer Service Representative Unique Features

![Customer Service Module Admin Features] (https://googledrive.com/host/0BzeRIFydrcV6SHJoblFyT3JhYXM/admin-features)

The image highlights the person selector widget visible only to the Customer Service Representative. The widget allows Customer Service Representatives to choose from multiple incoming Customer connections. The person selector widget displays all incoming calls from Customers. In order to accept a call from an incoming Customer, the Customer Service Representative must first select a Customer from the person selector widget. Once a person is selected, initiating a connection will accept that selected incoming call.
