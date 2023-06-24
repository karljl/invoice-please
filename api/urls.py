from django.urls import path
from . import views

urlpatterns = [
    path('providers/', views.ProviderList.as_view()),
    path('providers/<int:pk>/', views.ProviderDetail.as_view()),
    path('providers/<int:pk>/invoices/', views.InvoiceByProvider.as_view()),

    path('customers/', views.CustomerList.as_view()),
    path('customers/<int:pk>/', views.CustomerDetail.as_view()),

    path('invoices/<int:pk>/', views.InvoiceDetail.as_view()),
    path('invoices/<int:pk>/lineitems/', views.LineItemsByInvoice.as_view()),

    path('lineitems/new/', views.LineItemPost.as_view()),
    path('lineitems/<int:pk>/', views.LineItemDetail.as_view()),
]
