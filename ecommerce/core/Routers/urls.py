from rest_framework.routers import DefaultRouter
from product.api.routers import category_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(category_router.registry)

#localhost/api/...
urlpatterns = [
    path('categories/', include(router.urls)),
    path('', include('product.api.urls')),
    path('basket/', include('basket.api.urls')),
    path('auth/', include('authentication.api.urls')),
]
