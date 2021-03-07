let _play=false;
let pause=false;
let counter=0;
let var_time=1;
let prev_var_time=0;
var interval=0
obj=JSON.parse(data)
play_stop_elem=document.getElementsByClassName('play/stop')
pause_resume_elem=document.getElementsByClassName('pause/resume')
random_song=document.getElementsByClassName('random_song')
random_song[0].addEventListener('click',function(){
    synth.releaseAll()
})

function play_stop(){
    
    _play=!_play;
    pause=false;

}

play_stop_elem[0].addEventListener('click',function(){
    if(_play==false){
        playsong();
    }
    play_stop();
});

pause_resume_elem[0].addEventListener('click',function(){
    pause=!pause;
});

function playsong(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.beginPath();
    counter=0;
    var_time=0;
    
    interval=setInterval(function(){
        if(counter>obj.length){
            counter=0;
            var_time=0;
        }else{
            var element=obj[counter];
           
            var tick=element.time;
            var note=element.note;
            var velocity=element.velocity;
            
        }
        
        
        elem=document.getElementById(note);
        is_sharp=(elem.dataset.is_sharp);
        
        if(pause==false){    
            if(tick<=var_time){
                counter++;
                if(velocity==0){
                    noteUp(elem,is_sharp)
                }
                else{
                    noteDown(elem,is_sharp)
                }
            }

            if(counter>=obj.length){
                counter=0
                var_time=0
            }
            var_time+=20;  
            console.log(note) 
            
        }
        else{  
            synth.releaseAll();
            noteUp(elem,is_sharp)
            
        }
        ctx.rect(var_time/40, (Tone.Frequency(note).toMidi()-30)*2 ,0.5,2)
        ctx.fill()
        if(_play==false){

            noteUp(elem,is_sharp)
            synth.releaseAll()
            clearInterval(interval);
        }    
    },21)
}
    








 

