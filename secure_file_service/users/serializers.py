from dataclasses import field
from rest_framework import serializers
from django.contrib.auth import get_user_model

from users.models import LoginOTP

class UserRegistrationSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        raise NotImplementedError("Update is not supported")

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        return user

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'email_verified']
        extra_kwargs = {'password': {'write_only': True}}

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'email_verified']