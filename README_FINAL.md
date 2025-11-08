# 🤖 RNN Next-Word Prediction System

**CST 435 - Neural Networks and Deep Learning**
Complete LSTM-based text generation system with GloVe embeddings

---

## 🎯 Project Overview

This project implements a Recurrent Neural Network (RNN) using LSTM architecture to predict the next word in a sequence. The system uses:
- **LSTM** (Long Short-Term Memory) for sequence modeling
- **GloVe 100D** pretrained embeddings for semantic understanding
- **Temperature sampling** for controllable text generation
- **Many-to-one** sequence mapping approach

---

## ⭐ Two Ways to Use This Project

### Option 1: 📓 Jupyter Notebook
**Complete technical report with analysis and visualizations**

**Best for:** Assignment submission, detailed analysis

**File:** `RNN_Complete_Colab_Ready.ipynb`

**Features:**
- ✅ Complete technical documentation
- ✅ All code with detailed explanations
- ✅ Training visualizations
- ✅ Interactive sentence generation
- ✅ **Complete cost analysis** (AWS, Google Cloud, Azure)
- ✅ Model performance metrics
- ✅ Ready to submit!

### Option 2: 🌐 Web Interface
**Beautiful HTML interface for interactive text generation**

**Best for:** Quick experimentation, demos

**Files:** `app.py` + `templates/index.html`

**Features:**
- ✅ Modern, responsive web UI
- ✅ Real-time text generation
- ✅ Temperature slider
- ✅ Example prompts
- ✅ No coding required!

---

## 🚀 Quick Start

### For Google Colab (EASIEST - Recommended!)

```
1. Go to https://colab.research.google.com/
2. Upload: RNN_Complete_Colab_Ready.ipynb
3. Runtime → Change runtime type → GPU (T4)
4. Runtime → Run all
5. Done! ✅
```

**Time:** ~30-45 minutes training on free GPU
**Cost:** $0.00 (FREE!)

### For Web Interface

**Step 1: Train the model** (one time only)
```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
source notebook_env/bin/activate
python run_without_jupyter.py
```

**Step 2: Start web server**
```bash
./run_web_app.sh
```

**Step 3: Open browser**
```
http://localhost:5000
```

---

## 📁 Project Structure

```
RNN/
├── RNN_Complete_Colab_Ready.ipynb    # Complete notebook (USE THIS!)
├── app.py                             # Web server backend
├── templates/
│   └── index.html                     # Web interface
├── run_web_app.sh                     # Start web server
├── run_without_jupyter.py             # Standalone Python script
├── requirements_notebook.txt          # Python dependencies
├── requirements_web.txt               # Web interface dependencies
├── README_FINAL.md                    # This file
├── RUN_OPTIONS.md                     # Detailed comparison
├── QUICKSTART_WEB.md                  # Web interface guide
└── saved_models/                      # Trained model (after training)
    ├── final_model.h5
    ├── tokenizer.pkl
    └── config.json
```

---

## 🎓 Assignment Requirements

This project fulfills all assignment requirements:

### ✅ Required Components:

1. **Problem Statement** ✓
   - Detailed explanation of next-word prediction
   - Real-world applications
   - Success metrics

2. **Algorithm Description** ✓
   - Many-to-one sequence mapping
   - Complete pipeline architecture
   - Step-by-step process

3. **Dataset Preparation** ✓
   - Shakespeare corpus (1M+ characters)
   - Text preprocessing
   - Tokenization and vocabulary building

4. **Data Preprocessing** ✓
   - Text cleaning
   - Sequence generation (sliding window)
   - Integer encoding and padding

5. **Model Architecture** ✓
   - Embedding layer (100D GloVe)
   - Masking layer
   - LSTM (128 units)
   - Dense + ReLU (256 units)
   - Dropout (0.3)
   - Softmax output

6. **GloVe Embeddings** ✓
   - 100-dimensional pretrained vectors
   - Embedding matrix creation
   - Similarity analysis
   - Visualization (PCA)

7. **Model Training** ✓
   - 30 epochs with callbacks
   - ModelCheckpoint
   - EarlyStopping
   - ReduceLROnPlateau
   - Training history visualization

8. **Text Generation** ✓
   - Temperature sampling
   - Interactive generation
   - Batch generation
   - **NEW: Custom sentence input**

9. **Analysis of Findings** ✓
   - Quantitative metrics
   - Qualitative assessment
   - Perplexity analysis
   - Comparison with alternatives

10. **References** ✓
    - Academic papers
    - Technical documentation
    - Datasets and tools

### 🆕 Bonus Features:

11. **Interactive Generation** ✓
    - Type your own prompts
    - Real-time results
    - Quick generator mode

12. **Complete Cost Analysis** ✓
    - Training cost estimation
    - Cloud provider comparison (AWS, Google, Azure)
    - Inference cost analysis
    - Cost optimization strategies
    - Environmental impact (carbon footprint)
    - Comprehensive recommendations

13. **Web Interface** ✓
    - Professional HTML interface
    - REST API endpoints
    - Real-time generation

---

## 🎨 Web Interface Features

### Main Interface:
- **Seed Text Input** - Type your starting text
- **Quick Examples** - Click to try pre-made prompts
- **Word Count** - Generate 1-100 words
- **Temperature Slider** - Control creativity (0.5 - 2.0)
- **Generate Button** - One-click generation

### Results Display:
- Highlighted seed text (yellow)
- Generated text (purple)
- Statistics:
  - Words generated
  - Temperature used
  - Generation time

### Model Information:
- Vocabulary size
- Sequence length
- Model type (LSTM)
- Embeddings (GloVe 100D)

---

## 💡 Usage Examples

### Jupyter Notebook:
```python
# Interactive generation
generate_custom_sentence()
# Follow the prompts

# Quick generation
my_prompt = "to be or not to"
result = generate_text(my_prompt, 30, 1.0)
print(result)

# Batch generation
prompts = ["once upon a time", "i have a dream"]
batch_generate(prompts, num_words=25)
```

### Web Interface:
1. Type: "to be or not to"
2. Set words: 30
3. Set temperature: 1.0
4. Click "Generate Text"
5. See results instantly!

### Command Line API:
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"seed_text": "to be or not to", "num_words": 30, "temperature": 1.0}'
```

---

## 📊 Model Performance

### Architecture:
- **Parameters:** ~3.5M trainable
- **Vocabulary:** 10,000 words
- **Sequence Length:** 50 words
- **Embeddings:** GloVe 100D

### Training:
- **Dataset:** Shakespeare corpus
- **Epochs:** 30 (with early stopping)
- **Batch Size:** 128
- **Validation Split:** 10%

### Metrics:
- **Accuracy:** ~35-45% (top-1)
- **Top-5 Accuracy:** ~65-75%
- **Perplexity:** ~20-30
- **Training Time:** 30-45 min (GPU) / 4-5 hours (CPU)

---

## 💰 Cost Analysis Summary

### Training Costs:
- **Google Colab (FREE T4 GPU):** $0.00 ⭐ Recommended
- **AWS p3.2xlarge (V100 GPU):** $1.53
- **Google Cloud (T4 GPU):** $0.55
- **AWS m5.2xlarge (CPU):** $1.54

### Inference (per 1000 predictions):
- **Serverless (AWS Lambda):** $0.0002
- **CPU Instance:** $0.10
- **GPU Instance:** $0.80 (overkill)

### Recommendation:
**Use Google Colab for training** - FREE GPU, zero cost, perfect for this assignment!

---

## 🌍 Environmental Impact

### Carbon Footprint (per training run):

**GPU Training (T4) on Google Cloud:**
- Energy: 0.053 kWh
- CO2: 0.006 kg (lowest!)

**CPU Training:**
- Energy: 0.800 kWh
- CO2: 0.360 kg

**Recommendation:** Use GPU on Google Cloud/Colab for 70% lower carbon footprint!

---

## 🔧 Troubleshooting

### Issue: Kernel crashes in Jupyter
**Solution:** Use Google Colab (no setup needed!)

### Issue: "Model not found" in web interface
**Solution:** Train the model first using Colab or `python run_without_jupyter.py`

### Issue: TensorFlow import error
**Solution:**
```bash
source notebook_env/bin/activate
pip install tensorflow
```

### Issue: Port 5000 in use
**Solution:** Edit `app.py`, change port to 5001

---

## 📚 Documentation Files

- **README_FINAL.md** (this file) - Complete overview
- **RUN_OPTIONS.md** - Detailed comparison of both options
- **QUICKSTART_WEB.md** - Web interface quick start guide
- **NOTEBOOK_README.md** - Jupyter notebook documentation
- **SETUP_INSTRUCTIONS.md** - Detailed setup guide

---

## 🎯 Recommended Workflow

### For Assignment Submission:
```
1. Upload RNN_Complete_Colab_Ready.ipynb to Google Colab
2. Run all cells (takes ~45 minutes)
3. Review all outputs, visualizations, and analysis
4. Export/download the completed notebook
5. Submit ✅
```

### For Interactive Experimentation:
```
1. Use Colab to train model (or use run_without_jupyter.py)
2. Download saved_models/ folder
3. Run: ./run_web_app.sh
4. Open browser: http://localhost:5000
5. Experiment with different prompts and settings ✅
```

### For Best Experience:
```
Use BOTH!
- Colab notebook for complete technical report
- Web interface for quick experimentation and demos
```

---

## 🏆 Key Features

### Technical:
- ✅ LSTM architecture with GloVe embeddings
- ✅ Many-to-one sequence mapping
- ✅ Temperature-based sampling
- ✅ Comprehensive callbacks (EarlyStopping, etc.)
- ✅ Visualization and analysis

### Interactive:
- ✅ Custom sentence generation
- ✅ Batch text generation
- ✅ Web-based interface
- ✅ REST API endpoints

### Analysis:
- ✅ Complete cost breakdown
- ✅ Cloud provider comparison
- ✅ Environmental impact analysis
- ✅ Performance metrics
- ✅ Qualitative assessment

---

## 🙏 Acknowledgments

### Technologies Used:
- TensorFlow/Keras - Deep learning framework
- GloVe - Pretrained word embeddings (Stanford NLP)
- Flask - Web framework
- Shakespeare corpus - Training data
- Google Colab - Free GPU computing

### References:
- Hochreiter & Schmidhuber (1997) - LSTM Networks
- Pennington et al. (2014) - GloVe Embeddings
- TensorFlow documentation and tutorials

---

## 📞 Support

### Issues:
See troubleshooting section above

### Documentation:
Check RUN_OPTIONS.md and QUICKSTART_WEB.md

### Examples:
Look at the notebook cells for detailed examples

---

## 🎉 Summary

You now have a **complete RNN text generation system** with:

1. **📓 Jupyter Notebook** - Full technical report for assignment
2. **🌐 Web Interface** - Interactive generator for experimentation

**Both options work perfectly!** Choose what fits your needs:
- Need to submit assignment? → Use Colab notebook
- Want to experiment quickly? → Use web interface
- Want both? → You can have both! 🚀

**Total Cost: $0.00** (using Google Colab)
**Time to Complete: ~45 minutes**
**Fun Level: 💯**

---

**Ready to generate some text? Let's go!** 🚀

---

*CST 435 - Neural Networks and Deep Learning*
*RNN-Based Next Word Prediction System*
*November 2025*
