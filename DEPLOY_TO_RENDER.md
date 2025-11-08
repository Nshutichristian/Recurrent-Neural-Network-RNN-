# Deploy RNN Project to Render

This guide will help you deploy your RNN Next-Word Prediction application to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Step 1: Prepare Your Repository

Make sure your repository is clean and ready:

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Prepare for Render deployment"

# Push to your repository
git push origin main
```

### Step 2: Create Render Services

#### Option A: Using Blueprint (Recommended)

1. Log in to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your Git repository
4. Render will automatically detect `render.yaml` and create both services:
   - **rnn-backend** (Python web service)
   - **rnn-frontend** (Static site)

#### Option B: Manual Setup

**Backend Service:**
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name:** rnn-backend
   - **Runtime:** Python 3
   - **Build Command:** `pip install --upgrade pip && pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120`
   - **Plan:** Free

**Frontend Service:**
1. Click "New +" → "Static Site"
2. Connect your repository
3. Configure:
   - **Name:** rnn-frontend
   - **Build Command:** `cd react-rnn-frontend && npm install && npm run build`
   - **Publish Directory:** `react-rnn-frontend/build`
   - **Plan:** Free

### Step 3: Configure Environment Variables

For the **frontend service**, add this environment variable:
- **Key:** `REACT_APP_API_URL`
- **Value:** `https://rnn-backend.onrender.com` (use your actual backend URL)

### Step 4: Wait for Deployment

- Backend typically takes 3-5 minutes to build
- Frontend typically takes 5-10 minutes to build
- Watch the build logs for any errors

### Step 5: Update Frontend API URL

After your backend is deployed:

1. Go to your backend service in Render
2. Copy the URL (e.g., `https://rnn-backend.onrender.com`)
3. Go to your frontend service → Environment
4. Update `REACT_APP_API_URL` to your backend URL
5. Trigger a manual deploy of the frontend

## Testing Your Deployment

1. Visit your frontend URL: `https://rnn-frontend.onrender.com`
2. The app should load
3. Try the different tabs:
   - **Text Generation:** Will show "Model not loaded" until you train a model
   - **Train Model:** You can train a model directly on Render
   - **Cost Analysis:** Should work immediately

## Important Notes

### Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month of usage

### Model Training on Render

- The free tier has limited RAM and CPU
- Training a full model may timeout or fail
- Consider training locally and uploading the model files
- Or use Render's paid tier for training

### Uploading Pre-trained Models

If you have a trained model locally:

1. Train your model locally
2. Upload `saved_models/` files to cloud storage (Google Drive, S3, etc.)
3. Modify `app.py` to download the model on startup
4. Or commit the model files if they're small enough

## Troubleshooting

### Backend build fails
- Check `requirements.txt` for correct dependencies
- Review build logs in Render dashboard
- Ensure Python version is compatible

### Frontend build fails
- Check `package.json` dependencies
- Ensure Node version is compatible
- Review npm install logs

### Model not loading
- This is expected on first deployment
- Use the "Train Model" tab to train on Render
- Or upload pre-trained model files

### CORS errors
- Ensure backend URL is correct in frontend environment variables
- Check that CORS is enabled in `app.py` (already configured)

### 503 Service Unavailable
- Service may be spinning up from sleep
- Wait 30-60 seconds and refresh
- Check Render dashboard for service status

## Current Deployment Configuration

Your project is configured with:

- **Backend:** Flask + Gunicorn
- **Frontend:** React + Static hosting
- **Model:** TensorFlow/Keras LSTM
- **CORS:** Enabled for cross-origin requests

## Files Created/Modified for Deployment

✅ `requirements.txt` - Python dependencies
✅ `render.yaml` - Render deployment configuration
✅ `app.py` - Updated to handle missing models gracefully
✅ `.gitignore` - Excludes large files and sensitive data

## Next Steps

1. Push your code to Git
2. Deploy using Render Blueprint or manual setup
3. Wait for builds to complete
4. Test your deployed application
5. Train a model or upload pre-trained model files

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Project Issues: Check your repository issues page

---

**Note:** The first deployment may take longer as Render downloads and installs all dependencies. Subsequent deployments will be faster.
