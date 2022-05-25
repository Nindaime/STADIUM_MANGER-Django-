from distutils.command.upload import upload
from django.db import models


class Event(models.Model):
    teamA = models.CharField(max_length=50)
    teamB = models.CharField(max_length=50)

    teamAscore = models.IntegerField()
    teamBscore = models.IntegerField()

    time = models.DateTimeField()
    seatNumber = models.IntegerField()
    remainingSeat = models.IntegerField()
    location = models.TextField()
    
    thumbnail = models.ImageField(upload_to='images/thumbnail/')

    teamAlogo = models.ImageField(upload_to='images/logo/')
    teamBlogo = models.ImageField(upload_to='images/logo/')

    def __str__(self):
        return self.teamA + " vs " + self.teamB

class Customer(models.Model):
    username = models.CharField(max_length=50)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    password = models.TextField()

    def __str__(self):
        return self.lastname + " " + self.firstname

class Payment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=False)
    cost = models.IntegerField()
    seatNumber = models.IntegerField()
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "'" +self.customer.username + "' paid for '" + self.event.name + "'"

class Admin(models.Model):
    username = models.CharField(max_length=30)
    password = models.TextField()