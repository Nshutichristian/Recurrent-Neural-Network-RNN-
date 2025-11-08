# Quick Deploy to Render - TL;DR

## 1. Prepare Your Repository

```bash
# Add all files except model files (they're too large)
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## 2. Upload Model Files to Cloud

Since model files are too large for Git, upload them to Google Drive or Dropbox:

1. Zip your `saved_models` folder
2. Upload to Google Drive
3. Get a shareable link
4. Keep this link handy

## 3. Deploy to Render

### Quick Option: Blueprint Deployment

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Select your GitHub repo
4. Click "Apply"
5. Wait for initial deployment (will fail - that's expected)

### 4. Upload Model Files

1. Click on `rnn-backend` service
2. Click "Shell"
3. Run:
   ```bash
   mkdir -p saved_models
   cd saved_models
   # Download from your Google Drive link
   wget "YOUR_GOOGLE_DRIVE_LINK" -O models.zip
   unzip models.zip
   ```
4. Click "Manual Deploy" → "Deploy latest commit"

### 5. Set Frontend API URL

1. Click on `rnn-frontend` service
2. Click "Environment"
3. Set `REACT_APP_API_URL` to your backend URL
   (e.g., `https://rnn-backend.onrender.com`)
4. Save (auto-redeploys)

### 6. Done!

Visit your frontend URL: `https://rnn-frontend.onrender.com`

---

## Troubleshooting

- **Backend won't start**: Check model files are uploaded
- **Frontend can't connect**: Verify `REACT_APP_API_URL` is set
- **Slow first load**: Free tier spins down - first request takes 30-60s

---

## Alternative: Deploy Frontend Only (No Backend)

If you just want to show the UI and cost analysis:

1. Go to https://dashboard.render.com
2. Click "New +" → "Static Site"
3. Repository: Your GitHub repo
4. Build Command: `cd react-rnn-frontend && npm install && npm run build`
5. Publish Directory: `react-rnn-frontend/build`
6. Click "Create"

The cost analysis tab works without backend (it's all frontend JavaScript).
Text generation won't work without the backend.

---

Need detailed instructions? See **RENDER_DEPLOYMENT_GUIDE.md**
