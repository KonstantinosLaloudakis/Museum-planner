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
$username=$_SESSION['name'];
$decoded = $_POST["json"];
$name=$_POST["name"];
$file=$name.".json";
$loaded=$_POST["loaded"];


//$con = mysqli_connect("localhost","root","");

//if(! $con)
//{
  //  die('Connection Failed'.mysql_error());
//}

//mysqli_select_db($con,"museumdb");

if($loaded=="false"){
$id_query = mysqli_query($con,"SELECT user_id FROM users WHERE username = \"$username\"");
$id=mysqli_fetch_row($id_query);
mysqli_query($con,'set character set UTF8');
mysqli_query($con,"INSERT INTO user_rooms(name,user_id) VALUES (\"$name\",\"$id[0]\")");
}
	


mysqli_close($con);	
$jsonFile = fopen("../json/".$username."/".$file,"w+");
fwrite($jsonFile,$decoded);
echo "1";


		fclose($jsonFile);
echo $name;
?>