import datetime
from common.APIView import CustomAPIView
from files.models import File, SharableLink
from files.serializers import FilesSerializer, SharableLinkSerializer
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status



# Create your views here.
class FileView(CustomAPIView):

    def post(self, request):
        data = request.data
        data['owner'] = request.user.id
        fs = FilesSerializer(data=data)
        if(fs.is_valid()):
            fs.save()
            return Response(data=fs.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class FileListView(CustomAPIView):

    def get(self, request: Request):
        files = File.objects.filter(owner = request.user)
        fs = FilesSerializer(files, many = True)
        return Response(fs.data)
    

class SharableLinkView(CustomAPIView):

    def get(self, request: Request):
        sharable_link = SharableLink.objects.get(uuid = request.query_params.get('uuid'))
        if sharable_link.expiry.timestamp() <= datetime.datetime.now().timestamp():
            return Response(status = status.HTTP_401_UNAUTHORIZED)
        file = sharable_link.parent_file
        file_serialier = FilesSerializer(file)
        sharable_link_serializer = SharableLinkSerializer(sharable_link)
        return Response({
            'file': file_serialier.data,
            'sharable_link': sharable_link_serializer.data
        })

    def post(self, request: Request):
        data = request.data
        file = File.objects.get(id = data['parent_file'])
        if(file.owner.id == request.user.id):
            serializer = SharableLinkSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
    

class SharedFileView(CustomAPIView):

    def get(self, request: Request):
        sharable_link = SharableLink.objects.get(uuid = request.query_params.get('uuid'))
        if sharable_link.expiry.timestamp() <= datetime.datetime.now().timestamp():
            return Response(status = status.HTTP_401_UNAUTHORIZED)
        file = sharable_link.parent_file
        file_serialier = FilesSerializer(file)
        sharable_link_serializer = SharableLinkSerializer(sharable_link)
        return Response({
            'file': file_serialier.data,
            'sharable_link': sharable_link_serializer.data
        })