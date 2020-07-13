<?php
    session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}
$name=$_GET['name'];
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.0.1">
    <title>Starter Template · Bootstrap</title>

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
  <a class="navbar-brand">  <span data-feather="user"></span><?php if (isAuthenticated()) { 
		            echo $_SESSION['name']; 
					}  ?></a>
 
 <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" onclick="kati()" data-toggle="tooltip"  title="Animate"><span data-feather="play"></span> <span class="sr-only">(current)</span></a>
       
    </ul>
  </div>
</nav>

<main role="main">
<div class="container-fluid h-100 ">
	<form>
		<label for="numb"> Path: </label>
		<input id="numb">
		<label for="quantity">Quantity (between 1 and 100):</label>
		<input  type="number" id="quantity" name="quantity" min="1" max="100">
		<input type="hidden" id="name" name="name" value="<?php echo $name?>">
		<button type="button" onclick='storeData()'>Submit</button>
	
	
	
	</form>
  <div class="row justify-content-center h-100 ">
  <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
  
  <svg id="museum" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" onload="load('<?php if (isAuthenticated()) { 
		            echo $_SESSION['name']; 
					}  ?>','<?php echo $name?>');load_initializer();makeDraggable(evt)"> 
		
					
					
	</svg>				
  </div>
</div>
</div>

<script  src="../js/func.js"></script>
</main><!-- /.container -->
<script type="text/javascript" src="..\bower_components\pathfinding\pathfinding-browser.min.js"></script>
<script src="../js/jquery.min.js"></script>
      
        <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js"></script>
        <script src="../js/dashboard.js"></script>
		<script src="../assets/dist/js/bootstrap.bundle.js"></script>
</html>
