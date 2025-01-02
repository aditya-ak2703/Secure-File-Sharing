from rest_framework.views import APIView

class CustomAPIView(APIView):
    def initialize_request(self, request, *args, **kwargs):
        user = request.user
        req =  super().initialize_request(request, *args, **kwargs)
        req.user = user
        return req