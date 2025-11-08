# Deploying RNN Next-Word Prediction to Render

This guide will help you deploy both the React frontend and Flask backend to Render (free tier).

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your trained model files in the `saved_models/` directory:
   - `final_model.h5` (trained RNN model)
   - `tokenizer.pkl` (text tokenizer)
3. Git repository with your code pushed to GitHub/GitLab

## Deployment Options

You have **two deployment options**:

### Option 1: Automatic Deployment (Recommended)
Use the included `render.yaml` file for automatic setup

### Option 2: Manual Deployment
Create services manually through Render dashboard

---

## Option 1: Automatic Deployment with Blueprint

### Step 1: Push to Git
```bash
# Make sure all files are committed
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Create Render Blueprint

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub/GitLab repository
4. Render will detect `render.yaml` and show you the services
5. Click **"Apply"**

**IMPORTANT**: The services will fail initially because the model files are missing. Continue to Step 3.

### Step 3: Upload Model Files

Since model files are large and shouldn't be in Git, you need to upload them manually:

#### For Backend Service:
1. Go to your `rnn-backend` service in Render dashboard
2. Click **"Shell"** in the left menu
3. Upload your model files:
   ```bash
   # Create saved_models directory
   mkdir -p saved_models
   ```

4. **Use one of these methods to upload files:**

   **Method A: Using SCP/SFTP** (if you have the files locally)
   - Download your model files from Google Colab or wherever you trained
   - Use Render's SSH access to upload files

   **Method B: Download from Cloud Storage** (Recommended)
   - Upload your `saved_models/` folder to Google Drive, Dropbox, or S3
   - Get a direct download link
   - In Render Shell:
     ```bash
     cd saved_models
     wget "YOUR_DOWNLOAD_LINK" -O final_model.h5
     wget "YOUR_DOWNLOAD_LINK" -O tokenizer.pkl
     ```

   **Method C: Use Google Colab**
   - If you trained in Colab, add this to your notebook:
     ```python
     # Install rclone
     !curl https://rclone.org/install.sh | sudo bash

     # Zip the model files
     !zip -r saved_models.zip saved_models/

     # Download to your computer
     from google.colab import files
     files.download('saved_models.zip')
     ```

5. After uploading, restart the service:
   - Click **"Manual Deploy"** → **"Deploy latest commit"**

### Step 4: Update Frontend Environment Variable

1. Go to your `rnn-frontend` service
2. Click **"Environment"** in the left menu
3. Find `REACT_APP_API_URL`
4. Set it to your backend URL (e.g., `https://rnn-backend.onrender.com`)
5. Click **"Save Changes"**
6. The frontend will automatically redeploy

### Step 5: Test Your Deployment

1. Open your frontend URL (e.g., `https://rnn-frontend.onrender.com`)
2. The app should load and show model status
3. Try generating text!

---

## Option 2: Manual Deployment

If the Blueprint doesn't work, deploy manually:

### Step 1: Deploy Backend

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your repository
4. Configure:
   - **Name**: `rnn-backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements_web.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: `Free`
5. Add environment variable:
   - `PYTHON_VERSION` = `3.11.0`
6. Click **"Create Web Service"**

7. Upload model files (see Option 1, Step 3)

### Step 2: Deploy Frontend

1. Click **"New +"** → **"Static Site"**
2. Connect your repository
3. Configure:
   - **Name**: `rnn-frontend`
   - **Build Command**: `cd react-rnn-frontend && npm install && npm run build`
   - **Publish Directory**: `react-rnn-frontend/build`
4. Add environment variable:
   - `REACT_APP_API_URL` = `https://rnn-backend.onrender.com` (use your actual backend URL)
5. Click **"Create Static Site"**

---

## Important Notes

### Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after sleep takes ~30-60 seconds to wake up
- 750 hours/month free (about 1 service running 24/7)

### Model Files

**DO NOT** commit large model files to Git. They're too large and will cause issues:
- Use `.gitignore` to exclude `saved_models/` from Git
- Upload separately as described above
- Consider using Render Disks (paid feature) for persistent storage

### Environment Variables

The `.env.production` file sets the API URL for production builds. You can override this in Render:
- Frontend: `REACT_APP_API_URL`
- Backend: No env vars needed by default

### Troubleshooting

**Backend fails to start:**
- Check if model files exist in `saved_models/`
- View logs: Dashboard → Service → Logs
- Common issue: Missing `flask-cors` or `gunicorn` in requirements

**Frontend can't connect to backend:**
- Check CORS is enabled in `app.py`
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is running and accessible

**Model loading errors:**
- Ensure TensorFlow version matches training environment
- Check file paths in `app.py` (should be `saved_models/final_model.h5`)
- Verify both `final_model.h5` and `tokenizer.pkl` exist

**Build timeouts:**
- Frontend build might take 3-5 minutes
- Backend dependencies (especially TensorFlow) can take 5-10 minutes
- Be patient on first deploy

---

## Simplified Deployment (Without Model - Just UI)

If you want to deploy just the UI without the backend (for demonstration):

1. Deploy only the frontend as a static site
2. The cost analysis tab will still work (it's all frontend)
3. Text generation won't work without the backend

---

## Local Testing Before Deployment

Test your production build locally:

```bash
# Backend
cd /path/to/RNN
pip install -r requirements_web.txt
python app.py

# Frontend (in another terminal)
cd react-rnn-frontend
npm install
REACT_APP_API_URL=http://localhost:5000 npm run build
npx serve -s build
```

Open http://localhost:3000 to test.

---

## Post-Deployment

### Your Live URLs
- Frontend: `https://rnn-frontend.onrender.com`
- Backend API: `https://rnn-backend.onrender.com`
- API Status: `https://rnn-backend.onrender.com/api/status`

### Share Your Project
Add these URLs to your README.md or project report!

---

## Cost Optimization Tips

1. **Use Google Colab for Training** (Free)
   - Train your model on Colab's free GPUs
   - Download model files and upload to Render

2. **Static Site for Frontend** (Free)
   - React builds to static HTML/JS/CSS
   - Costs nothing to host on Render

3. **Backend on Free Tier** (Free with limitations)
   - Spins down after inactivity
   - Good for demos and class projects
   - Consider upgrading ($7/month) for always-on service

4. **Alternative: Deploy Frontend Only**
   - Deploy React app to Vercel/Netlify (free, no sleep)
   - Keep backend local or on another service

---

## Need Help?

- Render Docs: https://render.com/docs
- Check service logs in Render dashboard
- Make sure all requirements are in `requirements_web.txt`
- Verify model files are uploaded correctly

Good luck with your deployment! 🚀
