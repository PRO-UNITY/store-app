from rest_framework import serializers
import stripe
from store.serializers.product_serializers import ProductsSerializer
from store.models import Orders


class OrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orders
        fields = ['id', 'user', 'product', 'location', 'amount', 'is_payment']


class OrderSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = Orders
        fields = ['id', 'user', 'product', 'location', 'amount', 'token', 'is_payment']
    
    def create(self, validated_data):
        stripe.api_key = "sk_test_51OirCFLZ26NOlTGBlprWJXdfakpoZ8Y6cnS8t2eq7sumT26UT5SDt5qW99j5oZEIxhkTBcomG8HfAbR5h2Ye7hND00xsAUxZxV"
        user = self.context.get('user')
        token = validated_data.pop('token', None)
        amount = validated_data['amount']
        currency = "usd"

        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount),
                currency=currency,
                payment_method_types=["card"],
                payment_method=token,
                confirm=True
            )

            order = Orders.objects.create(
                user=user,
                **validated_data
            )
            return order

        except stripe.error.StripeError as e:
            raise serializers.ValidationError({'error': f"Stripe error: {str(e)}"})

        except Exception as e:
            raise serializers.ValidationError({'error': f"An error occurred: {str(e)}"})
