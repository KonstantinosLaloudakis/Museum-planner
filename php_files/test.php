<?php
 session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}

//$decoded = base64_decode($_POST["json"]);
$username=$_SESSION['name'];
$name = $_POST["name"];


//$con = mysqli_connect("localhost","root","");

//if(! $con)
//{
  //  die('Connection Failed'.mysql_error());
//}

//mysqli_select_db($con,"museumdb");

$id_query = mysqli_query($con,"SELECT user_id FROM users WHERE username = \"$username\"");
$id=mysqli_fetch_row($id_query);
mysqli_query($con,'set character set UTF8');



	$name_query=mysqli_query($con,"SELECT * FROM user_rooms WHERE user_id= \"$id[0]\" AND name= \"$name\"");
	if(mysqli_num_rows($name_query)>0){
		echo "True";
		exit();
		
	}
	else{
		echo "False";
		exit();
	}
	
		mysqli_close($con);	





?>