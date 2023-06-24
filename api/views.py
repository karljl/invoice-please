from .models import Provider, Customer
from .serializers import ProviderSerializer, CustomerSerializer

from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response


class ProviderList(APIView):

    def get(self, request):
        entities = Provider.objects.all()
        serializer = ProviderSerializer(entities, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProviderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerList(APIView):

    def get(self, request):
        entities = Customer.objects.all()
        serializer = CustomerSerializer(entities, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
