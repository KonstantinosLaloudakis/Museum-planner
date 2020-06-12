
var selectedElement,offset, transform,confined;
var button2Clicked=false;
var button4Clicked=false;
var button5Clicked=false;
var flag=false;
var objects=[];

var boundaryX1 = 0;
var boundaryX2 = 100;
var boundaryY1 = 0;
var boundaryY2 = 70;

const museum = document.querySelector("#museum");

var svgNS = "http://www.w3.org/2000/svg"; 
var xlink= "http://www.w3.org/1999/xlink";

const museumPoint = (elem, x, y) => {
  let p = museum.createSVGPoint();
  p.x = x;
  p.y = y;
  return p.matrixTransform(elem.getScreenCTM().inverse());
}

//onclick function of the 1st button

function createImage(type){
	console.log(type);
	if(flag){
	var myImage = document.createElementNS(svgNS,"image");
	if(type=="small"){
    myImage.setAttributeNS(null,"height","10%");
    myImage.setAttributeNS(null,"width","10%");
    myImage.setAttributeNS(xlink,"href","small.png");
	}
	else if(type=="medium"){
    myImage.setAttributeNS(null,"height","20%");
    myImage.setAttributeNS(null,"width","20%");
    myImage.setAttributeNS(xlink,"href","sparta.png");
	}
	else if(type=="large"){
    myImage.setAttributeNS(null,"height","30%");
    myImage.setAttributeNS(null,"width","30%");
    myImage.setAttributeNS(xlink,"href","europi.jpeg");
	}
	else{
		alert("Something wrong happened");
	}
	myImage.setAttribute("class","draggable confine");
	document.getElementById("museum").appendChild(myImage);
	}
	else{
		alert("Ρε την παλεύεις; Πως θα βάλεις εκθέματα χωρίς να έχεις μουσείο;");
	}
}


//onclick function of the 2nd button
document.getElementById("btn2").addEventListener("click", createRect);


	
	function createRect(){
		flag=true;
		button2Clicked=true;
	//on mousedown start creating the rectangle
	museum.addEventListener("mousedown",(event) =>{
		if(button2Clicked){
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
		
		}
	});
	
	
}

//onclick function of the 3rd button
document.getElementById("btn3").addEventListener("click", function(){
	flag=true;
	var myPolyline = document.createElementNS(svgNS,"polyline"); 
    myPolyline.setAttributeNS(null,"points","0,0 0,60 90,60 90,0 0,0");
    myPolyline.setAttributeNS(null,"width",5);
    myPolyline.setAttributeNS(null,"height",5);
    myPolyline.setAttributeNS(null,"fill","transparent");
    myPolyline.setAttributeNS(null,"stroke","black");
	myPolyline.setAttribute("class","draggable confine");
	museum.appendChild(myPolyline);
});

//onclick function of the 4th button
document.getElementById("btn4").addEventListener("click", createLine);

function createLine(){
	if(flag){
		button4Clicked=true;
	
	//on mousedown start creating the line
	museum.addEventListener("mousedown",(event) =>{
	
		if(button4Clicked){
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
		
		}
	});
	}
	else{
			alert("Ρε την παλεύεις; Πως θα βάλεις εκθέματα χωρίς να έχεις μουσείο;");
		}

}
//remove an object of your choice
document.getElementById("btn5").addEventListener("click",removeObject);

function removeObject(){
	button5Clicked=true;
	museum.addEventListener("mousedown",(event) =>{
		if(button5Clicked){
			button5Clicked=false;
			selectedElement=event.target;
			if(selectedElement!=document.getElementById("museum")){
				var object = selectedElement;
				var parent = object.parentNode;
				parent.removeChild(object);
			}
			else{
				alert("Ρε την παλεύεις; Πας να διαγράψεις κατι που δεν υπάρχει!");
			}
		}
	});
}

document.getElementById("btn6").addEventListener("click",save);

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

document.getElementById("btn7").addEventListener("click",load);

//load all previous saved objects 
function load(){
	if(objects.length){
		console.log(objects);
	for(var i in objects)
		document.getElementById('museum').appendChild(objects[i]);
	
	}
	
	//if the objects array is empty, it means that the save function hasn't been called yet, so we inform the user
	else{
		alert("There isn't a saved session");
	}
	
}


//onclick function of the 8th button
function createDoor(type){
	if(flag){
		
		museum.addEventListener("click",function _listener(event){
			
		
			var line =document.createElementNS(svgNS,"line");
			var start= museumPoint(museum,event.clientX,event.clientY);
			
			if(type=="horizontal"){
				line.setAttributeNS(null, 'x1', start.x-10);
				line.setAttributeNS(null, 'y1', start.y);
				line.setAttributeNS(null, 'x2', start.x+10);
				line.setAttributeNS(null, 'y2', start.y);
				
			}	
			else if(type=="vertical"){
				line.setAttributeNS(null, 'x1', start.x);
				line.setAttributeNS(null, 'y1', start.y-10);
				line.setAttributeNS(null, 'x2', start.x);
				line.setAttributeNS(null, 'y2', start.y+10);
			}
			else{
				alert("ΣΤΑΜΑΤΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑΑ");
			}
			line.setAttributeNS(null,"stroke","red");
			line.setAttribute("class","draggable confine");
			document.getElementById("museum").appendChild(line);
			museum.removeEventListener("click",_listener,true);
				
		
		},true);
		
		
	}
	else{
		alert("Ρε την παλεύεις; Πως θα βάλεις εκθέματα χωρίς να έχεις μουσείο;");
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





