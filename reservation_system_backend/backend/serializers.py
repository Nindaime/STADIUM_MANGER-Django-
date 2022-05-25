# from multiprocessing import Event
from .models import *
from rest_framework import fields, serializers



class EventSerializers(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


# class TeamSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = Team
#         fields = '__all__'

# class ScoreSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = Score
#         fields = '__all__'

class CustomerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class PaymentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class AdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
