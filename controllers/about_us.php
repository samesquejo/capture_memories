<?php

class About_us extends Controller
{

	function __construct()
	{
		parent::__construct();
		$this->module = "about_us";
	}
	
	public function index()
	{
		$this->view->about_us = Data::About_us();
		$this->view->render('views/about-us/index.php');
	}

}

?>