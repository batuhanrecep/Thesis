from django.urls import path
from . import views



#localhost/api/auth/...
#http://127.0.0.1:8000/api/auth/login/
#http://127.0.0.1:8000/api/auth/register/customer/
#http://127.0.0.1:8000/api/auth/register/seller/

urlpatterns = [
    path('register/customer/', views.customer_register, name='register'),
    path('register/seller/', views.seller_register, name='register'),
    path('login/', views.login, name='login'),
    #path('breweries/', views.breweries, name='breweries'),
]




