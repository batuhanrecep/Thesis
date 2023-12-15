from django.db import transaction
from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
#!-----------------------------------------------------------------------------------------------
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from .serializers import UserSerializer
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import permissions
from django.contrib import auth
#from user_profile.models import UserProfile
#!-----------------------------------------------------------------------------------------------
#from authentication.models import Customer
#from .serializers import CreateUserSerializer, CustomerSerializer, UpdateCustomerSerializer, CreateUserCustomerSerializer, CreateCustomerSerializer




class CheckAuthenticatedView(APIView):
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

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password  = data['re_password']

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

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
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

class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({ 'success': 'User deleted successfully' })
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user' })












#!-------------------------------------------------------------------------------------
# class CustomerViewSet(viewsets.ModelViewSet):
#     class Permission(permissions.IsAdminUser):
#         def has_permission(self, request, view):
#             # Give non-admin permission to create customer object if the user is authenticated
#             # and the object hasn't been created before.
#             if view.action == 'create' and request.user \
#                     and Customer.objects.filter(user=request.user.id).count() == 0:
#                 return True

#             # Use implementation IsAdminUser if the action is `list`
#             if view.action == 'list':
#                 return super().has_permission(request, view)

#             # else allow all other actions which are object level ones
#             # (handled by `has_object_permission`)
#             return True

#         def has_object_permission(self, request, view, customer):
#             # Only allow if it is their own customer instance
#             if request.user == customer.user:
#                 return True
#             return False

#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer
#     #permission_classes = [Permission]

#     @action(detail=False, methods=["GET", "PUT"]) #, permission_classes=[permissions.IsAuthenticated] #! İçerisindeydi 
#     def me(self, request):
#         user = request.user
#         customer = get_object_or_404(Customer, user_id=user.id)

#         method = request.method

#         if method == 'GET':
#             serializer = CustomerSerializer(customer)
#             return Response(serializer.data)

#         if method == 'PUT':
#             serializer = UpdateCustomerSerializer(customer, data=request.data)
#             serializer.is_valid(raise_exception=True)

#             user.first_name = serializer.validated_data.get('first_name', user.first_name)
#             user.last_name = serializer.validated_data.get('last_name', user.last_name)
#             user.email = serializer.validated_data.get('email', user.last_name)

#             user.save()
#             serializer.save()

#             return Response(request.data, status=status.HTTP_200_OK)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

#     def perform_destroy(self, customer):
#         super().perform_destroy(customer)
#         customer.user.delete()

# #//----------------------------------------------------------------------------------------------------------
        

# class CreateUserCustomer(generics.CreateAPIView):
#     #permission_classes = [permissions.AllowAny]
#     serializer_class = CreateUserCustomerSerializer
#     queryset = Customer.objects.all()

#     def post(self, request):
#         with transaction.atomic():
#             customer_serializer = CreateCustomerSerializer(data=request.data)
#             customer_serializer.is_valid(raise_exception=True)
#             user_serializer = CreateUserSerializer(data=request.data)
#             user_serializer.is_valid(raise_exception=True)
#             user_serializer.validated_data["is_active"] = True

#             user = user_serializer.save()
#             customer_serializer.save(user=user)

#             return Response(request.data, status=status.HTTP_201_CREATED)