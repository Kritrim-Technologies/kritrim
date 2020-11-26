#!/usr/bin/env python
# coding: utf-8

# In[1]:


import os
import mido
import json
import pretty_midi
import numpy as np

from mido import MidiFile,MidiTrack,Message


    
    

#def getJSON(filename):
def getJSON(mid):
    #songs=['../dataset/'+filename for filename in os.listdir('../dataset')]
    #mid=MidiFile(filename)
    data=[]

    for _,track in enumerate(mid.tracks):
        abs_time=0
        for msg in track:
            abs_time+=msg.time
         
            if(msg.type=='note_on'):
                
                note=pretty_midi.note_number_to_name(msg.note)
                a={'velocity':msg.velocity,'note_num':msg.note,'note':note,'time':abs_time}
                data.append(a)
            elif(msg.type=='note_off'):
                
                note=pretty_midi.note_number_to_name(msg.note)
                a={'velocity':0,'note_num':msg.note,'note':note,'time':abs_time}
                data.append(a)
                
    
    return data

def samples_to_midi(samples, fname, ticks_per_sample, thresh=0.5):
    mid = MidiFile()
    track = MidiTrack()
    samples_per_measure=96
    num_notes=96
    mid.tracks.append(track)
    ticks_per_beat = mid.ticks_per_beat
    ticks_per_measure = 4 * ticks_per_beat
    ticks_per_sample = ticks_per_measure / samples_per_measure
    abs_time = 0
    last_time = 0
    for sample in samples:
        for y in range(sample.shape[0]):
            abs_time += ticks_per_sample
            for x in range(sample.shape[1]):
                note = int(x + (128 - num_notes)/2)
                if sample[y,x] >= thresh and (y == 0 or sample[y-1,x] < thresh):
                    delta_time = int(abs_time - last_time)
                    track.append(Message('note_on', note=note, velocity=127, time=delta_time))
                    last_time = abs_time
                if sample[y,x] >= thresh and (y == sample.shape[0]-1 or sample[y+1,x] < thresh):
                    delta_time = int(abs_time - last_time)
                    track.append(Message('note_off', note=note, velocity=0, time=delta_time))
                    last_time = abs_time
    #mid.save(fname)
    return mid

