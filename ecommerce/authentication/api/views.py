from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView, CreateAPIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from ..models import UserAccount
import requests
from .serializers import CustomerSerializer, SellerSerializer, UpdateUserSerializer, GetUserSerializer, ChangePasswordSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import OutstandingToken, BlacklistedToken


#! CUSTOMER REGISTER
@api_view(['POST'])
def customer_register(request):
    """
    Registers a customer by email and password.
    """
    if request.method == 'POST':
        try:
            # Deserialize data.
            serializer = CustomerSerializer(data=request.data)

            try:
                # Check if the user with the same email already exists.
                existing_user = UserAccount.objects.get(email=request.data.get('email'))
                return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                # User does not exist, continue with registration
                pass  

            if serializer.is_valid():
                # Save user
                user = serializer.save()
                return Response({'user': user.email, 'firstname': user.firstname, 'lastname':user.lastname, 'type': user.type}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(e)
            return Response({'error': 'An error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#!//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

#! SELLER REGISTER
@api_view(['POST'])
def seller_register(request):
    """
    Registers a seller by email and password.
    """
    if request.method == 'POST':
        try:
            # Deserialize data.
            serializer = SellerSerializer(data=request.data)

            try:
                # Check if the user with the same email already exists.
                existing_user = UserAccount.objects.get(email=request.data.get('email'))
                return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                # User does not exist, continue with registration
                pass  

            if serializer.is_valid():
                # Save user
                user = serializer.save()
                return Response({'user': user.email, 'firstname': user.firstname, 'lastname':user.lastname, 'type': user.type}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(e)
            return Response({'error': 'An error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#!//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

#! LOGIN
@api_view(['POST'])
def login(request):
    """
    Returns JWT if the email and password exist and match.
    """
    if request.method == 'POST':
        try:
            email = request.data.get('email')
            password = request.data.get('password')

            user = authenticate(email=email, password=password)

            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                return Response({'token': access_token, 'type': user.type}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({'error': 'Problem'}, status=status.HTTP_400_BAD_REQUEST)
        
#!//---------------------------------------------------------------------------------------------------------------------------------------------------------------------


#! Get User or Update user
class GetOrUpdateUserAPIView(RetrieveUpdateAPIView):
    serializer_class = GetUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

get_or_update_user_view = GetOrUpdateUserAPIView.as_view()

#!//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

#! Update User Type 
class BecomeSellerAPIView(UpdateAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

become_seller_view = BecomeSellerAPIView.as_view()

#!//---------------------------------------------------------------------------------------------------------------------------------------------------------------------


#! Change Password 
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user

            if not user.check_password(serializer.validated_data['old_password']):
                return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()

            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#!//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def breweries(request):
    """
    Sends request to the api.openbrewerydb if user is authenticated.
    """
    if request.method == 'GET':
        query_param = request.GET.get('query')
        if query_param:
            url = f'https://api.openbrewerydb.org/breweries/search?query={query_param}'
        else:
            url = 'https://api.openbrewerydb.org/breweries'

        response = requests.get(url)
        data = response.json()
        return Response(data)
