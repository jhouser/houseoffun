from django.db import models
from django.contrib.auth.models import User

class Plugin(models.Model):
    def __str__(self):
        """
        Returns the string representation of the object
        """
        return self.name
        
    name = models.CharField(max_length = 100, unique = True)
    description = models.TextField()