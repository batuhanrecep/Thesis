from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView, TokenBlacklistView


#localhost/api/auth/...
#http://127.0.0.1:8000/api/auth/login/
#http://127.0.0.1:8000/api/auth/register/customer/
#http://127.0.0.1:8000/api/auth/register/seller/

urlpatterns = [
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),

    path('register/customer/', views.customer_register, name='customer register'),
    path('register/seller/', views.seller_register, name='seller register'),
    path('login/', views.login, name='login for all users'),
    path('breweries/', views.breweries, name='breweries'),

    path('getuser/', views.get_or_update_user_view, name='Get user view'),
    path('becomeseller/', views.become_seller_view, name='Become Seller'),

    path('changepassword/', views.change_password, name='Change Password'),
    
    #path('logout/', views.logout_view, name='logout view'),
    #path('logout/', LogoutView.as_view(), name='logout'),
]




