from django.urls import path
from .views import get_photos, get_photo, create_photo, edit_photo, delete_photo, get_progress

urlpatterns = [
    path("api/photos/", get_photos, name="get_photos"),
    path("api/photos/<int:photo_id>/", get_photo, name="get_photo"),
    path("api/create_photo/", create_photo, name="create_photo"),
    path("api/edit_photo/<int:photo_id>/", edit_photo, name="edit_photo"),
    path("api/delete_photo/<int:photo_id>/", delete_photo, name="delete_photo"),
    path("api/progress/<int:photo_id>/", get_progress, name="get_progress"),
]
