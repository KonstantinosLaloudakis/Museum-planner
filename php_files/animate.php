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
  <script>
	function validateForm() {
	var path = document.forms["AnimationForm"]["numb"].value;
	var quantity = document.forms["AnimationForm"]["quantity"].value;
	var re=new RegExp('^([0-9](,[0-9])*)$');
  if (path == "" || path == null) {
    alert("Path must be filled out");
    return false;
  }
  if(!re.test(path)){
	  alert("Non acceptable pattern. Expecting exhibit_no,exhibit_no,..");
	  return false;
  }
  if (quantity == "" || quantity == null) {
    alert("Quantity must be filled out");
    return false;
  }
  else if(quantity<1 || quantity>100){
	alert("Quantity not within acceptable range (1-100)");
    return false;
  }
  return true;
}
</script>
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
  <a class="navbar-brand" href= "welcome.php">  <span data-feather="user"></span><?php if (isAuthenticated()) { 
		            echo $_SESSION['name']; 
					}  ?></a>
 
 <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" onclick="createHeatmap()" data-toggle="tooltip"  title="heatmap" id="heatmap"><span data-feather="play"></span> <span class="sr-only">(current)</span></a>
       <li class="nav-item">
        <a class="nav-link" id="btn11" onclick="save_heatmap()" data-toggle="tooltip"  title="Save museum&heatmap" ><span data-feather="save"></span></a>
    </ul>
  </div>
</nav>

<main role="main">
<div class="container-fluid h-100 ">
	
  <div class="row justify-content-center h-100 ">
  <div id="heatmap_svg" class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
  <svg id="museum"  viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" onload="load('<?php if (isAuthenticated()) { 
		            echo $_SESSION['name']; 
					}  ?>','<?php echo $name?>');load_initializer()"> 
		
			
	</svg>	
  </div>
  
</div>
</div>
<div class="container" >
<form class="form-inline" name="AnimationForm">
 <div class="form-group">
		<label for="numb"> Path: </label>
		<input id="numb" type="text">
	</div>
	 <div class="form-group">
		<label for="quantity">Quantity (between 1 and 100):</label>
		<input  type="number" id="quantity" name="quantity" min="1" max="100">
	</div>
		<input type="hidden" id="name" name="name" value="<?php echo $name?>">
	 <div class="form-group">
		<div class="form-check">
		<input class="form-check-input" type="radio" name="ColorRadios" id="exampleRadios1" value="1" checked>
			  <label class="form-check-label" for="exampleRadios1">
				Οικογένεια 
			  </label>
			</div>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="ColorRadios" id="exampleRadios2" value="2">
			  <label class="form-check-label" for="exampleRadios2">
				Σχολείο 
			  </label>
			</div>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="ColorRadios" id="exampleRadios3" value="3">
			  <label class="form-check-label" for="exampleRadios3">
				Άλλοι επισκέπτες 
			  </label>		
			</div>
		</div>
		<button type="button" onclick='if(validateForm())storeData()'>Submit</button>
	</form>
</div>
<script  src="../js/func.js"></script>
</main><!-- /.container -->
<script type="text/javascript" src="..\bower_components\dom-to-image\src\dom_to_image.js"></script>
<script type="text/javascript" src="..\bower_components\pathfinding\pathfinding-browser.min.js"></script>
<script type="text/javascript" src="..\bower_components\heatmap.js-amd\build\heatmap.js"></script>
<script src="../js/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js"></script>
        <script src="../js/dashboard.js"></script>
		<script src="../assets/dist/js/bootstrap.bundle.js"></script>
</html>
