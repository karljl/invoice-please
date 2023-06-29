from .models import Provider, Customer, Invoice, LineItem
from .serializers import ProviderSerializer, CustomerSerializer, InvoiceSerializer, LineItemSerializer

from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response

from django.http import Http404


# ---------- ABSTRACT VIEWS ----------
class AbstractListView(APIView):
    entity = None
    serializer = None

    def get(self, request):
        entities = self.entity.objects.all()
        serializer = self.serializer(entities, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AbstractDetailView(APIView):
    entity = None
    serializer = None

    def get_object(self, pk):
        try:
            return self.entity.objects.get(id=pk)
        except self.entity.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        entity = self.get_object(pk)
        serializer = self.serializer(entity, many=False)
        return Response(serializer.data)

    def put(self, request, pk):
        entity = self.get_object(pk)
        serializer = self.serializer(entity, data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, pk):
        entity = self.get_object(pk)
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AbstractFilterView(APIView):
    filter_model = None
    target_model = None
    serializer = None

    def get_filter_model_object(self, pk):
        try:
            return self.filter_model.objects.get(id=pk)
        except self.filter_model.DoesNotExist:
            raise Http404

    def get_target_model_objects(self, arg):
        try:
            return self.target_model.objects.filter(arg)
        except self.target_model.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        filter_by = self.get_filter_model_object(pk)
        target = self.get_target_model_objects(filter_by)
        serializer = self.serializer(target, many=True)
        return Response(serializer.data)


# ---------- PROVIDER VIEWS ----------
class ProviderList(AbstractListView):
    entity = Provider
    serializer = ProviderSerializer


class ProviderDetail(AbstractDetailView):
    entity = Provider
    serializer = ProviderSerializer


# ---------- CUSTOMER VIEWS ----------
class CustomerList(AbstractListView):
    entity = Customer
    serializer = CustomerSerializer


class CustomerDetail(AbstractDetailView):
    entity = Customer
    serializer = CustomerSerializer


# ---------- INVOICE VIEWS ----------
class InvoiceByProvider(AbstractFilterView):
    filter_model = Provider
    target_model = Invoice
    serializer = InvoiceSerializer

    def get_target_model_objects(self, pk):
        try:
            return self.target_model.objects.filter(provider=pk)
        except self.target_model.DoesNotExist:
            raise Http404


class InvoiceDetail(AbstractDetailView):
    entity = Invoice
    serializer = InvoiceSerializer


class InvoicePost(APIView):
    serializer = InvoiceSerializer

    def post(self, request):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------- LINE ITEM VIEWS ----------
class LineItemDetail(AbstractDetailView):
    entity = LineItem
    serializer = LineItemSerializer


class LineItemsByInvoice(AbstractFilterView):
    filter_model = Invoice
    target_model = LineItem
    serializer = LineItemSerializer

    def get_target_model_objects(self, pk):
        try:
            return self.target_model.objects.filter(invoice=pk)
        except self.target_model.DoesNotExist:
            raise Http404


class LineItemPost(APIView):
    serializer = LineItemSerializer

    def post(self, request):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
