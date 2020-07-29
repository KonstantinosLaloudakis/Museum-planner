<?php
 $con=mysqli_connect("localhost", "root", "");
    if(!$con)
         die('Connection Failed'.mysql_error());
	 
	 mysqli_select_db($con,"museumdb")
?>
