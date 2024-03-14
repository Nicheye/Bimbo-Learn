from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Course)
admin.site.register(Tag)
admin.site.register(Tag_Link)
admin.site.register(Video)
admin.site.register(Watch_History)
