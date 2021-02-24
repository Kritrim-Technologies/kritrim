let _play=false;
let pause=false;
obj=JSON.parse(data)
play_stop_elem=document.getElementsByClassName('play/stop')
pause_resume_elem=document.getElementsByClassName('pause/resume')
random_song=document.getElementsByClassName('random_song')
random_song[0].addEventListener('click',function(){
    synth.releaseAll()
})
play_stop_elem[0].addEventListener('click',function(){
    if(_play==false){
        playsong();
    }
    _play=!_play;
    pause=false;
});

pause_resume_elem[0].addEventListener('click',function(){
    pause=!pause;
});

function playsong(){
  
    let counter=0
    let var_time=1
    var interval=setInterval(function(){
        var element=obj[counter];
           
        var tick=element.time;
        var note=element.note;
        var velocity=element.velocity;
        
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
        }
        else{  
            noteUp(elem,is_sharp)
            
        }
        if(_play==false){

            noteUp(elem,is_sharp)
            synth.releaseAll()
            clearInterval(interval);
        }    
    },21)
}
    








 

