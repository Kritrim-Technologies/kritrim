var slider=new Array(20);
var slider_value=new Array(20);
for(i=0;i<20;i++){
    slider[i]=document.getElementById('slider'+String(i));
    
    slider[i].addEventListener('mouseup',function(){
       
        clearInterval(interval)
        synth.releaseAll()
        
        $.ajax({
            url: '/application/',
            data: {
                'position':parseInt(this.id.replace( /^\D+/g, '')),
                'value':this.value
            },
            dataType: 'json',
            success: function (da) {
                obj=da.data
            }
            
            });
        
         
              
            setTimeout(() => {  playsong(); }, 500);
          
          
 
       
       
    });
}