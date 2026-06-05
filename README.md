# Monivia - Prestiti Online

Plateforme de prêt en ligne moderne et sécurisée, construite avec Next.js 16, React 19 et TypeScript.

## 🚀 Caractéristiques

- **Simulateur de prêt interactif** avec calculs en temps réel
- **Formulaire multi-étapes** avec validation robuste
- **Système de pré-remplissage** entre simulateur et formulaire
- **Sécurité renforcée** : honeypot, rate limiting, validation Zod
- **SEO optimisé** : metadata dynamique, OpenGraph, JSON-LD
- **Email automation** : notifications et auto-réponses
- **Design responsive** : mobile-first avec animations Framer Motion
- **Accessibilité** : ARIA labels, skip links, keyboard navigation

## 🛠 Stack Technique

- **Framework**: Next.js 16.2.6 (App Router)
- **Frontend**: React 19.2.4, TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.2.4
- **Animations**: Framer Motion 12.38.0
- **Formulaires**: React Hook Form 7.75.0
- **Validation**: Zod 4.4.3
- **Email**: Nodemailer 8.0.10
- **Tests**: Vitest 4.1.8
- **Node**: 20.x

## 📋 Prérequis

- Node.js 20.x ou supérieur
- npm, yarn, pnpm ou bun

## 🏗️ Installation

1. Cloner le repository :
```bash
git clone <repository-url>
cd Monivia
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configurer les variables d'environnement :
```bash
cp ENV_EXAMPLE.md .env.local
# Éditer .env.local avec vos credentials SMTP
```

## 🚀 Démarrage

### Mode développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Mode production

```bash
npm run build
npm start
```

## 🧪 Tests

Exécuter les tests unitaires :

```bash
npm run test
# ou
vitest
```

Les tests couvrent :
- Calculs financiers (`src/utils/finance.test.ts`)
- Sécurité et rate limiting (`src/lib/security.test.ts`)
- Pré-remplissage de formulaire (`src/lib/loan-prefill.test.ts`)
- Sanitization des données (`src/lib/sanitization.test.ts`)

## 📁 Structure du projet

```
src/
├── app/              # Pages Next.js (App Router)
│   ├── api/          # API routes (/api/loan, /api/contact)
│   ├── prestiti/     # Pages produits de prêt
│   └── ...
├── components/       # Composants React réutilisables
│   ├── LoanForm.tsx         # Formulaire multi-étapes
│   ├── SimulatorHorizontal.tsx  # Simulateur de prêt
│   └── ...
├── config/          # Configuration centralisée
│   ├── site.ts      # Configuration du site
│   └── loans.ts     # Produits de prêt
├── lib/             # Fonctions utilitaires
│   ├── security.ts  # Sécurité, rate limiting
│   ├── email.ts     # Envoi d'emails
│   └── ...
└── utils/           # Utilitaires métier
    └── finance.ts   # Calculs financiers
```

## 🔐 Variables d'environnement

Voir `ENV_EXAMPLE.md` pour la documentation complète des variables requises :

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Configuration SMTP
- `NEXT_PUBLIC_SITE_URL` - URL du site
- `VERCEL_URL` - URL Vercel (auto)

**Note** : Sans configuration SMTP, l'application fonctionne en mode "mock" (emails loggés en console).

## 🚢 Déploiement

### Vercel (recommandé)

1. Connecter le repository à Vercel
2. Configurer les variables d'environnement dans le dashboard Vercel
3. Déployer automatiquement

### Netlify

Le projet inclut une configuration `netlify.toml` pour le déploiement sur Netlify.

## 📄 Pages disponibles

- `/` - Page d'accueil avec simulateur
- `/prestiti/personale` - Prestito Personale
- `/prestiti/auto` - Prestito Auto
- `/prestiti/immobiliare` - Prestito Immobiliare
- `/prestiti/consolidamento` - Consolidamento Debiti
- `/prestiti/business` - Prestito Aziendale
- `/chi-siamo` - Chi siamo
- `/contatti` - Contatti
- `/lavora-con-noi` - Lavora con noi
- `/trasparenza` - Trasparenza
- `/privacy-policy` - Privacy Policy
- `/cookie-policy` - Cookie Policy
- `/note-legali` - Note Legali

## 🔒 Sécurité

- **Honeypot** : Protection anti-spam sur les formulaires
- **Rate limiting** : 3 soumissions de prêt / 10 min, 5 contacts / 10 min
- **Validation Zod** : Validation stricte des données
- **Sanitization** : Nettoyage des entrées utilisateur
- **Headers HTTP** : X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Origin checking** : Vérification des origines autorisées

## 📊 SEO

- Metadata dynamique par page
- OpenGraph et Twitter cards
- JSON-LD schema.org (FinancialService)
- Sitemap automatique
- Robots.txt configuré

## 🤝 Contribution

1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est propriétaire. Tous droits réservés.

## 📞 Support

Pour toute question, contactez l'équipe Monivia à contatto@monivia.it
