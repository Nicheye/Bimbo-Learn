from rest_framework import serializers
from .models import User
class UserSerializer(serializers.ModelSerializer):
	status = serializers.SerializerMethodField()
	class Meta:
		model = User
		fields =['id','username','password','status','email']
		extra_kwargs = {
			'password':{'write_only':True}
		}

	def create(self,validated_data):
		password = validated_data.pop('password',None)
		instance =  self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance
	def get_status(self,obj):
		return str(obj.status.name) if obj.status else None
