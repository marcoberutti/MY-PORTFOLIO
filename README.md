# Marco Berutti - Portfolio Website

Portfolio personale moderno costruito con **Next.js 14**, **TypeScript**, **Tailwind CSS** e **Vercel KV (Redis)**.

## 🚀 Caratteristiche

- ✅ **Next.js 14 App Router** - Architettura moderna con Server Components
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Styling moderno e responsive
- ✅ **Area Admin** - Dashboard privata con autenticazione JWT
- ✅ **CRUD completo** - Gestione di bio, skills, educazione, esperienze
- ✅ **GitHub Integration** - Fetch automatico repositories pubblici
- ✅ **Vercel KV (Redis)** - Storage persistente dei dati
- ✅ **SEO Optimized** - Metadata configuration per migliore indicizzazione

## 📦 Installazione

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Configura le variabili d'ambiente

Copia il file `.env.local.example` in `.env.local`:

```bash
cp .env.local.example .env.local
```

Modifica `.env.local` con le tue credenziali:

```env
# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tuaPasswordSicura123

# JWT Secret (genera con: openssl rand -base64 32)
JWT_SECRET=tuoSecretJWT

# GitHub (opzionale, per rate limit maggiori)
GITHUB_USERNAME=marcoberutti
GITHUB_TOKEN=ghp_tuoTokenGitHub

# Vercel KV - automatically set by Vercel in production
```

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) per vedere il sito.

## 🔐 Area Admin

Accedi all'area riservata su `/admin/login` con le credenziali configurate in `.env.local`.

### Funzionalità Admin:

- **Personal Info** - Modifica nome, ruolo, contatti, social links
- **Skills** - Aggiungi/modifica/elimina competenze tecniche
- **Education** - Gestisci il percorso formativo
- **Work Experience** - Gestisci le esperienze lavorative

## 🗄️ Database & Redis

Il progetto usa **Vercel KV (Redis)** per lo storage dei dati in produzione.

- In **sviluppo locale**: usa il file `data/portfolio.json` come fallback
- In **produzione su Vercel**: i dati sono salvati automaticamente su Redis

### Inizializzazione automatica

Al primo avvio, i dati da `portfolio.json` vengono caricati in Redis.

## 📁 Struttura del Progetto

```
├── app/
│   ├── (public)/          # Layout pubblico
│   │   ├── layout.tsx
│   │   └── page.tsx       # Homepage
│   ├── admin/             # Area riservata
│   │   ├── login/
│   │   ├── skills/        # CRUD Skills
│   │   ├── education/     # CRUD Education
│   │   └── ...
│   └── api/               # API Routes
│       ├── auth/          # Login/Logout
│       └── portfolio/     # CRUD endpoints
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Portfolio.tsx
│   └── admin/             # Componenti admin
├── lib/
│   ├── auth.ts            # JWT authentication
│   ├── db.ts              # Database operations
│   └── github.ts          # GitHub API
├── types/
│   └── index.ts           # TypeScript types
└── data/
    └── portfolio.json     # Dati iniziali
```

## 🚀 Deploy su Vercel

### 1. Connetti il repository a Vercel

```bash
npm i -g vercel
vercel
```

### 2. Configura Vercel KV

1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il tuo progetto
3. Vai su **Storage** → **Create Database** → **KV**
4. Vercel aggiungerà automaticamente le variabili `KV_REST_API_URL` e `KV_REST_API_TOKEN`

### 3. Aggiungi le Variabili d'Ambiente

Nel dashboard Vercel, vai su **Settings** → **Environment Variables** e aggiungi:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- `GITHUB_USERNAME`
- `GITHUB_TOKEN` (opzionale)

### 4. Deploy

```bash
vercel --prod
```

## 🛠️ Comandi Disponibili

```bash
npm run dev      # Avvia server sviluppo
npm run build    # Build per produzione
npm run start    # Avvia server produzione
npm run lint     # Esegui ESLint
```

## 🔧 TO-DO: Completare altre pagine CRUD

Il progetto include un esempio completo di CRUD per le **Skills**. Per completare l'admin:

### 1. Personal Info (`/admin/personal-info`)

Crea i file:
- `app/admin/personal-info/page.tsx`
- `app/api/portfolio/personal-info/route.ts`
- `components/admin/PersonalInfoForm.tsx`

### 2. Education (`/admin/education`)

Crea i file:
- `app/admin/education/page.tsx`
- `app/api/portfolio/education/route.ts`
- `components/admin/EducationManager.tsx`

### 3. Work Experience (`/admin/work-experience`)

Crea i file:
- `app/admin/work-experience/page.tsx`
- `app/api/portfolio/work-experience/route.ts`
- `components/admin/WorkExperienceManager.tsx`

**Segui lo stesso pattern della pagina Skills!**

## 📝 Modifiche ai Dati Iniziali

Per modificare i dati iniziali, edita `data/portfolio.json` e riavvia l'applicazione.

## 🎨 Personalizzazione

### Colori

Modifica i colori in `tailwind.config.ts`:

```ts
colors: {
  primary: {
    DEFAULT: '#315481',
    dark: '#150c70',
    light: '#6583aa',
  },
}
```

### Metadata SEO

Modifica `app/layout.tsx` per aggiornare title, description, keywords.

## 📄 Licenza

Progetto personale - Marco Berutti © 2026

---

## 🐛 Troubleshooting

### Redis non disponibile localmente

In development, l'app usa `portfolio.json` come fallback. Redis è necessario solo in produzione.

### Errore durante il login

Verifica che `ADMIN_USERNAME` e `ADMIN_PASSWORD` siano configurati correttamente in `.env.local`.

### GitHub API rate limit

Aggiungi un `GITHUB_TOKEN` personale per aumentare il rate limit da 60 a 5000 richieste/ora.

## 📞 Contatti

- **Email**: marcoberutti90@gmail.com
- **GitHub**: [@marcoberutti](https://github.com/marcoberutti)
- **LinkedIn**: [Marco Berutti](https://www.linkedin.com/in/marco-berutti-b960512a3)
