from django.contrib import admin
from .models import (
    Transactions,
    Comments,
    Wallet
)

# Register your models here.
admin.site.register(Transactions)
admin.site.register(Comments)
admin.site.register(Wallet)


