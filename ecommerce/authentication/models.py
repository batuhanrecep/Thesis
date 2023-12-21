from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import Permission, Group
from django.contrib.auth.models import Permission


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):

        if not email or len(email) <= 0 : 
            raise  ValueError("Email field is required !")
        if not password :
            raise ValueError("Password is must !")
        

        user = self.model(
            email = self.normalize_email(email),
              **extra_fields
              )
        user.set_password(password) 
        user.save(using=self._db)  
        
        return user

    def create_superuser(self, email,  password=None, **extra_fields):
 
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True  
        user.is_superuser = True  
        user.save(using=self._db)
        return user
    
class UserAccount(AbstractBaseUser, PermissionsMixin):
    class Types(models.TextChoices):
        CUSTOMER = "CUSTOMER" , "customer"
        SELLER = "SELLER" , "seller"
        
    type = models.CharField(max_length = 8 , choices = Types.choices , default = Types.CUSTOMER)
    email = models.EmailField(max_length = 200 , unique = True)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    
    is_customer = models.BooleanField(default = False)
    is_seller = models.BooleanField(default = False)
    


    USERNAME_FIELD = "email"
    
    objects = AppUserManager()
    
    
    def __str__(self):
        return str(self.email)
    
    def has_perm(self, perm, obj=None):
        # Check if the user has the specific permission required for admin access
        return self.is_superuser

    def has_module_perms(self, app_label):
        return True
    
    def save(self , *args , **kwargs):
        if not self.type or self.type == None : 
            self.type = UserAccount.Types.CUSTOMER
        return super().save(*args , **kwargs)   
    
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='user_groups',  # Added related_name
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_name='user_permissions_set',  # Added related_name
        related_query_name='user',
    )


class CustomerManager(models.Manager):

    def create_user(self, email, firstname, lastname, password = None):
        if not email or len(email) <= 0 : 
            raise  ValueError("Email field is required !")
        if not password :
            raise ValueError("Password is must !")
        email  = email.lower()
        user = self.model(
            email = email,
            firstname= firstname,
            lastname = lastname
        )
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def get_queryset(self , *args,  **kwargs):
        queryset = super().get_queryset(*args , **kwargs)
        queryset = queryset.filter(type = UserAccount.Types.CUSTOMER)
        return queryset  

class Customer(UserAccount):
    class Meta :
        proxy = True

    objects = CustomerManager()
    
    def save(self , *args , **kwargs):
        if not self.id or self.id == None : 
            self.type = UserAccount.Types.CUSTOMER
            self.is_customer = True
        return super().save(*args , **kwargs)

class CustomerProfile(models.Model):
    user = models.OneToOneField(Customer, on_delete=models.CASCADE, primary_key=True)
    deneme = models.CharField(max_length=8, blank=True, null=True)

class SellerManager(models.Manager):
    
    def create_user(self, email, firstname, lastname, password = None):
        if not email or len(email) <= 0 : 
            raise  ValueError("Email field is required !")
        if not password :
            raise ValueError("Password is must !")
        email = email.lower()
        user = self.model(
            email = email,
            firstname= firstname,
            lastname = lastname
        )
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def get_queryset(self , *args , **kwargs):
        queryset = super().get_queryset(*args , **kwargs)
        queryset = queryset.filter(type = UserAccount.Types.SELLER)
        return queryset

class Seller(UserAccount):
    class Meta :
        proxy = True
    objects = SellerManager()
    
    def save(self  , *args , **kwargs):
        if not self.id or self.id == None : 
            self.type = UserAccount.Types.SELLER
            self.is_seller = True
            
        return super().save(*args , **kwargs)
    

    
