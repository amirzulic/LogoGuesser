from dataclasses import field
from rest_framework import serializers
from . import models

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = ['id', 'name', 'full_photo', 'blur_photo', 'description']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Admin
        fields = ['id', 'email', 'username', 'password']

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Guest
        fields = ['id', 'name', 'score']