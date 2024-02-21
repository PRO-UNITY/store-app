from rest_framework import serializers
from store.serializers.categories_serializers import ProductCategorysSerializer
from store.serializers.comment_serializers import CommentsSerializer
from store.models import Product


class ProductsSerializer(serializers.ModelSerializer):
    category = ProductCategorysSerializer(read_only=True)
    comment = CommentsSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'produtct_img', 'price', 'user', 'category', 'comment']


class ProductSerializer(serializers.ModelSerializer):
    produtct_img = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'produtct_img', 'price', 'user', 'category']
    
    def create(self, validated_data):
        product = Product.objects.create(**validated_data)
        product.user = self.context.get('user')
        product.save()
        return product

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.price = validated_data("price", instance.price)
        instance.category = validated_data("category", instance.category)
        if instance.produtct_img == None:
            instance.produtct_img = self.context.get("produtct_img")
        else:
            instance.produtct_img = validated_data.get("produtct_img", instance.produtct_img)
        instance.save()
        return instance