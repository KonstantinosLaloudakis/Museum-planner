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
var previous_peopleNum=0;
var path_id=0;
var boundaryX1 = 7;
var boundaryX2 = 95;
var boundaryY1 = 7;
var boundaryY2 = 45;
const museum = document.querySelector("#museum");
var numDoors=0;
var numWalls=0;
var obstacles;
var grid;
var gridBackup;
var first_time=0;
var visiting_map;
var first_time_visitor=0;
var stop_movement_error=false;

var svgNS = "http://www.w3.org/2000/svg"; 
var xlink= "http://www.w3.org/1999/xlink";




const museumPoint = (elem, x, y) => {
  let p = museum.createSVGPoint();
  p.x = x;
  p.y = y;
  return p.matrixTransform(elem.getScreenCTM().inverse());
}


function create_obstacles_array(){
	obstacles=new Array(50);
	visiting_map=new Array(50);
	for( var i=0; i < 50 ; i++){
			visiting_map[i]=new Array(100);
            obstacles[i] = new Array(100);

            for( var j=0;j< 100 ;j++){
                obstacles[i][j] = 0;
				visiting_map[i][j]=0;
			}
	}
}
//onclick function of the 1st button (image)
//type determines the size of the image

function createImage(type){
	if(flag){
		museum.addEventListener("click",function _listener(event){
			var myImage = document.createElementNS(svgNS,"image");
			var start= museumPoint(museum,event.clientX,event.clientY);
			if(type=="small"){
				myImage.setAttributeNS(null,"height","5");
				myImage.setAttributeNS(null,"width","3");
				myImage.setAttributeNS(xlink,"href","../images/small.png");
			}
			else if(type=="medium"){
				myImage.setAttributeNS(null,"height","8");
				myImage.setAttributeNS(null,"width","4");
				myImage.setAttributeNS(xlink,"href","../images/sparta.png");
			}
			else if(type=="large"){
				myImage.setAttributeNS(null,"height","10");
				myImage.setAttributeNS(null,"width","10");
				myImage.setAttributeNS(xlink,"href","../images/europi.jpeg");
			}
			else{
				alert("Something wrong happened");
			}
			numImages++;
			var title=document.createElementNS(svgNS,"title");
			var titletext  = document.createTextNode("Exhibit "+numImages);
			title.appendChild(titletext);
			myImage.appendChild(title);
			myImage.setAttributeNS(null,"id","img"+numImages);
			myImage.setAttributeNS(null,"x",start.x-(((parseInt(myImage.getAttributeNS(null,"width"))/100)*100)/2));
			myImage.setAttributeNS(null,"y",start.y-(((parseInt(myImage.getAttributeNS(null,"height"))/100)*50)/2));
			myImage.setAttribute("class","draggable confine");
			document.getElementById("museum").appendChild(myImage);
			museum.removeEventListener("click",_listener,true);
			//console.log(myImage);
		},true);
	}
	else{
		alert("Ρε την παλεύεις; Πως θα βάλεις εκθέματα χωρίς να έχεις μουσείο;");
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
						line.setAttributeNS(null,"id","wall"+numWalls);
						line.setAttribute("class","draggable");
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
		numWalls++;
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



//load all previous saved objects from user's json file
function load(name,filename,array=null){
	var success = false;
	
	$.getJSON("../json/"+name+"/"+ filename+".json",function(data){
		success=true;
		museum.innerHTML=data;
		FindTotalImages();
	
	});
	
	setTimeout(function() {
		if (!success)
		{
			// Handle error accordingly
			alert("There isn't any saved template");
			window.location.href="../php_files/welcome.php";
		}
	},1000);
	
}
//updates the numImages variable with the number of images inside the museum
function FindTotalImages(){
	let images=[];
	images=museum.getElementsByTagNameNS(svgNS,"image");
	numImages=images.length;
}


//onclick function of the door button
function createDoor(type){
	if(flag){
		if(!buttonPressed){
			let aa=true;
			buttonPressed=true;
			museum.addEventListener("click",function _listener(event){
			
		var line =document.createElementNS(svgNS,"line");
				var start= museumPoint(museum,event.clientX,event.clientY);
				
				
					//console.log("1");
					//console.log(start.x,start.y);
					if(checkCoords(start.x,start.y)){
						
					//console.log("2");
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
				line.setAttributeNS(null,"id","door"+numDoors);
				line.setAttribute("class","draggable");
				document.getElementById("museum").appendChild(line);
				numDoors++;
				museum.removeEventListener("click",_listener,true);
					
				
				buttonPressed=false;
				}
				}
				
				else{
					//console.log(checkCoords(start.x,start.y));
					//console.log("3");
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
//check if this set of coords belongs to a rect(room) or polyline(museum)
function checkCoords(x,y){
	var returnVal=false;
	var element=museum.getElementsByTagNameNS(svgNS,"polyline");
	var rects=museum.getElementsByTagNameNS(svgNS,"rect");
	let point = museum.createSVGPoint();
	point.x=x;
	point.y=y;
	//console.log(rects);
	for(i=0;i<rects.length;i++){
		returnVal=returnVal || rects[i].isPointInStroke(point);
	}
	returnVal=returnVal || element[0].isPointInStroke(point);
	return returnVal;
	
}
//save all the elements inside the viewbox in a json file
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
		  //console.log(name);
		  //console.log(response);
      //get response from your php page (what you echo or print)
        if(response =='True'){
			alert(name +" already exists");
			return;
		}
		else{
				var museum = document.getElementById("museum");
	tempDiv = document.createElement("div");
	tempDiv=museum.cloneNode(true);
	var svgText = tempDiv.innerHTML;
	jsonString = JSON.stringify(svgText);
	console.log(museum);
	var xhr = new XMLHttpRequest();
	

		
	xhr.open("POST","save_json.php",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var data=''+ "json=" + jsonString + "&name="+name +"&loaded=" + loaded;
	xhr.send(data);
	//console.log(data);
	alert(name + " saved successfully!!")
	
		}
      }
    });
	}
	
	
	
}


function load_initializer(){
	flag=true;
	box=false;
	
}

//creates a route based on parameters given by the user
//array represents the path that each user takes
//peopleNum represents the number of people that enter the museum at the same time and have the same path
function createAnimation(array,peopleNum,visitor_category){
	//console.log(visitor_category);
	var point=museum.createSVGPoint();
	var path="";
	var time;
	point=findDoor();
	var myImage=[];
	let svg = document.getElementById("museum");
	if(first_time){
		if(svg.getCurrentTime() > 0)
			time=svg.getCurrentTime();

	}
	else{
		svg.setCurrentTime(0);
		time=0;
	}
	first_time=1;	
	for( var i=0;i<peopleNum;i++){
			myImage[i] = document.createElementNS(svgNS,"circle");
			//myImage[i].setAttributeNS(null,"height","10%");
			//myImage[i].setAttributeNS(null,"width","10%");
			myImage[i].setAttributeNS(null,"cx",point.x);
			myImage[i].setAttributeNS(null,"cy",point.y);
			myImage[i].setAttributeNS(null,"r","0.3");
			myImage[i].setAttributeNS(null,"opacity","1");
			myImage[i].setAttribute("class","confine");
			myImage[i].setAttributeNS(null,"fill","none");
			switch(parseInt(visitor_category)){
				case 1:
						myImage[i].setAttributeNS(null,"stroke","green");
						break;
				
				case 2:
						myImage[i].setAttributeNS(null,"stroke","red");
						break;
				
				case 3:
						myImage[i].setAttributeNS(null,"stroke","blue");
						break;
				
			}
			
			myImage[i].setAttributeNS(null,"stroke-width","1");
			var title=document.createElementNS(svgNS,"title");
			var titletext  = document.createTextNode("Visitor "+i);
			title.appendChild(titletext);
			myImage[i].appendChild(title);
			if(!first_time_visitor){
				initialize_obstacles();
				first_time_visitor=1;
			}
			
			grid=new PF.Grid(100,50,obstacles);
			//console.log(obstacles);
			if(path==""){
				path="M ";
				var temp_path=ftiaksepath(array,parseInt(myImage[i].getAttributeNS(null,"cx")),parseInt(myImage[i].getAttributeNS(null,"cy")));
				if(temp_path==false){
					break;
				}
				console.log(temp_path);
				path+=temp_path;
				path+=" z";
			}
			var mpath=document.createElementNS(svgNS,"path");
			mpath.setAttributeNS(null,"d",path);
			mpath.setAttributeNS(null,"fill","none");
			mpath.setAttributeNS(null,"id","theMotionPath"+path_id+ visitor_category);
			
			var ani = document.createElementNS(svgNS,"animateMotion");
			ani.setAttributeNS(null,"dur", "30s");
			ani.setAttributeNS(null,"repeatCount", "1");
			ani.setAttributeNS(null,"begin",(i+time)+'s');
			
			
			var anim_end=document.createElementNS(svgNS,"animate");
			anim_end.setAttributeNS(null,"attributeName","opacity");
			anim_end.setAttributeNS(null,"dur","1");
			anim_end.setAttributeNS(null,"begin",(i+time+30)+'s');
			anim_end.setAttributeNS(null,"fill","freeze");
			anim_end.setAttributeNS(null,"from","1");
			anim_end.setAttributeNS(null,"to","0");
			anim_end.setAttributeNS(null,"repeatCount","0");
			var mpathObj=document.createElementNS(svgNS,"mpath");
			mpathObj.setAttribute("href","#theMotionPath"+path_id+ visitor_category);
			ani.appendChild(mpathObj)
			myImage[i].appendChild(ani);
			myImage[i].appendChild(anim_end);
			//document.getElementById("museum").appendChild(myImage[i]);
			document.getElementById("museum").appendChild(mpath);
			//console.log(visiting_map);
	}
	if(!stop_movement_error){
	for(var i=0;i<peopleNum;i++){
		document.getElementById("museum").appendChild(myImage[i]);
	}
	}
	previous_peopleNum=peopleNum;
	path_id++;
	
	
}

function initialize_obstacles(){
	create_obstacles_array();
	var walls=[];
	var door=[];
	var polyline=museum.getElementsByTagNameNS(svgNS,"polyline");
	//console.log(polyline);
	var walls_and_door=museum.getElementsByTagNameNS(svgNS,"line");
	for(i=0;i<walls_and_door.length;i++){
		var id=walls_and_door[i].getAttributeNS(null,"id");
		if(id.includes("wall")){
			walls.push(walls_and_door[i]);
		}
		else{
			door.push(walls_and_door[i]);
		}
	}
	//console.log(walls);
	for(var i in walls){
		var x1=parseInt(walls[i].getAttributeNS(null,"x1"));
		var x2=parseInt(walls[i].getAttributeNS(null,"x2"));
		var y1=parseInt(walls[i].getAttributeNS(null,"y1"));
		var y2=parseInt(walls[i].getAttributeNS(null,"y2"));
		add_obstacle(x1,y1,x2,y2);
		////console.log("1");
	}
	points=polyline[0].points;
	for(var k=0;k<points.length-1;k++){
		//console.log(points[k+1].x);
		add_obstacle(points[k].x,points[k].y,points[k+1].x,points[k+1].y,door,true);
	}
	
	add_image_as_obstacle();
	//console.log(obstacles);
	
	
	
}
function add_image_as_obstacle(){
	var img_obstacles=museum.getElementsByTagNameNS(svgNS,"image");
	//console.log(img_obstacles[0].getAttributeNS(null,"x"));
	//console.log(img_obstacles);
	for(var img=0;img<img_obstacles.length;img++){
			console.log(img_obstacles[img].transform);
			var image_x=parseInt(img_obstacles[img].getAttributeNS(null,"x"));
			var image_y=parseInt(img_obstacles[img].getAttributeNS(null,"y"));
			if(img_obstacles[img].transform.baseVal.length!=0){
				transform_x=parseInt(img_obstacles[img].transform.baseVal[0].matrix.e);
				transform_y=parseInt(img_obstacles[img].transform.baseVal[0].matrix.f);
				image_x+=transform_x;
				image_y+=transform_y;
			
			}
			//transform_y=parseInt(img_obstacles[img].transform.baseVal[0].matrix.f);
			var image_width=parseInt(img_obstacles[img].getAttributeNS(null,"width"));
			var image_height=parseInt(img_obstacles[img].getAttributeNS(null,"height"));
			for( var j=image_x; j<image_x+image_width;j++) {
					for( var k=image_y; k<image_y+image_height;k++){
						
						obstacles[k][j]=1;
						
					}
			}
			obstacles[image_y][image_x]=0;
	}
	
}
function add_obstacle(x1,y1,x2,y2,door,polyline=false){
	var temp;
	if(x1>x2){
		temp=x1;
		x1=x2;
		x2=temp;
	}
	if(y1>y2){
		temp=y1;
		y1=y2;
		y2=temp;
	}
	
	for(k=y1-1;k<=y2+1;k++){
		for(l=x1-1;l<=x2+1;l++){
			obstacles[k][l]=1;
		}
	
	}
	if(polyline){
		//console.log(door);
		var x1=parseInt(door[0].getAttributeNS(null,"x1"));
		var x2=parseInt(door[0].getAttributeNS(null,"x2"));
		var y1=parseInt(door[0].getAttributeNS(null,"y1"));
		var y2=parseInt(door[0].getAttributeNS(null,"y2"));
		if(x1==x2){
			if(x1<10){
				for(var j=y1;j<=y2;j++){
				for(i=0;i<5;i++){
						obstacles[j][x1+i]=0;
						obstacles[j][x2+i]=0;
				}
				}
			}
			else{
				for(var j=y1;j<=y2;j++){
				for(i=0;i<5;i++){
						obstacles[j][x1-i]=0;
						obstacles[j][x2-i]=0;
				}
				}
			}
		}
		else if(y1==y2){
			if(y1<10){
				for(var j=x1;j<=x2;j++){
				for(i=0;i<5;i++){
						obstacles[y1+i][j]=0;
						obstacles[y1+i][j]=0;
				}
				}
			}
			else{
				for(var j=x1;j<=x2;j++){
				for(i=0;i<5;i++){
						obstacles[y1-i][j]=0;
						obstacles[y1-i][j]=0;
				}
				}
			}
			
		}
		
	}
	
	
}
//this function deletes persons, who have already finished their animation
function removePeople(){
	var objects=museum.getElementsByTagNameNS(svgNS,"circle");
	//console.log(objects.length);
	for(var object=0;object<objects.length;){
		//console.log("11111111111111111"+" "+object);
		var person=objects[0];
		//console.log(person);
		var parent=person.parentNode;
		parent.removeChild(person);
	}
	
}
//this function creates the specific path for each animation
function createPath(x,y,array){
	var point=museum.createSVGPoint();
	var path=" ";
	var prev_x=0;
	var prev_y=0;
	var img=museum.getElementsByTagNameNS(svgNS,"image");
		for(var i in array){
			if(array[i]==",")
				continue;
			
			
			point.x=parseInt(img[array[i]-1].getAttributeNS(null,"cx"));
			point.x-=x;
			point.x=Math.floor(point.x);
			point.y=parseInt(img[array[i]-1].getAttributeNS(null,"cy"));
			point.y-=y;
			point.y=Math.floor(point.y);
			while(1){
				if(prev_x==point.x && prev_y==point.y){
					break;
				}
				if(prev_x<point.x){
					prev_x++;
				}
				else if(prev_x>point.x){
					prev_x--;
				}
				
				if(prev_y<point.y){
					prev_y++
				}
				else if(prev_y>point.y){
					prev_y--;
				}
				
				
				path+=check_for_obstacles(prev_x,prev_y,x,y); 
				
				//console.log(path);
			}
			//console.log("kati");
			path+=point.x +',' + point.y +" ";
			prev_x=point.x;
			prev_y=point.y;
		
	}
	return path;
}

function ftiaksepath(array,x,y){
	var return_path="";
	var random_num;
	var finder;
	var path1=[];
	var point_x=0;
	var point_y=0;
	var prev_x=x;
	var prev_y=y;
	var home_x=prev_x;
	var home_y=prev_y;
	//console.log(museum);
	var img=museum.getElementsByTagNameNS(svgNS,"image");
	console.log(img);
	random_num=Math.floor(Math.random() * 3);  // random numbers 0-2
	switch(random_num){
		case 0:
			finder = new PF.DijkstraFinder({
				allowDiagonal: true,
				dontCrossCorners: true
			});
			//console.log("Dijkstra");
			break;
		case 1:
			finder = new PF.AStarFinder({
				allowDiagonal: true,
				dontCrossCorners: true
			});
			//console.log("A*");
			break;
		case 2:
			finder=new PF.BreadthFirstFinder({
				allowDiagonal: true,
				dontCrossCorners: true
			});
			//console.log("BFS");
			break;
		
		
	
	}
	//console.log(finder);
	//console.log(random_num);
	gridBackup=grid.clone();
	//allaxe onoma
	array=array.split(",");
		for(var i in array){
			if(array[i]==","){
				//console.log("Den doulepse to malakismeno");	
				continue;
			}
					
			point_x=parseInt(img[array[i]-1].getAttributeNS(null,"x"));
			point_y=parseInt(img[array[i]-1].getAttributeNS(null,"y"));
			
			if(img[array[i]-1].transform.baseVal.length!=0){
			
				transform_x=parseInt(img[array[i]-1].transform.baseVal[0].matrix.e);
				point_x+=transform_x;
				//console.log("To x einai"+point_x);
				transform_y=parseInt(img[array[i]-1].transform.baseVal[0].matrix.f);
				point_y+=transform_y;
				
			}
			//console.log("To y einai"+ point_y);
			
			//console.log((prev_y)+"," +(prev_x)+", "+point_x+", "+point_y);
			
			//console.log("kiallo path");
			
			path1 = finder.findPath((prev_x), (prev_y), point_x, point_y, grid.clone());
			console.log(path1);
			if(path1.length==0){
				alert("Path not found. Possible conflict between exhibit and wall.Head back to load museum in order to fix this");
				stop_movement_error=true;
				return false;
			}
			//console.log(path1);
			for(k=0;k<path1.length;k++){
				//console.log("1");
				visiting_map[path1[k][1]][path1[k][0]]+=1;
				return_path+=(path1[k][0]-x)+","+(path1[k][1]-y)+" ";
			}
			//console.log(return_path +"//////"+i);
			prev_x=point_x;
			prev_y=point_y;
			//console.log("/////"+i+"//"+prev_x+","+prev_y);
			grid=gridBackup;
		}
		path1 = finder.findPath((prev_x), (prev_y), home_x, home_y, grid.clone());
			//console.log(path1);
			for(k=0;k<path1.length;k++){
				visiting_map[path1[k][1]][path1[k][0]]+=1;
				//console.log("visiting map"+visiting_map[path1[k][1]][path1[k][0]]);
				return_path+=(path1[k][0]-x)+","+(path1[k][1]-y)+" ";
			}
		return return_path;
}

function check_for_obstacles(x,y,offset_x,offset_y){
	//console.log((x+offset_x)+","+(y+offset_y));
	if(obstacles[y+offset_y][x+offset_x]==1){
		//console.log("toixos");
		return x+',' + (y)+" ";
	}
	else{
		////console.log("lathos");
		return x+','+y+" ";
	}
}

//with this function we can find the door coordinates, so that people can start their animation from there
function findDoor(){
	var point = museum.createSVGPoint();
	var doors=[];
	var element=museum.getElementsByTagNameNS(svgNS,"polyline");
	var doors_and_walls=museum.getElementsByTagNameNS(svgNS,"line");
	for(i=0;i<doors_and_walls.length;i++){
		var id=doors_and_walls[i].getAttributeNS(null,"id");
		if(id.includes("door")){
			doors.push(doors_and_walls[i]);
		}
			
	}
	
	for(i=0;i<doors.length;i++){
		point.x=parseFloat(doors[i].getAttributeNS(null,"x1"));
		point.y=parseFloat(doors[i].getAttributeNS(null,"y1"));
		point.x2=parseFloat(doors[i].getAttributeNS(null,"x2"));
		point.y2=parseFloat(doors[i].getAttributeNS(null,"y2"));
		if(element[0].isPointInStroke(point)){
			if(point.y===point.y2){
				point.x+=5;
			}
			else if(point.x===point.x2){
				point.y+=5;
			}
			return point; 
		}
	}
	
}
//save all data given to form in a database for further usage
function storeData(){
	var ajaxRequest;  // The variable that makes Ajax possible!
               
               try {
                  // Opera 8.0+, Firefox, Safari
                  ajaxRequest = new XMLHttpRequest();
               }catch (e) {
                  // Internet Explorer Browsers
                  try {
                     ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
                  }catch (e) {
                     try{
                        ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                     }catch (e){
                        // Something went wrong
                        alert("Your browser broke!");
                        return false;
                     }
                  }
               }
               
               // Create a function that will receive data 
               // sent from the server and will update
               // div section in the same page.
					
               
               
               // Now get the value from user and pass it to
               // server script.
				
               var path = document.getElementById('numb').value;
			   let temp_array=path.split(',');
				for(var temp=0; temp<temp_array.length;temp++){
					console.log(temp_array[temp]);
					if(temp_array[temp]>numImages){
						
						alert("Wrong image number");
						return;
					}
					if(temp_array[temp]==""){
						alert("Expected format: exhibit_no,exhibit_no,...");
						return;
					}
				}
               var quantity = document.getElementById('quantity').value;
			   var museum_name=document.getElementById('name').value;
			   var visitor_category=document.querySelector('input[name="ColorRadios"]:checked').value;
               var queryString = "?path=" + path ;
            
               queryString +=  "&quantity=" + quantity +"&museum_name=" + museum_name ;
               ajaxRequest.open("GET", "storedata.php" + queryString, true);
               ajaxRequest.send(null); 
			   createAnimation(path,quantity,visitor_category);
}
	


//document.getElementById("heatmap").addEventListener("click", createHeatmap);

function createHeatmap(){
	var max=0;
	var config= {
		container: document.getElementById("heatmap_svg"),
		radius: 36.6,
		maxOpacity: 1,
		minOpacity: 0,
		blur: .45,
		backgroundColor: 'rgba(0,0,0,.1)',
		gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"}
  			
	};
	
	var heatmapInstance=h337.create(config);
	var x=document.getElementById("heatmap_svg");
	var div_x=x.offsetWidth;
	var div_y=x.offsetHeight;
	//console.log(div_x+", "+div_y);
	var y=document.getElementById("museum");
	//console.log(y);
	
	
	
	var data_x=div_x-y.clientWidth;
	var data_y=div_y-y.clientHeight;
	//console.log("oooo"+data_x+", "+ data_y);
	var polyline=museum.getElementsByTagNameNS(svgNS,"polyline");
	let box=y.getBBox();
	//console.log('client',box);
	var pol_points=polyline[0].points;
	//console.log(pol_points[0].x+",,,"+pol_points[0].y);
	var mp=museumPoint(museum,pol_points[0].x,pol_points[0].y);
	//console.log(mp.x+"..."+mp.y);
	var a_x=y.clientWidth/100;
	var a_y=y.clientHeight/50;
	//console.log("iiiiiii"+a_x+", "+a_y);
	//console.log("aaaaa"+(data_x+(3*a_x))+", "+(data_y+(3*a_y)));
	heatmapInstance.setDataMax(2);
	heatmapInstance.setDataMin(0);
	var datapoints=[];
	for(var i=0;i<50;i++){
		for(var j=0;j<100;j++){
			//console.log(i+"+++"+j+"++++"+visiting_map[i][j]);
			if(visiting_map[i][j]>max){
				max=visiting_map[i][j];
			}
			var dataPoint={
				x:parseInt((data_x/2)+(j*a_x)),
				y:parseInt((data_y)+(i*a_y)),
				value:visiting_map[i][j]
			};
			datapoints.push(dataPoint);
			
		}
		
	}
	
	var data={
		max:max,
		min:1,
		data: datapoints
		
	};
	heatmapInstance.setData(data);
	//console.log(datapoints);
	var current_data=heatmapInstance.getData();
	//console.log(current_data);
	//console.log(museum);
	
	
}

function save_heatmap(){
var name = prompt("Please enter a name for the file:", "Sergio Araujo");
  if (name == null || name == "") {
    alert("User cancelled the prompt.");
  } else {
    alert("Download file to local storage");
  }
  

	var node = document.getElementById('heatmap_svg');

domtoimage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        //document.body.appendChild(img);
		
		 var link = document.createElement('a');
        link.download = name + '.png';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}

//------------------------------------------------


//makes all objects inside the viebox draggable
function makeDraggable(evt) {
  var svg = evt.target;
  var dragx;
  var dragy;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  function startDrag(evt) {
	  //if there is a button pressed don't drag the object
	if(!button2Clicked && !button4Clicked){
		  
		//constrain the movement of the objects inside the viewbox
		
		if (evt.target.classList.contains('draggable')) {
			selectedElement = evt.target;
			offset = getMousePosition(evt);
			//console.log(selectedElement.transform.baseVal[0].matrix.e);
   
			var transforms = selectedElement.transform.baseVal;
			console.log(transforms);
			// Ensure the first transform is a translate transform
			if (transforms.length === 0  ||transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
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
		
			confined = evt.target.classList.contains('confine');
		if (confined) {
			bbox = evt.target.getBBox();
			minX = boundaryX1 - bbox.x;
			maxX = boundaryX2 - bbox.x - bbox.width;
			minY = boundaryY1 - bbox.y;
			maxY = boundaryY2 - bbox.y - bbox.height;
		}
		
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
	  if(selectedElement){
			selectedElement = false;
			
		}
  }
  

    function getMousePosition(evt) {
      var CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
}