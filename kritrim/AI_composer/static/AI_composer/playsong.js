let _play=true;
let pause=false;
obj=JSON.parse(data)
console.log(obj)
document.getElementById('play/stop').addEventListener('click',function(){if(_play==false){playsong();}_play=!_play;pause=false;});
document.getElementById('pause/resume').addEventListener('click',function(){pause=!pause;});

function playsong(){
  
    let counter=0
    let var_time=1
    var interval=setInterval(function(){
        var element=obj[counter];    
        var tick=element.time;
        var note=element.note;
        var velocity=element.velocity;
        console.log(velocity);
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
            console.log("Entered");
            synth.releaseAll()
        }
        if(_play==false){

            noteUp(elem,is_sharp)
            console.log("Entered stop")
            synth.releaseAll()
            clearInterval(interval);
        }    
    },21)
}
    








 

