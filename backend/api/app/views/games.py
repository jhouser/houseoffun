from rest_framework import serializers, viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from api.app.views.core import UserSerializer, PluginSerializer
from api.app.views.characters import CharacterSerializer
from api.app.models import Game, GameSignup, Plugin


class SignupSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = GameSignup
        fields = ('id', 'user', 'get_status_display')


class GameSerializer(serializers.ModelSerializer):
    game_master = UserSerializer(read_only=True)

    class Meta:
        model = Game
        fields = ('id', 'name', 'abbreviation', 'get_status_display', 'game_master')


class GameDetailSerializer(GameSerializer):
    plugins = PluginSerializer(many=True, required=False, read_only=True)
    signups = SignupSerializer(many=True, required=False, read_only=True)
    characters = CharacterSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Game
        fields = (
            'id', 'name', 'abbreviation', 'plugins', 'description', 'character_guidelines', 'get_status_display',
            'game_master', 'signups', 'characters')


class GameViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action != 'list':
            return GameDetailSerializer
        return GameSerializer

    def perform_create(self, serializer):
        game = serializer.save(game_master=self.request.user)
        plugins = self.request.data['plugins']
        for index, plugin in enumerate(plugins):
            if plugin is not None and plugin['enabled'] is True:
                game.plugins.add(index)

    @action(methods=['post'], detail=True, permission_classes=[permissions.IsAuthenticated],
            url_path='advance-status', url_name='advance_status')
    def advance_status(self, request, pk=None):
        game = self.get_object()
        data = request.data
        if 'status' not in data or not game.validate_next_status(data['status']):
            return Response({'non_field_errors': 'Next status is not valid.'}, status=status.HTTP_400_BAD_REQUEST)
        game.next_status()
        return Response(game)

    permission_classes = (permissions.IsAuthenticated,)
    queryset = Game.objects.all()
