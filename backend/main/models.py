from django.db import models
from authentification.models import User
# Create your models here.
class Course(models.Model):
	name = models.CharField(max_length=100)
	created_by = models.ForeignKey(User,on_delete=models.CASCADE)
	created_at = models.DateField(auto_now_add=True)
	image =models.ImageField(upload_to="media/course_images")

class Tag(models.Model):
	name = models.CharField(max_length=100)
	color = models.CharField(max_length=100,default='000')

class Tag_Link(models.Model):
	course = models.ForeignKey(Course,on_delete=models.CASCADE)
	tag = models.ForeignKey(Tag,on_delete=models.CASCADE)

class Video(models.Model):
	title = models.CharField(max_length=300)
	thumbnail = models.ImageField(upload_to="media/video_images")
	video = models.FileField(upload_to="media/videos",null=True,blank=True)
	url_video = models.CharField(max_length=2000,null=True,blank=True)
	description = models.TextField(max_length=1000)
