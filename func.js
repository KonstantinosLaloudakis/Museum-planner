
var selectedElement,offset, transform,confined;
var button2Clicked=false;
var button4Clicked=false;
var button5Clicked=false;
var objects=[];

var boundaryX1 = 0;
var boundaryX2 = 100;
var boundaryY1 = 0;
var boundaryY2 = 70;
//window.addEventListener("load", () => {
const museum = document.querySelector("#museum");

var svgNS = "http://www.w3.org/2000/svg"; 
var xlink= "http://www.w3.org/1999/xlink";

const museumPoint = (elem, x, y) => {
  let p = museum.createSVGPoint();
  p.x = x;
  p.y = y;
  return p.matrixTransform(elem.getScreenCTM().inverse());
}


document.getElementById("btn1").addEventListener("click",function(){
	
	var myImage = document.createElementNS(svgNS,"image");	//to create a circle. for rectangle use "rectangle"
	//myImage.setAttributeNS(null,"id","myimage");
    myImage.setAttributeNS(null,"height","10%");
    myImage.setAttributeNS(null,"width","10%");
    myImage.setAttributeNS(xlink,"href","sparta.png");
	myImage.setAttribute("class","draggable confine");
	console.log(myImage);
	document.getElementById("museum").appendChild(myImage);
	

});
document.getElementById("btn2").addEventListener("click", createRect);


	
	function createRect(){
		button2Clicked=true;
	
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
		
			const endDrawRect = (e) => {
				museum.removeEventListener('mousemove', drawRect);
				museum.removeEventListener('mouseup', endDrawRect);
			}
			museum.addEventListener('mousemove', drawRect);
			museum.addEventListener('mouseup', endDrawRect);
		
		}
	});
	
	
}


document.getElementById("btn3").addEventListener("click", function(){
	var myPolyline = document.createElementNS(svgNS,"polyline"); 
    //myPolyline.setAttributeNS(null,"id","mypolyline");
    myPolyline.setAttributeNS(null,"points","0,0 0,60 90,60 90,0 0,0");
    myPolyline.setAttributeNS(null,"width",5);
    myPolyline.setAttributeNS(null,"height",5);
    myPolyline.setAttributeNS(null,"fill","transparent");
    myPolyline.setAttributeNS(null,"stroke","black");
	myPolyline.setAttribute("class","draggable confine");
	console.log(myPolyline);
    museum.appendChild(myPolyline);
});

document.getElementById("btn4").addEventListener("click", createLine);

function createLine(){
		button4Clicked=true;
	
	
	museum.addEventListener("mousedown",(event) =>{
	
		if(button4Clicked){
			button4Clicked=false;
			var line =document.createElementNS(svgNS,"line");
			var start= museumPoint(museum,event.clientX,event.clientY);
			const drawLine= (e) =>{
				
				let p= museumPoint(museum,e.clientX,e.clientY);
				//line.setAttributeNS(null,'id','line');
				line.setAttributeNS(null, 'x1', start.x);
				line.setAttributeNS(null, 'y1', start.y);
				line.setAttributeNS(null, 'x2', p.x);
				line.setAttributeNS(null, 'y2', p.y);
				line.setAttributeNS(null,"stroke","black");
				line.setAttribute("class","draggable confine");
				document.getElementById("museum").appendChild(line);
			
			}
			
		const endDrawLine = (e) => {
			museum.removeEventListener('mousemove', drawLine);
			museum.removeEventListener('mouseup', endDrawLine);
			
		}
		museum.addEventListener('mousemove', drawLine);
		museum.addEventListener('mouseup', endDrawLine);
		
		}
	});


}


function makeDraggable(evt) {
  var svg = evt.target;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  function startDrag(evt) {
	  if(!button2Clicked && !button4Clicked){
		  
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
		console.log(evt.target);
	    offset = getMousePosition(evt);
   
       var transforms = selectedElement.transform.baseVal;
    // Ensure the first transform is a translate transform
    if (transforms.length === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
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
		for(var i in document.getElementById("museum").childNodes){
			if(selectedElement==document.getElementById("museum").childNodes[i])
				document.getElementById("museum").childNodes[i].x+=coord.x - offset.x;
		}
		
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
document.getElementById("btn5").addEventListener("click",removeObject);

function removeObject(){
	button5Clicked=true;
	museum.addEventListener("mousedown",(event) =>{
		if(button5Clicked){
			button5Clicked=false;
			selectedElement=event.target;
			if(selectedElement!=document.getElementById("museum")){
				var object = selectedElement;
				var parent    = object.parentNode;
				parent.removeChild(object);
			}
			else{
				alert("Ρε την παλεύεις; Πας να διαγράψεις κατι που δεν υπάρχει!");
			}
		}
	});
}

document.getElementById("btn6").addEventListener("click",save);

function save(){
	
	while (objects.length) { objects.pop(); }
	for(var i in document.getElementById('museum').childNodes)
		if(i)
		objects.push(document.getElementById('museum').childNodes[i]);
	console.log(objects);
	
}

document.getElementById("btn7").addEventListener("click",load);

function load(){
	for(var i in objects)
		document.getElementById('museum').appendChild(objects[i]);
	
	
	
}

document.getElementById("btn8").addEventListener("click",function(){
	
	var myImage = document.createElementNS(svgNS,"image");	//to create a circle. for rectangle use "rectangle"
	//myImage.setAttributeNS(null,"id","myimage");
    myImage.setAttributeNS(null,"height","10%");
    myImage.setAttributeNS(null,"width","10%");
    myImage.setAttributeNS(xlink,"href","door.png");
	myImage.setAttribute("class","draggable confine");
	console.log(myImage);
	document.getElementById("museum").appendChild(myImage);
	

});

