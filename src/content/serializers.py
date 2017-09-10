from rest_framework import serializers

from content.models import Video
from content.models import Banner
from content.models import Notification

from lib.utils import validate_email as email_is_valid


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'description', 'shots')

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ('id', 'artist','location', 'image', 'date')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'name','artist')
