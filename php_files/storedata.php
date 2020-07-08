<?php
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



$con = mysqli_connect("localhost","root","");

if(! $con)
{
    die('Connection Failed'.mysql_error());
}

mysqli_select_db($con,"museumdb");

if(!$loaded){
mysqli_query($con,'set character set UTF8');
mysqli_query($con,"INSERT INTO visitors(path,number_visitors) VALUES (\"$path\",\"$quantity\")");
}
	


mysqli_close($con);	



?>

