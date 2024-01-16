from rest_framework.serializers import ModelSerializer
from . import models


class TransactionSerializer(ModelSerializer):
    # Serializer for the transaction viewset, which returns a list of transactions
    # and allows to create new ones as well.
    class Meta:
        model = models.Transactions
        fields = [
            'id', 
            'bitcoin_address', 
            'bitcoin_amount',
            'transaction_type',
            'browser_id', 
            'payment_status'
        ]
        
        
class CommentSerializer(ModelSerializer):
    class Meta:
        model = models.Comments
        fields = [
            'id', 
            'image',
            'name',
            'body',
            'email',
        ]
        



