from django.urls import path
from files.views import FileListView, FileView, SharableLinkView, SharedFileView
from django.contrib.auth.decorators import login_not_required

urlpatterns = [
    path('file/', FileView.as_view()),
    path('files/', FileListView.as_view()),
    path('sharable-file/', SharableLinkView.as_view()),
    path('view-shared-file/', login_not_required(SharedFileView.as_view())),
]
