# Generated by Django 4.2.6 on 2024-03-15 18:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_video_course'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='watch_history',
            name='course',
        ),
        migrations.AddField(
            model_name='watch_history',
            name='video',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.video'),
        ),
    ]
