from rest_framework import serializers

class TickerSerializer(serializers.Serializer):
    metadata = serializers.JSONField()
    data = serializers.JSONField()