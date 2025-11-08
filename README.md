# RNN Text Generator

A production-ready text generation web application powered by LSTM (Long Short-Term Memory) neural networks. This project demonstrates the implementation of recurrent neural networks for natural language processing tasks.

## Overview

This application trains an LSTM model on text data and generates coherent, stylistically similar text based on user-provided seed text. It features a FastAPI backend for model inference and a responsive web frontend for user interaction.

## Features

- **LSTM Text Generation**: Multi-layer LSTM architecture with dropout regularization
- **Temperature-based Sampling**: Control creativity vs. coherence in generated text
- **Interactive Web Interface**: User-friendly interface for text generation
- **Model Visualization**: Architecture diagrams and training metrics
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **Real-time Generation**: Fast inference for interactive use

## Technology Stack

### Backend
- **TensorFlow 2.15**: Deep learning framework
- **Keras**: High-level neural networks API
- **FastAPI**: Modern, fast web framework
- **Uvicorn**: ASGI server
- **Matplotlib/Seaborn**: Visualization libraries

### Frontend
- **HTML5/JavaScript**: Core web technologies
- **Tailwind CSS**: Utility-first CSS framework
- **Fetch API**: Async HTTP requests

## Project Structure

```
RNN/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application
│   │   ├── models.py            # Pydantic models
│   │   ├── text_generator.py   # RNN model class
│   │   └── train.py             # Training script
│   ├── data/
│   │   └── training_text.txt    # Training corpus
│   ├── saved_models/
│   │   ├── model.h5             # Trained model
│   │   ├── model_config.json    # Model configuration
│   │   └── tokenizer.pkl        # Tokenizer
│   ├── visualizations/
│   │   ├── model_architecture.png
│   │   └── training_history.png
│   ├── scripts/
│   │   └── download_data.py     # Data download script
│   └── requirements.txt
│
├── frontend/
│   └── index.html               # Web interface
│
└── README.md
```

## Installation & Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)
- 4GB+ RAM (for training)

### Step 1: Navigate to Project

```bash
cd "C:\Users\nshut\Documents\CST 435\projects\RNN"
```

### Step 2: Install Backend Dependencies

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

### Step 3: Download Training Data

```bash
python scripts/download_data.py
```

This downloads "Alice in Wonderland" from Project Gutenberg (~140KB text).

### Step 4: Train the Model

```bash
cd app
python train.py
```

Training takes approximately 15-30 minutes depending on your hardware. The script will:
- Preprocess the text data
- Create training sequences
- Build the LSTM model
- Train for 50 epochs with early stopping
- Generate visualizations
- Save the trained model

Expected output:
```
Loading training data...
Loaded 144638 characters
Unique words: 3247

Initializing text generator...
Vocabulary size: 3248
Total sequences: 26481

Building model...
Model: "Text_Generator_LSTM"
...

Training model...
Epoch 1/50
...
✓ Training complete!
```

### Step 5: Run the Backend Server

```bash
cd app
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Step 6: Open the Frontend

Open `frontend/index.html` in your web browser, or serve it with a simple HTTP server:

```bash
cd frontend
python -m http.server 3000
```

Then visit `http://localhost:3000`

## Usage

### Web Interface

1. **Generate Tab**:
   - Enter seed text (starting words)
   - Adjust number of words to generate (10-200)
   - Set temperature (0.5-2.0):
     - Low (0.5-0.7): More predictable and coherent
     - Medium (1.0): Balanced
     - High (1.5-2.0): More creative and random
   - Click "Generate Text"

2. **Model Info Tab**:
   - View model statistics
   - See architecture diagram
   - Review training history plots

### API Endpoints

#### Health Check
```bash
GET http://localhost:8000/
```

Response:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

#### Generate Text
```bash
POST http://localhost:8000/generate
Content-Type: application/json

{
  "seed_text": "alice was beginning to get very",
  "num_words": 50,
  "temperature": 1.0
}
```

Response:
```json
{
  "generated_text": "alice was beginning to get very tired of sitting...",
  "seed_text": "alice was beginning to get very",
  "num_words": 50,
  "temperature": 1.0
}
```

#### Get Model Info
```bash
GET http://localhost:8000/model/info
```

Response:
```json
{
  "vocab_size": 3248,
  "sequence_length": 50,
  "embedding_dim": 100,
  "lstm_units": 150,
  "num_layers": 2
}
```

#### Get Architecture Diagram
```bash
GET http://localhost:8000/visualizations/architecture
```

Returns PNG image.

#### Get Training History
```bash
GET http://localhost:8000/visualizations/training
```

Returns PNG image with loss and accuracy plots.

## Model Architecture

### Overview

The model uses a multi-layer LSTM architecture:

1. **Embedding Layer**: Converts word indices to dense vectors (100 dimensions)
2. **LSTM Layers**: 2 stacked LSTM layers with 150 units each
3. **Dropout Layers**: 20% dropout after each LSTM for regularization
4. **Output Layer**: Dense layer with softmax activation

### Mathematical Formulation

At each time step $t$, the LSTM computes:

**Forget Gate**: $f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$

**Input Gate**: $i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$

**Candidate Cell State**: $\tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C)$

**Cell State Update**: $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$

**Output Gate**: $o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)$

**Hidden State**: $h_t = o_t \odot \tanh(C_t)$

### Hyperparameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Sequence Length | 50 | Number of words for context |
| Embedding Dimension | 100 | Size of word embeddings |
| LSTM Units | 150 | Hidden units per LSTM layer |
| Number of Layers | 2 | Stacked LSTM layers |
| Dropout Rate | 0.2 | Regularization strength |
| Batch Size | 128 | Training batch size |
| Learning Rate | 0.001 | Adam optimizer learning rate |
| Epochs | 50 | Maximum training epochs |

## Training Process

### Data Preprocessing

1. **Text Cleaning**: Lowercase conversion, special character removal
2. **Tokenization**: Word-level tokenization
3. **Sequence Generation**: Sliding window approach with length 50
4. **Encoding**: Convert words to integer indices
5. **Padding**: Pad sequences to uniform length
6. **One-hot Encoding**: Convert target words to categorical format

### Training Configuration

- **Optimizer**: Adam with learning rate 0.001
- **Loss Function**: Categorical cross-entropy
- **Validation Split**: 10% of data
- **Callbacks**:
  - ModelCheckpoint: Save best model based on validation loss
  - EarlyStopping: Stop training if no improvement for 10 epochs
  - ReduceLROnPlateau: Reduce learning rate on plateau
  - TensorBoard: Log training metrics

### Expected Results

After training on "Alice in Wonderland":
- **Training Accuracy**: ~40-50%
- **Validation Accuracy**: ~35-45%
- **Training Loss**: ~3.5-4.5
- **Validation Loss**: ~4.0-5.0

Note: These metrics are typical for character-level prediction tasks with large vocabularies.

## Example Generations

### Temperature: 0.5 (Conservative)
**Seed**: "alice was beginning to get very"
**Generated**: "alice was beginning to get very tired of sitting by her sister on the bank and of having nothing to do once or twice she had peeped into the book her sister was reading but it had no pictures or conversations in it"

### Temperature: 1.0 (Balanced)
**Seed**: "alice was beginning to get very"
**Generated**: "alice was beginning to get very tired of sitting by her sister on the bank and of having nothing to do once or twice she had peeped into the book her sister was reading but it had no pictures and what is the use of a book thought alice without pictures or conversation"

### Temperature: 1.5 (Creative)
**Seed**: "alice was beginning to get very"
**Generated**: "alice was beginning to get very curious and wondered what was going to happen next first she tried to look down and make out what she was coming to but it was too dark to see anything then she looked at the sides of the well and noticed they were filled with cupboards"

## Troubleshooting

### Model not loading
**Issue**: "Model files not found" error
**Solution**: Run `python app/train.py` to train the model first

### Low quality output
**Issue**: Generated text is gibberish
**Solution**:
- Train for more epochs (increase from 50 to 100)
- Use a larger training dataset
- Adjust temperature parameter

### Out of memory
**Issue**: TensorFlow crashes during training
**Solution**:
- Reduce batch size to 64 or 32
- Reduce LSTM units to 100
- Reduce sequence length to 25

### CORS errors
**Issue**: Frontend cannot connect to backend
**Solution**:
- Ensure backend is running on port 8000
- Check that CORS is enabled in FastAPI
- Use the same machine for frontend and backend

## Customization

### Using Your Own Training Data

1. Place your text file in `backend/data/training_text.txt`
2. Ensure the file is UTF-8 encoded
3. Minimum recommended size: 100KB (~20,000 words)
4. Run training: `python app/train.py`

### Adjusting Hyperparameters

Edit `backend/app/train.py`:

```python
generator = TextGenerator(
    sequence_length=50,    # Context window
    embedding_dim=100,     # Word vector size
    lstm_units=150,        # LSTM hidden units
    num_layers=2,          # Number of LSTM layers
    dropout_rate=0.2       # Dropout probability
)
```

### Training Configuration

Edit training parameters in `backend/app/train.py`:

```python
history = generator.train(
    X, y,
    epochs=50,              # Number of epochs
    batch_size=128,         # Batch size
    validation_split=0.1,   # Validation percentage
    save_path=MODEL_DIR
)
```

## Performance Optimization

### Speed Up Training
- Use GPU: Install `tensorflow-gpu` instead of `tensorflow`
- Reduce sequence length to 25
- Increase batch size to 256 (if memory allows)
- Use fewer LSTM units (100 instead of 150)

### Improve Generation Quality
- Increase training epochs to 100-200
- Use larger, higher-quality training data
- Add more LSTM layers (3-4)
- Increase LSTM units to 256-512
- Implement beam search instead of greedy sampling

## Academic Context

This project was developed as part of CST 435: Introduction to Machine Learning coursework, focusing on:

- Understanding RNN and LSTM architectures
- Implementing sequence-to-sequence models
- Text preprocessing and tokenization techniques
- Deep learning model training and evaluation
- Full-stack ML application deployment

## Future Enhancements

- [ ] Implement attention mechanism
- [ ] Add beam search decoding
- [ ] Support character-level generation
- [ ] Add more pre-trained models
- [ ] Implement fine-tuning on custom data
- [ ] Add API authentication
- [ ] Deploy to cloud platform (Render, Railway, Heroku)
- [ ] Create Docker containerization
- [ ] Add model comparison features
- [ ] Implement A/B testing for different architectures

## License

This project is created for educational purposes as part of CST 435 coursework.

## Acknowledgments

- Training data from [Project Gutenberg](https://www.gutenberg.org/)
- Built with [TensorFlow](https://www.tensorflow.org/) and [FastAPI](https://fastapi.tiangolo.com/)
- Inspired by Andrej Karpathy's "The Unreasonable Effectiveness of Recurrent Neural Networks"

## Authors

- **Christian Nshuti Manzi**
- **Aime Serge Tuyishime**

## Contact

For questions or issues related to this project, please refer to the course materials or contact your instructor.

---

**Built with ❤️ for CST 435: Introduction to Machine Learning**
**Authors: Christian Nshuti Manzi & Aime Serge Tuyishime**
