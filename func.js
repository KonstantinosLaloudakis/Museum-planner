var selectedElement,offset, transform;
var button2Clicked=false;
var button4Clicked=false;
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
	
	var myImage = document.createElementNS(svgNS,"image"); //to create a circle. for rectangle use "rectangle"
    myImage.setAttributeNS(null,"id","myimage");
    myImage.setAttributeNS(null,"height","10%");
    myImage.setAttributeNS(null,"width","10%");
    myImage.setAttributeNS(xlink,"href","sparta.png");
	myImage.setAttribute("class","draggable");
	document.getElementById("museum").appendChild(myImage);
	

});
document.getElementById("btn2").addEventListener("click", createRect);


	
	function createRect(){
		console.log("rect");
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
				rect.setAttribute("class","draggable");
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
    myPolyline.setAttributeNS(null,"id","mypolyline");
    myPolyline.setAttributeNS(null,"points","0,0 0,60 90,60 90,0 0,0");
    myPolyline.setAttributeNS(null,"width",5);
    myPolyline.setAttributeNS(null,"height",5);
    myPolyline.setAttributeNS(null,"fill","transparent");
    myPolyline.setAttributeNS(null,"stroke","black");
	myPolyline.setAttribute("class","draggable");
	console.log(myPolyline);
    museum.appendChild(myPolyline);
});

document.getElementById("btn4").addEventListener("click", createLine);

function createLine(){
		console.log("line");
		button4Clicked=true;
	
	
	museum.addEventListener("mousedown",(event) =>{
	
		if(button4Clicked){
			button4Clicked=false;
			var line =document.createElementNS(svgNS,"line");
			var start= museumPoint(museum,event.clientX,event.clientY);
			const drawLine= (e) =>{
				
				console.log("it's a line");
				let p= museumPoint(museum,e.clientX,e.clientY);
				line.setAttributeNS(null,'id','line');
				line.setAttributeNS(null, 'x1', start.x);
				line.setAttributeNS(null, 'y1', start.y);
				line.setAttributeNS(null, 'x2', p.x);
				line.setAttributeNS(null, 'y2', p.y);
				line.setAttributeNS(null,"stroke","black");
				line.setAttribute("class","draggable");
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
  	if (evt.target.classList.contains('draggable')) {
		selectedElement = evt.target;
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
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
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

