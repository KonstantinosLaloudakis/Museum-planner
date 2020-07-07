var selectedElement,offset, transform,confined;
var button2Clicked=false;
var button4Clicked=false;
var button5Clicked=false;
var flag=false;
var objects=[];
var jsonString;
var tempDiv=null;
var buttonPressed=false;
var box=true;
var numImages=0;
var doorcoords;
var array=window.localStorage.getItem("array");
array=array.split(',');
var boundaryX1 = 0;
var boundaryX2 = 100;
var boundaryY1 = 0;
var boundaryY2 = 50;
var peopleNum=window.localStorage.getItem("peopleNum");
const museum = document.querySelector("#museum");

var svgNS = "http://www.w3.org/2000/svg"; 
var xlink= "http://www.w3.org/1999/xlink";

const museumPoint = (elem, x, y) => {
  let p = museum.createSVGPoint();
  p.x = x;
  p.y = y;
  return p.matrixTransform(elem.getScreenCTM().inverse());
}

//onclick function of the 1st button (image)
//type determines the size of the image

function createImage(type){
	if(flag){
		museum.addEventListener("click",function _listener(event){
			var myImage = document.createElementNS(svgNS,"image");
			var start= museumPoint(museum,event.clientX,event.clientY);
			console.log(start.x+ " ," + start.y);
			if(type=="small"){
				myImage.setAttributeNS(null,"height","10%");
				myImage.setAttributeNS(null,"width","10%");
				myImage.setAttributeNS(xlink,"href","../images/small.png");
			}
			else if(type=="medium"){
				myImage.setAttributeNS(null,"height","20%");
				myImage.setAttributeNS(null,"width","20%");
				myImage.setAttributeNS(xlink,"href","../images/sparta.png");
			}
			else if(type=="large"){
				myImage.setAttributeNS(null,"height","30%");
				myImage.setAttributeNS(null,"width","30%");
				myImage.setAttributeNS(xlink,"href","../images/europi.jpeg");
			}
			else{
				alert("Something wrong happened");
			}
			numImages++;
			myImage.setAttributeNS(null,"id","img"+numImages);
			myImage.setAttributeNS(null,"x",start.x-(((parseInt(myImage.getAttributeNS(null,"width"))/100)*100)/2));
			myImage.setAttributeNS(null,"y",start.y-(((parseInt(myImage.getAttributeNS(null,"height"))/100)*50)/2));
			myImage.setAttribute("class","draggable confine");
			console.log(myImage);
			document.getElementById("museum").appendChild(myImage);
			museum.removeEventListener("click",_listener,true);
		},true);
	}
	else{
		alert("Ρε την παλεύεις; Πως θα βάλεις εκθέματα χωρίς να έχεις μουσείο;");
	}
}


//onclick function of the 2nd button(room)
document.getElementById("btn2").addEventListener("click", createRect);


	
function createRect(){
	flag=true;
	
	if(!buttonPressed){
		buttonPressed=true;
		button2Clicked=true;
		//on mousedown start creating the rectangle
		museum.addEventListener("mousedown",(event) =>{
			if(button2Clicked && !button4Clicked){
				button2Clicked=false;
				var rect =document.createElementNS(svgNS,"rect");
				var start= museumPoint(museum,event.clientX,event.clientY);
				const drawRect= (e) =>{
					let p= museumPoint(museum,e.clientX,e.clientY);
					let w =Math.abs(p.x - start.x);
					let h =Math.abs(p.y - start.y);
					if(p.x > start.x){
						p.x=start.x;
						
					}
					if (p.y > start.y) {
						p.y = start.y;
					}
					rect.setAttributeNS(null, 'x', p.x);
					rect.setAttributeNS(null, 'y', p.y);
					rect.setAttributeNS(null, 'width', w);
					rect.setAttributeNS(null, 'height', h);
					rect.setAttributeNS(null,'stroke','black');
					rect.setAttributeNS(null,'fill','transparent');
					rect.setAttribute("class","draggable confine");
					document.getElementById("museum").appendChild(rect);
				
				}
				//stop drawing when the mouse is up
				const endDrawRect = (e) => {
					museum.removeEventListener('mousemove', drawRect);
					museum.removeEventListener('mouseup', endDrawRect);
				}
				museum.addEventListener('mousemove', drawRect);
				museum.addEventListener('mouseup', endDrawRect);
				buttonPressed=false;
			}
	
		});
	}
	else{
		alert("You have already pressed a button");
	}
}

//onclick function of the 3rd button(big box)
document.getElementById("btn3").addEventListener("click", function(){
	if(box){
		box=false;
		flag=true;
		var myPolyline = document.createElementNS(svgNS,"polyline"); 
		myPolyline.setAttributeNS(null,"points","3,3 3,47 97,47 97,3 3,3");
		myPolyline.setAttributeNS(null,"fill","transparent");
		myPolyline.setAttributeNS(null,"stroke","black");
		museum.appendChild(myPolyline);
	}
	else{
		alert("You can only add one box");
	}
});

//onclick function of the 4th button(wall)
document.getElementById("btn4").addEventListener("click", createLine);

function createLine(){
	if(flag){
		
		if(!buttonPressed){
			buttonPressed=true;
			button4Clicked=true;
			//on mousedown start creating the line
			museum.addEventListener("mousedown",(event) =>{
	
				if(button4Clicked && !button2Clicked){
					button4Clicked=false;
					var line =document.createElementNS(svgNS,"line");
					var start= museumPoint(museum,event.clientX,event.clientY);
					const drawLine= (e) =>{
						
						let p= museumPoint(museum,e.clientX,e.clientY);
						line.setAttributeNS(null, 'x1', start.x);
						line.setAttributeNS(null, 'y1', start.y);
						line.setAttributeNS(null, 'x2', p.x);
						line.setAttributeNS(null, 'y2', p.y);
						line.setAttributeNS(null,"stroke","black");
						line.setAttribute("class","draggable confine");
						document.getElementById("museum").appendChild(line);
					
					}
					//stop drawing when the mouse is up
					const endDrawLine = (e) => {
						museum.removeEventListener('mousemove', drawLine);
						museum.removeEventListener('mouseup', endDrawLine);
			
					}
					museum.addEventListener('mousemove', drawLine);
					museum.addEventListener('mouseup', endDrawLine);
					buttonPressed=false;
				}
		
			});
		}
		else{
			alert("You have already pressed a button");
		}
	}
	else{
			alert("Ρε την παλεύεις; Πως θα βάλεις εκθέματα χωρίς να έχεις μουσείο;");
	}

}
//remove an object of your choice
document.getElementById("btn5").addEventListener("click",removeObject);

function removeObject(){
	if(!buttonPressed){
		buttonPressed=true;
		museum.addEventListener("click",function _listener(event){
			selectedElement=event.target;
			if(selectedElement!=document.getElementById("museum")){
				if(selectedElement.tagName.toLowerCase()=="polyline"){
						box=true;
						flag=false;
				}
				var object = selectedElement;
				var parent = object.parentNode;
				parent.removeChild(object);
			}
			else{
				alert("Ρε την παλεύεις; Πας να διαγράψεις κατι που δεν υπάρχει!");
			}
			museum.removeEventListener("click",_listener,true);
	
			buttonPressed=false;	
		},true);
	}
	else{
		alert("You have already pressed a button");
	}
}

//document.getElementById("btn6").addEventListener("click",save);

//save all the current objects
function save(){
	
	//delete all previous saved objects
	while (objects.length) { objects.pop(); }
	
	if(document.getElementById('museum').childNodes.length>1){
		for(var i in document.getElementById('museum').childNodes){
			objects.push(document.getElementById('museum').childNodes[i]);
		}
	}
	//if the viewbox is empty nothing happens
	else{
		alert("There is nothing to save");
	}
}

//document.getElementById("btn7").addEventListener("click",load);

//load all previous saved objects from user's json file
function load(name,filename,array=null){
	var success = false;
	/*if(objects.length){
		for(var i in objects)
		document.getElementById('museum').appendChild(objects[i]);
	
	}
	
	//if the objects array is empty, it means that the save function hasn't been called yet, so we inform the user
	else{
		alert("There isn't a saved session");
	}*/
	/*if(tempDiv){
	svgText=JSON.parse(jsonString);
	tempDiv.innerHTML = svgText;
	document.getElementById("museum").appendChild(tempDiv);
	}
	else{
		alert("There isn't a saved session");
	}*/
	//search for file with name same as the username
	$.getJSON("../json/"+name+"/"+ filename+".json",function(data){
		success=true;
		museum.innerHTML=data;
		FindTotalImages();
	
	});
	//να δουμε ξανα τον χρόνο, γιατί αν υπάρχουν πολλά αντικείμενα στο museum, μπορεί να αργήσει να εμφανιστεί
	setTimeout(function() {
		if (!success)
		{
			// Handle error accordingly
			alert("There isn't any saved template");
			window.location.href="../php_files/welcome.php";
		}
	},1000);
	
}
function FindTotalImages(){
	let images=[];
	images=museum.getElementsByTagNameNS(svgNS,"image");
	numImages=images.length;
}


//onclick function of the 8th button(door)
function createDoor(type){
	if(flag){
		if(!buttonPressed){
			let aa=true;
			buttonPressed=true;
			museum.addEventListener("click",function _listener(event){
			
		var line =document.createElementNS(svgNS,"line");
				var start= museumPoint(museum,event.clientX,event.clientY);
				
				
					console.log("1");
					console.log(start.x,start.y);
					if(checkCoords(start.x,start.y)){
						
					console.log("2");
				if(type=="horizontal"){
					if(checkCoords(start.x-5,start.y) &&  checkCoords(start.x-5,start.y)){
					line.setAttributeNS(null, 'x1', start.x-5);
					line.setAttributeNS(null, 'y1', start.y);
					line.setAttributeNS(null, 'x2', start.x+5);
					line.setAttributeNS(null, 'y2', start.y);
					aa=false;
					}
					else{
						alert("Only vertical doors here");
						
					}
				}	
				else if(type=="vertical"){
					if(checkCoords(start.x,start.y-5) &&  checkCoords(start.x,start.y-5)){
					line.setAttributeNS(null, 'x1', start.x);
					line.setAttributeNS(null, 'y1', start.y-5);
					line.setAttributeNS(null, 'x2', start.x);
					line.setAttributeNS(null, 'y2', start.y+5);
					aa=false;
					}
					else{
						alert("Only horizontal doors here");
					}
				}
				else{
					alert("ΣΤΑΜΑΤΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑ");
				}
				if(!aa){
				line.setAttributeNS(null,"stroke","red");
				line.setAttribute("class","draggable confine");
				document.getElementById("museum").appendChild(line);
				museum.removeEventListener("click",_listener,true);
					
				
				buttonPressed=false;
				}
				}
				
				else{
					console.log(checkCoords(start.x,start.y));
					console.log("3");
					alert("Kopsou paidaki");
				}
					
				
			},true);
		}
		else{
			alert("You have already pressed a button");
		}
		
	}
	else{
		alert("Ρε την παλεύεις; Πως θα βάλεις εκθέματα χωρίς να έχεις μουσείο;");
	}
}

function checkCoords(x,y){
	var returnVal=false;
	var element=museum.getElementsByTagNameNS(svgNS,"polyline");
	var rects=museum.getElementsByTagNameNS(svgNS,"rect");
	let point = museum.createSVGPoint();
	point.x=x;
	point.y=y;
	console.log(rects);
	for(i=0;i<rects.length;i++){
		returnVal=returnVal || rects[i].isPointInStroke(point);
	}
	returnVal=returnVal || element[0].isPointInStroke(point);
	return returnVal;
	
}
//save all the elements inside the viewbox in a json file
//document.getElementById("btn9").addEventListener("click",save_json);

function save_json(museum_name=null,loaded=false){
	
	if(!museum_name){
		var name=prompt("Please enter the file name","museum");
		while(name==""){
			name=prompt("Please enter the file name mh sou gamiso","museum");
		}
	}
	else{
		var name=prompt("Please enter the file name",museum_name);
		while(name==""){
			name=prompt("Please enter the file name mh sou gamiso",museum_name);
		}
		
	}
	if(name==null){
		return;
	}
	if(!loaded){
  event.preventDefault(event);
  $.ajax({
      url: '../php_files/test.php',
      type: 'POST',
      data:{
		  'name':name,
	  },
      success: function (response) {
		  console.log(name);
		  console.log(response);
      //get response from your php page (what you echo or print)
        if(response =='True'){
			alert(name +" already exists");
			return;
		}
      }
    });
	}
	var museum = document.getElementById("museum");
	tempDiv = document.createElement("div");
	tempDiv=museum.cloneNode(true);
	var svgText = tempDiv.innerHTML;
	jsonString = JSON.stringify(svgText);
	/*
	var encoded =btoa(jsonString);
	*/
	console.log(loaded);
	var xhr = new XMLHttpRequest();
	

		
	xhr.open("POST","save_json.php",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var data=''+ "json=" + jsonString + "&name="+name +"&loaded=" + loaded;
	xhr.send(data);
	alert(name + " saved successfully!!")
	//xhr.send("name=" + name);
	//download(jsonString,"kati.json","JSON");
	
	
}
//not yet used
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function load_initializer(){
	flag=true;
	box=false;
	
}

//document.getElementById("btn123").addEventListener("click", function(){
	function kati(){
	var point=museum.createSVGPoint();
	var path;
	point=findDoor();
	var myImage=[];
	console.log(array);
	console.log(peopleNum);
	for(i=0;i<peopleNum;i++){
			myImage[i] = document.createElementNS(svgNS,"image");
			myImage[i].setAttributeNS(null,"height","10%");
			myImage[i].setAttributeNS(null,"width","10%");
			myImage[i].setAttributeNS(null,"x",point.x-(((parseInt(myImage[i].getAttributeNS(null,"width"))/100)*100)/2));
			myImage[i].setAttributeNS(null,"y",point.y-(((parseInt(myImage[i].getAttributeNS(null,"height"))/100)*50)/2));
			myImage[i].setAttributeNS(xlink,"href","../images/person.png");
			myImage[i].setAttribute("class","confine");
		
			console.log(myImage[i]);
			//path="M "+parseFloat(myImage[i].getAttributeNS(null,"x")) + "," + parseFloat(myImage[i].getAttributeNS(null,"y"));
			path="M 0,0";
			path+=createPath(parseFloat(myImage[i].getAttributeNS(null,"x")),parseFloat(myImage[i].getAttributeNS(null,"y")));
			path+=" z";//+point.x +","+point.y;
			var mpath=document.createElementNS(svgNS,"path");
			//mpath.setAttributeNS(null,"stroke","blue");
			mpath.setAttributeNS(null,"d",path);
			mpath.setAttributeNS(null,"fill","none");
			mpath.setAttributeNS(null,"id","theMotionPath");
			
			var ani = document.createElementNS(svgNS,"animateMotion");
			ani.setAttributeNS(null,"dur", "30s");
			ani.setAttributeNS(null,"repeatCount", "1");
			ani.setAttributeNS(null,"begin",i+'s');
			
			var mpathObj=document.createElementNS(svgNS,"mpath");
			mpathObj.setAttribute("href","#theMotionPath");
			ani.appendChild(mpathObj)
			myImage[i].appendChild(ani);
			console.log(myImage[i]);
			document.getElementById("museum").appendChild(myImage[i]);
			//console.log(mpath);
			document.getElementById("museum").appendChild(mpath);
			
	}
	
}
function createPath(x,y){
	var point=museum.createSVGPoint();
	var path=" ";
	var img=museum.getElementsByTagNameNS(svgNS,"image");
	console.log(img);
		for(var i in array){
			if(array[i]==","){
				continue;
			}
			
			point.x=parseFloat(img[array[i]-1].getAttributeNS(null,"x"));
			point.x+=(((parseInt(img[array[i]-1].getAttributeNS(null,"width"))/100)*100)/2);
			point.x-=x;
			point.y=parseFloat(img[array[i]-1].getAttributeNS(null,"y"));
			point.y+=(((parseInt(img[array[i]-1].getAttributeNS(null,"height"))/100)*50)/2);
			point.y-=y;
			path+=point.x +',' + point.y +" ";
		
	}
	return path;
}

function findDoor(){
	var point = museum.createSVGPoint();
	
	var element=museum.getElementsByTagNameNS(svgNS,"polyline");
	var doors=museum.getElementsByTagNameNS(svgNS,"line");
	console.log(doors[0]);
	console.log(parseFloat(doors[0].getAttributeNS(null,"y1")));
	for(i=0;i<doors.length;i++){
		point.x=parseFloat(doors[i].getAttributeNS(null,"x1"));
		point.y=parseFloat(doors[i].getAttributeNS(null,"y1"));
		point.x2=parseFloat(doors[i].getAttributeNS(null,"x2"));
		point.y2=parseFloat(doors[i].getAttributeNS(null,"y2"));
		if(element[0].isPointInStroke(point)){
			console.log(point);
			if(point.y===point.y2){
				point.x+=5;
			}
			else if(point.x===point.x2){
				point.y+=5;
			}
			console.log(point);
			return point; 
		}
	}
	
}


//------------------------------------------------


//makes all objects inside the viebox draggable
function makeDraggable(evt) {
  var svg = evt.target;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  function startDrag(evt) {
	  //if there is a button pressed don't drag the object
	if(!button2Clicked && !button4Clicked){
		  
		//constrain the movement of the objects inside the viewbox
		confined = evt.target.classList.contains('confine');
		if (confined) {
			bbox = evt.target.getBBox();
			minX = boundaryX1 - bbox.x;
			maxX = boundaryX2 - bbox.x - bbox.width;
			minY = boundaryY1 - bbox.y;
			maxY = boundaryY2 - bbox.y - bbox.height;
		}
		
		if (evt.target.classList.contains('draggable')) {
			selectedElement = evt.target;
			offset = getMousePosition(evt);
   
			var transforms = selectedElement.transform.baseVal;
			// Ensure the first transform is a translate transform
			if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
				// Create an transform that translates by (0, 0)
				var translate = svg.createSVGTransform();
				translate.setTranslate(0, 0);
				// Add the translation to the front of the transforms list
				selectedElement.transform.baseVal.insertItemBefore(translate, 0);
			}
			// Get initial translation amount
			transform = transforms.getItem(0);
			offset.x -= transform.matrix.e;
			offset.y -= transform.matrix.f;
		}
	}
  }
  
  function drag(evt) {
  	if (selectedElement) {
		evt.preventDefault();
		var coord = getMousePosition(evt);
		var dx=coord.x - offset.x;
		var dy=coord.y - offset.y;
	
		if (confined) {
			if (dx < minX) { dx = minX; }
			else if (dx > maxX) { dx = maxX; }
			if (dy < minY) { dy = minY; }
			else if (dy > maxY) { dy = maxY; }
		}

        transform.setTranslate(dx, dy);
		
	}
  }
  function endDrag(evt) {
  	selectedElement = null;
  }
  

    function getMousePosition(evt) {
      var CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
}

/*function show_svg()
{
  var svg = document.getElementById("museum");
  var serializer = new XMLSerializer();
  var ser = serializer.serializeToString(svg);
  var w = window.open();
  w.document.open();
  w.document.write(ser);
  w.document.close();
}*/





