from django.urls import path
from . import views

urlpatterns = [
    path('providers/', views.ProviderList.as_view()),
    path('customers/', views.CustomerList.as_view()),
]
