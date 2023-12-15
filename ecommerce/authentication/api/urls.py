from django.urls import path
from . import views



#localhost/api/auth/...
urlpatterns = [
    
    path('authenticated', views.check_authenticated_view),
    path('register', views.register_view),
    path('login', views.login_view),
    path('logout', views.logout_view),
    path('delete', views.delete_account_view),
    path('csrf_cookie', views.get_csrf_token_view)
    
]





