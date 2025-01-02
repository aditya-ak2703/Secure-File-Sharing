from rest_framework import serializers

from files.models import File, SharableLink


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'

class SharableLinkSerializer(serializers.ModelSerializer):
    class Meta: 
        model = SharableLink
        fields = '__all__'