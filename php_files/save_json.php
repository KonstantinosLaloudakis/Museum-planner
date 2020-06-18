<?php
 session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}
//$decoded = base64_decode($_POST["json"]);
$decoded = $_POST["json"];
$file=$_SESSION['name'].".json";
$jsonFile = fopen("../json/".$file,"w+");
fwrite($jsonFile,$decoded);
fclose($jsonFile);
echo $decoded;
?>