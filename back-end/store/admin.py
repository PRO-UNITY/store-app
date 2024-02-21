from django.contrib import admin
from store.models import (
    CatgeoryProduct,
    Product,
    CommentProduct,
    Orders

)

admin.site.register(CatgeoryProduct)
admin.site.register(Product)
admin.site.register(CommentProduct)
admin.site.register(Orders)
