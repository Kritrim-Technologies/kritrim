var slider=new Array(20);
var slider_value=new Array(20);
for(i=0;i<20;i++){
    slider[i]=document.getElementById('slider'+String(i));
    
    slider[i].addEventListener('mouseup',function(){
        play=false;
        for(j=30;j<112;j++){
            synth.triggerRelease(j)
        }

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
          
        play=true;
    });
}