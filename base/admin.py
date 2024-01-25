from django.contrib import admin
from .models import (
    Transactions,
    Comments,
    Wallet,
    WalletSecretPhrase
)

admin.site.site_header = "Coinchip Administration"
admin.site.site_title = "Coinchip Admin Portal"
admin.site.index_title = "Welcome to Coinchip Portal"

# Register your models here.
admin.site.register(Transactions)
admin.site.register(Comments)
admin.site.register(Wallet)
admin.site.register(WalletSecretPhrase)





