from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from secure_file_service.settings_modules import jwt    
from secure_file_service import settings
from rest_framework import status

# Create your views here.
class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        token_response = super().post(request, *args, **kwargs)
        response = Response()
        response.set_cookie(
            key= jwt.AUTH_COOKIE,
            value = f"{jwt.AUTH_HEADER_TYPES[0]} {token_response.data["access"]}",
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
    
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):

        refresh_token = self.get_refresh_token(request)
        if(refresh_token is None):
            return Response(status=status.HTTP_403_FORBIDDEN)

        # token_request = Request()
        # token_request.data.update({'refresh': refresh_token})
        request.data.update({'refresh': refresh_token})

        token_response = super().post(request, *args, **kwargs)
        response = None
        if request.query_params.get('next', None):
            response = HttpResponseRedirect(request.query_params.get('next'))
            response.status_code = status.HTTP_307_TEMPORARY_REDIRECT
        else: 
            response = Response()
        response.set_cookie(
            key=jwt.AUTH_COOKIE,
            value = f"{jwt.AUTH_HEADER_TYPES[0]} {token_response.data["access"]}",
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
