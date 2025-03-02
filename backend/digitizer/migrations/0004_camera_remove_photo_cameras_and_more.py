# Generated by Django 5.1.6 on 2025-03-01 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('digitizer', '0003_photo_digitization_progress_photo_is_completed_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Camera',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='photo',
            name='cameras',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='digitization_progress',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='is_completed',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='time_left',
        ),
        migrations.AlterField(
            model_name='photo',
            name='slot_number',
            field=models.IntegerField(),
        ),
    ]
