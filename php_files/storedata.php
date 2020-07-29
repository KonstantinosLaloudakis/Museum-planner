<?php
require 'conn.php';
 session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}


//$decoded = base64_decode($_POST["json"]);
$name=$_SESSION['name'];
$path = $_GET["path"];
$quantity=$_GET["quantity"];
$museum_name=$_GET["museum_name"];



//$con = mysqli_connect("localhost","root","");

//if(! $con)
//{
 //   die('Connection Failed'.mysql_error());
//}

//mysqli_select_db($con,"museumdb");

if(!$loaded){
	 $id_query = mysqli_query($con,"SELECT user_id FROM users WHERE username = \"$name\"");
$id=mysqli_fetch_row($id_query);
	$room_id_temp=mysqli_query($con,"SELECT user_rooms_id FROM user_rooms WHERE name=\"$museum_name\" AND user_id=\"$id[0]\" ");
	$room_id=mysqli_fetch_row($room_id_temp);
mysqli_query($con,'set character set UTF8');
mysqli_query($con,"INSERT INTO visitors(path,number_visitors,room_id) VALUES (\"$path\",\"$quantity\",\"$room_id[0]\")");
}
mysqli_close($con);	

?>

