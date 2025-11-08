# 🚀 RNN Next-Word Prediction - Complete Guide

Welcome! This guide will help you train and deploy your RNN model.

---

## 📋 Quick Overview

This project includes:
- **RNN Model** for next-word prediction (LSTM-based)
- **React Frontend** with text generation and cost analysis
- **Flask Backend** API for model inference
- **Jupyter Notebook** for training and analysis
- **Deployment configs** for Render

---

## 🎯 Choose Your Path

### Path 1: Just Want to Use/Deploy (Pre-trained Model)
**If you already have a trained model or want to deploy:**

1. ✅ Model files in `saved_models/`:
   - `final_model.h5`
   - `tokenizer.pkl`

2. 📖 Follow: **`RENDER_DEPLOYMENT_GUIDE.md`**
   - Deploy to Render (free tier)
   - React + Flask deployment

3. 🧪 Test locally first:
   ```bash
   pip install -r requirements_web.txt
   python test_generation.py  # Test model
   python app.py              # Start backend
   ```

---

### Path 2: Need to Train Model First
**If you don't have a trained model:**

1. 📖 Follow: **`TRAINING_GUIDE.md`**

2. **Recommended: Use Google Colab (FREE GPU!)**
   - Open `RNN_NextWord_Complete_Assignment.ipynb` in Colab
   - Enable GPU (Runtime → Change runtime → GPU)
   - Run all cells (2-3 hours)
   - Download trained model

3. **Alternative: Train Locally**
   ```bash
   pip install -r requirements_notebook.txt
   jupyter notebook RNN_NextWord_Complete_Assignment.ipynb
   ```

4. **Or: Use Python Script**
   ```bash
   pip install -r requirements_web.txt
   python train_model.py
   ```

---

### Path 3: Full Development Setup
**If you want to work on everything:**

1. **Train model** (see Path 2)

2. **Setup backend**:
   ```bash
   pip install -r requirements_web.txt
   python app.py
   ```
   Backend runs at: http://localhost:5000

3. **Setup React frontend**:
   ```bash
   cd react-rnn-frontend
   npm install
   npm start
   ```
   Frontend runs at: http://localhost:3000

4. **Deploy** (see `RENDER_DEPLOYMENT_GUIDE.md`)

---

## 📁 Project Structure

```
RNN/
├── 📓 RNN_NextWord_Complete_Assignment.ipynb  # Training notebook
├── 🐍 train_model.py                          # Standalone training
├── 🐍 test_generation.py                      # Test trained model
├── 🐍 app.py                                  # Flask backend (CORS enabled)
├──
├── 📂 react-rnn-frontend/                     # React UI
│   ├── src/
│   │   ├── App.js                             # Main app
│   │   └── components/
│   │       ├── TextGenerator.js               # Text generation UI
│   │       └── CostAnalysis.js                # Cost analysis UI
│   └── package.json
│
├── 📂 saved_models/                           # Trained model files
│   ├── final_model.h5                         # Trained model (YOU NEED THIS)
│   ├── tokenizer.pkl                          # Text tokenizer (YOU NEED THIS)
│   └── config.json                            # Model configuration
│
├── 📂 Documentation/
│   ├── 📖 START_HERE.md                       # This file
│   ├── 📖 TRAINING_GUIDE.md                   # How to train
│   ├── 📖 RENDER_DEPLOYMENT_GUIDE.md          # How to deploy
│   └── 📖 QUICK_DEPLOY.md                     # TL;DR deploy
│
├── ⚙️ render.yaml                             # Render config
├── ⚙️ requirements_web.txt                    # Backend deps
├── ⚙️ requirements_notebook.txt               # Notebook deps
└── ⚙️ .gitignore                              # Git ignore (excludes large files)
```

---

## 🔑 Key Files Explained

### Required for Deployment
- ✅ `app.py` - Flask backend API
- ✅ `requirements_web.txt` - Backend dependencies
- ✅ `react-rnn-frontend/` - React frontend
- ✅ `saved_models/final_model.h5` - **Trained model (YOU MUST HAVE THIS!)**
- ✅ `saved_models/tokenizer.pkl` - **Tokenizer (YOU MUST HAVE THIS!)**

### Required for Training
- ✅ `RNN_NextWord_Complete_Assignment.ipynb` - Training notebook
- ✅ `train_model.py` - Training script
- ✅ `requirements_notebook.txt` - Training dependencies

### Optional
- 📄 `dolma_300_2024_1.2M.100_combined.txt` - Embeddings (better results)
- 📄 `glove.2024.dolma.300d/` - Extracted embeddings folder

---

## ⚡ Quick Start Commands

### I have a trained model, want to test locally:
```bash
pip install -r requirements_web.txt
python test_generation.py
python app.py
```

### I need to train a model (Colab recommended):
1. Open `RNN_NextWord_Complete_Assignment.ipynb` in Google Colab
2. Runtime → Change runtime type → GPU
3. Runtime → Run all
4. Download `saved_models.zip`

### I want to deploy to Render:
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready to deploy"
git push

# 2. Follow RENDER_DEPLOYMENT_GUIDE.md
```

### I want full local development:
```bash
# Terminal 1: Backend
pip install -r requirements_web.txt
python app.py

# Terminal 2: Frontend
cd react-rnn-frontend
npm install
npm start
```

---

## ⚠️ Common Issues

### "Model not found"
**Problem**: `saved_models/final_model.h5` missing

**Solution**: Train the model first!
- Option 1: Google Colab (recommended, has free GPU)
- Option 2: Local with `python train_model.py`
- Option 3: Jupyter notebook

### "Cannot connect to backend"
**Problem**: Frontend can't reach Flask API

**Solution**:
- Ensure backend is running (`python app.py`)
- Check `REACT_APP_API_URL` in `.env.development`
- For Render, set correct backend URL in frontend env

### "Out of memory during training"
**Problem**: Not enough RAM

**Solution**:
- Use Google Colab (free, more RAM)
- Reduce `BATCH_SIZE` (try 64 or 32)
- Reduce `MAX_VOCAB_SIZE` (try 5000)

### "Render deployment fails"
**Problem**: Model files not uploaded

**Solution**:
- Model files too large for Git
- Upload via Render Shell after deployment
- See RENDER_DEPLOYMENT_GUIDE.md Step 3

---

## 📚 Documentation Files

Read these in order:

1. **START_HERE.md** (this file)
   - Overview and quick start

2. **TRAINING_GUIDE.md**
   - How to train in Jupyter/Colab/Render
   - Recommended: Google Colab with GPU

3. **RENDER_DEPLOYMENT_GUIDE.md**
   - Complete deployment walkthrough
   - React + Flask on Render free tier

4. **QUICK_DEPLOY.md**
   - TL;DR deployment steps

---

## 🎓 For Your Assignment

If using this for a class project:

### Training (Required)
✅ Train model using notebook: `RNN_NextWord_Complete_Assignment.ipynb`
✅ Document your training process and results
✅ Include performance metrics and analysis

### Deployment (Optional but Recommended)
✅ Deploy to Render for live demo
✅ Share URLs in your report:
   - Frontend: `https://your-app.onrender.com`
   - Backend: `https://your-backend.onrender.com`

### Report Components
The notebook includes everything needed:
1. ✅ Problem statement
2. ✅ Algorithm explanation
3. ✅ Implementation with code
4. ✅ Results and analysis
5. ✅ References

---

## 🆘 Need Help?

### Training Issues
- Check `TRAINING_GUIDE.md`
- Ensure dependencies installed
- Try Google Colab if local fails

### Deployment Issues
- Check `RENDER_DEPLOYMENT_GUIDE.md`
- Verify model files exist
- Check Render service logs

### General Questions
- Review documentation files
- Check error messages in terminal/logs
- Ensure all prerequisites installed

---

## 🎯 Success Checklist

Before deploying, ensure:

- [ ] Model trained successfully
- [ ] `saved_models/final_model.h5` exists
- [ ] `saved_models/tokenizer.pkl` exists
- [ ] Backend runs locally (`python app.py`)
- [ ] Frontend runs locally (`npm start`)
- [ ] Text generation works (`python test_generation.py`)
- [ ] Code pushed to GitHub
- [ ] Model files uploaded to Render (if deploying)

---

## 🚀 You're Ready!

Choose your path above and follow the corresponding guide. Good luck!

**Most Common Path:**
1. Train in Google Colab (2-3 hours, free GPU)
2. Download model files
3. Deploy to Render (see guide)
4. Share live demo URL!

---

*Last updated: November 2025*
