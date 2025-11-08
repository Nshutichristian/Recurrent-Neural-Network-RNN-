# RNN Model Training Guide

This guide shows you how to train the RNN model in different environments: **Jupyter**, **Google Colab**, and **Render**.

---

## Option 1: Train in Jupyter Notebook (Local)

### Prerequisites
- Python 3.8+
- At least 8GB RAM
- GPU recommended (optional, but much faster)

### Steps

1. **Install dependencies**:
   ```bash
   pip install -r requirements_notebook.txt
   ```

2. **Optional: Download embeddings** (for better results):
   - Download Dolma 300D embeddings
   - Place in project root or `glove.2024.dolma.300d/` folder

3. **Open notebook**:
   ```bash
   jupyter notebook RNN_NextWord_Complete_Assignment.ipynb
   ```

4. **Run all cells** (Kernel → Restart & Run All)

5. **Training time**:
   - CPU: 6-12 hours
   - GPU: 2-4 hours

6. **Output**: Model saved in `saved_models/`
   - `final_model.h5`
   - `tokenizer.pkl`
   - `config.json`

---

## Option 2: Train in Google Colab (Recommended - Free GPU!)

### Why Colab?
- **Free GPU** (Tesla T4)
- **No setup** required
- **Faster training** (2-3 hours with GPU)

### Steps

1. **Upload notebook to Colab**:
   - Go to https://colab.research.google.com
   - File → Upload notebook
   - Select `RNN_NextWord_Complete_Assignment.ipynb`

2. **Enable GPU**:
   - Runtime → Change runtime type
   - Hardware accelerator: **GPU**
   - Click **Save**

3. **Optional: Upload embeddings**:
   - Click folder icon (left sidebar)
   - Click upload button
   - Upload: `dolma_300_2024_1.2M.100_combined.txt`
   - Or mount Google Drive with embeddings

4. **Run all cells**:
   - Runtime → Run all

5. **Download trained model**:
   ```python
   # Add this cell at the end:
   !zip -r saved_models.zip saved_models/
   from google.colab import files
   files.download('saved_models.zip')
   ```

6. **Use the model**:
   - Extract `saved_models.zip` locally
   - Place in your project's `saved_models/` folder
   - Deploy with Flask or use locally

---

## Option 3: Train with Python Script (Command Line)

### Use Cases
- Automated training
- Server deployment
- Training on Render

### Steps

1. **Install dependencies**:
   ```bash
   pip install -r requirements_web.txt
   ```

2. **Run training script**:
   ```bash
   python train_model.py
   ```

3. **With custom parameters**:
   ```bash
   python train_model.py --epochs 30 --batch-size 64 --lstm-units 128
   ```

4. **Available options**:
   ```bash
   python train_model.py --help
   ```

   Options:
   - `--epochs`: Number of training epochs (default: 50)
   - `--batch-size`: Batch size (default: 128)
   - `--lstm-units`: LSTM units (default: 256)
   - `--embedding-dim`: Embedding dimension (default: 300)

---

## Option 4: Train on Render (Cloud)

### Important Notes
- ⚠️ **Free tier spins down** after inactivity - not ideal for long training
- Consider using **Render Paid Plan** ($7-25/month) for continuous training
- Better alternatives: Colab (free GPU) or local training

### If You Still Want to Train on Render

#### Step 1: Create a Training Job Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Background Worker"**
3. Connect your repository
4. Configure:
   - **Name**: `rnn-training`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements_web.txt`
   - **Start Command**: `python train_model.py --epochs 20`
   - **Plan**: **Standard** ($25/month minimum for long-running jobs)

5. Add environment variables:
   - `PYTHON_VERSION` = `3.11.0`

6. Click **"Create Worker"**

#### Step 2: Monitor Training

1. View logs: Dashboard → `rnn-training` → Logs
2. Training will take 6-12 hours on CPU
3. Once complete, download model files

#### Step 3: Copy Trained Model to Backend

Since the training worker and web service are separate:

1. After training completes, manually download model files from logs
2. Or use cloud storage (S3, Google Drive) to share between services
3. Upload to your backend service

### Alternative: Pre-train, Then Deploy

**Much better approach:**
1. Train model in **Google Colab** (free GPU, 2-3 hours)
2. Download `saved_models.zip`
3. Upload to **backend service** on Render
4. Deploy web app pointing to pre-trained model

This is **free** and **much faster**!

---

## Comparing Training Options

| Option | Cost | Time | GPU | Ease | Best For |
|--------|------|------|-----|------|----------|
| **Jupyter (Local)** | Free | 6-12h | Maybe | Medium | Development, testing |
| **Google Colab** | Free | 2-3h | ✅ Yes | Easy | **Recommended!** Fast, free GPU |
| **Python Script** | Free | 6-12h | Maybe | Easy | Automation, servers |
| **Render Training** | $25+/mo | 6-12h | ❌ No | Hard | Not recommended |

### Recommendation

**Use Google Colab for training**, then deploy the pre-trained model to Render!

---

## After Training: Using Your Model

Once you have `saved_models/` with these files:
- `final_model.h5`
- `tokenizer.pkl`
- `config.json`

### Test Locally

```bash
python app.py
```

Visit http://localhost:5000

### Deploy to Render

Follow the deployment guide in `RENDER_DEPLOYMENT_GUIDE.md`:

1. Push code to GitHub (without large model files)
2. Deploy backend to Render
3. Upload model files via Render Shell
4. Deploy React frontend
5. Done!

---

## Troubleshooting

### Out of Memory (OOM)

**Problem**: Training crashes with OOM error

**Solutions**:
- Reduce `BATCH_SIZE` (try 64 or 32)
- Reduce `MAX_VOCAB_SIZE` (try 5000)
- Reduce `LSTM_UNITS` (try 128)
- Use Google Colab with GPU

### Training Too Slow

**Problem**: Training takes forever

**Solutions**:
- Use GPU (Colab recommended)
- Reduce `EPOCHS` for testing (try 10-20)
- Reduce dataset size temporarily

### No Embeddings File

**Problem**: Can't find embedding file

**Solutions**:
- Training works without embeddings (uses random init)
- For best results, download embeddings:
  - Dolma 300D or GloVe 300D
  - Place in project root
- Or skip embeddings for quick testing

### Colab Timeout

**Problem**: Colab disconnects during training

**Solutions**:
- Keep browser tab open
- Click Colab page periodically
- Use Colab Pro ($10/month) for longer sessions
- Or train in shorter epochs and resume

---

## Quick Start: Recommended Workflow

```bash
# 1. Open Google Colab
Go to: https://colab.research.google.com

# 2. Upload RNN_NextWord_Complete_Assignment.ipynb

# 3. Enable GPU
Runtime → Change runtime type → GPU

# 4. Run all cells
Runtime → Run all

# 5. Wait 2-3 hours

# 6. Download model
!zip -r saved_models.zip saved_models/
from google.colab import files
files.download('saved_models.zip')

# 7. Deploy to Render (see RENDER_DEPLOYMENT_GUIDE.md)
```

That's it! 🚀

---

## Need Help?

- Check notebook output for errors
- View training logs
- Ensure all dependencies installed
- Try smaller model for testing first

Good luck with your training!
