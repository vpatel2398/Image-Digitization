from django import forms
from .models import Photo

class PhotoForm(forms.ModelForm):
    CAMERA_CHOICES = [
        ('Red', 'Red'), ('Blue', 'Blue'), ('Violet', 'Violet'),
        ('Green', 'Green'), ('Yellow', 'Yellow'), ('Orange', 'Orange'),
        ('Indigo', 'Indigo'), ('Black', 'Black'),
    ]
    
    slot_number = forms.IntegerField(required=True)  # Ensure this field is included

    cameras = forms.MultipleChoiceField(
        choices=CAMERA_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=True
    )

    class Meta:
        model = Photo
        fields = ['slot_number', 'title', 'cameras']

class EditPhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ['slot_number', 'cameras', 'title']  # Show all fields

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Make slot_number and cameras read-only
        self.fields['slot_number'].widget.attrs['readonly'] = True
        self.fields['cameras'].widget.attrs['readonly'] = True
        self.fields['cameras'].widget.attrs['disabled'] = True  # Prevent changes

    def clean(self):
        cleaned_data = super().clean()

        # Check if slot_number or cameras were modified
        if 'slot_number' in self.changed_data or 'cameras' in self.changed_data:
            raise forms.ValidationError("You are not allowed to change the Slot Number or Cameras. Please edit only the Title.")

        return cleaned_data