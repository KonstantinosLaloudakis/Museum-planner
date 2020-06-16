<?php
$login_page = "login.php"; 
//$logout_page = "logout.php"; 
//$logout_redirect1 = "../index.html"; 
//$logout_redirect2 = "php_files/error.php";
//$register_redirect1 = "register_complete.php";
$logout_redirect = "login.php";
$login_redir= "welcome.php";


function doLogout()
{
	session_destroy();
	unset($_SESSION['isAuthenticated']);
}

function isAuthenticated()
{	
	$result = false;
	if (isset($_SESSION['isAuthenticated']) && $_SESSION['isAuthenticated'] == true) {
		$result = true;
	}
	return $result;
}


?>