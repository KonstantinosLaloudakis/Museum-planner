<?php
require 'conn.php';
    session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}

$username=$_SESSION['name'];
	// $con = mysqli_connect("localhost","root","");

//if(! $con)
//{
   // die('Connection Failed'.mysql_error());
//}

//mysqli_select_db($con,"museumdb");
	 
	 $id_query = mysqli_query($con,"SELECT user_id FROM users WHERE username = \"$username\"");
$id=mysqli_fetch_row($id_query);

$result = mysqli_query($con, "SELECT * FROM user_rooms WHERE user_id = \"$id[0]\"");

?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.0.1">
    <title>Dashboard Template · Bootstrap</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/dashboard/">

    <!-- Bootstrap core CSS -->
<link href="../assets/dist/css/bootstrap.css" rel="stylesheet">

    <style>
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
    <link href="../css/dashboard.css" rel="stylesheet">
  </head>
  <body>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="welcome.php"> 
  <span data-feather="user"></span>
  <?php if (isAuthenticated()) { 
		            echo $_SESSION['name']; 
					}  ?></a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <a class="nav-link" href="logout.php">
	  <span data-feather="log-out"></span>
	  Log out</a>
    </li>
  </ul>
</nav>

<div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="public.php">
              <span data-feather="plus-square"></span>
              Create your own museum
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="load_museums.php">
              <span data-feather="loader"></span>
              Load museum<span class="sr-only">(current)</span>
            </a>
          </li>
         <li class="nav-item">
            <a class="nav-link" href="AboutUs.php">
              <span data-feather="info"></span>
              About Us
            </a>
          </li>
        </ul>

       
      </div>
    </nav>

    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
     
        <div id="content">

    <table class="table table-hover">
     <thead>
      <tr>

       <?php
	   if(mysqli_num_rows($result)==0){
		   echo "<tr>";
		   echo "<h1> Oh myyyy!! It seems that you haven't created any museum yet. Hit that 'Create your own museum' button and start creating one. You can do it! Believe in yourself!</h1>";
		   echo "</tr>";
	   }
	   else{
			echo "<th>Museum Name</th>";
			echo "<th>Load Museum</th>";
			echo "<th>Animate Movement</th>";
			echo "</thead>";
			echo "<tbody>";
		   while($row = mysqli_fetch_array($result))
			{
			
			echo "<tr>";
			echo "<td>" . $row['name'] . "</td>";
			echo "<td>" . '<a href="load.php?name='.$row['name'].'"> Show more </a>' . "</td>";
			echo "<td>" . '<a href="animate.php?name='.$row['name'].'"> Show more</a>' . "</td>";
			echo "</tr>";
			}
	   }
		mysqli_close($con);
	   ?>
	   
      </tr>
	  </tbody>
     </table>
    

   </div>
      

     
    </main>
  </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
      <script>window.jQuery || document.write('<script src="../assets/js/vendor/jquery.slim.min.js"><\/script>')</script><script src="../assets/dist/js/bootstrap.bundle.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
        <script src="../js/dashboard.js"></script></body>
</html>
