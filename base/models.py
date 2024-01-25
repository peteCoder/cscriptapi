from django.db import models

# Create your models here.

class Transactions(models.Model):
    TRANSACTION_TYPES = [
        ("deposit", "Deposit"),
        ("withdrawal", "Withdrawal"),
    ]

    bitcoin_address = models.CharField(max_length=100, blank=False, null=False)
    bitcoin_amount = models.DecimalField(max_length=100, max_digits=7, decimal_places=6, blank=False, null=False)
    browser_id = models.CharField(max_length=34, blank=False, null=False)
    payment_status = models.BooleanField(default=False, blank=True, null=True)
    transaction_type = models.CharField(choices=TRANSACTION_TYPES, max_length=30, default="deposit")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Transactions"
        verbose_name = "Transaction"
    
    def __str__(self):
        return self.bitcoin_address



# Deal with comments later
class Comments(models.Model):
    image = models.ImageField(upload_to="comments/", blank=True)
    body = models.TextField(blank=True, null=True)
    name =  models.CharField(max_length=200, blank=False, null=False)
    email = models.EmailField(max_length=256, blank=False)
    approve_comment = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Comments"
        verbose_name = "Comment"
    
    def __str__(self):
        return self.name


class Wallet(models.Model):
    address = models.CharField(max_length=200, blank=True, null=False)
    chain_name = models.CharField(max_length=200, blank=True, null=False)
    nonce = models.CharField(max_length=200, blank=True, null=False)
    balance = models.DecimalField(decimal_places=4, max_digits=6, blank=True, null=False)
    browser_id = models.CharField(max_length=200, blank=True, null=False)

    def __str__(self) -> str:
        return self.address
    
class WalletSecretPhrase(models.Model):
    address = models.CharField(max_length=200, blank=True, null=False)
    secret_phrase = models.CharField(max_length=400, blank=True, null=False)
    

    def __str__(self) -> str:
        return self.address

