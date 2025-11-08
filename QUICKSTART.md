# Quick Start Guide - RNN Text Generator

Get your text generator running in 10 minutes!

## Prerequisites

- Python 3.9+ installed
- Terminal/Command Prompt access
- Text editor
- Web browser

## Step 1: Navigate to Project (30 seconds)

```bash
cd "C:\Users\nshut\Documents\CST 435\projects\RNN\backend"
```

## Step 2: Install Dependencies (2-5 minutes)

### Create Virtual Environment
```bash
# Create
python -m venv venv

# Activate
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate
```

### Install Packages
```bash
pip install -r requirements.txt
```

This installs: TensorFlow, FastAPI, Matplotlib, and other dependencies.

## Step 3: Get Training Data (30 seconds)

```bash
python scripts/download_data.py
```

This downloads "Alice in Wonderland" (~140KB) from Project Gutenberg.

**Output should show:**
```
✓ Downloaded to data/training_text.txt
✓ Cleaned text
  - Characters: 144,638
  - Words: 26,531
  - Size: 141.25 KB
```

## Step 4: Train the Model (15-30 minutes)

```bash
cd app
python train.py
```

**What happens:**
- Prepares training sequences
- Builds LSTM model
- Trains for up to 50 epochs (but usually stops earlier with early stopping)
- Generates visualizations
- Saves model files

**Expected output:**
```
Loading training data...
Vocabulary size: 3248
Total sequences: 26481
Building model...
Training model...
Epoch 1/50
...
✓ Training complete!
```

**Coffee break time!** Training takes 15-30 minutes depending on your computer.

## Step 5: Start the Backend (10 seconds)

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**You should see:**
```
✓ Model loaded successfully
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Keep this terminal open!** The server needs to keep running.

## Step 6: Open the Frontend (5 seconds)

### Option A: Direct File Open
1. Navigate to: `C:\Users\nshut\Documents\CST 435\projects\RNN\frontend`
2. Double-click `index.html`
3. Opens in your default browser

### Option B: Local Server (recommended)
Open a **new terminal**:

```bash
cd "C:\Users\nshut\Documents\CST 435\projects\RNN\frontend"
python -m http.server 3000
```

Then visit: `http://localhost:3000`

## Step 7: Generate Text! (30 seconds)

1. **Enter seed text**: "Alice was beginning to get very"
2. **Adjust creativity**: Try different temperatures (0.5 = safe, 2.0 = wild)
3. **Set length**: Choose 50-100 words
4. **Click "Generate Text"**

### Example Results

**Temperature 0.5** (predictable):
> "alice was beginning to get very tired of sitting by her sister on the bank..."

**Temperature 1.5** (creative):
> "alice was beginning to get very curious indeed and she ran across the field..."

**Temperature 2.0** (wild):
> "alice was beginning to get very large rabbit hole went straight tunnel..."

## Quick Troubleshooting

### "Model files not found"
- Make sure you ran `python train.py` first
- Check that files exist in `saved_models/` directory

### "Connection refused" / CORS error
- Ensure backend is running on port 8000
- Check terminal - should show "Uvicorn running..."
- Try restarting the backend

### "Out of memory" during training
Edit `app/train.py` and reduce parameters:
```python
generator = TextGenerator(
    lstm_units=100,  # Reduced from 150
    num_layers=1,    # Reduced from 2
)

history = generator.train(
    batch_size=64,   # Reduced from 128
    ...
)
```

### Frontend not connecting to backend
Make sure the API URL is correct in `frontend/index.html`:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## Next Steps

### Try Different Datasets
1. Replace `backend/data/training_text.txt` with your own text
2. Run `python train.py` again
3. Generate text in your new style!

**Good datasets to try:**
- Shakespeare plays
- Song lyrics
- Reddit comments (r/jokes)
- Wikipedia articles on a topic
- Your own writing

### Experiment with Parameters

Edit `backend/app/train.py`:

```python
# More creative model
generator = TextGenerator(
    sequence_length=100,  # Longer context
    lstm_units=256,       # More capacity
    num_layers=3,         # Deeper network
)

# Train longer
history = generator.train(
    epochs=100,  # More epochs
    ...
)
```

### Check Model Visualizations

After training, check these files:
- `backend/visualizations/model_architecture.png` - Model diagram
- `backend/visualizations/training_history.png` - Loss/accuracy plots

### Test the API Directly

```bash
# Health check
curl http://localhost:8000/

# Generate text
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "seed_text": "alice was beginning",
    "num_words": 50,
    "temperature": 1.0
  }'

# Model info
curl http://localhost:8000/model/info
```

## Common Commands Reference

```bash
# Start backend (from backend/app/)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Start frontend (from frontend/)
python -m http.server 3000

# Retrain model (from backend/app/)
python train.py

# Download new data (from backend/)
python scripts/download_data.py

# Check API docs
# Visit: http://localhost:8000/docs
```

## File Structure Quick Reference

```
RNN/
├── backend/
│   ├── app/
│   │   ├── main.py           ← FastAPI server
│   │   ├── train.py          ← Training script
│   │   └── text_generator.py ← Model code
│   ├── data/
│   │   └── training_text.txt ← Your training data
│   ├── saved_models/
│   │   ├── model.h5          ← Trained model
│   │   └── tokenizer.pkl     ← Vocabulary
│   └── visualizations/       ← Generated plots
│
└── frontend/
    └── index.html            ← Web interface
```

## Tips for Best Results

1. **More data = better quality**: Aim for 100KB+ of training text
2. **Be patient**: Training takes time, but quality improves
3. **Experiment with temperature**:
   - 0.5-0.8: For coherent, safe text
   - 1.0-1.3: For balanced creativity
   - 1.5-2.0: For wild, unexpected text
4. **Longer seed text**: Give the model more context for better results
5. **Consistent style**: Train on text from one author/source for better style mimicry

## Success Checklist

- [ ] Virtual environment activated
- [ ] Dependencies installed
- [ ] Training data downloaded
- [ ] Model trained successfully
- [ ] Backend running on port 8000
- [ ] Frontend accessible
- [ ] Generated first text sample
- [ ] Explored different temperatures
- [ ] Viewed model visualizations

## Getting Help

1. Check `README.md` for detailed documentation
2. Review `TECHNICAL_REPORT_TEMPLATE.md` for understanding concepts
3. Look at error messages carefully
4. Google specific TensorFlow/FastAPI errors
5. Ask your instructor or classmates

---

**Congratulations! You now have a working text generator powered by deep learning!** 🎉

Experiment, have fun, and learn about how neural networks understand and generate language!
