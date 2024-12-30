from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from rest_framework.request import Request
from secure_file_service.settings_modules import jwt    
from secure_file_service import settings
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_not_required

# Create your views here.
class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        token_response = super().post(request, *args, **kwargs)
        response = Response()
        response.set_cookie(
            key=jwt.AUTH_COOKIE,
            value=token_response.data["access"],
            httponly=jwt.HTTP_ONLY_COOKIE,
            secure=jwt.SECURE_COOKIE,
            samesite=jwt.SAME_SITE_COOKIE,
        )
        response.set_cookie(
            key = jwt.REFRESH_COOKIE,
            value=token_response.data["refresh"],
            httponly=jwt.HTTP_ONLY_COOKIE,
            secure=jwt.SECURE_COOKIE,
            samesite=jwt.SAME_SITE_COOKIE,
            path=reverse(settings.LOGIN_URL)
        )
        return response

class RefreshView(TokenRefreshView):

    def get_refresh_token(self, request):
        return request.COOKIES.get(jwt.REFRESH_COOKIE)
    
    def post(self, request, *args, **kwargs):

        refresh_token = self.get_refresh_token(request)
        if(refresh_token is None):
            return Response(status=status.HTTP_403_FORBIDDEN)

        token_request = Request()
        token_request.data.update({'refresh': refresh_token})

        token_response = super().post(token_request, *args, **kwargs)
        response = Response() if request.query_params.get('next', None) is None else HttpResponseRedirect(request.query_params.get('next'))
        response.set_cookie(
            key=jwt.AUTH_COOKIE,
            value=token_response.data["access"],
            httponly=jwt.HTTP_ONLY_COOKIE,
            secure=jwt.SECURE_COOKIE,
            samesite=jwt.SAME_SITE_COOKIE,
        )
        if('refresh' in token_response.data):
            response.set_cookie(
                key=jwt.REFRESH_COOKIE,
                value=token_response.data["refresh"],
                httponly=jwt.HTTP_ONLY_COOKIE,
                secure=jwt.SECURE_COOKIE,
                samesite=jwt.SAME_SITE_COOKIE,
                path=reverse(settings.LOGIN_URL)
            )
        return response

@login_not_required
@api_view(['GET'])
def protected_view(request):
    return Response(data="Protected View", status=status.HTTP_200_OK)