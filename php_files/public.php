<?php
    session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.0.1">
    <title>Create your museum</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/starter-template/">

    <!-- Bootstrap core CSS -->
<link href="../assets/dist/css/bootstrap.css" rel="stylesheet">

    <style>

	.navbar {
  margin: 0 !important;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  align-items: center;
  justify-content: center;
  padding-top: 0px;
  float:left;
}
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
		

    </style>
    <!-- Custom styles for this template -->
    <link href="starter-template.css" rel="stylesheet">
  </head>
  <body>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" >
  <a class="navbar-brand"> <span data-feather="user"></span> <?php if (isAuthenticated()) { 
		            echo $_SESSION['name']; 
					}  ?></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="welcome.php" data-toggle="tooltip"  title="Home"><span data-feather="home"></span> <span class="sr-only">(current)</span></a>
       
      <li class="nav-item">
        <a class="nav-link" id="btn11" onclick="save_json()" data-toggle="tooltip"  title="Save museum" ><span data-feather="save"></span></a>
       <li class="nav-item">
        <a class="nav-link" id="btn5" data-toggle="tooltip"  title="Remove Object" ><span data-feather="trash-2"></span></a>
       
    </ul>
   
  </div>
</nav>

<main role="main">
<div class="container-fluid h-100 ">
  <div class="row justify-content-center h-100 ">
  <div class="col-sm-2  hidden-md-down">
	<div class="btn-group-vertical">
		<div class="btn-group dropright">
		 <button class="btn btn-light dropdown-toggle" id="btn1" data-toggle="dropdown" >ΕΚΘΕΜΑ
		 <span class="caret"></span></button>
		<ul class="dropdown-menu text-center" role="menu">
		<li> <button class="btn btn-light" id="small" onclick="createImage(this.id)"> Small</button></li>
        <li> <button class="btn btn-light" id="medium" onclick="createImage(this.id)"> Medium</button></li>
		<li> <button class="btn btn-light" id="large" onclick="createImage(this.id)"> Large</button></li>
		</ul>
	</div>
     
	 <button class="btn btn-light" id="btn3"  >ΜΕΓΑΛΟΣ ΤΟΙΧΟΣ</button> 
	 <button class="btn btn-light" id="btn4" >ΤΟΙΧΟΣ</button> 
	 <div class="btn-group dropright">
		 <button class="btn btn-light dropdown-toggle" id="btn8" data-toggle="dropdown" >ΠΟΡΤΑ
		 <span class="caret"></span></button>
		<ul class="dropdown-menu text-center" role="menu">
		<li> <button class="btn btn-light" id="horizontal" onclick="createDoor(this.id)"> Horizontal</button></li>
        <li> <button class="btn btn-light" id="vertical" onclick="createDoor(this.id)">Vertical</button></li>
		</ul>
	</div>

	</div>
</div>
  <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
  <svg id="museum" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" onload="makeDraggable(evt)">
	</svg>  
  </div>
</div>
</div>

<script src="../js/func.js"></script>
</main><!-- /.container -->

      <script src="../js/jquery.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js"></script>
        
		<script src="../assets/dist/js/bootstrap.bundle.js"></script>
		<script src="../js/dashboard.js"></script>


</html>
