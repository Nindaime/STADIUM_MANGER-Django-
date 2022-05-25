# chat/consumers.py
import json
from django.core.serializers.json import DjangoJSONEncoder

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from channels.generic.websocket import AsyncWebsocketConsumer
from .models import *
from .serializers import *
from channels.db import database_sync_to_async











class EventConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = "event"
        self.room_group_name = 'chat_%s' % self.room_name

        
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        
        data = await database_sync_to_async(self.get_name)()

        # # print(self.username)
        
        event = {
            'type': 'send_message',
            'message': data
        }

        # send message to group
        await self.channel_layer.group_send(self.room_name, event)

        await self.accept()


    async def disconnect(self, close_code):        
        await self.channel_layer.group_discard(self.room_name, self.room_group_name)


    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        self.message = text_data_json['message']

        # print("here")

        
        posted = await database_sync_to_async(self.post_event)()

        if posted:
            data = await database_sync_to_async(self.get_name)()

            # # print(self.username)
            
            event = {
                'type': 'send_message',
                'message': data
            }

            # send message to group
            await self.channel_layer.group_send(self.room_name, event)
        else:
            print("Error!")

    async def send_message(self, event):
        message = event['message']

        # send message to websocket
        await self.send(text_data=json.dumps({'message': message}))


    def get_name(self):
        return EventSerializers(Event.objects.order_by("id").reverse(), many=True).data

    def post_event(self):
        serializers = EventSerializers(data=self.message)

        # print("here")

        if serializers.is_valid():
            serializers.save()
            return True
        else:
            # print('Error!')
            # print(serializers.errors)
            # print(self.message)
            return False



















class EventsConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.id = self.scope["url_route"]["kwargs"]["id"]
        # self.id = (self.scope)
        # # print("hello")
        self.room_name = "event_%s" % self.id

        self.room_group_name = 'chat_%s' % self.room_name

        
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        
        data = await database_sync_to_async(self.get_name)()

        # # print(self.username)
        
        event = {
            'type': 'send_message',
            'message': data
        }

        # send message to group
        await self.channel_layer.group_send(self.room_name, event)

        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.room_group_name)


    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        self.message = text_data_json['message']

        # # print("here")

        
        posted = await database_sync_to_async(self.post_event)()

        if posted:
            data = await database_sync_to_async(self.get_name)()

            # # print(self.username)
            
            event = {
                'type': 'send_message',
                'message': data
            }

            # send message to group
            await self.channel_layer.group_send(self.room_name, event)
        else:
            print("Error!")


    async def send_message(self, event):
        message = event['message']

        # send message to websocket
        await self.send(text_data=json.dumps({'message': message[0], 'seatSold': message[1]}))


    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))

    def get_name(self):
        # try:
        # print(self.id)
        qry0 = EventSerializers(Event.objects.get(id=self.id))
        
        qry1 = qry0.data
        qry2 = Payment.objects.filter(event=self.id)
        seat = []
        for qq in qry2:
            seat.append(qq.__dict__["seatNumber"])

        # print(seat)
        qry = qry1, seat
        return qry

















class PaymentConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.id = self.scope["url_route"]["kwargs"]["id"]
        # self.id = (self.scope)
        # # print("hello")
        self.room_name = "event_%s" % self.id

        self.room_group_name = 'chat_%s' % self.room_name

        
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        
        data = await database_sync_to_async(self.get_name)()

        # # print(self.username)
        
        event = {
            'type': 'send_message',
            'message': data,
        }

        # send message to group
        await self.channel_layer.group_send(self.room_name, event)

        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.room_group_name)


    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        self.message = text_data_json['message']

        # # print("here")

        
        posted = await database_sync_to_async(self.post_event)()

        if posted:
            data = await database_sync_to_async(self.get_name)()

            # # print(self.username)
            
            event = {
                'type': 'send_message',
                'message': data
            }

            # send message to group
            await self.channel_layer.group_send(self.room_name, event)
        else:
            print("Error!")



    async def send_message(self, event):
        message = event['message']

        # send message to websocket
        await self.send(text_data=json.dumps({'message': message}))

    
    def get_name(self):
        
        # try:
        # # print(self.id)
        qry0 = PaymentSerializers(Payment.objects.filter(event=self.id), many=True)
        # # print(qry0.data)

        qq = [dict(i) for i in qry0.data]
        for i in qq:
            customer = Customer.objects.get(id= i['customer']).firstname +" " + Customer.objects.get(id= i['customer']).lastname
            i["customer"] = customer
        # qq1 = [Customer.objects.get(id= i['customer']).name for i in qry0.data]
        # # print(qq)
        
        return qq
        # return qry

    def post_event(self):
        serializers = EventSerializers(data=self.message)

        # print("here")

        if serializers.is_valid():
            serializers.save()
            return True
        else:
            # print('Error!')
            # print(serializers.errors)
            # print(self.message)
            return False