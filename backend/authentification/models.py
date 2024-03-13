from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Status(models.Model):
	name = models.CharField(max_length=20)
class User(AbstractUser):
	username = models.CharField(max_length=255,unique=True)
	email = models.CharField(max_length=255)
	password = models.CharField(max_length=255)
	status = models.ForeignKey(Status,on_delete=models.CASCADE,null=True,blank=True)
	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = []