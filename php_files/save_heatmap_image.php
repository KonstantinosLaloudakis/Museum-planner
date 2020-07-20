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
$decoded = $_POST["json"];
$name=$_POST["name"];
$file=$name.".png";

	

	
$pngFile = fopen("../png/".$username."/".$file,"w+");
fwrite($pngFile,$decoded);
echo "1";


		fclose($pngFile);
echo $name;
?>