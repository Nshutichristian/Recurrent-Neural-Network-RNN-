# Quick Start Guide - RNN Next-Word Prediction

Get started with the comprehensive RNN notebook in 5 minutes!

## Step 1: Install Dependencies (2 minutes)

Open your terminal and run:

```bash
pip install -r requirements_notebook.txt
```

This installs:
- TensorFlow/Keras for deep learning
- NumPy/Pandas for data processing
- Matplotlib/Seaborn for visualization
- Jupyter for running notebooks
- Other utilities

## Step 2: Launch Jupyter Notebook (1 minute)

```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

Your browser will open automatically.

## Step 3: Run the Notebook (2 minutes to start)

In Jupyter, you have two options:

### Option A: Run All at Once (Automated)
1. Click **Cell** → **Run All**
2. The notebook will:
   - Download Shakespeare dataset
   - Download GloVe embeddings
   - Preprocess data
   - Train the model (this takes 30-60 min with GPU, 3-5 hours with CPU)
   - Generate predictions
   - Create visualizations

### Option B: Run Step by Step (Recommended for Learning)
1. Read each section
2. Press **Shift + Enter** to run each cell
3. Understand what's happening at each step

## What Happens Next?

The notebook will automatically:

1. **Download Data** (~5 minutes)
   - Shakespeare corpus (1.1 MB)
   - GloVe embeddings (862 MB)

2. **Preprocess** (~5 minutes)
   - Clean text
   - Tokenize words
   - Create sequences
   - Build vocabulary

3. **Build Model** (~1 minute)
   - Create LSTM architecture
   - Load GloVe embeddings
   - Compile model

4. **Train** (30-60 min GPU, 3-5 hours CPU)
   - Train for up to 30 epochs
   - Early stopping if no improvement
   - Save best model automatically

5. **Generate Text** (~5 minutes)
   - Test with example prompts
   - Show different temperatures
   - Create visualizations

6. **Analyze Results** (~5 minutes)
   - Calculate metrics
   - Generate plots
   - Save all outputs

## Output Files You'll Get

After running the notebook:

```
RNN/
├── saved_models/
│   ├── best_model.h5          # Best trained model
│   ├── final_model.h5         # Final model
│   ├── tokenizer.pkl          # Word tokenizer
│   └── config.json            # Training config
├── glove/
│   └── glove.6B.100d.txt      # Pretrained embeddings
├── logs/                       # TensorBoard logs
├── embedding_visualization.png # Word embedding plot
└── training_history.png       # Training metrics plot
```

## Example: What You'll See

### Text Generation Example

Input: "to be or not to"

Output (Temperature 1.0):
```
to be or not to be the question whether tis nobler in the mind
to suffer the slings and arrows of outrageous fortune
```

### Training Progress

```
Epoch 1/30
625/625 [==============================] - 45s 71ms/step
loss: 5.2341 - accuracy: 0.1523 - val_loss: 4.8932 - val_accuracy: 0.1834

Epoch 2/30
625/625 [==============================] - 42s 67ms/step
loss: 4.7821 - accuracy: 0.1891 - val_loss: 4.6234 - val_accuracy: 0.2012
...
```

## Quick Test Without Full Training

Want to test quickly? Modify these settings in the notebook:

```python
# In the configuration cells, change:
MAX_TRAINING_SAMPLES = 10000   # Instead of 100000
EPOCHS = 5                     # Instead of 30
SEQUENCE_LENGTH = 20           # Instead of 50
```

This will complete in ~10-15 minutes (quality will be lower).

## Troubleshooting

### Problem: "No module named 'tensorflow'"
**Solution:**
```bash
pip install tensorflow
```

### Problem: "Out of memory"
**Solution:** In the notebook, reduce these values:
```python
MAX_TRAINING_SAMPLES = 50000
BATCH_SIZE = 64
```

### Problem: GloVe download fails
**Solution:** Download manually:
1. Visit: https://nlp.stanford.edu/data/glove.6B.zip
2. Extract `glove.6B.100d.txt`
3. Create folder: `glove/`
4. Move file into `glove/glove.6B.100d.txt`

### Problem: Training takes too long
**Solutions:**
- Reduce epochs: `EPOCHS = 10`
- Reduce data: `MAX_TRAINING_SAMPLES = 50000`
- Use GPU if available
- Or just let it run overnight!

## Need Help?

### Check the Full Documentation
```bash
cat NOTEBOOK_README.md
```

### View Model Summary
After building the model, the notebook shows:
```
Model: "LSTM_Text_Generator"
_________________________________________________________________
Layer (type)                Output Shape              Param #
=================================================================
Embedding                   (None, 50, 100)          1000000
Masking                     (None, 50, 100)          0
LSTM                        (None, 128)              117248
Dense_ReLU                  (None, 256)              33024
Dropout                     (None, 256)              0
Output_Softmax              (None, 10000)            2570000
=================================================================
Total params: 3,720,272
```

## Next Steps After Completion

1. **Experiment with Temperature**
   - Try values: 0.5, 0.7, 1.0, 1.5, 2.0
   - See how it affects creativity

2. **Test Different Seed Texts**
   - Use prompts from the training data
   - Try your own sentences

3. **Analyze Embeddings**
   - Explore word similarities
   - Visualize embedding space

4. **Try Custom Dataset**
   - Replace Shakespeare with your own text
   - Could be: news articles, novels, code, etc.

5. **Improve the Model**
   - Add bidirectional LSTM
   - Increase LSTM units
   - Train longer

## Expected Results

After training, you should see:

| Metric | Expected Value |
|--------|---------------|
| Validation Accuracy | 20-35% |
| Top-5 Accuracy | 45-65% |
| Validation Loss | 4.0-6.0 |
| Perplexity | 50-400 |

These are normal for next-word prediction!

## Time Estimate

| Hardware | Total Time |
|----------|-----------|
| CPU only | 3-5 hours |
| GPU (NVIDIA) | 30-60 min |
| Google Colab (free GPU) | 45-90 min |

## Running on Google Colab (Free GPU!)

1. Upload notebook to Google Drive
2. Open with Google Colab
3. Enable GPU:
   - Runtime → Change runtime type → GPU
4. Run all cells
5. Download results when done

## All Set!

You now have everything you need. Just run:

```bash
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

And click **Cell → Run All**

The notebook will guide you through the rest!

---

**Questions?** Check `NOTEBOOK_README.md` for detailed documentation.

**Ready?** Let's build an RNN! 🚀
