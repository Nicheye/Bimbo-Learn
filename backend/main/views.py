from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from authentification.models import *
from .serializers import *
from rest_framework import generics
from rest_framework import filters
import django_filters.rest_framework


class Main_View(ListAPIView):
		queryset = Course.objects.all()
		serializer_class = Course_Serializer
		filter_backends = [filters.SearchFilter]
		search_fields = ['name', 'created_by__name']