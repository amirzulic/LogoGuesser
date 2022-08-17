from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=100)
    full_photo = models.CharField(max_length=100)
    blur_photo = models.CharField(max_length=100)
    description = models.CharField(max_length=100)

class Admin(models.Model):
    email = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Guest(models.Model):
    name = models.CharField(max_length=100)
    score = models.CharField(max_length=100)

