<?php
    session_start();
	require 'conn.php';
	session_destroy();
	unset($_SESSION['isAuthenticated']);
	unset ($_SESSION['name']);
	mysqli_close($con);
	include "database.php";
	header('Location:'.$logout_redirect.'');
?>