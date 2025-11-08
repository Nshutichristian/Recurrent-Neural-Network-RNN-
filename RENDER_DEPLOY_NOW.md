# Deploy to Render NOW - Quick Guide

Your code is now pushed to GitHub! Follow these steps to deploy:

## GitHub Repository
https://github.com/Nshutichristian/Recurrent-Neural-Network-RNN-.git

## Step-by-Step Deployment

### 1. Go to Render Dashboard
Visit: https://dashboard.render.com/

### 2. Create Blueprint Deployment (Recommended)

1. Click the **"New +"** button in the top right
2. Select **"Blueprint"** from the dropdown
3. Click **"Connect a repository"**
4. Select **GitHub** and authorize Render if needed
5. Find and select your repository: `Recurrent-Neural-Network-RNN-`
6. Render will detect `render.yaml` automatically
7. Click **"Apply"** to create both services

This will create:
- **rnn-backend** - Your Flask API server
- **rnn-frontend** - Your React application

### 3. Wait for Build (5-10 minutes)

Watch the build logs for both services:
- Backend typically takes 3-5 minutes
- Frontend typically takes 5-10 minutes

### 4. Get Backend URL

Once the backend is deployed:
1. Click on **rnn-backend** service
2. Copy the URL at the top (e.g., `https://rnn-backend.onrender.com`)

### 5. Update Frontend Environment Variable

1. Click on **rnn-frontend** service
2. Go to **Environment** tab on the left
3. Find `REACT_APP_API_URL`
4. Update the value to your backend URL (from step 4)
5. Click **"Save Changes"**
6. Click **"Manual Deploy"** → **"Deploy latest commit"**

### 6. Access Your Application

Once both services show "Live":
- Frontend: `https://rnn-frontend.onrender.com`
- Backend API: `https://rnn-backend.onrender.com`

### 7. Test Your Deployment

1. Open your frontend URL in a browser
2. You should see the RNN Next-Word Prediction interface
3. Try the tabs:
   - **Cost Analysis** - Should work immediately
   - **Train Model** - Can train a model on Render
   - **Text Generation** - Will work after training a model

## Alternative: Manual Service Creation

If you prefer manual setup:

### Backend Service
1. New + → **Web Service**
2. Connect repository: `Recurrent-Neural-Network-RNN-`
3. Settings:
   - **Name:** `rnn-backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install --upgrade pip && pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120`
   - **Plan:** Free

### Frontend Service
1. New + → **Static Site**
2. Connect repository: `Recurrent-Neural-Network-RNN-`
3. Settings:
   - **Name:** `rnn-frontend`
   - **Build Command:** `cd react-rnn-frontend && npm install && npm run build`
   - **Publish Directory:** `react-rnn-frontend/build`
   - **Plan:** Free
4. Environment Variables:
   - **REACT_APP_API_URL:** (your backend URL)

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Most common issues are dependency problems
- All dependencies are configured in `requirements.txt`

### Service Shows "503 Service Unavailable"
- Wait 30-60 seconds - services spin up from sleep on free tier
- Check service status in dashboard
- Review service logs for errors

### Frontend Can't Connect to Backend
- Verify `REACT_APP_API_URL` is set correctly
- Make sure backend is "Live" in dashboard
- Check CORS is enabled (already configured in code)

### Model Not Found Error
- This is expected on first deployment
- Go to "Train Model" tab
- Train a model using the web interface
- Or upload pre-trained model files to Render

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- 750 hours/month free usage per service

### Model Training
- Training on free tier may be slow or timeout
- Consider training locally first
- Can upload model files via Render dashboard or cloud storage

## Files Deployed

✅ All errors fixed
✅ Backend configured for production
✅ Frontend configured with API connection
✅ Health checks enabled
✅ CORS enabled
✅ Documentation included

## Next Steps After Deployment

1. ✅ Push to GitHub - **DONE**
2. 🚀 Deploy to Render - **Follow steps above**
3. ✅ Test application
4. 📊 Train a model (optional)
5. 📝 Use for your assignment

## Support Resources

- Render Docs: https://render.com/docs
- Your Deployment Guides:
  - `DEPLOY_TO_RENDER.md` - Complete guide
  - `DEPLOYMENT_CHECKLIST.md` - Quick checklist
  - `FIXES_SUMMARY.md` - What was fixed

---

**Ready to deploy!** Go to https://dashboard.render.com/ and follow the steps above.
