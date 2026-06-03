from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class User(AbstractUser):
    phone_regex = RegexValidator(regex=r'^\+?7?\d{10}$', message="Телефон должен быть в формате +7XXXXXXXXXX")
    
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
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='api_user_groups',
        blank=True,
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='api_user_permissions',
        blank=True,
        verbose_name='user permissions'
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    slug = models.SlugField(unique=True, verbose_name='URL')
    icon = models.CharField(max_length=10, blank=True, verbose_name='Иконка')
    order = models.IntegerField(default=0, verbose_name='Порядок')
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', verbose_name='Категория')
    name = models.CharField(max_length=200, verbose_name='Название')
    slug = models.SlugField(verbose_name='URL')
    price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name='Цена')
    description = models.TextField(verbose_name='Описание')
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name='Изображение')
    images = models.JSONField(default=list, blank=True, verbose_name='Доп. изображения')
    characteristics = models.JSONField(default=list, blank=True, verbose_name='Характеристики')
    features = models.JSONField(default=list, blank=True, verbose_name='Особенности')
    in_stock = models.BooleanField(default=True, verbose_name='В наличии')
    is_new = models.BooleanField(default=False, verbose_name='Новинка')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')
    
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        unique_together = ['category', 'slug']
    
    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ожидает обработки'),
        ('processing', 'В обработке'),
        ('shipped', 'Отправлен'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменён'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', verbose_name='Пользователь')
    order_number = models.CharField(max_length=50, unique=True, verbose_name='Номер заказа')
    items = models.JSONField(verbose_name='Товары')
    total = models.DecimalField(max_digits=10, decimal_places=0, verbose_name='Сумма')
    delivery_method = models.CharField(max_length=50, verbose_name='Способ доставки')
    delivery_address = models.TextField(verbose_name='Адрес доставки')
    payment_method = models.CharField(max_length=50, verbose_name='Способ оплаты')
    contact_name = models.CharField(max_length=200, verbose_name='Имя')
    contact_phone = models.CharField(max_length=17, verbose_name='Телефон')
    contact_email = models.EmailField(verbose_name='Email')
    comment = models.TextField(blank=True, verbose_name='Комментарий')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='Статус')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Заказ {self.order_number}"


class Store(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    address = models.CharField(max_length=500, verbose_name='Адрес')
    phone = models.CharField(max_length=17, verbose_name='Телефон')
    latitude = models.FloatField(verbose_name='Широта')
    longitude = models.FloatField(verbose_name='Долгота')
    working_hours = models.CharField(max_length=200, default='09:00-21:00', verbose_name='Часы работы')
    order = models.IntegerField(default=0, verbose_name='Порядок')
    
    class Meta:
        verbose_name = 'Магазин'
        verbose_name_plural = 'Магазины'
        ordering = ['order']
    
    def __str__(self):
        return self.name