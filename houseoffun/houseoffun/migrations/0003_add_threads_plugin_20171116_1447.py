# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-16 14:47
from __future__ import unicode_literals

from django.db import migrations
from houseoffun.houseoffun.models import Plugin

def insert_threads_plugin():
    """
    """
    plugin_name = "Threads"
    plugin_description = "Reddit-style comment threads which allow for branching"
    + " discussions. Only disable this if you don't want to have public common rooms."
    plugin = Plugin()
    plugin.name = plugin_name
    plugin.description = plugin_description
    plugin.save()

class Migration(migrations.Migration):

    dependencies = [
        ('houseoffun', '0002_setup_plugins_20171116_1443'),
    ]

    operations = [
         migrations.RunPython(insert_threads_plugin),
    ]
