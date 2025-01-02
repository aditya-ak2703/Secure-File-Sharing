import datetime
import json
from math import exp
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.response import Response
from common.APIView import CustomAPIView
from secure_file_service.settings_modules import auth_settings    
from secure_file_service import settings
from rest_framework import status
from rest_framework.views import APIView

from users.authentication import LoginOPTGenerator, UserActivationTokenGenerator
from users.business import send_login_opt
from users.serializers import UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate


# Create your views here.

class GenerateOPTView(CustomAPIView):
    
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if(user):
            login_otp = LoginOPTGenerator().refresh_opt(user)
            send_login_opt(user, login_otp.otp)
            res  = {"message": "OPT sent successfully!"}
            return Response(res, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        user = serializer.user
        if not (hasattr(user, 'loginotp') and user.loginotp.expire_at.timestamp() > datetime.datetime.now().timestamp() and user.loginotp.otp == request.data['otp']):
            res = {"message": "Invalid OTP"}
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        response = Response({'mesage': 'Login successful!', 'user': UserProfileSerializer(user).data})
        response.set_cookie(
            key= auth_settings.AUTH_COOKIE,
            value = f"{auth_settings.AUTH_HEADER_TYPES[0]} {data["access"]}",
            httponly=auth_settings.HTTP_ONLY_COOKIE,
            secure=auth_settings.SECURE_COOKIE,
            samesite=auth_settings.SAME_SITE_COOKIE,
        )
        response.set_cookie(
            key = auth_settings.REFRESH_COOKIE,
            value=data["refresh"],
            httponly=auth_settings.HTTP_ONLY_COOKIE,
            secure=auth_settings.SECURE_COOKIE,
            samesite=auth_settings.SAME_SITE_COOKIE,
            path=settings.LOGIN_URL
        )
        return response
    


    

class UserProfileView(CustomAPIView):

    def get(self, request):
        user = request.user
        return Response(UserProfileSerializer(user).data)
    
class LogoutView(CustomAPIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(
            key=auth_settings.AUTH_COOKIE,
        )
        response.delete_cookie(
            key=auth_settings.REFRESH_COOKIE,
            path=reverse(settings.LOGIN_URL)
        )
        return response

class RefreshView(TokenRefreshView):

    def get_refresh_token(self, request):
        return request.COOKIES.get(auth_settings.REFRESH_COOKIE)
    
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
            response = HttpResponseRedirect(settings.PROXY_PREFIX + request.query_params.get('next'))
            response.status_code = status.HTTP_307_TEMPORARY_REDIRECT
        else: 
            response = Response()
        response.set_cookie(
            key=auth_settings.AUTH_COOKIE,
            value = f"{auth_settings.AUTH_HEADER_TYPES[0]} {token_response.data["access"]}",
            httponly=auth_settings.HTTP_ONLY_COOKIE,
            secure=auth_settings.SECURE_COOKIE,
            samesite=auth_settings.SAME_SITE_COOKIE,
        )
        if('refresh' in token_response.data):
            response.set_cookie(
                key=auth_settings.REFRESH_COOKIE,
                value=token_response.data["refresh"],
                httponly=auth_settings.HTTP_ONLY_COOKIE,
                secure=auth_settings.SECURE_COOKIE,
                samesite=auth_settings.SAME_SITE_COOKIE,
                path=reverse(settings.LOGIN_URL)
            )
        return response

class UserRegistrationView(CustomAPIView):

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserActivationView(CustomAPIView):

    def get(self, request, *args, **kwargs):
        user = UserActivationTokenGenerator().verify_token(kwargs['token'])
        if(user and not user.email_verified):
            user.email_verified = True
            user.save()
            return Response("Email verified successfully!", status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
