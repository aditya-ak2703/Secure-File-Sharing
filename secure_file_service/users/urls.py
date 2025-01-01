from django.urls import path
from .views import GenerateOPTView, LoginView, RefreshView, UserRegistrationView, UserActivationView, LogoutView
from django.contrib.auth.decorators import login_not_required
import users.business

urlpatterns = [
    path('generate-otp/', login_not_required(GenerateOPTView.as_view()), name='generate-opt'),
    path('login/', login_not_required(LoginView.as_view()), name='login'),
    path('logout/', login_not_required(LogoutView.as_view()), name='logout'),
    path('refresh/', login_not_required(RefreshView.as_view()), name='refresh'),
    path('register/', login_not_required(UserRegistrationView.as_view()), name='register'),
    path('activate/<str:token>/', UserActivationView.as_view(), name='activate'),
]
