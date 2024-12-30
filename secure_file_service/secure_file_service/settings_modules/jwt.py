from datetime import timedelta


REFRESH_TOKEN_LIFETIME = timedelta(days=30)

AUTH_COOKIE = 'access_token'
REFRESH_COOKIE = 'refresh_token'
SECURE_COOKIE = True
HTTP_ONLY_COOKIE = True
SAME_SITE_COOKIE = None