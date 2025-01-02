from uuid import uuid4
from django.db import models
from django.contrib.auth import get_user_model


# Create your models here.
class File(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    file_name = models.CharField(max_length=300)
    content = models.TextField()

class SharableLink(models.Model):
    VIEW = 'VIEW'
    DOWNLOAD = 'DOWNLOAD'
    PERMISSIONS = {
        VIEW: "VIEW",
        DOWNLOAD: "DOWNLOAD",
    }
    parent_file = models.ForeignKey(File, on_delete=models.CASCADE)
    permission = models.CharField(max_length=10, choices=PERMISSIONS)
    expiry = models.DateTimeField()
    uuid = models.UUIDField(default=uuid4, editable=False)