from django.db import models

class Photo(models.Model):
    slot_number = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    cameras = models.JSONField(default=list)  # Store selected cameras (e.g., [1, 3, 5])
    digitization_progress = models.IntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    time_left = models.IntegerField(default=0)

    def calculate_time_left(self):
        """Estimate processing time based on selected cameras (1 min per camera)."""
        self.time_left = len(self.cameras) * 1
        self.save()
    



