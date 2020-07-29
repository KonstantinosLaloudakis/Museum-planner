<?php
require 'conn.php';
    include "database.php";
	$name 	    = $_POST["name"];
	$surname 	= $_POST["surname"];
	$email		= $_POST["email"];
	$username	= $_POST["username"];
	$password	= trim($_POST["psw"]);
	$birthday   = $_POST["birthday"];
	
	
	

	
	
	//$con = mysqli_connect("localhost", "root", "");
	//if (!$con)
//{
	//echo "problem in the connection".mysqli_error();
	//die('Connection Failed'.mysql_error());
//}

	//mysqli_select_db($con,"museumdb");	
	
	mysqli_query($con,'set character set UTF8');
	mysqli_query($con,"INSERT INTO users(name,surname,email,password,birthday,username) VALUES (\"$name\",\"$surname\",\"$email\",\"$password\",\"$birthday\",\"$username\")");
	echo "ok ola";
	
    mkdir('../json/'.$username, 0777, true);


	mysqli_close($con);		
		
	header('Location: '.$register_redirect1.'');	

?>
