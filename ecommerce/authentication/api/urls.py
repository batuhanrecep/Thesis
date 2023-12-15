from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
#!------------------------------------------------------------------------------------------------------------------
from .views import SignupView, GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView, DeleteAccountView
#!------------------------------------------------------------------------------------------------------------------



#localhost/api/auth/...
urlpatterns = [
    #path('create-user-customer/', views.CreateUserCustomer.as_view(), name='create-user-customer'),
    #!
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('register', SignupView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view())
    #!

]





#!-------------------------------------------------------------------------------------
# router = DefaultRouter()
# router.register('customers', views.CustomerViewSet, basename='customers')
# urlpatterns += router.urls