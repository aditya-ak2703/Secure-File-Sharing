import datetime
import random
import string
import time
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.request import Request
from secure_file_service.settings_modules import auth_settings
from django.contrib.auth.middleware import LoginRequiredMiddleware
from rest_framework import status
import jwt
from secure_file_service.settings import SECRET_KEY
from users.models import LoginOTP, User
from django.contrib.auth.backends import ModelBackend

HTTP_HEADER_ENCODING = 'iso-8859-1'

class CustomJWTAuthentication(JWTAuthentication):
    """
    A customized JWTAuthentication class to extract the JWT token from the cookie
    """

    def get_header(self, request: Request) -> bytes:
        """
        Extracts the cookie containing the JSON web token from the given
        request.
        """
        header = request.COOKIES.get(auth_settings.AUTH_COOKIE)

        if isinstance(header, str):
            # Work around django test client oddness
            header = header.encode(HTTP_HEADER_ENCODING)

        return header
    
class CustoJWTAuthenticationMiddleware():
    """
    A Django middleware adapter for CustomJWTAuthentication
    """

    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_authentication = CustomJWTAuthentication()
    
    def __call__(self, request):
        try: 
            auth_response = self.jwt_authentication.authenticate(request)
        except InvalidToken:
            auth_response = None

        if(auth_response):
            user, token = auth_response
            if(user.email_verified):
                request.user = auth_response[0]
            
        response = self.get_response(request)

        return response

class CustomLoginRequiredMiddleware(LoginRequiredMiddleware):
    """
    A customized Login required middleware to ensure 307 temperary redirect for unauthenticated calls
    """

    def handle_no_permission(self, request, view_func):
        res = super().handle_no_permission(request, view_func)
        res.status_code = status.HTTP_307_TEMPORARY_REDIRECT
        return res
    

class UserActivationTokenGenerator:
    """
    A class to generate tokens for user activation.
    This token will primarily be sent for email verification
    """

    algorithm = 'HS256'
    expry_duration = 60 * 30 # 30 minutes in seconds

    def generate_token(self, user: User) -> str:
        """
        Generates a token for the given user
        """
        return jwt.encode({'user_id': user.id, 'expiry': time.time() + self.expry_duration}, SECRET_KEY, self.algorithm)

    def verify_token(self, token: str) -> User | None:
        """
        Verifies the given token and returns the user if the token is valid
        """
        try:
            data = jwt.decode(token, SECRET_KEY, self.algorithm)
            user_id = data['user_id']
            timestamp = data['expiry']
            if(timestamp < time.time()):
                return None
            return User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        except User.DoesNotExist:
            return None

class CustomAuthenticatonBackend(ModelBackend):

    def user_can_authenticate(self, user):
        """
        Checks if the user can authenticate
        """
        return super().user_can_authenticate(user) and user.email_verified
    
class LoginOPTGenerator:
    """
    A class to generate
    """

    opt_length = 6
    expire_duration = 60 * 2

    def generate_opt(self, user: User) -> str:
        """
        Generates an OTP for the given user
        """
        characters = string.digits
        otp = ''.join(random.choice(characters) for _ in range(self.opt_length))
        return otp

    def refresh_opt(self, user: User):
        login_otp = None
        if(hasattr(user, 'loginotp')):
            login_otp = user.loginotp
        else:
            login_otp = LoginOTP()
            login_otp.user = user
        login_otp.otp = self.generate_opt(user)
        login_otp.expire_at = datetime.datetime.now() + datetime.timedelta(seconds=self.expire_duration)
        login_otp.save()
        return login_otp
