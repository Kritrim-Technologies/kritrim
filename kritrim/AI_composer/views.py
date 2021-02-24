from django.shortcuts import render
import random
from django.core.files.storage import FileSystemStorage
#from django.views.generic import View
from python_scripts.getJSON import getJSON,samples_to_midi
import numpy as np
import tensorflow as tf
from keras.layers import Lambda,Input,InputLayer, Dense, Activation, Dropout, Flatten, Reshape,ActivityRegularization, TimeDistributed 
from keras.models import load_model,Model
from mido import MidiFile,MidiTrack,Message

from tensorflow import Graph,Session
from django.http import JsonResponse

input=np.zeros((1,100))
model_graph=Graph()
with model_graph.as_default():
    tf_session=Session()
    with tf_session.as_default():

        model=load_model('model/dec.h5')
        x_vecs=np.load('model/input (1).npy')
        print(x_vecs.shape)




    

def home(request):
    return render(request,'AI_composer/home.html')

def about(request):
    return render(request,'AI_composer/about.html')


 
def music_composer(request):
    
    i=random.randrange(10)
    
    with model_graph.as_default():
        with tf_session.as_default():
            song=model.predict(x_vecs[i:i+1])[0]
    data=np.zeros((16,96,96))
    data[:,:,30:65]=song
    
    mid=samples_to_midi(data,str(i)+'.mid',16,0.1)
    
    data=getJSON(mid)
    context={'data':(data)}
  
    if(request.GET):
        print("GET")
        position = int(request.GET.get('position', None))
        value= float(request.GET.get('value', None))
        
        with model_graph.as_default():
            with tf_session.as_default():
                x_vecs[i:i+1,position]=value/100
                song=model.predict(x_vecs[i:i+1])[0]
        data=np.zeros((16,96,96))
        data[:,:,30:65]=song
        if(position==0):
            print(value/100)
            mid=samples_to_midi(data,str(i)+'.mid',16,0.1)
        
        
        
        data=getJSON(mid)
        context={'data':(data)}
        return JsonResponse(context)

    #data=getJSON('media/ye.midi')
    
    return render(request,'AI_composer/app.html',context)



