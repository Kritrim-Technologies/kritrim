var time=0
//PolySynth handles voice creation and allocation for any instruments 
//passed in as the second paramter. PolySynth is not a synthesizer by itself, 
//it merely manages voices of one of the other types of synths, allowing any 
//of the monophonic synthesizers to be polyphonic.
var synth=new Tone.PolySynth().toMaster();
var notes=['C','D','E','F','G','A','B'];
var WHITE_KEYS=['q','w','e','r','t','y','u','i','o','p','[',']',
                'z','x','c','v','b','n','m',',','.','/']
var BLACK_KEYS=['1','2','3','4','5','6','7','8','9','0',,'-','=',
                'a','s','d','f','g','h','j','k','l',';',"'"]           
var blackkeys=[]
var whitekeys=[]
const min_octave=2;
const max_octave=7;

//Draw sliders
var slider_html="";
const n_slider=20
random_slider_value=Array(n_slider).fill().map(() => (50))
for(i=0;i<n_slider;i++){
    slider_html+=`<input type="range" value='${random_slider_value[i]}' class='vranger' id='${'slider'+String(i)}'>`
    
}

var url="{% url 'projects:Unread' %}"
document.getElementById('slider_container').innerHTML=slider_html;

//sliders end


//Draws piano's all keys
var piano_html=""
for(var octave=min_octave;octave<=max_octave;octave++){
    for (var i=0;i<notes.length;i++){
        var hasSharp=true;
        var note=notes[i];
        if(note=='E'||note=='B'){
            hasSharp=false;
        }
        
        whitekeys.push(note+String(octave))
            piano_html+=`<div class='whitenote' onmousedown='noteDown(this,false)' onmouseup='noteUp(this,false)' data-is_sharp='false' id='${note+String(octave)}'>`;
        
        if(hasSharp){
            blackkeys.push(note+'#'+String(octave))
            piano_html+=`<div class='blacknote' onmousedown='noteDown(this,true)' onmouseup='noteUp(this,true)' data-is_sharp='true' id='${note+'#'+String(octave)}'></div></div>`;
        }else
        piano_html+='</div>' ;
    }
  
}
document.getElementById('piano_container').innerHTML=piano_html;


//in case key is pressed
document.addEventListener('keydown',e=>{
  
    var isSharp=true;
    const key=e.key;
    const whiteKeyIndex=WHITE_KEYS.indexOf(key);
    const blackKeyIndex=BLACK_KEYS.indexOf(key);
    if(blackKeyIndex>-1)
    {
        note=blackkeys[blackKeyIndex];
        isSharp=true;
    } 
    else if (whiteKeyIndex>-1) {
        note=whitekeys[whiteKeyIndex];
        isSharp=false;
    }
    
    elem=document.getElementById(note);
    if (elem != null) noteDown(elem,isSharp);
    

})

//in case key is up
document.addEventListener('keyup',e=>{
    isSharp=true;
    const key=e.key;
    const whiteKeyIndex=WHITE_KEYS.indexOf(key);
    const blackKeyIndex=BLACK_KEYS.indexOf(key);
    if (blackKeyIndex>-1){ 
        note=blackkeys[blackKeyIndex];
        isSharp=true;
    }
    else if(whiteKeyIndex>-1){ 
        note=whitekeys[whiteKeyIndex];
        isSharp=false;
    }
    elem=document.getElementById(note);
  
    if (elem != null) noteUp(elem,isSharp);

})
 
//play notes
function noteDown(elem,isSharp){
    //var note=elem.dataset.note;
    var note=elem.id;
    if(note[1]=="#"){
        isSharp=true;
    }
    if(isSharp==true) {
        elem.style.background='black'
    
    }   else {
        elem.style.background='blue'
    
    }    //synth.triggerAttackRelease(note,'16n');
    synth.triggerAttack(note);
    //event.stopPropagation();
}

function noteUp(elem,isSharp){
    var note=elem.id;
    console.log(note)
    if(note[1]=="#"){
        isSharp=true;
    }
    if(isSharp==true){
        elem.style.background='grey';
    }
    else {
        elem.style.background='lightyellow';
    }
    synth.triggerRelease(note);    
}