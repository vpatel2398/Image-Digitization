from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'slot_number', 'title', 'cameras', 'digitization_progress', 'is_completed', 'time_left']
