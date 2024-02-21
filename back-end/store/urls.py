from django.urls import path
from store.views.categories_views import (
    CategoriesViews,
    CaregoryView,
)
from store.views.product_views import (
    ProductsViews,
    ProductView,
    ProductCategories,
)
from store.views.comment_views import CommentsViews, CommentView
from store.views.order_views import OrdersViews, OrderView

urlpatterns = [
    path('categorys', CategoriesViews.as_view()),
    path('category/<int:pk>', CaregoryView.as_view()),
    # product
    path('products', ProductsViews.as_view()),
    path('product/<int:pk>', ProductView.as_view()),
    path('product/category/<int:pk>', ProductCategories.as_view()),
    # comment
    path('comments', CommentsViews.as_view()),
    path('comment/<int:pk>', CommentView.as_view()),
    # order
    path('orders', OrdersViews.as_view()),
    path('order/<int:pk>', OrderView.as_view()),

]