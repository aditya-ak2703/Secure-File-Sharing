from django.contrib import admin

from files.models import File, SharableLink

# Register your models here.
admin.site.register(File)
admin.site.register(SharableLink)