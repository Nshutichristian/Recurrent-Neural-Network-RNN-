# 🌐 Web Interface Quick Start

## Super Quick Setup (2 Steps!)

### Step 1: Train the Model (if not already done)

**Easiest Way - Google Colab:**
```
1. Go to https://colab.research.google.com/
2. Upload RNN_Complete_Colab_Ready.ipynb
3. Runtime → Change runtime → GPU (T4)
4. Runtime → Run all
5. Wait ~30-45 minutes for training
6. Download saved_models folder from Colab
7. Put it in your RNN project directory
```

**OR - Local Training:**
```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
source notebook_env/bin/activate
python run_without_jupyter.py
```

### Step 2: Start the Web Server

```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
./run_web_app.sh
```

Then open your browser and go to:
```
http://localhost:5000
```

---

## What You'll See

A beautiful web interface with:

### 🎨 Main Features:
1. **Text Input Box** - Type your starting text
2. **Quick Examples** - Click to try pre-made prompts
3. **Word Count Slider** - Choose how many words to generate (1-100)
4. **Temperature Slider** - Control creativity (0.5 = safe, 1.5 = creative)
5. **Generate Button** - Click to generate!

### 📊 Results Display:
- Generated text with highlighted seed
- Generation statistics
- Model information

---

## Example Usage

### 1. Type Your Prompt
```
"to be or not to"
```

### 2. Set Parameters
- Words: 30
- Temperature: 1.0 (balanced)

### 3. Click "Generate Text"

### 4. See Results!
```
to be or not to be that is the question whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune...
```

---

## Tips for Best Results

### Temperature Guide:
- **0.5** - Very predictable, coherent (good for formal text)
- **1.0** - Balanced creativity and coherence (default)
- **1.5** - Creative, diverse (good for brainstorming)
- **2.0** - Very creative, may lose coherence

### Seed Text Tips:
- Use 3-5 words for best context
- Complete phrases work better
- Literary prompts work well (trained on Shakespeare)

---

## Troubleshooting

### Browser shows "Model Not Loaded"
**Problem:** Trained model not found
**Solution:** Train the model first (see Step 1 above)

### Server won't start
**Problem:** Port 5000 in use
**Solution:** Edit `app.py` and change port to 5001:
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

### "Flask not found"
**Problem:** Flask not installed
**Solution:**
```bash
source notebook_env/bin/activate
pip install flask
```

---

## Using from Other Devices

### Access from phone/tablet on same network:

1. Find your computer's IP address:
```bash
# On Linux/WSL:
hostname -I

# On Windows:
ipconfig
```

2. On your phone/tablet browser:
```
http://YOUR_IP_ADDRESS:5000
```

Example: `http://192.168.1.100:5000`

---

## Screenshots

### Main Interface:
- Clean, modern design
- Purple gradient background
- Easy-to-use controls

### Results Display:
- Seed text highlighted in yellow
- Generated text in purple
- Statistics cards show metrics

---

## API Endpoints

If you want to use the API programmatically:

### Generate Text:
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "seed_text": "to be or not to",
    "num_words": 30,
    "temperature": 1.0
  }'
```

### Check Status:
```bash
curl http://localhost:5000/api/status
```

### Get Examples:
```bash
curl http://localhost:5000/api/examples
```

---

## Next Steps

1. ✅ Train the model
2. ✅ Start the web server
3. ✅ Open http://localhost:5000
4. ✅ Generate amazing text!
5. 🎉 Have fun!

---

**Enjoy your RNN text generator!** 🚀
