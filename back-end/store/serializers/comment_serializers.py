from rest_framework import serializers
from store.models import CommentProduct


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentProduct
        fields = ['id', 'comment', 'user', 'product', 'create_at']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentProduct
        fields = ['id', 'comment', 'user', 'product', 'create_at']
    
    def create(self, validated_data):
        comment = CommentProduct.objects.create(**validated_data)
        comment.user = self.context.get('user')
        comment.save()
        return comment

    def update(self, instance, validated_data):
        instance.comment = validated_data.get("comment", instance.comment)
        instance.save()
        return instance