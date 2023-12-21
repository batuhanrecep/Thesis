from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


#localhost/api/auth/...
#http://127.0.0.1:8000/api/auth/login/
#http://127.0.0.1:8000/api/auth/register/customer/
#http://127.0.0.1:8000/api/auth/register/seller/

urlpatterns = [
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),
    path('register/customer/', views.customer_register, name='register'),
    path('register/seller/', views.seller_register, name='register'),
    path('login/', views.login, name='login'),
    path('breweries/', views.breweries, name='breweries'),
]




