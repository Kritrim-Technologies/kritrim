/**$(document).ready(function(){
    var ctx = document.getElementById('grid').getContext('2d');
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.beginPath();    
    for (var x = 0, i = 0; i < 768; x+=1, i++) {
        for (var y = 0, j=0; j < 144; y+=1.5, j++) {            
            ctx.rect (x, y, 1, 1.5);
        }
    }
    ctx.fill();
    ctx.closePath();
});**/
var c = document.getElementById("grid");
var ctx = c.getContext("2d");
ctx.fillStyle = "rgb(200,0,0)";
    ctx.beginPath();    
