<!DOCTYPE html>
<html lang="en">
<head>
<title>Page Title</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<div class="header">
  <h1>My Website</h1>
  <p>A <b>responsive</b> website created by me.</p>
</div>

<div class="navbar">
  <a href="#" class="active">Home</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#" class="right">Link</a>
</div>
<div class="row">
  <div class="side">
  <ul class="list-unstyled">
	<div id="exhibit_list" class="list-unstyled sub" style="box-shadow:2px 2px 3px #ccc;display:none;background:#fff;border-radius: 0 5px 5px 0; padding:10px;position:absolute;left:200px;width:150px">
		<button class="btn fully image" id="small" onclick="$('#exhibit_list').hide();createImage(this.id)">Small</button>
        <button class="btn fully image" id="medium" onclick="$('#exhibit_list').hide();createImage(this.id)">Medium</button>
		<button class="btn fully image" id="large" onclick="$('#exhibit_list').hide();createImage(this.id)">Large</button>
	</div>
    <li><button class="btn btn-default fully" id="btn1" onclick="$('#door_list').hide();$('#exhibit_list').toggle(200);">ΕΚΘΕΜΑ</button></li>
	<li><button class="btn btn-default fully" id="btn2" onclick="$('#door_list').hide();$('#exhibit_list').hide()">ΔΩΜΑΤΙΟ</button></li>
	<li><button class="btn btn-default fully" id="btn3" onclick="$('#door_list').hide();$('#exhibit_list').hide()">ΜΕΓΑΛΟΣ ΤΟΙΧΟΣ</button></li>
	<li><button class="btn btn-default fully" id="btn4" onclick="$('#door_list').hide();$('#exhibit_list').hide()">ΤΟΙΧΟΣ</button></li>
	<div id="door_list" class="list-unstyled sub" style="box-shadow:2px 2px 3px #ccc;display:none;background:#fff;border-radius: 0 5px 5px 0; padding:10px;position:absolute;left:200px;width:150px">
		<button class="btn fully door" id="horizontal" onclick="$('#door_list').hide();createDoor(this.id)">Horizontal</button>
        <button class="btn fully door" id="vertical" onclick="$('#door_list').hide();createDoor(this.id)">Vertical</button>
	</div>
	<li><button class="btn btn-default fully" id="btn8" onclick="$('#exhibit_list').hide();$('#door_list').toggle(200);">ΠΟΡΤΑ</button></li>
	<li><button class="btn btn-default fully" id="btn5" onclick="$('#door_list').hide();$('#exhibit_list').hide()">ΔΙΑΓΡΑΦΗ ΑΝΤΙΚΕΙΜΕΝΟΥ</button></li>
	<li><button class="btn btn-default fully" id="btn6" onclick="$('#door_list').hide();$('#exhibit_list').hide()">ΑΠΟΘΗΚΕΥΣΗ</button></li>
	<li><button class="btn btn-default fully" id="btn7" onclick="$('#door_list').hide();$('#exhibit_list').hide()">ΦΟΡΤΩΣΗ ΣΧΕΔΙΟΥ</button></li>
	<li><button class="btn btn-default fully" id="btn9" onclick="$('#door_list').hide();$('#exhibit_list').hide()">JSON</button></li>
	
	</ul>
  </div>
  <div class="main">
  	<svg id="museum" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" onload="makeDraggable(evt)"> 
  </div>
   </div>

<script src="func.js"></script>

</body>
<script src="jquery.min.js"></script>
</html>