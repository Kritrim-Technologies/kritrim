/*
let limit={
    min:127,
    max:0
}
let count=0
let timer=0
let index=0
m=0;
var x=new Array();
var y=new Array();
var z=new Array(128).fill(0);
var trace=new Array();
var k=0
var min_note=0
var max_note=0
for (var i=0;i<96*16;i++){
    var element=obj[count];    
    var tick=element.time;
    var note=element.note_num;
    var velocity=element.velocity;
    
    elem=document.getElementById(note);
   

    
    if(tick<=i*20){
        index=i%96
        count++;
        if(velocity==0){
            z[note]=0
           
        }
        else{
            x[k]=index
            y[k]=note;
        }
    }

    for(var j=0;j<z.length;j++){
        if(z[j]==1){
            x[k]=index;
            
            k++;
            if(j<limit.min) limit.min=j;
            if(j>limit.max) limit.max=j;
        }
    }
    if((i)%96==0){
        
        trace[m] = {
            x: x,
            y: y
        };
        m++;
        x=[];
        y=[];
        k=0;
        z.fill(0);      
    }

    
}


var columns=10;
var rows=10;
function setup(){
    createCanvas(300,300);
}

function draw(){
    
    for(var i=0;i<trace[0].x.length;i++){
        for(var j=0;j<trace[0].y.length;j++){
            
            var a=trace[0].x[i]*5;
            
            var b=trace[0].y[j]*5-limit.min*5;
            
            stroke(0);
            fill(255,120,0);
            rect(a,b,5,5)
        }
    }
}



*/