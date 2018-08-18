from rest_framework.test import APITestCase
from django.urls import reverse

from api.app.models.games import *
from api.app.views.games import *


class GamesTest(APITestCase):
    """
    Test view functionality for basic game functions
    """

    def setUp(self):
        self.view = GameViewSet()
        self.user = User.objects.create_user(username='test_user', email='test@example.com', password='test_pass')
        self.game = Game.objects.create(
            name='Sample of Fun',
            abbreviation='SoF',
            description='This is a sample game!',
            game_master=self.user
        )
        self.client.force_authenticate(user=self.user)

    def test_games_list(self):
        url = reverse('games-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.game.name)

    def test_games_detail(self):
        url = reverse('games-detail', args=[self.game.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.game.name)

    def test_games_create(self):
        url = reverse('games-list')
        data = {
            'name': 'Test A New Game',
            'abbreviation': 'TANG',
            'description': 'This is a test description',
            'game_master': self.user.id,
            'plugins': {}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_games_update(self):
        url = reverse('games-detail', args=[self.game.id])
        data = {
            'name': 'Test A New Game',
            'abbreviation': 'TANG',
            'description': 'This is a test description',
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, data['name'])

    def test_games_delete(self):
        url = reverse('games-detail', args=[self.game.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_games_advance_status(self):
        url = reverse('games-advance-status', args=[self.game.id])
        response = self.client.post(url, {'status': self.game.REGISTRATION})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.game.REGISTRATION)
        # Sending the same status a second time should fail
        response = self.client.post(url, {'status': self.game.REGISTRATION})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
