import smtplib
from email.message import EmailMessage

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()

# Login to your Gmail account
server.login('talk2peteresezobor@gmail.com', 'ykprzvmzeippmdta')

# Test sending an email
msg = EmailMessage()
msg.set_content('Test email from Python')
msg['Subject'] = 'Test Email'
msg['From'] = 'petercodercoder@gmail.com'
msg['To'] = 'peteresezoborcode@gmail.com'

server.send_message(msg)
server.quit()


