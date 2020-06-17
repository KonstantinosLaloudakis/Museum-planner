<?php
$login_page = "login.php"; 
//$logout_page = "logout.php"; 
//$logout_redirect1 = "../index.html"; 
//$logout_redirect2 = "php_files/error.php";
$register_redirect1 = "../index.html";
$logout_redirect = "../index.html";
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