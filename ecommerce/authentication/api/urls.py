from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

#localhost/api/auth/...
urlpatterns = [
    path('create-user-customer/', views.CreateUserCustomer.as_view(), name='create-user-customer'),
]

router = DefaultRouter()

router.register('customers', views.CustomerViewSet, basename='customers')

urlpatterns += router.urls