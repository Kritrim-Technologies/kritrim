from django.urls import path
from . import views

urlpatterns=[
    path('',views.home,name='homepage'),
    path('application/',views.music_composer,name='music_composer')
]