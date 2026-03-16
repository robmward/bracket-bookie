# 🏆 Bracket Bookie

NCAA Tournament betting tracker — First Four + Round of 64.

---

## 🚀 Deploy to Netlify (step by step)

### Step 1 — Put this on GitHub

1. Go to **github.com** and log in
2. Click the **+** button (top right) → **New repository**
3. Name it `bracket-bookie`, make it **Private**, click **Create repository**
4. On your computer, open **Terminal** (Mac) or **Command Prompt** (Windows)
5. Run these commands one at a time:

```bash
cd path/to/bracket-bookie   # navigate to this folder
npm install                  # install dependencies (one time only)
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bracket-bookie.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

---

### Step 2 — Connect to Netlify

1. Go to **netlify.com** → Sign up free (use your GitHub account)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** → authorize Netlify → pick `bracket-bookie`
4. Build settings will auto-fill (thanks to `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**
6. In ~60 seconds you'll get a URL like `https://amazing-bookie-123.netlify.app`
7. **Share that link with your friends!**

---

### Step 3 — Adding new rounds later

When the Round of 32 matchups are announced:

1. Tell Claude the new games
2. Claude updates `src/App.jsx` with the new game data and tab
3. You copy-paste the new `App.jsx` into this folder
4. Run:

```bash
git add .
git commit -m "add round of 32"
git push
```

Netlify auto-deploys in ~60 seconds. Done. ✅

---

## 💾 Data & Backups

- **localStorage** — data auto-saves in the browser on your device
- **JSON Backup** — download from the admin banner before closing
- **Restore** — upload your JSON backup on the Restore tab

Backups are forward-compatible — adding new rounds won't break old backups.

---

## 🔑 Admin PIN

Default: `1234`

To change it, edit line in `src/App.jsx`:
```js
const ADMIN_PIN = "1234";
```
Then push to GitHub and Netlify will redeploy.

---

## 🛠 Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`
