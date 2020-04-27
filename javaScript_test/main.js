

function myMouseover(){
    var elem = document.getElementById("myTooltip");
    var h = 0;
    var id = setInterval(frame, 1);
    function frame(){
    if(h == 150){
    clearInterval(id); 
    } else {
      h++;
      elem.style.width = h + "px";
      elem.style.fontSize = 2 + "rem";
      elem.style.opacity = 0.5;
    }
    }   
}
function myMouseout(){
var elem = document.getElementById("myTooltip");
var h = 150;

var id = setInterval(frame, 1);
function frame(){
if(h == 0){
clearInterval(id); 
} else {
  h--;
  elem.style.width = h + "px";
}
}

}