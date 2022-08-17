from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics
from .serializers import AdminSerializer, CompanySerializer, GuestSerializer
from . import models

class CompanyList(generics.ListCreateAPIView):
    queryset = models.Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Company.objects.all()
    serializer_class = CompanySerializer

class AdminList(generics.ListCreateAPIView):
    queryset = models.Admin.objects.all()
    serializer_class = AdminSerializer

class AdminDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Admin.objects.all()
    serializer_class = AdminSerializer

@csrf_exempt
def admin_login(request):
    email = request.POST['email']
    password = request.POST['password']
    adminData = models.Admin.objects.get(email = email, password = password)
    if adminData:
        return JsonResponse({'bool' : True, 'admin_id' : adminData.id})
    else:
        return JsonResponse({'bool' : False})

class GuestList(generics.ListCreateAPIView):
    queryset = models.Guest.objects.all()
    serializer_class = GuestSerializer

class GuestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Guest.objects.all()
    serializer_class = GuestSerializer