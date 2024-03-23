from rest_framework import serializers
from .models import *
class Course_Serializer(serializers.ModelSerializer):
	created_by = serializers.SerializerMethodField()
	image =serializers.SerializerMethodField()
	videos = serializers.SerializerMethodField()
	tags = serializers.SerializerMethodField()
	class Meta:
		model = Course
		fields = ['name','created_by','created_at','image','videos','id','tags']
	
	def get_tags(self,obj):
		if obj:
			tags = Tag_Link.objects.filter(course=obj)
			tags_ser = Tag_Link_Serializer(tags,many=True)
			return tags_ser.data

	def get_created_by(self,obj):
		return str(obj.created_by.username) if obj.created_by else None
	def get_videos(self,obj):
		if obj:
			videos =Video.objects.filter(course=obj)
			ser= Video_Serializer(videos,many=True)
			return ser.data
	def get_image(self,obj):
		return "http://127.0.0.1:8000"+str(obj.image.url) if obj.image else None

class Tag_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Tag
		fields = ['name','color','id']
	
class Tag_Link_Serializer(serializers.ModelSerializer):
	course =serializers.SerializerMethodField()
	tag = serializers.SerializerMethodField()
	color = serializers.SerializerMethodField()
	class Meta:
		model = Tag_Link
		fields= ['course','tag','id','color']
	def get_course(self,obj):
		return str(obj.course.name) if obj.course else None
	def get_tag(self,obj):
		return str(obj.tag.name) if obj.tag else None
	def get_color(self,obj):
		return str(obj.tag.color) if obj.tag else None

class Video_Serializer(serializers.ModelSerializer):
	thumbnail = serializers.SerializerMethodField()
	video = serializers.SerializerMethodField()
	course = serializers.SerializerMethodField()
	class Meta:
		model = Video
		fields = ['title','thumbnail','video','url_video','description','id','course']
	def get_course(self,obj):
		if obj.course:
			return str(obj.course.name)
		else:
			return ""
	def get_thumbnail(self,obj):
		return "http://127.0.0.1:8000"+str(obj.thumbnail.url) if obj.thumbnail else None
	def get_video(self,obj):
		return "http://127.0.0.1:8000"+str(obj.video.url) if obj.video else None
	

class Watch_History_Serializer(serializers.ModelSerializer):
	video = serializers.SerializerMethodField()
	user = serializers.SerializerMethodField()
	class Meta:
		model = Watch_History
		fields = ['video','user']
	
	def get_user(self,obj):
		return str(obj.user.username) if obj.user else None
	
	def get_video(self,obj):
		if obj.video:
			data = Video_Serializer(obj.video)
			return data.data
		else:
			return str("sorry nothin")


class Playlist_video_serializer(serializers.ModelSerializer):
	playlist = serializers.SerializerMethodField()
	video = serializers.SerializerMethodField()
	class Meta:
		model = Playlist_Video
		fields = ['playlist','video']
	def get_playlist(self,obj):
		if obj.playlist:
			return str(obj.playlist.name)
	def get_video(self,obj):
		if obj.video:
			video_ser = Video_Serializer(obj.video) 
			return video_ser.data 

class Playlist_serialier(serializers.ModelSerializer):
	created_by= serializers.SerializerMethodField()
	videos = serializers.SerializerMethodField()
	class Meta:
		model = Playlist
		fields  = ['name','created_by','is_public','id','videos']
	def get_created_by(self,obj):
		if obj.created_by:
			return str(obj.created_by.username)
		else:
			return ""
	def get_videos(self,obj):
		videos = Playlist_Video.objects.filter(playlist=obj).order_by('-id')
		videos_ser = Playlist_video_serializer(videos,many=True)
		return videos_ser.data