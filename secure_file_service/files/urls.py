from django.urls import path
from files.views import FileListView, FileView, SharableLinkView, SharedFileView

urlpatterns = [
    path('file/', FileView.as_view()),
    path('files/', FileListView.as_view()),
    path('sharable-file/', SharableLinkView.as_view()),
    path('view-shared-file/', SharedFileView.as_view()),
]
