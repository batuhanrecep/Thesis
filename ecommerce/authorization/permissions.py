from rest_framework import permissions
from .models import Customer

class UnknownPermission(permissions.IsAdminUser):
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