# What to Do After Setup

## For Generating Sentences (RNN Next-Word Prediction)

### Step 1: Launch Jupyter Notebook

```bash
# Make sure you're in the project directory
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN

# Activate the virtual environment
source notebook_env/bin/activate

# Launch Jupyter
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

Your browser will open automatically with the notebook.

### Step 2: Run the Notebook

**Option A: Run Everything at Once**
- In Jupyter, click: **Cell** → **Run All**
- This will:
  - Download Shakespeare dataset
  - Download GloVe embeddings
  - Train the model (takes 30-60 min with GPU, 3-5 hours with CPU)
  - Generate sentences automatically

**Option B: Run Step by Step (Recommended for Learning)**
- Press **Shift + Enter** to run each cell
- Read the explanations as you go

### Step 3: Generate Custom Sentences

After training completes, scroll to **Section 8.2** in the notebook.

You'll see code like this:

```python
# Change these to generate your own sentences
seed_text = "to be or not to"
generated = generate_text(seed_text, num_words=20, temperature=1.0)
print(generated)
```

**Try different seed texts:**
```python
generate_text("the king of", num_words=30, temperature=1.0)
generate_text("once upon a time", num_words=50, temperature=0.5)
generate_text("i love you", num_words=20, temperature=1.5)
```

**Temperature controls creativity:**
- `0.5` = Conservative, predictable
- `1.0` = Balanced (default)
- `1.5` = Creative, varied
- `2.0` = Very random

### Step 4: Interactive Generation

For interactive sentence generation, find **Section 8.3** and uncomment this line:

```python
# interactive_generation()  # Remove the # to activate
interactive_generation()
```

Then run the cell. You can type your own prompts!

---

## For Cost Analysis (From Existing Backend)

The RNN project already has cost analysis tools. Here's how to use them:

### Quick Cost Analysis Dashboard

```bash
# Activate virtual environment (if not already)
source venv/bin/activate  # or backend/venv/bin/activate

# Run interactive cost calculator
python interactive_cost_calculator.py
```

This opens an interactive menu where you can:
1. Calculate training costs
2. Calculate inference costs
3. View cost breakdowns
4. Generate reports

### Web Dashboard

```bash
# Generate HTML dashboard
python create_custom_web_dashboard.py

# Then open the generated file in your browser
# Look for: custom_dashboard_*.html or cost_dashboard.html
```

### Simple Cost Analysis

```bash
python simple_cost_analysis.py
```

This shows a quick cost breakdown.

---

## Summary

### For RNN Sentence Generation (Main Assignment):
```bash
source notebook_env/bin/activate
jupyter notebook RNN_Next_Word_Prediction.ipynb
# Then: Cell → Run All
```

### For Cost Analysis (Existing Tool):
```bash
source venv/bin/activate  # or backend/venv/bin/activate
python interactive_cost_calculator.py
```

---

## Expected Outputs

### From the Notebook (Sentence Generation):

After training, you'll see outputs like:

```
Seed: 'to be or not to'
Temperature 0.5: to be or not to be the question whether tis nobler...
Temperature 1.0: to be or not to suffer the slings and arrows of...
Temperature 1.5: to be or not to thy father and the king of denmark...
```

### From Cost Analysis:

```
==============================================
RNN TRAINING COST ANALYSIS
==============================================
Dataset Size: 100,000 samples
Batch Size: 128
Epochs: 30

Estimated Costs:
  - GPU Hours: 0.75 hours
  - Cost (AWS p3.2xlarge): $2.29
  - Cost (Google Cloud): $1.95
  - Training Time: 45 minutes

Inference Costs (per 1000 predictions):
  - GPU: $0.02
  - CPU: $0.01
```

---

## Troubleshooting

### Jupyter doesn't open in browser?

Copy the URL from the terminal:
```
http://localhost:8888/?token=abc123...
```
Paste it into your browser.

### Installation still running?

Check status:
```bash
# The installation can take 5-10 minutes
# Look for "Successfully installed..." message
```

### Need to stop Jupyter?

Press `Ctrl + C` in the terminal twice.

### Want to deactivate virtual environment?

```bash
deactivate
```

---

## Quick Reference Card

| Task | Command |
|------|---------|
| Start notebook | `source notebook_env/bin/activate && jupyter notebook RNN_Next_Word_Prediction.ipynb` |
| Run cost analysis | `source venv/bin/activate && python interactive_cost_calculator.py` |
| Stop Jupyter | `Ctrl + C` twice |
| Deactivate venv | `deactivate` |

---

**Ready to start?**

Wait for the installation to complete (look for "Successfully installed..." message), then run:

```bash
source notebook_env/bin/activate
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

🚀 Have fun generating text!
