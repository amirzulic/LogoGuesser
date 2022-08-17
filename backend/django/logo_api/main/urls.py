from django.urls import path
from . import views

urlpatterns = [
    path('company/', views.CompanyList.as_view()),
    path('admin/', views.AdminList.as_view()),
    path('guest/', views.GuestList.as_view()),
    path('company/<int:pk>/', views.CompanyDetail.as_view()),
    path('admin/<int:pk>/', views.AdminDetail.as_view()),
    path('guest/<int:pk>/', views.GuestDetail.as_view()),
    path('admin-login', views.admin_login)
]