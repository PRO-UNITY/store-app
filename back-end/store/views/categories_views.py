from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from utils.pagination import StandardResultsSetPagination, Pagination
from utils.microservice import user_permission
from utils.expected_fields import check_required_key
from utils.error_response import success_response, bad_request_response, success_created_response, internal_server_response
from store.models import CatgeoryProduct
from store.serializers.categories_serializers import ProductCategorysSerializer, ProductCategorySerializer


class CategoriesViews(APIView, Pagination):
    pagination_class = StandardResultsSetPagination
    serializer_class = ProductCategorysSerializer

    def get(self, request):
        queryset = CatgeoryProduct.objects.all().order_by('-id')
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(queryset, many=True)
        return success_response(serializer.data)

    @user_permission
    @swagger_auto_schema(request_body=ProductCategorySerializer)
    def post(self, request, user_id=None, user_name=None):
        if user_id is None:
            return internal_server_response()
        valid_fields = {"id", "name",}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")
        serializers = ProductCategorySerializer(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return success_created_response(serializers.data)
        return bad_request_response(serializers.errors)


class CaregoryView(APIView):

    def get(self, request, pk):
        objects_list = get_object_or_404(CatgeoryProduct, id=pk)
        serializers = ProductCategorysSerializer(objects_list)
        return success_response(serializers.data)

    @user_permission
    @swagger_auto_schema(request_body=ProductCategorySerializer)
    def put(self, request, pk, user_id=None, user_name=None):
        if user_id is None:
            return internal_server_response()
        valid_fields = {"id", "name",}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")
        serializers = ProductCategorySerializer(instance=CatgeoryProduct.objects.filter(id=pk)[0], data=request.data, partial=True,)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return success_created_response(serializers.data)
        return bad_request_response(serializers.errors)

    @user_permission
    def delete(self, request, pk, user_id=None, user_name=None):
        if user_id is None:
            return internal_server_response()
        queryset = CatgeoryProduct.objects.get(id=pk)
        queryset.delete()
        return success_response("delete success")