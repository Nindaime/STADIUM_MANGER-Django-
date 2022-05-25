# from django.shortcuts import render
from rest_framework import viewsets
# from django.http import HttpResponse, JsonResponse
from .serializers import *
from .models import *

from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
# from django.views.decorators.csrf import csrf_exempt

# Create your views here.

# @api_view(['POST'])
class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializers
    queryset = Customer.objects.all()


class PaymentView(viewsets.ModelViewSet):
    serializer_class = PaymentSerializers
    queryset = Customer.objects.all()


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializers
    queryset = Event.objects.order_by("id").reverse()


# class ScoreView(viewsets.ModelViewSet):
#     serializer_class = ScoreSerializers
#     queryset = Score.objects.all()
    

# class TeamView(viewsets.ModelViewSet):
#     serializer_class = TeamSerializers
#     queryset = Team.objects.all()

class AdminView(viewsets.ModelViewSet):
    serializer_class = AdminSerializers
    queryset = Admin.objects.all()

class EventView1(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        posts_serializer = EventSerializers(data=request.data)
        # # print(posts_serializer)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status= status.HTTP_200_OK)
        else:
            # print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        idd = request.data.get("id")
        # # print(idd)
        post_object = Event.objects.get(id=idd)
        # set partial=True to update a data partially
        serializer = EventSerializers(
            post_object, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerView1(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):

        if Customer.objects.filter(username = request.data.get("username"), password = request.data.get("password")).exists():
            qry = Customer.objects.get(username = request.data.get("username"), password = request.data.get("password"))
            return JsonResponse({"query": qry.id, "user": qry.username}, safe=True, status=200)
        else:
            qry = None
            return JsonResponse({"query": qry}, safe=True, status=200)

class AdminView1(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):

        if Admin.objects.filter(username = request.data.get("username"), password = request.data.get("password")).exists():
            qry = Admin.objects.get(username = request.data.get("username"), password = request.data.get("password"))
            return JsonResponse({"query": qry.id, "user": qry.username}, safe=True, status=200)
        else:
            qry = None
            return JsonResponse({"query": qry}, safe=True, status=200)


class PaymentView1(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # # print(request.data)
        customer_id = request.data.get("customer_id")
        event_id = request.data.get("event_id")
        
        issues = []

        if Customer.objects.filter(id = customer_id).exists():
            customer = Customer.objects.get(id = customer_id)
        else:
            issues.append("user no longer exist")

        
        if Event.objects.filter(id = event_id).exists():
            event = Event.objects.get(id = event_id)
            # print("here:",EventSerializers(event, many=True).)
            # print("here:",event.d)
            if event.remainingSeat == 0:
                issues.append("event already full")
            else:
                event.remainingSeat -= 1
                event.save()
        else:
            issues.append("event no longer exist")
        
        if len(issues) != 0:
            return JsonResponse({"query": issues}, safe=True, status=200)
        else:
            Payment.objects.create(customer=customer, event=event, cost=request.data.get("cost"), seatNumber=request.data.get("seatNumber"))
            return JsonResponse({"query": True}, safe=True, status=200)


class PaymentView2(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        # print(request.data)
        event_id = request.data.get("id")
        # event_id = request.data.get("event_id")
        
        issues = []

        if Payment.objects.filter(event = event_id).exists():
            events = Payment.objects.filter(event = event_id)
        else:
            issues.append("event no longer exist")
        
        if len(issues) != 0:
            return JsonResponse({"query": issues}, safe=True, status=200)
        else:
            return JsonResponse({"query": True, "data": events}, safe=True, status=200)

# # @require_http_methods(['PUT'])
# @csrf_exempt
# def credit(request):
#     data = JSONParser().parse(request)
#     qry = Customer.objects.get(acc_no=data.get("acc"))
#     qry.balance += int(data.get("increment"))
#     qry.save()

#     qry1 = Customer.objects.get(acc_no=data.get("from_acc"))
#     qry1.balance -= int(data.get("increment"))
#     qry1.save()

#     return JsonResponse({"status": "done"}, safe=True, status=200)
#     # Customer.objects.filter(id=request.id).update(balance=F('balance') + request.balance)


# # wcwc
# class CustomerView1(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
        # # print(request.data)
#         serializer = CustomerSerializers(data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
            # # print('error', serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         # cus_create = Customer.objects.create(

#         # )

#     def patch(self, request):
#         idd = request.data.get("id")
        # # print(request.data)
#         post_object = Customer.objects.get(id=idd)
#         # set partial=True to update a data partially
#         serializer = CustomerSerializers(
#             post_object, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
            # # print('error', serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class Deposit(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def patch(self, request):
#         idd = request.data.get("id")
#         post_object = Customer.objects.get(id=idd)
#         # request.data.set({'dep_amt': ['222']})
#         data = {
#             "id": request.data.get("id"),
#             "balance": int(post_object.balance) + int(request.data.get("dep_amt"))
#         }
#         # set partial=True to update a data partially
#         serializer = CustomerSerializers(
#             post_object, data=data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
            # # print('error', serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class DeleteAllTransaction(APIView):

#     def post(self, request, *args, **kwargs):
#         idd = request.data.get("idd")

#         me = Customer.objects.get(id=idd).acc_no

#         for obj in Transaction.objects.all():
#             if obj.from_acc == me:
#                 nxt = obj.to_acc
#             else:
#                 nxt = obj.from_acc

#             otherPersonID = Customer.objects.get(acc_no=nxt).id

#             if(obj.see != 0):
#                 obj.delete()
#                 return Response({"status": "success"}, status=status.HTTP_201_CREATED)
#             else:
#                 obj.see = otherPersonID
#                 obj.save()
#                 return Response({"status": "success"}, status=status.HTTP_201_CREATED)


# class DeleteTransaction(APIView):

#     def post(self, request, *args, **kwargs):
#         id = request.data.get("id")
#         idd = request.data.get("idd")

#         me = Customer.objects.get(id=idd).acc_no
#         tra = Transaction.objects.get(id=id)

#         if tra.from_acc == me:
#             nxt = tra.to_acc
#         else:
#             nxt = tra.from_acc

#         otherPersonID = Customer.objects.get(acc_no=nxt).id

#         record = Transaction.objects.get(id=id)
#         see = record.see
#         # record.delete()
#         # return Response({"status": "success"}, status=status.HTTP_201_CREATED)

#         if(see != 0):
            # # print("hmm")
#             record.delete()
#             return Response({"status": "success"}, status=status.HTTP_201_CREATED)
#         else:
#             record.see = otherPersonID
#             record.save()
#             return Response({"status": "success"}, status=status.HTTP_201_CREATED)

#         # return Response({"status": "success"}, status=status.HTTP_201_CREATED)


# class FreezeAccount(APIView):

#     def post(self, request):
#         idd = request.data.get("id")
#         post_object = Customer.objects.get(id=idd)

#         data = {
#             "id": request.data.get("id"),
#             "status": not(post_object.status)
#         }

#         serializer = CustomerSerializers(
#             post_object, data=data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
            # # print('error', serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
