from django.contrib import admin
from .models import User, Category, Product, Order, Store, FeedbackRequest


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('order',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'in_stock', 'is_new')
    list_filter = ('category', 'in_stock', 'is_new')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('price', 'in_stock', 'is_new')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'user__email')
    list_editable = ('status',)


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone', 'order')
    list_editable = ('order',)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'phone', 'created_at')
    search_fields = ('email', 'username')


@admin.register(FeedbackRequest)
class FeedbackRequestAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'phone',
        'email',
        'subject',
        'preferred_contact',
        'status',
        'created_at',
    )

    list_filter = (
        'status',
        'preferred_contact',
        'created_at',
    )

    search_fields = (
        'name',
        'phone',
        'email',
        'subject',
        'message',
    )

    list_editable = (
        'status',
    )

    readonly_fields = (
        'created_at',
    )