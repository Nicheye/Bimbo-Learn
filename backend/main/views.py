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
                return Response({'data': watched_ser.data,'status':'consumer'}, status=status.HTTP_200_OK)
            elif str(user_obj.status) == "creator":
                made_courses = Course.objects.filter(created_by=user_obj)
                made_ser = Course_Serializer(made_courses, many=True)
                return Response({'data': made_ser.data,'status':'creator'}, status=status.HTTP_200_OK)

        if str(user.status) == "consumer":
            watched_courses = Watch_History.objects.filter(user=user)
            watched_ser = Watch_History_Serializer(watched_courses, many=True)
            return Response({'data': watched_ser.data,'status':'consumer'}, status=status.HTTP_200_OK)
        elif str(user.status) == "creator":
            made_courses = Course.objects.filter(created_by=user)
            made_ser = Course_Serializer(made_courses, many=True)
            return Response({'data': made_ser.data,'status':'creator'}, status=status.HTTP_200_OK)
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
    permission_classes = [IsAuthenticated,]
    def get(self,request,*args,**kwargs):
          
          id = kwargs.get("id",None)
          if id is not None:
               try:
                course_obj = Course.objects.get(id=id)
                obj_ser= Course_Serializer(course_obj)
                
                return Response({'data':obj_ser.data,'user':str(request.user)},status=status.HTTP_200_OK)
               except Exception as e:
                    return Response({'message':str(e)},status=status.HTTP_400_BAD_REQUEST)
          else:
               return Response({'message':"you havent provided id for course to request smth"},status=status.HTTP_400_BAD_REQUEST)
    
    def post(self,request,*args,**kwargs):
         id = kwargs.get("id",None)
         user = request.user
         if id is not None:
              try:
                course_inst = Course.objects.get(id=id)
                data =request.data
                thumbnail = request.FILES.get('thumbnail')
                video = request.FILES.get('video')
                if course_inst.created_by == user:
                    course_ser = Video_Serializer(data=data)
                    if course_ser.is_valid(raise_exception=True):
                        if video:
                            course_ser.save(course=course_inst,thumbnail=thumbnail,video=video)
                        else:
                             course_ser.save(course=course_inst,thumbnail=thumbnail)
                        return Response({"data":course_ser.data},status=status.HTTP_201_CREATED)
                else:
                     return Response({'message':"you re not allowed to create videos in other persons courses"},status=status.HTTP_400_BAD_REQUEST)
              except Exception as e:
                    return Response({'message':str(e)},status=status.HTTP_400_BAD_REQUEST)
         else:
            if str(user.status) =='creator':
                try:
                    data =request.data
                    image = request.FILES.get('image')
                    ser= Course_Serializer(data=data)
                    if ser.is_valid(raise_exception=True):
                        ser.save(image=image,created_by=user)
                        return Response({"data":ser.data},status=status.HTTP_201_CREATED)
                except Exception as e:
                    return Response({"message":str(e)})
        
class Watch_History_View(APIView):
     permission_classes = [IsAuthenticated,]
     def get(self,request):
          try:
            user = request.user
            if str(user.status) == "consumer":
                watch_history =Watch_History.objects.filter(user=user)
                watch_ser = Watch_History_Serializer(watch_history,many=True)
                return Response({"data":watch_ser.data},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'message':"you are creator why do u need your watch history?"},status=status.HTTP_400_BAD_REQUEST)
          except Exception as e:
               return Response({'message':str(e)},status=status.HTTP_400_BAD_REQUEST)
     
         
class Video_View(APIView):
     permission_classes =  [IsAuthenticated,]
     def get(self,request,*args,**kwargs):
          id = kwargs.get("id",None)
          try:
            if id is not None:
                video_obj = Video.objects.get(id=id)
                video_ser = Video_Serializer(video_obj)
                user = request.user
                if str(user.status) == 'consumer':
                    try:
                        instance = Watch_History.objects.get(user=user,video=video_obj)
                        
                    except:
                        watch_obj = Watch_History.objects.create(user=user,video=video_obj)
                return Response({'data':video_ser.data})
            else:
                return Response({'message':"you havent provided any id to get video"},status=status.HTTP_400_BAD_REQUEST)
          except Exception as e:
              return Response({'message':str(e)},status=status.HTTP_400_BAD_REQUEST)
          
class Playlist_View(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        user =request.user
        if str(user.status) == 'consumer':
            playlist_id = kwargs.get("playlist_id",None)
            if playlist_id is not None:
                playlist_obj = Playlist.objects.get(id=playlist_id)
                if playlist_obj.created_by == user:
                    video_id = kwargs.get("video_id",None)
                    course_id = kwargs.get("course_id",None)
                    if video_id is not None:
                        print("video added")
                        video_obj = Video.objects.get(id=video_id)
                        playlist_obj = Playlist_Video.objects.create(video=video_obj,playlist=playlist_obj)
                        return Response({'message':"video has added to playlist"},status=status.HTTP_201_CREATED)
                    
                    if course_id is not None:
                        print("course added")
                        course_obj = Course.objects.get(id=course_id)
                        videos = Video.objects.filter(course=course_obj)
                        playlist_videos = [Playlist_Video(video=video, playlist=playlist_obj) for video in videos]
                        Playlist_Video.objects.bulk_create(playlist_videos)
                        return Response({'message':"course has added to playlist"},status=status.HTTP_201_CREATED)
                return Response({"message":"you re not allowed to edit other people`s playlists"},status=status.HTTP_400_BAD_REQUEST)
            else:
                data = request.data
                new_playlist = Playlist_serialier(data)
                if new_playlist.is_valid(raise_exception=True):
                    new_playlist.save(created_by=user)
                    return Response({"data":new_playlist.data})
        else:
            return Response({"message":"why do u need a playlist if youre creator "},status=status.HTTP_400_BAD_REQUEST)
    
            
    def get(self,request,*args,**kwargs):
        user =request.user
        playlist_id = kwargs.get("playlist_id",None)
        if playlist_id is not None:
            playlist_obj = Playlist.objects.get(id=playlist_obj)
            if playlist_obj.is_public == True or playlist_obj.created_by == user:
                playlist_ser = Playlist_serialier(playlist_obj)
                return Response({'data':playlist_ser.data})
            else:
                return Response({"message":"you have no permission to this playlist "},status=status.HTTP_400_BAD_REQUEST)
        else:
            playlists = Playlist.objects.filter(created_by=user)
            playlists_ser = Playlist_serialier(playlists,many=True)
            return Response({"data":playlists_ser.data})
    def patch(self,request,*args,**kwargs):
        user =request.user
        playlist_id = kwargs.get("playlist_id",None)
        if playlist_id is not None:
            playlist_obj = Playlist.objects.get(id=playlist_obj)
            if  playlist_obj.created_by == user:
                data =request.data
                playlist_ser = Playlist_serialier(playlist_obj,data=data)
                if playlist_ser.is_valid(raise_exception=True):
                    playlist_ser.save()
                return Response({'data':playlist_ser.data})
            else:
                return Response({"message":"you have no permission to edit this playlist"},status=status.HTTP_400_BAD_REQUEST)

            
	