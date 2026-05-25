# Personal portfolio — Shohini Rhea Sarkar

Next.js portfolio site (research, projects, art, resume, thoughts).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel (recommended — free & low maintenance)

[Vercel](https://vercel.com) is built for Next.js: **free** for personal sites, **zero server setup**, and **auto-deploys** whenever you push to GitHub.

### One-time setup (~5 minutes)

1. **Push your code to GitHub** (if you have not already):
   ```bash
   git add .
   git commit -m "Prepare portfolio for deployment"
   git push origin main
   ```
   Use your default branch name if it is not `main` (e.g. `master`).

2. **Import the repo on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with **GitHub**
   - Import **`shohinirheasarkar/personalportfoliorhea`**
   - Leave all settings as defaults (Framework: Next.js, Build: `npm run build`, Output: automatic)
   - Click **Deploy**

3. **Wait for the build** — you get a live URL like `https://personalportfoliorhea.vercel.app`

4. **Optional — stable URL for SEO**  
   In Vercel → **Project → Settings → Environment Variables**, add:
   - Name: `NEXT_PUBLIC_SITE_URL`  
   - Value: `https://personalportfoliorhea.vercel.app` (your real Vercel URL)  
   - Redeploy once (Deployments → ⋯ → Redeploy)

### After that

- Every `git push` to your production branch **redeploys automatically**
- No servers to patch or keep awake
- Preview URLs for every pull request (optional)

### Custom domain (optional)

Vercel → **Project → Settings → Domains** → add e.g. `yourname.com` and follow the DNS steps.

## Build check

```bash
npm run build
```

## Tech

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, shadcn/ui
