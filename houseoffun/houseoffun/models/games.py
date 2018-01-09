from django.db import models
from django.contrib.auth.models import User
from houseoffun.houseoffun.models.core import Plugin
from django.core.exceptions import PermissionDenied


class Game(models.Model):
    # Game Status Codes
    DRAFT = 'DR'
    REGISTRATION = 'RG'
    PENDING = 'PD'
    RUNNING = 'RN'
    FINISHED = 'FN'
    ARCHIVED = 'AR'
    DELETED = 'DL'

    GAME_STATUS_CHOICES = (
        (DRAFT, 'Draft'),
        (REGISTRATION, 'Recruiting'),
        (PENDING, 'Pending'),
        (RUNNING, 'Running'),
        (FINISHED, 'Finished'),
        (ARCHIVED, 'Archived'),
        (DELETED, 'Deleted'),
    )
    
    name = models.CharField(max_length=100, unique=True)
    abbreviation = models.CharField(max_length=10)
    description = models.TextField()
    game_master = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    plugins = models.ManyToManyField(Plugin)
    status = models.CharField(
        max_length=2,
        choices=GAME_STATUS_CHOICES,
        default=DRAFT,
    )

    def has_plugin(self, plugin_name):
        """
        Returns true if a game has a particular plugin
        """
        return plugin_name in self.plugins.values_list('name', flat=True)

    def can_edit_or_403(self, user):
        """
        Throws a 403 error if a user is not allowed to edit a game
        """
        if user.id != self.game_master.id:
            raise PermissionDenied
        return True

    def next_status(self):
        """
        Advances the game to the next status in the list, performing any necessary state changes
        """
        if self.status == self.DRAFT:
            self._advance_draft()

    def previous_status(self):
        """
        Moves the game backwards in status (if possible), performing any necessary state changes
        """

    def _advance_draft(self):
        """
        Moves a draft to the registration step
        """
        self.status = self.REGISTRATION
        self.save()


class Character(models.Model):
    name = models.CharField(max_length=100)
    game = models.ForeignKey(
        Game,
        null=True,
        on_delete=models.SET_NULL
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)


class GameSignup(models.Model):
    REGISTERED = 'RG'
    ACCEPTED = 'AC'
    REJECTED = 'RJ'
    WITHDRAWN = 'WD'
    REGISTRATION_STATUS_CHOICES = (
        (REGISTERED, 'Registered'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
        (WITHDRAWN, 'Withdrawn')
    )

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=2,
        choices=REGISTRATION_STATUS_CHOICES,
        default=REGISTERED,
    )
