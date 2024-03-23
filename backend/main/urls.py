
from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import *
urlpatterns = [
    path('main',Main_View.as_view()),
    path('profile/<int:id>',Profile_View.as_view()),
	path('profile',Profile_View.as_view()),
	path('course/<int:id>',Course_View.as_view()),
	path('course',Course_View.as_view()),
	path('video/<int:id>',Video_View.as_view()),
	path('watch_history',Watch_History_View.as_view()),
	path('playlist/<int:playlist_id>/video/<int:video_id>',Playlist_View.as_view()),
	path('playlist/<int:playlist_id>/course/<int:course_id>',Playlist_View.as_view()),
	path('playlist/<int:playlist_id>',Playlist_View.as_view()),
	path('playlist',Playlist_View.as_view()),
]
