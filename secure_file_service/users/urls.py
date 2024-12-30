from django.urls import path
from .views import LoginView, RefreshView, protected_view
from django.contrib.auth.decorators import login_not_required


urlpatterns = [
    path('login/', login_not_required(LoginView.as_view()), name='login'),
    path('refresh/', login_not_required(RefreshView.as_view()), name='refresh'),
    path('dummy/', protected_view),
]