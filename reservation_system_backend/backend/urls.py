from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'admins', AdminView, 'admin')
router.register(r'custoner', CustomerView, 'viewer')
router.register(r'event', EventView, 'category')
router.register(r'payment', PaymentView, 'post')
# router.register(r'score', ScoreView, 'score')
# router.register(r'team', TeamView, 'team')


urlpatterns = [
    path('', include(router.urls)),
    path('eventPOST/', EventView1.as_view(), name='posts_event'),
    path('customer/', CustomerView1.as_view(), name='validateCustomer'),
    path('admin/', AdminView1.as_view(), name='validateCustomer'),
    path('pay/', PaymentView1.as_view(), name='paySeat'),
    path('getpay/', PaymentView2.as_view(), name='getpay'),
]

