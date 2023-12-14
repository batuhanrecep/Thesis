from django.db import transaction
from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from authentication.models import Customer

from .serializers import CreateUserSerializer, CustomerSerializer, UpdateCustomerSerializer, CreateUserCustomerSerializer, CreateCustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    class Permission(permissions.IsAdminUser):
        def has_permission(self, request, view):
            # Give non-admin permission to create customer object if the user is authenticated
            # and the object hasn't been created before.
            if view.action == 'create' and request.user \
                    and Customer.objects.filter(user=request.user.id).count() == 0:
                return True

            # Use implementation IsAdminUser if the action is `list`
            if view.action == 'list':
                return super().has_permission(request, view)

            # else allow all other actions which are object level ones
            # (handled by `has_object_permission`)
            return True

        def has_object_permission(self, request, view, customer):
            # Only allow if it is their own customer instance
            if request.user == customer.user:
                return True
            return False

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    #permission_classes = [Permission]

    @action(detail=False, methods=["GET", "PUT"]) #, permission_classes=[permissions.IsAuthenticated] #! İçerisindeydi 
    def me(self, request):
        user = request.user
        customer = get_object_or_404(Customer, user_id=user.id)

        method = request.method

        if method == 'GET':
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)

        if method == 'PUT':
            serializer = UpdateCustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)

            user.first_name = serializer.validated_data.get('first_name', user.first_name)
            user.last_name = serializer.validated_data.get('last_name', user.last_name)
            user.email = serializer.validated_data.get('email', user.last_name)

            user.save()
            serializer.save()

            return Response(request.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, customer):
        super().perform_destroy(customer)
        customer.user.delete()

#//----------------------------------------------------------------------------------------------------------
        

class CreateUserCustomer(generics.CreateAPIView):
    #permission_classes = [permissions.AllowAny]
    serializer_class = CreateUserCustomerSerializer
    queryset = Customer.objects.all()

    def post(self, request):
        with transaction.atomic():
            customer_serializer = CreateCustomerSerializer(data=request.data)
            customer_serializer.is_valid(raise_exception=True)
            user_serializer = CreateUserSerializer(data=request.data)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.validated_data["is_active"] = True

            user = user_serializer.save()
            customer_serializer.save(user=user)

            return Response(request.data, status=status.HTTP_201_CREATED)