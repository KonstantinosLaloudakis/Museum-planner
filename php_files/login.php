<?php
require 'conn.php';
session_start();
include "database.php";
$username = $_POST["username"];
$password = trim($_POST["pass"]);

//$con = mysqli_connect("localhost","root","");

///f(! $con)
//{
////    die('Connection Failed'.mysql_error());
//}



$result = mysqli_query($con,"SELECT * FROM users WHERE username = \"$username\" AND password =\"$password\"");
$count=mysqli_num_rows($result);
if($count==1){
		
		$_SESSION['isAuthenticated'] = true;
		$_SESSION['name']		 = $username;
		header('Location: '.$login_redir.'');

}
else{
	echo "fuck you ";
	mysqli_close($con);
	//header('.Location: '.$logout_redirect.'');
}

?>