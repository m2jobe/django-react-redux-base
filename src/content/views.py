from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from content.models import Video
from content.models import Notification

from content.serializers import VideoSerializer
from content.models import Banner
from content.serializers import BannerSerializer
from content.serializers import NotificationSerializer

from lib.utils import AtomicMixin


class FetchVideos(GenericAPIView):
    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Video.objects.all()
        serializer = VideoSerializer(queryset, many=True)
        data = serializer.data
#        queryset = Objective.objects.filter(username=request.data['username'], date__lte=request.data['endDate'], date__gte = request.data['startDate']).order_by('-id')
        #video = Video(name="asdf", artist='username', url="2015-05-05", description='objective', shots='note', date_added='2015-05-05 00:00:00', date_updated='2015-05-05 00:00:00')
        #video.save()

        return Response(data, status=status.HTTP_200_OK)

class FetchBanners(GenericAPIView):
    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Banner.objects.all()
        serializer = BannerSerializer(queryset, many=True)
        data = serializer.data
#        queryset = Objective.objects.filter(username=request.data['username'], date__lte=request.data['endDate'], date__gte = request.data['startDate']).order_by('-id')
        #video = Video(name="asdf", artist='username', url="2015-05-05", description='objective', shots='note', date_added='2015-05-05 00:00:00', date_updated='2015-05-05 00:00:00')
        #video.save()

        return Response(data, status=status.HTTP_200_OK)



class SaveUserNotificationRequest(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = NotificationSerializer
    authentication_classes = ()

    def post(self, request):
        """Notification add view"""


        notification = Notification(email=request.data['email'], artist=request.data['artist'], date_added="2015-05-05")
        notification.save()

        return Response("Saved", status=status.HTTP_200_OK)
