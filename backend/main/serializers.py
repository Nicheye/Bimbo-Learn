from rest_framework import serializers
from .models import *
class Course_Serializer(serializers.ModelSerializer):
	created_by = serializers.SerializerMethodField()
	image =serializers.SerializerMethodField()
	class Meta:
		model = Course
		fields = ['name','created_by','created_at','image','id']
	def get_created_by(self,obj):
		return str(obj.created_by.username) if obj.created_by else None
	def get_image(self,obj):
		return "http://127.0.0.1:8000"+str(obj.image.url) if obj.image else None

class Tag_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Tag
		fields = ['name','color','id']
	
class Tag_Link_Serializer(serializers.ModelSerializer):
	course =serializers.SerializerMethodField()
	tag = serializers.SerializerMethodField()
	class Meta:
		model = Tag_Link
		fields= ['course','tag','id']
	def get_course(self,obj):
		return str(obj.course.name) if obj.course else None
	def get_tag(self,obj):
		return str(obj.tag.name) if obj.tag else None

class Video_Serializer(serializers.ModelSerializer):
	thumbnail = serializers.SerializerMethodField()
	video = serializers.SerializerMethodField()
	
	class Meta:
		model = Video
		fields = ['title','thumbnail','video','url_video','description','id']
	def get_thumbnail(self,obj):
		return "http://127.0.0.1:8000"+str(obj.thumbnail.url) if obj.thumbnail else None
	def get_video(self,obj):
		return "http://127.0.0.1:8000"+str(obj.video.url) if obj.video else None
	

class Watch_History_Serializer(serializers.ModelSerializer):
	course = serializers.SerializerMethodField()
	user = serializers.SerializerMethodField()
	class Meta:
		model = Watch_History
		fields = ['course','user']
	
	def get_user(self,obj):
		return str(obj.user.username) if obj.user else None
	
	def get_course(self,obj):
		if obj.course:
			data = Course_Serializer(obj.course)
			return data.data
		else:
			return str("sorry nothin")

