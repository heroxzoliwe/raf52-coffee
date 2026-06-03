import re

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User, Category, Product, Order, Store


def clean_text(value):
    return re.sub(r'\s+', ' ', value.strip())


def validate_name(value):
    value = clean_text(value)

    if len(value) < 3:
        raise serializers.ValidationError('Имя слишком короткое')

    if len(value) > 80:
        raise serializers.ValidationError('Имя слишком длинное')

    if not re.match(r'^[А-Яа-яA-Za-zЁё\s\-]+$', value):
        raise serializers.ValidationError('Имя может содержать только буквы, пробел и дефис')

    return value


def validate_phone_value(value):
    if not value:
        return ''

    value = re.sub(r'[^\d+]', '', value)

    if value.startswith('8') and len(value) == 11:
        value = '+7' + value[1:]

    if value.startswith('7') and len(value) == 11:
        value = '+' + value

    if not re.match(r'^\+7\d{10}$', value):
        raise serializers.ValidationError('Телефон должен быть в формате +7XXXXXXXXXX')

    return value


def validate_address_value(value):
    if not value:
        return ''

    value = clean_text(value)

    if len(value) < 5:
        raise serializers.ValidationError('Адрес слишком короткий')

    if len(value) > 300:
        raise serializers.ValidationError('Адрес слишком длинный')

    if not re.match(r'^[А-Яа-яA-Za-zЁё0-9\s\-.,/№]+$', value):
        raise serializers.ValidationError('Адрес содержит недопустимые символы')

    return value


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='first_name', read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'phone',
            'address',
            'default_payment',
            'default_delivery',
            'created_at',
        )


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password',
            'password2',
            'phone',
            'address',
        )

    def validate_username(self, value):
        return validate_name(value)

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Этот email уже зарегистрирован')

        return value

    def validate_phone(self, value):
        return validate_phone_value(value)

    def validate_address(self, value):
        return validate_address_value(value)

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError({
                'password2': 'Пароли не совпадают'
            })

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        full_name = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=full_name,
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
        )

        return user


class ProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='first_name')

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'phone',
            'address',
            'default_payment',
            'default_delivery',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')

    def validate_username(self, value):
        return validate_name(value)

    def validate_email(self, value):
        value = value.strip().lower()
        user = self.instance

        if User.objects.exclude(id=user.id).filter(email=value).exists():
            raise serializers.ValidationError('Этот email уже занят')

        return value

    def validate_phone(self, value):
        return validate_phone_value(value)

    def validate_address(self, value):
        return validate_address_value(value)

    def validate_default_payment(self, value):
        if value not in ['card', 'sbp', 'cash']:
            raise serializers.ValidationError('Недопустимый способ оплаты')

        return value

    def validate_default_delivery(self, value):
        if value not in ['courier', 'pickup', 'post']:
            raise serializers.ValidationError('Недопустимый способ доставки')

        return value


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = (
            'id',
            'user',
            'order_number',
            'created_at',
            'status',
        )


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'