from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/event', consumers.EventConsumer.as_asgi()),
    re_path(r'ws/evnt/(?P<id>[0-9]+)/$', consumers.EventsConsumer.as_asgi()),
    re_path(r'ws/report/(?P<id>[0-9]+)/$', consumers.PaymentConsumer.as_asgi()),
    # re_path(r'ws/payment/(?P<id>[0-9]+)/$', consumers.PaymentConsumer.as_asgi()),
]