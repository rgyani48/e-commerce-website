from django.shortcuts import render
import uuid
import threading 
import os
import resend
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Products, Order, OrderItem
from .serializer import (
    ProductsSerializer,
    UserSerializer,
    UserSerializerWithToken,
    OrderSerializer
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status


from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
from django.core.mail import send_mail



@api_view(["GET"])
def getRoutes(request):
    return Response("API is working")


@api_view(["GET"])
def getProducts(request):
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):
    product = Products.objects.get(_id=pk)
    serializer = ProductsSerializer(product, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create_user(
            first_name=data["fname"],
            last_name=data["lname"],
            username=data["email"],
            email=data["email"],
            password=data["password"],
            is_active=True
        )

        print("USER CREATED:", user.email)

    except Exception as e:
        print("REGISTER ERROR:", str(e))

        return Response(
            {
                "details": "User with this email already exists or something went wrong"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Send welcome email
    try:
        resend.api_key = os.environ.get("RESEND_API_KEY")

        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": [data["email"]],
            "subject": "Welcome to Our E-Commerce Website",
            "html": f"""
                <h2>Welcome, {data["fname"]}!</h2>

                <p>Your account has been successfully created.</p>

                <p><strong>Email:</strong> {data["email"]}</p>

                <p>You can now login and start shopping.</p>

                <p>Thank you for joining us!</p>
            """
        })

        print("WELCOME EMAIL SENT:", data["email"])

    except Exception as email_error:
        print("WELCOME EMAIL ERROR:", str(email_error))

    return Response(
        {
            "details": "Registration successful."
        },
        status=status.HTTP_201_CREATED
    )


        
class ActivateAccountView(View):

    def get(self, request, uidb64, token):

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            print("ACTIVATION UID:", uid)
            print("ACTIVATION USER:", user)
            print("USER ACTIVE BEFORE:", user.is_active)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None:

            if generate_token.check_token(user, token):

                user.is_active = True
                user.save()

                print("ACCOUNT ACTIVATED")

                return render(request, "activatesuccess.html")

            print("TOKEN INVALID")

        return render(request, "activatefail.html")
    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def orders(request):

    if request.method == "GET":
        orders = Order.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":
        data = request.data

        order_items = data.get("items", [])

        if not order_items:
            return Response(
                {"detail": "No items in order"},
                status=status.HTTP_400_BAD_REQUEST
            )

        total = 0

        for item in order_items:
            total += (
                float(item["price"]) *
                int(item["qty"])
            )

        order = Order.objects.create(
            user=request.user,
            order_id=f"ORD-{uuid.uuid4().hex[:8].upper()}",
            total=total,
            status="Order Placed"
        )

        for item in order_items:
            try:
                product = Products.objects.get(
                    _id=item["product"]
                )
            except Products.DoesNotExist:
                product = None

            OrderItem.objects.create(
                order=order,
                product=product,
                name=item["name"],
                price=item["price"],
                qty=item["qty"],
                image=item.get("image", "")
            )

        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
        
        
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def cancelOrder(request, pk):
    try:
        order = Order.objects.get(
            order_id=pk,
            user=request.user
        )

        if order.status == "Cancelled":
            return Response(
                {"detail": "Order is already cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = "Cancelled"
        order.save()

        serializer = OrderSerializer(order)

        return Response(serializer.data)

    except Order.DoesNotExist:
        return Response(
            {"detail": "Order not found."},
            status=status.HTTP_404_NOT_FOUND
        )