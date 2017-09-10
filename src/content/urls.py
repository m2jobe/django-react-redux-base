from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import content.views

urlpatterns = [
    url(_(r'^fetchVideos/$'),
        content.views.FetchVideos.as_view(),
        name='fetch_videos'),
    url(_(r'^fetchBanners/$'),
        content.views.FetchBanners.as_view(),
        name='fetch_banners'),
    url(_(r'^saveUserNotificationRequest/$'),
        content.views.SaveUserNotificationRequest.as_view(),
        name='save_user_request'),
]
