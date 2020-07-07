<?php
    session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}
?>
<!DOCTYPE html>
<html>
<body>

<h2>JavaScript Can Validate Input</h2>

<p>Please input a number between 1 and 10:</p>

<input id="numb">
<label for="quantity">Quantity (between 1 and 20):</label>
<input  type="number" id="quantity" name="quantity" min="1" max="20">
<button type="button" onclick="ArraySplit('<?php echo $_SESSION['name']?>')">Submit</button>

<p id="demo"></p>

</body>
<script  src="../js/split.js"></script>
</html> 
