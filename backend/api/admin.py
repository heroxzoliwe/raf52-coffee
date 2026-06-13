from django.contrib import admin
from django.utils.html import format_html

from .models import User, Category, Product, Order, Store


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('order',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'image_preview_small',
        'name',
        'category',
        'price',
        'in_stock',
        'is_new',
    )

    list_filter = (
        'category',
        'in_stock',
        'is_new',
    )

    search_fields = (
        'name',
        'description',
    )

    prepopulated_fields = {
        'slug': ('name',)
    }

    list_editable = (
        'price',
        'in_stock',
        'is_new',
    )

    readonly_fields = (
        'image_preview',
    )

    def image_preview_small(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 55px; height: 55px; object-fit: contain; border-radius: 8px; background: #f3f4f6; padding: 4px;" />',
                obj.image.url
            )

        return '—'

    image_preview_small.short_description = 'Фото'

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 250px; object-fit: contain; border-radius: 12px; background: #f3f4f6; padding: 10px;" />',
                obj.image.url
            )

        return 'Фото пока не загружено'

    image_preview.short_description = 'Превью фото'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'order_number',
        'user',
        'total',
        'status',
        'created_at',
    )

    list_filter = (
        'status',
        'created_at',
    )

    search_fields = (
        'order_number',
        'user__email',
    )

    list_editable = (
        'status',
    )


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'address',
        'phone',
        'order',
    )

    list_editable = (
        'order',
    )


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'username',
        'phone',
        'created_at',
    )

    search_fields = (
        'email',
        'username',
    )