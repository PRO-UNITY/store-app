from rest_framework import serializers
from store.models import CatgeoryProduct


class ProductCategorysSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatgeoryProduct
        fields = ['id', 'name']


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CatgeoryProduct
        fields = ['id', 'name']
    
    def create(self, validated_data):
        category = CatgeoryProduct.objects.create(**validated_data)
        category.save()
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance