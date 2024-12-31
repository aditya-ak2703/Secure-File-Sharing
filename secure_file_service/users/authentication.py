import jwt
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.request import Request
from secure_file_service.settings_modules import jwt
from django.contrib.auth.middleware import LoginRequiredMiddleware
from rest_framework import status


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
        header = request.COOKIES.get(jwt.AUTH_COOKIE)

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