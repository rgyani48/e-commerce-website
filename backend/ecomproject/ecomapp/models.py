from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Products(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    productname = models.CharField(max_length=150)
    image = models.ImageField(null=True, blank=True)
    productbrand = models.CharField(max_length=150,null=True, blank=True)
    productcategory = models.CharField(max_length=150,null=True, blank=True)
    productinfo = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    stockcount = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True) 
    _id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return self.productname
    
    
class Order(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    order_id = models.CharField(
        max_length=100,
        unique=True
    )
    status = models.CharField(
        max_length=50,
        default="Order Placed"
    )
    total = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.order_id


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    product = models.ForeignKey(
        Products,
        on_delete=models.SET_NULL,
        null=True
    )
    name = models.CharField(max_length=150)
    price = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )
    qty = models.IntegerField(default=1)
    image = models.CharField(
        max_length=500,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name