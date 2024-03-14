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
from rest_framework.permissions import IsAuthenticated
from .pagination import Main_Page_Pagination

class Main_View(ListAPIView):
		queryset = Course.objects.order_by('-created_at').all()
		serializer_class = Course_Serializer
		filter_backends = [filters.SearchFilter]
		pagination_class = Main_Page_Pagination
		search_fields = ['name', 'created_by__name']


class Profile_View(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request, *args, **kwargs):
        user = request.user
        id = kwargs.get("id", None)
        if id is not None:
            user_obj = User.objects.get(id=id)
            if str(user_obj.status) == "consumer":
                watched_courses = Watch_History.objects.filter(user=user_obj)
                watched_ser = Watch_History_Serializer(watched_courses, many=True)
                return Response({'data': watched_ser.data}, status=status.HTTP_200_OK)
            elif str(user_obj.status) == "creator":
                made_courses = Course.objects.filter(created_by=user_obj)
                made_ser = Course_Serializer(made_courses, many=True)
                return Response({'data': made_ser.data}, status=status.HTTP_200_OK)

        if str(user.status) == "consumer":
            watched_courses = Watch_History.objects.filter(user=user)
            watched_ser = Watch_History_Serializer(watched_courses, many=True)
            return Response({'data': watched_ser.data}, status=status.HTTP_200_OK)
        elif str(user.status) == "creator":
            made_courses = Course.objects.filter(created_by=user)
            made_ser = Course_Serializer(made_courses, many=True)
            return Response({'data': made_ser.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message': "who the hell are you"}, status=status.HTTP_510_NOT_EXTENDED)

    def post(self, request):
        user = request.user
        if str(user.status) == "creator":
            data = request.data
            image = request.FILES.get('image')
            serializer = Course_Serializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(image=image, created_by=user)
                return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)

        else:
            return Response({"message": "you're not allowed to do this"}, status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS)


class Course_View(APIView):
	pass