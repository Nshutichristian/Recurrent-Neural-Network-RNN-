"""
RNN Next-Word Prediction Web Application with CORS Support
Flask backend for interactive text generation + React frontend support
Authors: Christian Nshuti Manzi & Aime Serge Tuyishime
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os
import time
from datetime import datetime
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global variables for model and tokenizer
model = None
tokenizer = None
SEQUENCE_LENGTH = 50
vocab_size = 0
model_type = "LSTM"

# Training state
training_state = {
    'is_training': False,
    'status': 'idle',
    'progress': 0,
    'current_epoch': 0,
    'total_epochs': 0,
    'loss': 0,
    'accuracy': 0,
    'logs': [],
    'should_stop': False
}

def load_model_and_tokenizer():
    """Load the trained model and tokenizer"""
    global model, tokenizer, vocab_size

    try:
        # Import TensorFlow
        import tensorflow as tf
        from tensorflow import keras
        from tensorflow.keras.preprocessing.sequence import pad_sequences

        # Load model
        model_path = 'saved_models/final_model.h5'
        if os.path.exists(model_path):
            model = keras.models.load_model(model_path)
            print(f"✓ Model loaded from {model_path}")
        else:
            print(f"✗ Model not found at {model_path}")
            return False

        # Load tokenizer
        tokenizer_path = 'saved_models/tokenizer.pkl'
        if os.path.exists(tokenizer_path):
            with open(tokenizer_path, 'rb') as f:
                tokenizer = pickle.load(f)
            vocab_size = len(tokenizer.word_index) + 1
            print(f"✓ Tokenizer loaded from {tokenizer_path}")
        else:
            print(f"✗ Tokenizer not found at {tokenizer_path}")
            return False

        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

def generate_text(seed_text, num_words, temperature=1.0):
    """Generate text using the loaded model"""
    global model, tokenizer, SEQUENCE_LENGTH

    if model is None or tokenizer is None:
        return "Error: Model not loaded"

    try:
        from tensorflow.keras.preprocessing.sequence import pad_sequences

        generated_text = seed_text.lower()

        for _ in range(num_words):
            # Tokenize current text
            token_list = tokenizer.texts_to_sequences([generated_text])[0]

            # Take last SEQUENCE_LENGTH tokens
            token_list = token_list[-SEQUENCE_LENGTH:]

            # Pad to model input size
            token_list = pad_sequences(
                [token_list],
                maxlen=SEQUENCE_LENGTH,
                padding='pre'
            )

            # Predict next word probabilities
            predicted_probs = model.predict(token_list, verbose=0)[0]

            # Apply temperature sampling
            if temperature != 1.0:
                predicted_probs = np.log(predicted_probs + 1e-10) / temperature
                predicted_probs = np.exp(predicted_probs)
                predicted_probs = predicted_probs / np.sum(predicted_probs)

            # Sample from distribution
            predicted_index = np.random.choice(
                len(predicted_probs),
                p=predicted_probs
            )

            # Convert index to word
            for word, index in tokenizer.word_index.items():
                if index == predicted_index:
                    generated_text += " " + word
                    break

        return generated_text
    except Exception as e:
        return f"Error generating text: {str(e)}"

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def api_generate():
    """API endpoint for text generation"""
    try:
        # Check if model is loaded
        if model is None or tokenizer is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded. Please train a model first using the Train Model tab.'
            }), 503

        data = request.get_json()

        seed_text = data.get('seed_text', 'to be or not to')
        num_words = int(data.get('num_words', 30))
        temperature = float(data.get('temperature', 1.0))

        # Validate inputs
        if not seed_text:
            return jsonify({'success': False, 'error': 'Seed text is required'}), 400

        if num_words < 1 or num_words > 100:
            return jsonify({'success': False, 'error': 'Number of words must be between 1 and 100'}), 400

        if temperature < 0.1 or temperature > 2.0:
            return jsonify({'success': False, 'error': 'Temperature must be between 0.1 and 2.0'}), 400

        # Time the generation
        start_time = time.time()

        # Generate text
        result = generate_text(seed_text, num_words, temperature)

        generation_time = time.time() - start_time

        return jsonify({
            'success': True,
            'seed_text': seed_text,
            'generated_text': result,
            'num_words': num_words,
            'temperature': temperature,
            'generation_time': f"{generation_time:.3f}s",
            'timestamp': datetime.now().isoformat()
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/examples', methods=['GET'])
def api_examples():
    """API endpoint for example prompts"""
    examples = [
        "to be or not to",
        "the king of",
        "once upon a time",
        "i have a dream that",
        "the meaning of life is",
        "in the beginning",
        "all the world is a",
        "what is the meaning of"
    ]
    return jsonify({'examples': examples})

@app.route('/api/status', methods=['GET'])
def api_status():
    """API endpoint to check model status"""
    global model, tokenizer, vocab_size, model_type

    # Load config if available
    config_path = 'saved_models/config.json'
    embedding_type = "GloVe 100D"
    embedding_dim = 100

    if os.path.exists(config_path):
        try:
            import json
            with open(config_path, 'r') as f:
                config = json.load(f)
            embedding_type = config.get('embedding_type', 'GloVe 100D')
            embedding_dim = config.get('embedding_dim', 100)
        except:
            pass

    return jsonify({
        'model_loaded': model is not None,
        'tokenizer_loaded': tokenizer is not None,
        'vocab_size': vocab_size if tokenizer is not None else 0,
        'sequence_length': SEQUENCE_LENGTH,
        'model_type': model_type,
        'embedding_type': embedding_type,
        'embedding_dim': embedding_dim
    })

@app.route('/api/health', methods=['GET'])
def api_health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'model_ready': model is not None and tokenizer is not None
    })

def train_model_background(config):
    """Background training function"""
    global training_state, model, tokenizer

    try:
        from train_model import RNNTrainer

        training_state['status'] = 'preparing'
        training_state['logs'].append('Initializing training...')

        # Create trainer with config
        trainer = RNNTrainer(config)

        training_state['status'] = 'downloading'
        training_state['logs'].append('Downloading dataset...')
        raw_text = trainer.download_data()

        if training_state['should_stop']:
            training_state['status'] = 'stopped'
            return

        training_state['status'] = 'preprocessing'
        training_state['logs'].append('Preprocessing text...')
        cleaned_text = trainer.clean_text(raw_text)
        trainer.create_tokenizer(cleaned_text)
        sequences = trainer.create_sequences(cleaned_text)
        X, y = trainer.prepare_data(sequences)

        if training_state['should_stop']:
            training_state['status'] = 'stopped'
            return

        training_state['status'] = 'loading_embeddings'
        training_state['logs'].append('Loading embeddings...')
        embeddings = trainer.load_embeddings([
            'glove.2024.dolma.300d/dolma_300_2024_1.2M.100_combined.txt',
            'dolma_300_2024_1.2M.100_combined.txt',
            'glove/glove.6B.300d.txt',
            'glove.6B.300d.txt'
        ])
        trainer.create_embedding_matrix(embeddings)

        if training_state['should_stop']:
            training_state['status'] = 'stopped'
            return

        training_state['status'] = 'building_model'
        training_state['logs'].append('Building model...')
        trainer.build_model()

        if training_state['should_stop']:
            training_state['status'] = 'stopped'
            return

        training_state['status'] = 'training'
        training_state['total_epochs'] = config['epochs']
        training_state['logs'].append(f'Training started with {config["epochs"]} epochs...')

        # Custom callback to update progress
        class ProgressCallback:
            def __init__(self):
                self.epoch = 0

            def on_epoch_end(self, epoch, logs=None):
                if training_state['should_stop']:
                    trainer.model.stop_training = True
                    return

                self.epoch = epoch + 1
                training_state['current_epoch'] = self.epoch
                training_state['progress'] = (self.epoch / training_state['total_epochs']) * 100
                training_state['loss'] = logs.get('loss', 0)
                training_state['accuracy'] = logs.get('accuracy', 0)
                training_state['logs'].append(
                    f"Epoch {self.epoch}/{training_state['total_epochs']} - "
                    f"loss: {logs.get('loss', 0):.4f} - "
                    f"accuracy: {logs.get('accuracy', 0):.4f}"
                )

        # Train model
        history = trainer.train(X, y)

        if training_state['should_stop']:
            training_state['status'] = 'stopped'
            return

        training_state['status'] = 'saving'
        training_state['logs'].append('Saving model...')
        trainer.save_model(history)

        training_state['status'] = 'completed'
        training_state['progress'] = 100
        training_state['logs'].append('Training completed successfully!')

        # Reload the model
        load_model_and_tokenizer()

    except Exception as e:
        training_state['status'] = 'failed'
        training_state['logs'].append(f'Error: {str(e)}')
        print(f"Training error: {e}")
    finally:
        training_state['is_training'] = False

@app.route('/api/training/start', methods=['POST'])
def api_training_start():
    """Start model training"""
    global training_state

    if training_state['is_training']:
        return jsonify({
            'success': False,
            'error': 'Training is already in progress'
        }), 400

    try:
        data = request.get_json()

        config = {
            'epochs': int(data.get('epochs', 50)),
            'batch_size': int(data.get('batch_size', 128)),
            'lstm_units': int(data.get('lstm_units', 256)),
            'embedding_dim': int(data.get('embedding_dim', 300)),
            'learning_rate': float(data.get('learning_rate', 0.001))
        }

        # Reset training state
        training_state = {
            'is_training': True,
            'status': 'starting',
            'progress': 0,
            'current_epoch': 0,
            'total_epochs': config['epochs'],
            'loss': 0,
            'accuracy': 0,
            'logs': [],
            'should_stop': False
        }

        # Start training in background thread
        thread = threading.Thread(target=train_model_background, args=(config,))
        thread.daemon = True
        thread.start()

        return jsonify({
            'success': True,
            'message': 'Training started',
            'config': config
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/training/status', methods=['GET'])
def api_training_status():
    """Get current training status"""
    global training_state

    # Return recent logs only (last 50)
    recent_logs = training_state['logs'][-50:] if len(training_state['logs']) > 50 else training_state['logs']

    return jsonify({
        'is_training': training_state['is_training'],
        'status': training_state['status'],
        'progress': training_state['progress'],
        'current_epoch': training_state['current_epoch'],
        'total_epochs': training_state['total_epochs'],
        'loss': training_state['loss'],
        'accuracy': training_state['accuracy'],
        'logs': recent_logs
    })

@app.route('/api/training/stop', methods=['POST'])
def api_training_stop():
    """Stop training"""
    global training_state

    if not training_state['is_training']:
        return jsonify({
            'success': False,
            'error': 'No training in progress'
        }), 400

    training_state['should_stop'] = True
    training_state['logs'].append('Stop signal received...')

    return jsonify({
        'success': True,
        'message': 'Training will stop after current epoch'
    })

if __name__ == '__main__':
    print("="*60)
    print("RNN NEXT-WORD PREDICTION WEB APPLICATION")
    print("with CORS support for React frontend")
    print("="*60)
    print("\nLoading model and tokenizer...")

    # Try to load model, but don't fail if not available
    model_loaded = load_model_and_tokenizer()

    if model_loaded:
        print("\n✓ Application ready with trained model!")
    else:
        print("\n⚠ No trained model found. Training features available.")
        print("   You can train a model using the /api/training/start endpoint.")

    print("\nStarting web server...")
    print("="*60)
    print("\n🌐 Backend API running on:")
    print("   http://localhost:5000")
    print("\n🎨 React frontend (if running):")
    print("   http://localhost:3000")
    print("\n   Press Ctrl+C to stop the server")
    print("="*60 + "\n")

    # Get port from environment variable (for production) or use 5000
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV') != 'production'

    app.run(debug=debug_mode, host='0.0.0.0', port=port)
