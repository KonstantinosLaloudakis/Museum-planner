<?php include('../php_files/process.php'); ?>
<!doctype html>
<html lang="en">
  <head>
  <script>

function validatePassword(){
  var password = document.getElementById('psw')
  , confirm_password = document.getElementById('psw-repeat');



  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}
  </script>
 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.0.1">
    <title>Join Thanasakis- Thanasakis network</title>
	
    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/sign-in/">

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
    <link href="../css/signin.css" rel="stylesheet">
  </head>
  <body class="text-center">
    <form class="form-signin" action="../php_files/signup.php" method="post">
  <img class="mb-4" src="../images/kati_allo.svg" alt="" width="72" height="72">
  <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
  <label for="username" class="sr-only">Username</label>
  <input type="text" name="username" id="username" class="form-control" placeholder="Username" required autofocus>
  <label for="name" class="sr-only">Name</label>
  <input type="text" name="name" class="form-control" placeholder="Name" required autofocus>
  <label for="surname" class="sr-only">Surname</label>
  <input type="text" name="surname" class="form-control" placeholder="Surname" required autofocus>
  <label for="birthday" class="sr-only">Birthday:</label>
  <input type="date" name="birthday" class="form-control">
  <label for="email" class="sr-only"><b>Email</b></label>
  <input type="email" placeholder="Enter Email" name="email"  id="email" class="form-control"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" required>
  <label for="psw" class="sr-only">Password</label>
  <input type="password" name="psw" id="psw" class="form-control" placeholder="Password"  onchange="validatePassword()"required>
  <label for="psw-repeat" class="sr-only">Repeat Password</label>
   <input type="password" placeholder="Repeat Password" class="form-control" name="psw-repeat" id="psw-repeat" onkeyup="validatePassword()" required>
   
  <div class="row">
  <div class="col">
		<button class="btn btn-lg btn-primary btn-block" type="signupbtn">Sign up</button>
</div>
<div class="col">
		<button class="btn btn-lg btn-danger btn-block" type="cancelbtn">Cancel</button>
	</div>
  </div>
  <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
</form>


</body>
</html>
<script src="../js/jquery.min.js"></script>
<script src="../js/script.js"></script>
