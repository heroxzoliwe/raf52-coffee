from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class User(AbstractUser):
    phone_regex = RegexValidator(
        regex=r'^\+?7?\d{10}$',
        message="Телефон должен быть в формате +7XXXXXXXXXX"
    )
    
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=17, validators=[phone_regex], blank=True)
    address = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    PAYMENT_CHOICES = [
        ('card', 'Банковская карта'),
        ('sbp', 'СБП'),
        ('cash', 'Наличные'),
    ]
    DELIVERY_CHOICES = [
        ('courier', 'Курьерская доставка'),
        ('pickup', 'Самовывоз'),
        ('post', 'Почта России'),
    ]
    
    default_payment = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='card')
    default_delivery = models.CharField(max_length=20, choices=DELIVERY_CHOICES, default='courier')
    created_at = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email