import sys

import keras
from keras.layers import Lambda,Input,InputLayer, Dense, Activation, Dropout, Flatten, Reshape,ActivityRegularization, TimeDistributed
from keras.models import Model, Sequential, load_model
import numpy as np

x_vecs=np.load('./model/input.npy')
decoder=load_model('./model/model.h5')
print('loading finished')
data=np.zeros((16,96,96))

def generate_song():
    for i in range(10):
        song=decoder.predict(x_vecs[i:i+1])[0]
        print(song.shape)
        data[:,:,30:65]=song

