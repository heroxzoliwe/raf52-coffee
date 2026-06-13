from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view),

    path('auth/register/', views.RegisterView.as_view()),
    path('auth/login/', views.LoginView.as_view()),
    path('auth/profile/', views.ProfileView.as_view()),

    path('categories/', views.CategoryListView.as_view()),

    path('products/', views.ProductListView.as_view()),
    path('products/<slug:category_slug>/', views.ProductListView.as_view()),
    path('product/<slug:category_slug>/<slug:slug>/', views.ProductDetailView.as_view()),

    path('stores/', views.StoreListView.as_view()),

    path('orders/', views.OrderListView.as_view()),
    path('orders/create/', views.OrderCreateView.as_view()),

    path('feedback/', views.FeedbackCreateView.as_view()),
    path('feedback/list/', views.FeedbackListView.as_view()),
]