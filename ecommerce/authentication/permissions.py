from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user
    
class IsAddressOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the user making the request is the owner of the address
        return obj.user == request.user