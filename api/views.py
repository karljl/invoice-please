from .models import Provider, Customer, Invoice, LineItem
from .serializers import ProviderSerializer, CustomerSerializer, InvoiceSerializer, LineItemSerializer

from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response

from django.http import Http404


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


class ProviderList(AbstractListView):
    entity = Provider
    serializer = ProviderSerializer


class ProviderDetail(AbstractDetailView):
    entity = Provider
    serializer = ProviderSerializer


class CustomerList(AbstractListView):
    entity = Customer
    serializer = CustomerSerializer


class CustomerDetail(AbstractDetailView):
    entity = Customer
    serializer = CustomerSerializer


class InvoiceList(AbstractListView):
    entity = Invoice
    serializer = InvoiceSerializer


class InvoiceDetail(AbstractDetailView):
    entity = Invoice
    serializer = InvoiceSerializer


class LineItemDetail(AbstractDetailView):
    entity = LineItem
    serializer = LineItemSerializer


class LineItemPost(APIView):
    serializer = LineItemSerializer

    def post(self, request):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LineItemsByInvoice(APIView):
    invoice = Invoice
    line_item = LineItem
    line_item_serializer = LineItemSerializer

    def get_invoice(self, pk):
        try:
            return self.invoice.objects.get(id=pk)
        except self.invoice.DoesNotExist:
            raise Http404

    def get_line_items(self, invoice):
        try:
            return self.line_item.objects.filter(invoice=invoice)
        except self.line_item.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        invoice = self.get_invoice(pk)
        invoice_rows = self.get_line_items(invoice)
        serializer = LineItemSerializer(invoice_rows, many=True)
        return Response(serializer.data)
