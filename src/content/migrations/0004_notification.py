# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-10 02:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_banner'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='Email address')),
                ('artist', models.CharField(max_length=50, verbose_name='Artist')),
                ('date_added', models.DateTimeField(auto_now_add=True, verbose_name='date added')),
            ],
        ),
    ]
