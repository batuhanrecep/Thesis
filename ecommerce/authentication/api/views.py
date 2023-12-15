from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions, generics
from django.contrib import auth
from rest_framework.response import Response
#!from user_profile.models import UserProfile
from .serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator



class CheckAuthenticatedAPIView(generics.ListAPIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })
        
check_authenticated_view = CheckAuthenticatedAPIView.as_view()

#//---------------------------------------------------------------------------------------------------

@method_decorator(csrf_protect, name='dispatch')
class RegisterAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )
    
    

    def create(self, request, format=None):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        username = data['username']
        password = data['password']
        re_password = data.get('re_password')

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({ 'error': 'Username already exists' })
                else:
                    if len(password) < 6:
                        return Response({ 'error': 'Password must be at least 6 characters' })
                    else:
                        user = User.objects.create_user(username=username, password=password)

                        user = User.objects.get(id=user.id)

                        #!user_profile = UserProfile.objects.create(user=user, first_name='', last_name='', phone='', city='')

                        return Response({ 'success': 'User created successfully' })
            else:
                return Response({ 'error': 'Passwords do not match' })
        except:
                return Response({ 'error': 'Something went wrong when registering account' })

register_view = RegisterAPIView.as_view()

#//---------------------------------------------------------------------------------------------------

@method_decorator(csrf_protect, name='dispatch')
class LoginAPIView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success': 'User authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })
        
login_view = LoginAPIView.as_view()

#//---------------------------------------------------------------------------------------------------

class LogoutAPIView(generics.CreateAPIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })
    
logout_view = LogoutAPIView.as_view()

#//---------------------------------------------------------------------------------------------------

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })
    
get_csrf_token_view = GetCSRFToken.as_view()

#//---------------------------------------------------------------------------------------------------

class DeleteAccountAPIView(generics.DestroyAPIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({ 'success': 'User deleted successfully' })
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user' })
        
delete_account_view = DeleteAccountAPIView.as_view()