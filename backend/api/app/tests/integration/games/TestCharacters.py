from django.test import TestCase, RequestFactory

from api.app.models.games import *
from api.app.views.characters import *


class CharactersTest(TestCase):
    """
    Test view functionality for basic game functions
    """

    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        self.user = User.objects.create_user(username='test_user', email='test@example.com', password='test_pass')
        self.game = Game.objects.create(
            name='Sample of Fun',
            abbreviation='SoF',
            description='This is a sample game!',
            game_master=self.user,
            status=Game.PENDING
        )
        self.signup = GameSignup.objects.create(user=self.user, game=self.game, status=GameSignup.ACCEPTED)
        self.character = Character.objects.create(name="Test Character", owner=self.user, game=self.game)
