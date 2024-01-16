from django.urls import path
from . import views

urlpatterns = [
    # API
    path("transactions/", views.get_all_transactions, name="transactions"),
    path("comments/", views.all_comments, name="comments"),
    path("users/", views.connect_wallet, name="user_view"),

    # Ordinary
    path("", views.connect_wallet, name="connect_wallet")


]