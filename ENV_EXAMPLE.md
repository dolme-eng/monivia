# Variables d'environnement requises

Ce fichier documente toutes les variables d'environnement nécessaires pour faire fonctionner l'application Monivia.

## Configuration SMTP (Email)

Ces variables sont requises pour l'envoi d'emails (notifications de prêt, confirmations de contact).

```bash
# Configuration SMTP Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=votre-email@monivia.it
SMTP_PASS=votre-mot-de-passe-smtp
```

**Note**: Si ces variables ne sont pas configurées, l'application fonctionnera en mode "mock" et les emails seront simplement loggés dans la console.

## Configuration du site

```bash
# URL du site (utilisé pour les liens absolus, SEO, etc.)
NEXT_PUBLIC_SITE_URL=https://monivia.it

# URL Vercel (automatiquement définie lors du déploiement sur Vercel)
VERCEL_URL=monivia.vercel.app
```

## Développement local

Pour le développement local, créez un fichier `.env.local` avec les valeurs suivantes:

```bash
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=votre-email@monivia.it
SMTP_PASS=votre-mot-de-passe-smtp
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Sécurité

- **Ne jamais committer** le fichier `.env.local` ou `.env` dans le repository
- Les variables d'environnement sont accessibles côté serveur uniquement
- Les variables préfixées par `NEXT_PUBLIC_` sont exposées au client
