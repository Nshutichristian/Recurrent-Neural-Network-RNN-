# Setup Instructions - RNN Next-Word Prediction Notebook

## Quick Setup (Recommended)

Run the automated setup script:

```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
./setup_notebook.sh
```

This will:
1. Create a virtual environment
2. Activate it
3. Upgrade pip
4. Install all dependencies

Then skip to **Step 3: Launch Jupyter** below.

---

## Manual Setup (Step by Step)

### Step 1: Create Virtual Environment

```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
python3 -m venv notebook_env
```

This creates an isolated Python environment in the `notebook_env` folder.

### Step 2: Activate Virtual Environment

```bash
source notebook_env/bin/activate
```

You should see `(notebook_env)` appear in your terminal prompt:
```
(notebook_env) root@DESKTOP-GIL9RPV:/mnt/c/Users/nshut/Documents/CST 435/projects/RNN#
```

### Step 3: Upgrade pip (Optional but Recommended)

```bash
pip install --upgrade pip
```

### Step 4: Install Dependencies

```bash
pip install -r requirements_notebook.txt
```

This will install:
- TensorFlow (deep learning framework)
- NumPy, Pandas (data processing)
- Matplotlib, Seaborn (visualization)
- Jupyter (notebook environment)
- And all other required packages

**Note:** This may take 5-10 minutes depending on your internet speed.

### Step 5: Launch Jupyter Notebook

```bash
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

Your browser will open automatically with the notebook.

### Step 6: Run the Notebook

In Jupyter:
- Click **Cell** → **Run All** to run all cells
- Or press **Shift + Enter** to run cells one by one

---

## Daily Usage

### Starting a Session

Every time you want to work with the notebook:

```bash
# 1. Navigate to project directory
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN

# 2. Activate virtual environment
source notebook_env/bin/activate

# 3. Launch Jupyter
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

### Ending a Session

When you're done:

```bash
# In your terminal (not in Jupyter)
deactivate
```

This deactivates the virtual environment.

---

## Verification

After installation, verify everything is working:

```bash
# Make sure virtual environment is activated
source notebook_env/bin/activate

# Check TensorFlow
python -c "import tensorflow as tf; print(f'TensorFlow version: {tf.__version__}')"

# Check Jupyter
jupyter --version

# Check all key packages
python -c "import numpy, pandas, matplotlib, seaborn, sklearn; print('All packages installed successfully!')"
```

You should see output like:
```
TensorFlow version: 2.15.0
jupyter core     : 1.0.0
jupyter-notebook : 6.5.4
All packages installed successfully!
```

---

## Troubleshooting

### Issue: "python3-venv is not installed"

**Solution:**
```bash
sudo apt update
sudo apt install python3-venv python3-full
```

### Issue: "Command 'jupyter' not found"

**Solution:**
Make sure the virtual environment is activated:
```bash
source notebook_env/bin/activate
which jupyter  # Should show: /mnt/c/.../notebook_env/bin/jupyter
```

### Issue: TensorFlow installation fails

**Solution 1 - Try installing with specific version:**
```bash
pip install tensorflow==2.15.0
```

**Solution 2 - Install TensorFlow CPU version:**
```bash
pip install tensorflow-cpu
```

### Issue: Installation takes forever

**Solution:**
Some packages are large. TensorFlow alone is ~500MB. Be patient, or check your internet connection.

### Issue: "Permission denied" when running setup script

**Solution:**
```bash
chmod +x setup_notebook.sh
./setup_notebook.sh
```

### Issue: Virtual environment already exists

**Solution:**
Delete the old one and recreate:
```bash
rm -rf notebook_env
python3 -m venv notebook_env
source notebook_env/bin/activate
pip install -r requirements_notebook.txt
```

---

## Alternative: Using Existing Virtual Environment

If you already have a virtual environment (like `venv` or `backend/venv`):

```bash
# Activate your existing environment
source venv/bin/activate

# Install requirements
pip install -r requirements_notebook.txt

# Launch Jupyter
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

---

## Google Colab Alternative (No Setup Required!)

If you want to skip local setup entirely:

1. Upload `RNN_Next_Word_Prediction.ipynb` to Google Drive
2. Right-click → Open with → Google Colaboratory
3. Enable GPU: Runtime → Change runtime type → GPU
4. Run all cells

Google Colab has all packages pre-installed and provides free GPU access!

---

## Disk Space Requirements

Make sure you have enough space:

| Component | Size |
|-----------|------|
| Virtual environment | ~500 MB |
| Python packages | ~1.5 GB |
| GloVe embeddings | ~862 MB |
| Downloaded dataset | ~1 MB |
| Model files | ~50 MB |
| **Total** | **~3 GB** |

Check available space:
```bash
df -h /mnt/c
```

---

## Complete Setup Example

Here's the complete sequence of commands:

```bash
# Navigate to project
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN

# Create and activate virtual environment
python3 -m venv notebook_env
source notebook_env/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements_notebook.txt

# Verify installation
python -c "import tensorflow as tf; print(f'TensorFlow: {tf.__version__}')"

# Launch Jupyter
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

---

## What's Next?

Once setup is complete:

1. **Read the notebook** - It's fully documented with explanations
2. **Run Cell by Cell** - Understand each step (recommended for learning)
3. **Or Run All** - Let it train automatically (Cell → Run All)

Expected runtime:
- **With GPU**: 30-60 minutes
- **With CPU**: 3-5 hours

---

## Need Help?

- **Check**: `NOTEBOOK_README.md` for detailed documentation
- **Quick Start**: `QUICKSTART_NOTEBOOK.md` for rapid setup
- **This File**: Complete setup instructions

---

**Ready to start?**

```bash
source notebook_env/bin/activate
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

Happy learning! 🚀
