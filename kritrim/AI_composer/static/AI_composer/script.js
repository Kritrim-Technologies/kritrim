var time=0
var synth=new Tone.PolySynth().toMaster();
var html="";
var notes=['C','D','E','F','G','A','B'];
var WHITE_KEYS=['q','w','e','r','t','y','u','i','o','p','[',']',
                'z','x','c','v','b','n','m',',','.','/']
var BLACK_KEYS=['1','2','3','4','5','6','7','8','9','0',,'-','=',
                'a','s','d','f','g','h','j','k','l',';',"'"]
console.log("hello world")               
var blackkeys=[]
var whitekeys=[]
//var hasSharp=true
for(var octave=2;octave<=7;octave++){
    for (var i=0;i<notes.length;i++){
        
        var hasSharp=true;
        var note=notes[i];
        if(note=='E'||note=='B'){
            hasSharp=false;
        }
        whitekeys.push(note+String(octave))
      
        html+=`<div class='whitenote' onmousedown='noteDown(this,false)' onmouseup='noteUp(this,false)' data-is_sharp='false' id='${note+String(octave)}'>`;
        if(hasSharp){
            blackkeys.push(note+'#'+String(octave))
            html+=`<div class='blacknote' onmousedown='noteDown(this,true)' onmouseup='noteUp(this,true)' data-is_sharp='true' id='${note+'#'+String(octave)}'></div></div>`;
        }
        html+='</div>' ;
    }
  
}
document.getElementById('container').innerHTML=html;


document.addEventListener('keydown',e=>{
    console.log("key down");
    var isSharp=true;
    const key=e.key;
    const whiteKeyIndex=WHITE_KEYS.indexOf(key);
    const blackKeyIndex=BLACK_KEYS.indexOf(key);
    if (whiteKeyIndex>-1) {
        note=whitekeys[whiteKeyIndex];
        isSharp=false;
    }
    
    if(blackKeyIndex>-1)
    {
        note=blackkeys[blackKeyIndex];
        isSharp=true;
    } 
    
    elem=document.getElementById(note);
    if (elem != null) noteDown(elem,isSharp);
    

})


document.addEventListener('keyup',e=>{
    isSharp=true;
    const key=e.key;
    const whiteKeyIndex=WHITE_KEYS.indexOf(key);
    const blackKeyIndex=BLACK_KEYS.indexOf(key);
    if (whiteKeyIndex>-1){ 
        note=whitekeys[whiteKeyIndex];
        isSharp=false;
    }
    if(blackKeyIndex>-1){ 
        note=blackkeys[blackKeyIndex];
        isSharp=true;
    }
    elem=document.getElementById(note);
    console.log(elem)
    if (elem != null) noteUp(elem,isSharp);

})

var var_time=1
var counter=1
  




/*
obj.forEach(element => {
    sam=false
    elem=document.getElementById(element.note);
    setTimeout(
        function(){
            

    },element.time);
}); 
    
        
*/
 
function noteDown(elem,isSharp){
    //var note=elem.dataset.note;
    var note=elem.id;
    if(isSharp==true) {
        elem.style.background='black'
    
    }   else {
        elem.style.background='#ccc'
    
    }    //synth.triggerAttackRelease(note,'16n');
    synth.triggerAttack(note);
    //event.stopPropagation();
}

function noteUp(elem,isSharp){
    var note=elem.id;
    if(isSharp==true){
        elem.style.background='grey';
    }
    else {
        elem.style.background='white';
    }
    synth.triggerRelease(note);    
}






