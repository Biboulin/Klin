#!/usr/bin/env python3
"""
Script de tri automatique des emails
"""

import imaplib
import email
from email.header import decode_header
import re
import json

# Configuration
ACCOUNT = {
    "email": "contact@vgarnier.net",
    "password": "93n:_*gBxfOh!3y}m1T0",
    "imap": {"host": "mail.vgarnier.net", "port": 993}
}

# Catégories et règles
CATEGORIES = {
    "INBOX.Pro-Missions": {
        "patterns": [
            r"mission|freelance|free-work|malt|cooptalis|talent\.io|team2i",
            r"offre|opportunité|recrutement|cv|candidature"
        ]
    },
    "INBOX.Admin-Important": {
        "patterns": [
            r"facture|invoice|reçu|bail|contrat|assurance|impôt|urssaf",
            r"sedomicilier|numbr|tiime|sinimo|aagestion|assurup|previi"
        ]
    },
    "INBOX.Notifications": {
        "patterns": [
            r"github|vercel|google workspace|gitlab|npm|docker",
            r"notification|alert|deploy|ci/cd"
        ]
    },
    "INBOX.Newsletters": {
        "patterns": [
            r"newsletter|unsubscribe|se désabonner",
            r"avis vérifiés|glisshop|lappart|ffvl"
        ]
    },
    "INBOX.Spam-Suspect": {
        "patterns": [
            r"metamask.*team|wallet.*protect|urgent.*action|verify.*account",
            r"@.*\.xyz|@.*\.ru|@firebaseapp\.com"
        ]
    }
}

def connect_imap():
    """Connexion IMAP"""
    imap = imaplib.IMAP4_SSL(ACCOUNT["imap"]["host"], ACCOUNT["imap"]["port"])
    imap.login(ACCOUNT["email"], ACCOUNT["password"])
    return imap

def create_folders(imap):
    """Crée les dossiers de tri"""
    created = []
    for folder_name in CATEGORIES.keys():
        try:
            status, _ = imap.create(folder_name)
            if status == "OK":
                created.append(folder_name)
        except:
            pass  # Le dossier existe déjà
    return created

def decode_field(field):
    """Décode un champ d'email"""
    if not field:
        return ""
    
    parts = decode_header(field)
    result = ""
    for part, encoding in parts:
        if isinstance(part, bytes):
            try:
                result += part.decode(encoding or 'utf-8', errors='replace')
            except:
                result += part.decode('latin-1', errors='replace')
        else:
            result += str(part)
    return result

def categorize_email(from_, subject):
    """Détermine la catégorie d'un email"""
    text = f"{from_} {subject}".lower()
    
    for category, rules in CATEGORIES.items():
        for pattern in rules["patterns"]:
            if re.search(pattern, text, re.IGNORECASE):
                return category
    
    return None  # Reste dans INBOX

def sort_emails():
    """Trie tous les emails"""
    imap = connect_imap()
    
    # Crée les dossiers
    created_folders = create_folders(imap)
    print(f"✅ Dossiers créés : {', '.join(created_folders) if created_folders else 'déjà existants'}")
    
    # Sélectionne INBOX
    imap.select("INBOX")
    
    # Récupère tous les emails
    _, messages = imap.search(None, "ALL")
    email_ids = messages[0].split()
    
    print(f"\n📧 Tri de {len(email_ids)} emails en cours...\n")
    
    stats = {cat: 0 for cat in CATEGORIES.keys()}
    stats["Non catégorisés"] = 0
    
    for i, email_id in enumerate(email_ids, 1):
        try:
            # Récupère l'email
            _, msg_data = imap.fetch(email_id, "(RFC822)")
            msg = email.message_from_bytes(msg_data[0][1])
            
            # Décode les infos
            from_ = decode_field(msg.get("From", ""))
            subject = decode_field(msg.get("Subject", ""))
            
            # Catégorise
            category = categorize_email(from_, subject)
            
            if category:
                # Déplace vers le dossier
                imap.copy(email_id, category)
                imap.store(email_id, '+FLAGS', '\\Deleted')
                stats[category] += 1
            else:
                stats["Non catégorisés"] += 1
            
            # Progress
            if i % 50 == 0:
                print(f"⏳ Progression : {i}/{len(email_ids)} emails traités...")
        
        except Exception as e:
            print(f"⚠️  Erreur email {email_id.decode()}: {e}")
            continue
    
    # Purge les emails supprimés de INBOX
    imap.expunge()
    
    imap.close()
    imap.logout()
    
    return stats

if __name__ == "__main__":
    print("🚀 Démarrage du tri automatique...\n")
    stats = sort_emails()
    
    print("\n" + "="*50)
    print("📊 RÉSULTATS DU TRI")
    print("="*50)
    for category, count in sorted(stats.items(), key=lambda x: x[1], reverse=True):
        print(f"  {category:25} : {count:4} emails")
    print("="*50)
