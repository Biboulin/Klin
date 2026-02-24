#!/usr/bin/env python3
"""
Script de gestion des emails pour Valentin
Utilise imaplib et smtplib (natifs Python)
"""

import imaplib
import smtplib
import email
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import decode_header
import json
import sys
from datetime import datetime

# Configuration des comptes
ACCOUNTS = {
    "pro": {
        "email": "pro@valkidev.fr",
        "password": "X_+U6O5MEQvyCj<ge|Hk",
        "imap": {"host": "imap.hostinger.fr", "port": 993},
        "smtp": {"host": "smtp.hostinger.fr", "port": 465}
    },
    "perso": {
        "email": "contact@vgarnier.net",
        "password": "93n:_*gBxfOh!3y}m1T0",
        "imap": {"host": "mail.vgarnier.net", "port": 993},
        "smtp": {"host": "mail.vgarnier.net", "port": 465}
    }
}

def connect_imap(account):
    """Connexion IMAP sécurisée"""
    config = ACCOUNTS[account]
    imap = imaplib.IMAP4_SSL(config["imap"]["host"], config["imap"]["port"])
    imap.login(config["email"], config["password"])
    return imap

def connect_smtp(account):
    """Connexion SMTP sécurisée"""
    config = ACCOUNTS[account]
    smtp = smtplib.SMTP_SSL(config["smtp"]["host"], config["smtp"]["port"])
    smtp.login(config["email"], config["password"])
    return smtp

def list_emails(account="pro", folder="INBOX", limit=10):
    """Liste les derniers emails"""
    imap = connect_imap(account)
    imap.select(folder)
    
    _, messages = imap.search(None, "ALL")
    email_ids = messages[0].split()
    
    emails = []
    for email_id in email_ids[-limit:]:
        _, msg_data = imap.fetch(email_id, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])
        
        # Décode le sujet
        subject_parts = decode_header(msg["Subject"]) if msg["Subject"] else [("(No Subject)", None)]
        subject = ""
        for part, encoding in subject_parts:
            if isinstance(part, bytes):
                try:
                    subject += part.decode(encoding or 'utf-8', errors='replace')
                except:
                    subject += part.decode('latin-1', errors='replace')
            else:
                subject += str(part)
        
        # Décode l'expéditeur
        from_parts = decode_header(msg.get("From", "Unknown"))
        from_ = ""
        for part, encoding in from_parts:
            if isinstance(part, bytes):
                try:
                    from_ += part.decode(encoding or 'utf-8', errors='replace')
                except:
                    from_ += part.decode('latin-1', errors='replace')
            else:
                from_ += str(part)
        
        date = msg.get("Date")
        
        emails.append({
            "id": email_id.decode(),
            "from": from_,
            "subject": subject,
            "date": date
        })
    
    imap.close()
    imap.logout()
    
    return emails

def read_email(account, email_id, folder="INBOX"):
    """Lit un email spécifique"""
    imap = connect_imap(account)
    imap.select(folder)
    
    _, msg_data = imap.fetch(email_id.encode(), "(RFC822)")
    msg = email.message_from_bytes(msg_data[0][1])
    
    # Extraction du corps
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True).decode()
                break
    else:
        body = msg.get_payload(decode=True).decode()
    
    imap.close()
    imap.logout()
    
    return {
        "from": msg.get("From"),
        "to": msg.get("To"),
        "subject": msg.get("Subject"),
        "date": msg.get("Date"),
        "body": body
    }

def send_email(account, to, subject, body, cc=None):
    """Envoie un email"""
    config = ACCOUNTS[account]
    
    msg = MIMEMultipart()
    msg["From"] = config["email"]
    msg["To"] = to
    msg["Subject"] = subject
    
    if cc:
        msg["Cc"] = cc
    
    msg.attach(MIMEText(body, "plain"))
    
    smtp = connect_smtp(account)
    smtp.send_message(msg)
    smtp.quit()
    
    return True

def check_unread(account="pro", folder="INBOX"):
    """Compte les emails non lus"""
    imap = connect_imap(account)
    imap.select(folder)
    
    _, messages = imap.search(None, "UNSEEN")
    unread_count = len(messages[0].split()) if messages[0] else 0
    
    imap.close()
    imap.logout()
    
    return unread_count

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: mail_manager.py <command> [args]")
        print("Commands: list, read, send, unread")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "list":
        account = sys.argv[2] if len(sys.argv) > 2 else "pro"
        limit = int(sys.argv[3]) if len(sys.argv) > 3 else 10
        emails = list_emails(account, limit=limit)
        print(json.dumps(emails, indent=2, ensure_ascii=False))
    
    elif command == "unread":
        account = sys.argv[2] if len(sys.argv) > 2 else "pro"
        count = check_unread(account)
        print(f"{count} emails non lus")
    
    elif command == "read":
        if len(sys.argv) < 4:
            print("Usage: mail_manager.py read <account> <email_id>")
            sys.exit(1)
        account = sys.argv[2]
        email_id = sys.argv[3]
        email_content = read_email(account, email_id)
        print(json.dumps(email_content, indent=2, ensure_ascii=False))
    
    elif command == "send":
        if len(sys.argv) < 5:
            print("Usage: mail_manager.py send <account> <to> <subject> <body>")
            sys.exit(1)
        account = sys.argv[2]
        to = sys.argv[3]
        subject = sys.argv[4]
        body = sys.argv[5] if len(sys.argv) > 5 else ""
        send_email(account, to, subject, body)
        print("Email envoyé !")
    
    else:
        print(f"Commande inconnue: {command}")
        sys.exit(1)
