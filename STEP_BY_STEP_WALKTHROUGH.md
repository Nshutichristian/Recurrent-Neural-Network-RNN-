# 🎯 Complete Step-by-Step Walkthrough

## Part 1: Train Model in Google Colab (2-3 hours)

### Step 1: Get Your Notebook from GitHub

1. **Go to your GitHub repository:**
   ```
   https://github.com/Nshutichristian/Recurrent-Neural-Network-RNN-
   ```

2. **Find the notebook file:**
   - Click on: `RNN_NextWord_Complete_Assignment.ipynb`

3. **Download the notebook:**
   - Click the "Download raw file" button (top right)
   - Or click "Raw" and save the page

---

### Step 2: Open Google Colab

1. **Go to Google Colab:**
   ```
   https://colab.research.google.com
   ```

2. **Sign in with your Google account** (if not already signed in)

3. **Upload your notebook:**
   - Click **"File"** → **"Upload notebook"**
   - Click **"Choose File"**
   - Select `RNN_NextWord_Complete_Assignment.ipynb` you just downloaded
   - Click **"Upload"**

---

### Step 3: Enable FREE GPU (VERY IMPORTANT!)

1. **Click:** Runtime (in top menu)

2. **Click:** Change runtime type

3. **In the popup:**
   - Hardware accelerator: Select **"GPU"** (not "None"!)
   - GPU type: **"T4"** (free)

4. **Click:** Save

You'll see a green checkmark with "GPU" in the top right corner.

**This is crucial!** Without GPU:
- Training takes 10-12 hours ❌
- With GPU: 2-3 hours ✅

---

### Step 4: Run the Notebook

**Option A: Run All Cells (Easiest)**

1. Click **"Runtime"** → **"Run all"**

2. When prompted "Warning: This notebook was not authored by Google":
   - Click **"Run anyway"**

3. **Wait 2-3 hours** ⏱️
   - You'll see cells executing one by one
   - Watch the progress bars
   - Keep the browser tab open (but you can do other things)

**Option B: Run Step by Step**

1. Click on the first cell
2. Press `Shift + Enter` to run it
3. Wait for it to finish (green checkmark)
4. Repeat for each cell

**⚠️ Important:** Keep the browser tab open! If you close it, Colab disconnects.

**💡 Tip:** Click somewhere on the page every 30 minutes to prevent timeout.

---

### Step 5: Monitor Training Progress

You'll see output like:
```
Epoch 1/50
████████████████ 100%
loss: 4.5234 - accuracy: 0.1234 - val_loss: 4.6789

Epoch 2/50
████████████████ 100%
loss: 4.2156 - accuracy: 0.1456 - val_loss: 4.4321
...
```

**What to watch for:**
- ✅ Loss decreasing = good
- ✅ Accuracy increasing = good
- ✅ No errors = good

**Training will stop automatically** when:
- It reaches max epochs (50), OR
- Early stopping triggers (no improvement for 5 epochs)

---

### Step 6: Download Your Trained Model

After training completes, **add and run this cell at the end:**

1. **Click on the last cell**

2. **Click "+" Code** (to add a new cell)

3. **Copy and paste this code:**
   ```python
   # Zip the trained model files
   !zip -r saved_models.zip saved_models/

   # Download to your computer
   from google.colab import files
   files.download('saved_models.zip')
   ```

4. **Press `Shift + Enter`** to run it

5. **A download will start automatically**
   - File name: `saved_models.zip`
   - Size: ~50-100 MB
   - Save it somewhere safe!

---

### Step 7: Extract Model Files (On Your Computer)

1. **Find the downloaded file:**
   - Usually in your Downloads folder
   - File: `saved_models.zip`

2. **Extract it:**
   - Windows: Right-click → Extract All
   - Mac: Double-click the zip file

3. **You should see a folder called `saved_models/` with:**
   ```
   saved_models/
   ├── final_model.h5      ← The trained model
   ├── tokenizer.pkl       ← The tokenizer
   ├── config.json         ← Configuration
   └── history.pkl         ← Training history
   ```

**✅ You now have a trained model!**

---

## Part 2: Test Locally (Optional but Recommended)

Before deploying, test that your model works.

### Step 1: Copy Model to Your Project

1. **Copy the `saved_models/` folder** you extracted

2. **Paste it into your project directory:**
   ```
   RNN/
   ├── saved_models/        ← Paste here!
   │   ├── final_model.h5
   │   ├── tokenizer.pkl
   │   └── ...
   ├── app.py
   ├── test_generation.py
   └── ...
   ```

### Step 2: Test the Model

Open terminal/command prompt in your project folder:

```bash
# Install dependencies
pip install -r requirements_web.txt

# Test model works
python test_generation.py
```

**Expected output:**
```
Loading model...
✓ Model loaded
✓ Tokenizer loaded

Model Info:
  Vocabulary size: 10,000
  Sequence length: 50

TEXT GENERATION TEST
============================================================

Seed: 'to be or not to'
------------------------------------------------------------
T=0.5: to be or not to be the king of the world...
T=1.0: to be or not to see the light of day...
T=1.5: to be or not to the great and noble...

✓ Model is working correctly!
```

### Step 3: Test the Web App

```bash
# Start Flask backend
python app.py
```

**Expected output:**
```
============================================================
RNN NEXT-WORD PREDICTION WEB APPLICATION
============================================================

Loading model and tokenizer...
✓ Model loaded from saved_models/final_model.h5
✓ Tokenizer loaded from saved_models/tokenizer.pkl

✓ Application ready!

Starting web server...
============================================================

🌐 Open your browser and go to:
   http://localhost:5000
```

**Open browser:** http://localhost:5000/api/status

You should see JSON like:
```json
{
  "model_loaded": true,
  "tokenizer_loaded": true,
  "vocab_size": 10000,
  "sequence_length": 50
}
```

**✅ Backend works!**

---

## Part 3: Deploy to Render

### Step 1: Prepare Your Repository

Your code is already on GitHub, but **DON'T** push the model files (they're too large).

**Verify .gitignore is working:**
```bash
cd "path/to/your/RNN/project"
git status
```

You should **NOT** see `saved_models/` in the list. The `.gitignore` file prevents it.

---

### Step 2: Go to Render Dashboard

1. **Open:** https://dashboard.render.com

2. **Sign up / Log in:**
   - You can sign in with GitHub (recommended)
   - This makes connecting your repo easier

3. **You'll see the Render Dashboard**

---

### Step 3: Create Backend Service

1. **Click the big blue button:** "New +"

2. **Select:** "Web Service"

3. **Connect your GitHub repository:**
   - Click "Connect account" (if first time)
   - Authorize Render to access GitHub
   - Find your repo: `Recurrent-Neural-Network-RNN-`
   - Click "Connect"

4. **Configure the service:**

   Fill in these fields:

   | Field | Value |
   |-------|-------|
   | **Name** | `rnn-backend` |
   | **Region** | Choose closest to you |
   | **Branch** | `main` |
   | **Root Directory** | Leave blank |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install -r requirements_web.txt` |
   | **Start Command** | `gunicorn app:app` |
   | **Instance Type** | `Free` |

5. **Add Environment Variable:**
   - Click "Advanced"
   - Click "Add Environment Variable"
   - Key: `PYTHON_VERSION`
   - Value: `3.11.0`

6. **Click:** "Create Web Service"

**Wait for deployment** (5-10 minutes)
- You'll see logs scrolling
- It will say "Build successful"
- Then it will try to start...
- **It will FAIL** - that's expected! (No model files yet)

---

### Step 4: Upload Model Files to Backend

Now we need to upload the model files you downloaded from Colab.

#### Option A: Using Render Shell (Easier)

1. **In your backend service page, click:** "Shell" (left sidebar)

2. **A terminal opens in your browser**

3. **Create directory:**
   ```bash
   mkdir -p saved_models
   cd saved_models
   ```

4. **Upload files using one of these methods:**

   **Method 1: Upload from your computer**

   Unfortunately Render Shell doesn't have direct upload. Use Method 2 or 3.

   **Method 2: Use Google Drive**

   a. Upload `saved_models.zip` to Google Drive

   b. Get a shareable link:
      - Right-click the file → Get link
      - Change to "Anyone with the link"
      - Copy the link

   c. In Render Shell:
      ```bash
      # Install gdown
      pip install gdown

      # Download from Google Drive (replace FILE_ID)
      gdown https://drive.google.com/uc?id=YOUR_FILE_ID

      # Or if that doesn't work, try:
      gdown --fuzzy "https://drive.google.com/file/d/YOUR_FILE_ID/view"

      # Unzip
      unzip saved_models.zip

      # Move files to correct location
      mv saved_models/* .
      rmdir saved_models
      cd ..
      ```

   **Method 3: Upload to Dropbox/OneDrive**

   Similar to Google Drive, get a direct download link.

5. **Verify files are there:**
   ```bash
   ls -lh saved_models/
   ```

   You should see:
   ```
   final_model.h5
   tokenizer.pkl
   config.json
   ```

6. **Restart the service:**
   - Exit the Shell
   - Click "Manual Deploy" → "Deploy latest commit"

7. **Watch the logs:**
   - Should see: "✓ Model loaded"
   - Should see: "✓ Tokenizer loaded"
   - Should see: "Application ready!"

8. **Your backend is now live!**
   - Copy the URL at the top (something like: `https://rnn-backend.onrender.com`)

---

### Step 5: Create Frontend Service

1. **Go back to Dashboard:** https://dashboard.render.com

2. **Click:** "New +" → "Static Site"

3. **Connect the same repository**

4. **Configure:**

   | Field | Value |
   |-------|-------|
   | **Name** | `rnn-frontend` |
   | **Branch** | `main` |
   | **Root Directory** | Leave blank |
   | **Build Command** | `cd react-rnn-frontend && npm install && npm run build` |
   | **Publish Directory** | `react-rnn-frontend/build` |

5. **Add Environment Variable:**
   - Click "Advanced"
   - Click "Add Environment Variable"
   - Key: `REACT_APP_API_URL`
   - Value: `https://rnn-backend.onrender.com` (your backend URL from Step 4)

6. **Click:** "Create Static Site"

**Wait for deployment** (3-5 minutes)
- Building React app...
- Should complete successfully

---

### Step 6: Test Your Deployment! 🎉

1. **Open your frontend URL:**
   - Something like: `https://rnn-frontend.onrender.com`

2. **You should see:**
   - Beautiful React app
   - Model status showing (vocab size, etc.)
   - Two tabs: "Text Generation" and "Cost Analysis"

3. **Test text generation:**
   - Enter seed text: "to be or not to"
   - Click "Generate Text"
   - You should see text appear!

4. **Test cost analysis:**
   - Click "Cost Analysis" tab
   - Should show charts and cost breakdown

**✅ YOU'RE LIVE!**

---

## Part 4: Share Your Work

### Your URLs:

**Frontend (User Interface):**
```
https://rnn-frontend.onrender.com
```

**Backend (API):**
```
https://rnn-backend.onrender.com
```

**API Status Endpoint:**
```
https://rnn-backend.onrender.com/api/status
```

### Add to Your Report/Presentation:

```
Live Demo: https://rnn-frontend.onrender.com
GitHub: https://github.com/Nshutichristian/Recurrent-Neural-Network-RNN-
```

---

## ⚠️ Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- This is normal and expected

**When someone visits your site:**
1. First load: Wait 30-60 seconds (waking up)
2. After that: Fast and normal
3. After 15 minutes idle: Sleeps again

**To keep it awake:**
- Visit it every 10 minutes
- Or upgrade to paid tier ($7/month)

### Model Files

**DO NOT** commit model files to GitHub:
- They're too large (50-100 MB)
- GitHub has 100 MB file limit
- The `.gitignore` prevents this
- Upload separately to Render

---

## 🆘 Troubleshooting

### Colab Issues

**"Runtime disconnected"**
- Click Reconnect
- Your work is saved
- Re-run from last checkpoint

**"Out of memory"**
- Reduce BATCH_SIZE (try 64 or 32)
- This is rare with GPU

**"Can't download files"**
- Check popup blocker
- Try different browser
- Or manually copy files from Colab

### Render Issues

**Backend won't start:**
- Check model files uploaded correctly
- View Logs for error messages
- Most common: Missing model files

**Frontend can't connect:**
- Check `REACT_APP_API_URL` is set correctly
- Make sure it's the backend URL
- Should start with `https://`

**"Service Unavailable"**
- Service is spinning up (first request)
- Wait 30-60 seconds
- Refresh

---

## ✅ Success Checklist

- [ ] Trained model in Colab (2-3 hours)
- [ ] Downloaded `saved_models.zip`
- [ ] Tested model locally (optional)
- [ ] Created backend service on Render
- [ ] Uploaded model files to Render
- [ ] Backend starts successfully
- [ ] Created frontend service on Render
- [ ] Set `REACT_APP_API_URL` environment variable
- [ ] Frontend builds successfully
- [ ] Can generate text on live site
- [ ] Shared URLs with professor/classmates

---

## 🎉 You're Done!

You now have:
- ✅ Trained RNN model
- ✅ Live web app on Render
- ✅ Public URL to share
- ✅ Complete project on GitHub

**Show it off!** 🚀

---

## Need More Help?

**Documentation in your repo:**
- `START_HERE.md` - Overview
- `TRAINING_GUIDE.md` - Training details
- `RENDER_DEPLOYMENT_GUIDE.md` - Deployment details
- `QUICK_DEPLOY.md` - Quick reference

**Resources:**
- Render Docs: https://render.com/docs
- Your GitHub: https://github.com/Nshutichristian/Recurrent-Neural-Network-RNN-
- Google Colab: https://colab.research.google.com

Good luck! You've got this! 💪
