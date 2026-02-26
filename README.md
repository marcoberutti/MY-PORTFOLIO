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
GITHUB_USERNAME=***
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

Il progetto supporta **due modalità** per Redis:

### 1. Vercel KV (Consigliato per Vercel)
- In **sviluppo locale**: usa il file `data/portfolio.json` come fallback
- In **produzione su Vercel**: i dati sono salvati automaticamente su **Vercel KV (Redis)**
- Configurazione automatica quando crei un database KV su Vercel

### 2. Redis Standard (con ioredis)
- Supporta qualsiasi provider Redis (Railway, Render, Redis Cloud, Upstash)
- Configura la variabile `REDIS_URL` nel `.env.local`:
  ```env
  REDIS_URL=redis://username:password@host:port/db
  ```
- Esempi provider:
  - **Railway**: `redis://default:password@redis.railway.app:6379`
  - **Redis Cloud**: `redis://default:password@redis-12345.cloud.redislabs.com:12345`
  - **Upstash**: `redis://default:password@your-db.upstash.io:6379`
  - **Locale**: `redis://localhost:6379`

### Priorità Fallback

L'applicazione cerca Redis in questo ordine:
1. **REDIS_URL** (se configurato) → Redis standard con ioredis
2. **Vercel KV** (se su Vercel con KV attivato)
3. **JSON locale** (data/portfolio.json) - fallback sviluppo

### Inizializzazione automatica

Al primo avvio, i dati da `portfolio.json` vengono caricati automaticamente in Redis.

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

### Metodo 1: Vercel CLI (Consigliato)

#### 1. Installa Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login e Deploy

```bash
vercel login
cd C:\Users\marco\SVILUPPO\REACT\MY-PORTFOLIO
vercel
```

Segui il wizard:
- **Set up and deploy?** → Yes
- **Which scope?** → Seleziona il tuo account
- **Link to existing project?** → No (prima volta)
- **Project name?** → marco-berutti-portfolio
- **Directory?** → `.` (premi Enter)
- **Override settings?** → No

#### 3. Configura Vercel KV (Redis)

1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il tuo progetto
3. Vai su **Storage** → **Create Database** → **KV (Redis)**
4. Configura:
   - **Database Name**: `portfolio-kv`
   - **Region**: Europe (Frankfurt) o la più vicina
5. Click **Create**
6. Vercel aggiungerà automaticamente le variabili:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`

#### 4. Aggiungi le Variabili d'Ambiente

Nel dashboard Vercel, vai su **Settings** → **Environment Variables** e aggiungi:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tuaPasswordSicura123!
JWT_SECRET=GeneraConOpenSSLRand (vedi sotto)
GITHUB_USERNAME=marcoberutti
GITHUB_TOKEN=ghp_tuoTokenGitHub (opzionale)
```

**Per generare JWT_SECRET sicuro:**
```bash
openssl rand -base64 32
# oppure in PowerShell:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 5. Re-deploy

Dopo aver aggiunto le variabili:

```bash
vercel --prod
```

### Metodo 2: Vercel Dashboard (Git)

1. Push il progetto su GitHub/GitLab
2. Vai su [vercel.com/new](https://vercel.com/new)
3. Importa il repository
4. Vercel rileva automaticamente Next.js
5. Segui i passaggi 3-5 del Metodo 1

---

### ✅ Verifica Deploy

Dopo il deploy:

1. **Testa il sito**: `https://tuo-dominio.vercel.app`
2. **Testa l'admin**: `https://tuo-dominio.vercel.app/admin/login`
3. **Verifica Redis**: I dati dovrebbero essere caricati automaticamente dal `portfolio.json`

**Nota**: Al primo accesso, l'app inizializza automaticamente Redis con i dati da `data/portfolio.json`.

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
