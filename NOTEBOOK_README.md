# RNN Next-Word Prediction - Complete Technical Report

This directory contains a comprehensive Jupyter notebook implementing a Recurrent Neural Network (LSTM) for next-word prediction, complete with all required documentation, analysis, and visualizations.

## Overview

The notebook `RNN_Next_Word_Prediction.ipynb` is a complete technical report that includes:

1. **Problem Statement** - Detailed explanation of the objective and challenges
2. **Algorithm of Solution** - Many-to-one sequence mapping approach with architectural diagrams
3. **Dataset Selection** - Automated download of Shakespeare corpus
4. **Data Preprocessing** - Text cleaning, tokenization, and sequence generation
5. **Model Architecture** - LSTM with GloVe embeddings, masking, and proper regularization
6. **GloVe Integration** - Pretrained embeddings with cosine similarity exploration
7. **Model Training** - Complete training pipeline with callbacks (ModelCheckpoint, EarlyStopping)
8. **Text Generation** - Interactive predictions with temperature sampling
9. **Analysis of Findings** - Comprehensive quantitative and qualitative analysis
10. **References** - Complete academic citations and resources

## Requirements

### Python Version
- Python 3.8 or higher

### Dependencies

Install all required packages:

```bash
pip install -r requirements_notebook.txt
```

Or install manually:

```bash
pip install tensorflow>=2.10.0
pip install numpy>=1.21.0
pip install pandas>=1.3.0
pip install matplotlib>=3.4.0
pip install seaborn>=0.11.0
pip install scikit-learn>=1.0.0
pip install jupyter>=1.0.0
```

### Hardware Recommendations

**Minimum:**
- CPU: 4 cores
- RAM: 8 GB
- Storage: 2 GB free space

**Recommended (for faster training):**
- GPU: NVIDIA GPU with CUDA support
- RAM: 16 GB or more
- Storage: 5 GB free space

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements_notebook.txt
```

### 2. Launch Jupyter Notebook

```bash
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

### 3. Run All Cells

In Jupyter, select:
- **Cell → Run All**

Or run cells sequentially for better understanding.

## Notebook Structure

### Part 1: Setup and Data Preparation (Cells 1-10)
- Import libraries
- Download/load training data (Shakespeare corpus)
- Text preprocessing and cleaning
- Tokenization and vocabulary building
- Sequence generation using sliding window

### Part 2: GloVe Embeddings (Cells 11-15)
- Download GloVe embeddings (100d)
- Create embedding matrix
- Explore embeddings with cosine similarity
- Visualize embedding space with PCA

### Part 3: Model Building (Cells 16-20)
- Build LSTM architecture:
  - Embedding layer (with GloVe weights)
  - Masking layer
  - LSTM layer with dropout
  - Dense layer with ReLU
  - Dropout layer
  - Output layer with softmax
- Configure training callbacks
- Display model summary

### Part 4: Training (Cells 21-24)
- Train model with:
  - ModelCheckpoint (saves best model)
  - EarlyStopping (prevents overfitting)
  - ReduceLROnPlateau (adaptive learning rate)
  - TensorBoard (visualization)
- Plot training history
- Save model and artifacts

### Part 5: Text Generation (Cells 25-28)
- Implement text generation with temperature sampling
- Test with multiple seed texts
- Interactive generation mode
- Compare different temperature settings

### Part 6: Analysis (Cells 29-32)
- Calculate performance metrics
- Compute perplexity
- Qualitative assessment
- Generate visualizations

## Key Features

### 1. GloVe Pretrained Embeddings
- Automatically downloads GloVe 100d embeddings
- Maps vocabulary to semantic vectors
- Includes words not in GloVe with masking

### 2. Many-to-One Sequence Mapping
- Sliding window approach
- Configurable sequence length (default: 50 words)
- Efficient batch processing

### 3. LSTM Architecture
```
Input → Embedding (GloVe) → Masking → LSTM → Dense (ReLU) → Dropout → Softmax
```

### 4. Training Callbacks
- **ModelCheckpoint**: Saves best model based on validation loss
- **EarlyStopping**: Stops training when validation loss stops improving
- **ReduceLROnPlateau**: Reduces learning rate when stuck
- **TensorBoard**: Logs metrics for visualization

### 5. Temperature Sampling
- **Low (0.5)**: Conservative, coherent predictions
- **Medium (1.0)**: Balanced approach
- **High (1.5-2.0)**: Creative, diverse outputs

## Expected Runtime

| Stage | CPU Time | GPU Time |
|-------|----------|----------|
| Data Download | 1-2 min | 1-2 min |
| GloVe Download | 2-5 min | 2-5 min |
| Data Preprocessing | 2-3 min | 2-3 min |
| Model Building | < 1 min | < 1 min |
| Training (30 epochs) | 2-4 hours | 20-40 min |
| Generation & Analysis | 5-10 min | 2-5 min |
| **Total** | **3-5 hours** | **30-60 min** |

Note: Times vary based on dataset size and hardware.

## Output Files

The notebook generates several output files:

### Models and Checkpoints
- `saved_models/best_model.h5` - Best model (lowest validation loss)
- `saved_models/final_model.h5` - Final trained model
- `saved_models/tokenizer.pkl` - Tokenizer for text processing
- `saved_models/config.json` - Training configuration and metrics

### Visualizations
- `embedding_visualization.png` - PCA visualization of word embeddings
- `training_history.png` - Training/validation loss and accuracy plots

### Data
- `glove/glove.6B.100d.txt` - GloVe embeddings (downloaded automatically)

### Logs
- `logs/` - TensorBoard training logs

## Customization Options

### Adjust Sequence Length
```python
SEQUENCE_LENGTH = 50  # Change to 30, 40, 60, etc.
```

### Limit Training Data
```python
MAX_TRAINING_SAMPLES = 100000  # Reduce for faster training
```

### Modify Model Architecture
```python
model = build_lstm_model(
    lstm_units=128,      # Increase for more capacity
    dense_units=256,     # Increase for more complexity
    dropout_rate=0.3     # Adjust for regularization
)
```

### Training Duration
```python
EPOCHS = 30          # Reduce for faster training
BATCH_SIZE = 128     # Increase if you have more memory
```

## Troubleshooting

### Issue: Out of Memory Error
**Solution:**
- Reduce `MAX_TRAINING_SAMPLES`
- Decrease `BATCH_SIZE`
- Limit `VOCAB_SIZE`
- Use smaller embedding dimension

### Issue: GloVe Download Fails
**Solution:**
- Download manually from: https://nlp.stanford.edu/data/glove.6B.zip
- Extract `glove.6B.100d.txt` to `glove/` directory

### Issue: Training Too Slow
**Solution:**
- Reduce `EPOCHS` (try 10-15)
- Reduce `MAX_TRAINING_SAMPLES`
- Use GPU if available
- Decrease `SEQUENCE_LENGTH`

### Issue: Poor Text Quality
**Solution:**
- Train for more epochs
- Increase training data size
- Adjust temperature (try 0.7-1.2)
- Use larger model (more LSTM units)

## Understanding the Results

### Accuracy Metrics

**Top-1 Accuracy (Exact Match):**
- Typical range: 20-40%
- Lower is normal due to language variability
- Multiple valid next words exist

**Top-5 Accuracy:**
- Typical range: 40-70%
- Better indicator of model understanding
- Shows model captures context well

**Perplexity:**
- Lower is better
- Measures model confidence
- Related to cross-entropy loss

### Generated Text Quality

**Good Indicators:**
- Grammatically coherent sentences
- Contextually relevant words
- Minimal repetition
- Sensible phrase structures

**Warning Signs:**
- High repetition (same words/phrases)
- Nonsensical word combinations
- Breaking mid-sentence
- Loss of context

## Advanced Usage

### Use Custom Dataset

Replace the data loading section:

```python
# Load your own text file
with open('your_dataset.txt', 'r', encoding='utf-8') as f:
    text_data = f.read()
```

### Save and Load Models

```python
# Save
model.save('my_model.h5')

# Load
loaded_model = keras.models.load_model('my_model.h5')
```

### Batch Text Generation

```python
prompts = ["prompt 1", "prompt 2", "prompt 3"]
for prompt in prompts:
    result = generate_text(prompt, num_words=20, temperature=1.0)
    print(f"{prompt} → {result}")
```

## Academic Use

This notebook fulfills all requirements for a comprehensive technical report:

✅ **Problem Statement** - Clearly defined with real-world applications
✅ **Algorithm Description** - Detailed many-to-one mapping approach
✅ **Data Preparation** - Complete preprocessing pipeline
✅ **Model Architecture** - LSTM with GloVe embeddings as specified
✅ **Training Process** - With required callbacks (Checkpoint, EarlyStopping)
✅ **Predictions** - Text generation with temperature sampling
✅ **Analysis** - Quantitative and qualitative findings
✅ **References** - Complete academic citations
✅ **Documentation** - Code comments and explanations throughout
✅ **Visualizations** - Plots, charts, and architecture diagrams

## Performance Benchmarks

Expected results on Shakespeare dataset:

| Metric | Value Range |
|--------|-------------|
| Training Accuracy | 25-40% |
| Validation Accuracy | 20-35% |
| Top-5 Accuracy | 45-65% |
| Training Loss | 3.5-5.0 |
| Validation Loss | 4.0-6.0 |
| Perplexity | 50-400 |
| GloVe Coverage | 60-80% |

## Citation

If you use this notebook in your research or coursework, please cite:

```
RNN Next-Word Prediction System
CST 435 - Neural Networks and Deep Learning
November 2025
Implementation based on:
- Hochreiter & Schmidhuber (1997) - LSTM Networks
- Pennington et al. (2014) - GloVe Embeddings
```

## Support and Resources

### Documentation
- TensorFlow/Keras: https://www.tensorflow.org/
- GloVe: https://nlp.stanford.edu/projects/glove/
- LSTM Tutorial: https://colah.github.io/posts/2015-08-Understanding-LSTMs/

### Common Questions

**Q: How long does training take?**
A: 30-60 minutes with GPU, 3-5 hours with CPU

**Q: Can I use a different dataset?**
A: Yes, replace the data loading section with your text file

**Q: What if GloVe download fails?**
A: Download manually and place in `glove/` directory

**Q: How can I improve accuracy?**
A: Train longer, use more data, increase model size, or try bidirectional LSTM

**Q: Why is top-1 accuracy low?**
A: This is normal for language modeling - many valid next words exist

## License

This notebook is provided for educational purposes. The datasets and pretrained embeddings have their own licenses:
- Shakespeare text: Public domain
- GloVe embeddings: Apache License 2.0

## Acknowledgments

- Stanford NLP Group for GloVe embeddings
- TensorFlow/Keras teams for the deep learning framework
- Project Gutenberg for the Shakespeare corpus

---

**Ready to get started?**

```bash
jupyter notebook RNN_Next_Word_Prediction.ipynb
```

Happy learning!
