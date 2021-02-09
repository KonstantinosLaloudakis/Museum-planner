<?php
require 'conn.php';
session_start();
include "database.php";
$username = $_POST["username"];
$password = trim($_POST["pass"]);



$result = mysqli_query($con,"SELECT * FROM users WHERE username = \"$username\" AND password =\"$password\"");
$count=mysqli_num_rows($result);
if($count==1){
		
		$_SESSION['isAuthenticated'] = true;
		$_SESSION['name']		 = $username;
		header('Location: '.$login_redir.'');

}
else{
	mysqli_close($con);
	header('.Location: '.$logout_redirect.'');
}

?>