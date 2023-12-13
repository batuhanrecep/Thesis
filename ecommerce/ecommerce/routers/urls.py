from rest_framework.routers import DefaultRouter
from product.api.urls import category_router, product_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(product_router.registry)
router.registry.extend(category_router.registry)

urlpatterns = [
    path('',include(router.urls))
]