from django.db import models


class CatgeoryProduct(models.Model):
    name = models.CharField(max_length=250)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    produtct_img = models.ImageField(upload_to='product', null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    category = models.ForeignKey(CatgeoryProduct, on_delete=models.CASCADE, null=True, blank=True)
    user = models.IntegerField(null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CommentProduct(models.Model):
    comment = models.CharField(max_length=250, null=True, blank=True)
    user = models.CharField(max_length=250, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True, related_name='comment')
    create_at = models.DateTimeField(auto_now_add=True)



class Orders(models.Model):
    user = models.IntegerField(null=True, blank=True)
    product = models.JSONField(null=True, blank=True)
    location = models.JSONField(null=True, blank=True)
    amount = models.CharField(max_length=250, null=True, blank=True)
    is_payment = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
