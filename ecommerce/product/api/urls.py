from django.urls import path, include
from . import views

#localhost/api
urlpatterns = [
    path('', views.product_list_create_view),
    path('<int:pk>/', views.product_detail_view), 
    path('update/<int:pk>/', views.product_update_view),
    path('delete/<int:pk>/', views.product_destroy_view)
] 