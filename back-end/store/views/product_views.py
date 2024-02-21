from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.db.models import Q
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.utils import swagger_auto_schema
from utils.microservice import user_permission
from utils.pagination import StandardResultsSetPagination, Pagination
from utils.expected_fields import check_required_key
from utils.error_response import (
    success_response,
    bad_request_response,
    success_created_response,
    internal_server_response
)
from store.models import Product
from store.serializers.product_serializers import ProductsSerializer, ProductSerializer


class ProductCategories(APIView, Pagination):
    pagination_class = StandardResultsSetPagination
    serializer_class = ProductsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name', 'produtct_img', 'price', 'user', 'category']
    
    def get(self, request, pk):
        queryset = Product.objects.filter(category=pk).order_by('-id')
        search_name = request.query_params.get("name", None)
        search_price = request.query_params.get("price", None)
        search_category = request.query_params.get("category", None)
        sort_by = request.query_params.get("sort", None)

        if search_name:
            queryset = queryset.filter(Q(name__icontains=search_name))

        if search_category:
            queryset = queryset.filter(Q(category__id__icontains=search_category) | Q(category__name__icontains=search_category))

        if search_price:
            try:
                start_price, end_price = map(int, search_price.split(","))
                queryset = queryset.filter(Q(price__range=(start_price, end_price)))
            except ValueError:
                return bad_request_response("Value error, ranger")

        if sort_by == "price_asc":
            queryset = queryset.order_by("price")
        elif sort_by == "price_desc":
            queryset = queryset.order_by("-price")
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(queryset, many=True)
        return success_response(serializer.data)


class ProductsViews(APIView, Pagination):
    pagination_class = StandardResultsSetPagination
    serializer_class = ProductsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name', 'produtct_img', 'price', 'user', 'category']

    def get(self, request):
        queryset = Product.objects.all().order_by('-id')
        search_name = request.query_params.get("name", None)
        search_price = request.query_params.get("price", None)
        search_category = request.query_params.get("category", None)
        sort_by = request.query_params.get("sort", None)

        if search_name:
            queryset = queryset.filter(Q(name__icontains=search_name))

        if search_category:
            queryset = queryset.filter(Q(category__id__icontains=search_category) | Q(category__name__icontains=search_category))

        if search_price:
            try:
                start_price, end_price = map(int, search_price.split(","))
                queryset = queryset.filter(Q(price__range=(start_price, end_price)))
            except ValueError:
                return bad_request_response("Value error, ranger")

        if sort_by == "price_asc":
            queryset = queryset.order_by("price")
        elif sort_by == "price_desc":
            queryset = queryset.order_by("-price")
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(queryset, many=True)
        return success_response(serializer.data)

    @user_permission
    @swagger_auto_schema(request_body=ProductSerializer)
    def post(self, request, user_id=None, user_name=None):
        if user_id is None:
            return internal_server_response()
        valid_fields = {'id', 'name', 'produtct_img', 'price', 'user', 'category',}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")
        serializers = ProductSerializer(data=request.data, context={'user': user_id})
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return success_created_response(serializers.data)
        return bad_request_response(serializers.errors)


class ProductView(APIView):

    def get(self, request, pk):
        objects_list = get_object_or_404(Product, id=pk)
        serializers = ProductsSerializer(objects_list)
        return success_response(serializers.data)

    @user_permission
    @swagger_auto_schema(request_body=ProductSerializer)
    def put(self, request, pk, user_id=None, user_name=None):
        if user_id is None:
            return internal_server_response()
        valid_fields = {'id', 'name', 'produtct_img', 'price', 'user', 'category',}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")
        serializers = ProductSerializer(instance=Product.objects.filter(id=pk)[0], data=request.data, partial=True,)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return success_created_response(serializers.data)
        return bad_request_response(serializers.errors)

    @user_permission
    def delete(self, request, pk, user_id=None, user_name=None):
        if user_id is None:
            return internal_server_response()
        queryset = Product.objects.get(id=pk)
        if queryset.user == user_id:
            queryset.delete()
            return success_response("delete success")
        return bad_request_response("You are not allowed to delete this comment")
