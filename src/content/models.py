import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Video(models.Model ):
    """
    Model that represents an video.

    """

    name = models.CharField(_('Name'), max_length=50)
    artist = models.CharField(_('Artist'), max_length=50)
    url = models.URLField(_('Url'), max_length=200)

    description = models.CharField(_('Description'), max_length=200)
    shots = models.CharField(_('Shots'), max_length=200, default="")
    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.name

class Banner(models.Model ):
    """
    Model that represents an video.

    """

    artist = models.CharField(_('Name'), max_length=50)
    location = models.CharField(_('Artist'), max_length=50)
    image = models.URLField(_('Url'), max_length=200)
    date = models.DateTimeField(_('date joined'), auto_now_add=True)


    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.artist

class Notification(models.Model ):
    """
    Model that represents an video.

    """
    email = models.EmailField(_('Email address'))
    artist = models.CharField(_('Artist'), max_length=50)

    date_added = models.DateTimeField(_('date added'), auto_now_add=True)


    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.email
