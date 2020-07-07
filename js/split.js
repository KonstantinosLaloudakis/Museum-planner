function ArraySplit(name,quantity) {
  var x;
  var PeopleNum=document.getElementById('quantity').value;
  x = document.getElementById("numb").value;
  window.localStorage.setItem("array",x);
  window.localStorage.setItem("peopleNum",PeopleNum);
  window.location.href="http://localhost/php_files/animate.php?name="+name;
}