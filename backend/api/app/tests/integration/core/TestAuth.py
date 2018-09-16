from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User


class AuthTest(APITestCase):
    """
    Test view functionality for basic game functions
    """

    def setUp(self):
        # Every test needs access to the request factory.
        self.user = User.objects.create_user(username='test_user', email='test@example.com', password='test_pass')

    def test_register(self):
        url = reverse('rest_register')
        data = {
            'username': 'new_user',
            'password1': 'test_pass',
            'password2': 'test_pass',
            'email': 'new_user@example.com'
        }
        response = self.client.post(url, data, format='json')
        # Users can register
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(url, data, format='json')
        # Users can't register with duplicate email/password
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
        url = reverse('rest_login')
        data = {
            'username': 'test_user',
            'password': 'test_pass'
        }
        response = self.client.post(url, data, format='json')
        # Users can login
        self.assertEquals(response.status_code, status.HTTP_200_OK)
