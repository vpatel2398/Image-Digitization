from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Photo
from .serializers import PhotoSerializer
import time

@api_view(["GET"])
def get_photos(request):
    """Retrieve all photos"""
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_photo(request, photo_id):
    """Retrieve a specific photo by its ID"""
    photo = get_object_or_404(Photo, id=photo_id)
    serializer = PhotoSerializer(photo)
    return Response(serializer.data)

@api_view(["POST"])
def create_photo(request):
    """Add a new photo"""
    # Validate required fields
    title = request.data.get("title")
    slot_number = request.data.get("slot_number")
    cameras = request.data.get("cameras")

    if not title or not slot_number or not cameras:
        return Response({"error": "Title, Slot Number, and Cameras are required."}, status=400)

    # Create the photo instance
    photo = Photo.objects.create(
        title=title,
        slot_number=slot_number,
        cameras=cameras
    )

    # Calculate time left based on cameras
    photo.calculate_time_left()

    # Serialize the photo data and return the response
    serializer = PhotoSerializer(photo)
    return Response(serializer.data, status=201)

@api_view(["PUT"])
def edit_photo(request, photo_id):
    """Edit the title of the photo."""
    try:
        photo = get_object_or_404(Photo, id=photo_id)

        # Only allow editing the title, slot_number and cameras are immutable
        title = request.data.get("title", photo.title)

        photo.title = title
        photo.save()

        return Response({
            "id": photo.id,
            "title": photo.title,
            "slot_number": photo.slot_number,
            "cameras": photo.cameras,
        })

    except Photo.DoesNotExist:
        return Response({"error": "Photo not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
def delete_photo(request, photo_id):
    """Delete a photo"""
    photo = get_object_or_404(Photo, id=photo_id)
    photo.delete()
    return Response({"message": "Photo deleted!"})

@api_view(["GET"])
def get_progress(request, photo_id):
    """Fetch the progress of digitization."""
    try:
        photo = Photo.objects.get(id=photo_id)

        # Simulate real-time progress update (for demo purposes)
        while photo.digitization_progress < 100:
            time.sleep(0.1)  # Simulate processing delay (1 second)
            photo.digitization_progress += 10  # Increase progress by 10 each second
            # Ensure time_left doesn't go below zero
            if photo.time_left > 0:
                photo.time_left -= 1  # Decrease time left by 1 minute
            else:
                photo.time_left = 0  # Time left can't be negative
            
            photo.save()  # Save the progress update to the database

        photo.is_completed = True  # Mark as completed once progress is 100%
        photo.save()

        return Response({
            "progress": photo.digitization_progress,
            "is_completed": photo.is_completed,
            "time_left": photo.time_left
        })
    except Photo.DoesNotExist:
        return Response({"error": "Photo not found."}, status=status.HTTP_404_NOT_FOUND)