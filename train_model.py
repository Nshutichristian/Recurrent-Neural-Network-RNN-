"""
Standalone RNN Training Script
Trains the next-word prediction model
Can run in Jupyter, Colab, or on Render
"""

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Suppress TF warnings

import numpy as np
import pickle
import json
import time
from datetime import datetime
import argparse

# Deep Learning
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout, Masking
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.utils import to_categorical

print(f"TensorFlow version: {tf.__version__}")
print(f"GPU Available: {len(tf.config.list_physical_devices('GPU')) > 0}")

# Set seeds for reproducibility
np.random.seed(42)
tf.random.set_seed(42)


class RNNTrainer:
    """Handles RNN model training end-to-end"""

    def __init__(self, config=None):
        """Initialize with configuration"""
        # Default configuration
        self.config = {
            'sequence_length': 50,
            'embedding_dim': 300,
            'lstm_units': 256,
            'dense_units': 128,
            'dropout_rate': 0.2,
            'max_vocab_size': 10000,
            'batch_size': 128,
            'epochs': 50,
            'validation_split': 0.2,
            'learning_rate': 0.001,
            'data_dir': 'data/',
            'model_dir': 'saved_models/',
        }

        # Update with provided config
        if config:
            self.config.update(config)

        # Create directories
        os.makedirs(self.config['data_dir'], exist_ok=True)
        os.makedirs(self.config['model_dir'], exist_ok=True)

        self.tokenizer = None
        self.model = None
        self.vocab_size = 0
        self.embedding_matrix = None

    def download_data(self):
        """Download Shakespeare dataset"""
        print("\n" + "="*60)
        print("DOWNLOADING DATASET")
        print("="*60)

        path_to_file = keras.utils.get_file(
            'shakespeare.txt',
            'https://storage.googleapis.com/download.tensorflow.org/data/shakespeare.txt'
        )

        with open(path_to_file, 'r', encoding='utf-8') as f:
            text = f.read()

        print(f"✓ Downloaded {len(text):,} characters")
        return text

    def clean_text(self, text):
        """Clean and preprocess text"""
        print("\nCleaning text...")
        import re
        import string

        text = text.lower()
        text = re.sub(r'\[.*?\]', '', text)
        text = re.sub(r'\d+', '', text)
        text = re.sub(f"[{re.escape(string.punctuation.replace('.', ''))}]", '', text)
        text = re.sub(r'\s+', ' ', text).strip()

        print(f"✓ Cleaned: {len(text):,} characters")
        return text

    def create_tokenizer(self, text):
        """Create and fit tokenizer"""
        print("\nCreating tokenizer...")

        self.tokenizer = Tokenizer(
            num_words=self.config['max_vocab_size'],
            oov_token='<OOV>',
            filters='',
            lower=False
        )

        self.tokenizer.fit_on_texts([text])
        self.vocab_size = min(
            self.config['max_vocab_size'],
            len(self.tokenizer.word_index) + 1
        )

        print(f"✓ Vocabulary size: {self.vocab_size:,}")
        return self.tokenizer

    def create_sequences(self, text):
        """Generate training sequences"""
        print("\nCreating sequences...")

        encoded = self.tokenizer.texts_to_sequences([text])[0]
        sequences = []

        seq_len = self.config['sequence_length']
        for i in range(seq_len, len(encoded)):
            seq = encoded[i-seq_len:i+1]
            sequences.append(seq)

            if len(sequences) % 50000 == 0:
                print(f"  Generated {len(sequences):,} sequences...")

        sequences = np.array(sequences)
        print(f"✓ Created {len(sequences):,} sequences")

        return sequences

    def prepare_data(self, sequences):
        """Split into X and y"""
        print("\nPreparing features and labels...")

        X = sequences[:, :-1]
        y = sequences[:, -1]
        y = to_categorical(y, num_classes=self.vocab_size)

        print(f"✓ X shape: {X.shape}")
        print(f"✓ y shape: {y.shape}")

        return X, y

    def load_embeddings(self, embedding_paths):
        """Try to load embeddings from multiple paths"""
        print("\n" + "="*60)
        print("LOADING EMBEDDINGS")
        print("="*60)

        # Try each path
        for path in embedding_paths:
            if os.path.exists(path):
                print(f"\nFound embeddings at: {path}")
                return self._load_embedding_file(path)

        print("\n⚠️  No embedding file found")
        print("   Paths tried:")
        for path in embedding_paths:
            print(f"   - {path}")
        print("\n   Using random initialization instead")
        return None

    def _load_embedding_file(self, filepath):
        """Load embedding file"""
        embeddings_index = {}

        with open(filepath, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                try:
                    values = line.split()
                    word = values[0]
                    vector = np.asarray(values[1:], dtype='float32')

                    if len(vector) == self.config['embedding_dim']:
                        embeddings_index[word] = vector

                    if len(embeddings_index) % 50000 == 0:
                        print(f"  Loaded {len(embeddings_index):,} vectors...")

                except:
                    continue

        print(f"\n✓ Loaded {len(embeddings_index):,} word vectors")
        return embeddings_index

    def create_embedding_matrix(self, embeddings_index):
        """Create embedding matrix"""
        print("\nCreating embedding matrix...")

        embedding_matrix = np.zeros((
            self.vocab_size,
            self.config['embedding_dim']
        ))

        if embeddings_index is None:
            print("  Using random initialization")
            embedding_matrix = np.random.randn(
                self.vocab_size,
                self.config['embedding_dim']
            ) * 0.01
            return embedding_matrix

        found = 0
        for word, i in self.tokenizer.word_index.items():
            if i >= self.vocab_size:
                continue

            vector = embeddings_index.get(word)
            if vector is not None:
                embedding_matrix[i] = vector
                found += 1

        print(f"✓ Found embeddings for {found:,}/{self.vocab_size:,} words")

        self.embedding_matrix = embedding_matrix
        return embedding_matrix

    def build_model(self):
        """Build LSTM model"""
        print("\n" + "="*60)
        print("BUILDING MODEL")
        print("="*60)

        model = Sequential([
            Embedding(
                input_dim=self.vocab_size,
                output_dim=self.config['embedding_dim'],
                weights=[self.embedding_matrix],
                input_length=self.config['sequence_length'],
                trainable=False,
                mask_zero=True,
                name='embedding'
            ),
            Masking(mask_value=0.0, name='masking'),
            LSTM(
                units=self.config['lstm_units'],
                dropout=self.config['dropout_rate'],
                recurrent_dropout=self.config['dropout_rate'],
                return_sequences=False,
                name='lstm'
            ),
            Dense(
                units=self.config['dense_units'],
                activation='relu',
                name='dense_relu'
            ),
            Dropout(self.config['dropout_rate'], name='dropout'),
            Dense(
                units=self.vocab_size,
                activation='softmax',
                name='output'
            )
        ], name='RNN_NextWord_Predictor')

        model.compile(
            optimizer=keras.optimizers.Adam(
                learning_rate=self.config['learning_rate']
            ),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )

        print("\n✓ Model built successfully")
        model.summary()

        self.model = model
        return model

    def train(self, X, y):
        """Train the model"""
        print("\n" + "="*60)
        print("TRAINING MODEL")
        print("="*60)

        callbacks = [
            ModelCheckpoint(
                filepath=os.path.join(
                    self.config['model_dir'],
                    'best_model.h5'
                ),
                monitor='val_loss',
                save_best_only=True,
                verbose=1
            ),
            EarlyStopping(
                monitor='val_loss',
                patience=5,
                restore_best_weights=True,
                verbose=1
            ),
            ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.5,
                patience=2,
                min_lr=0.00001,
                verbose=1
            )
        ]

        print(f"\nTraining started: {datetime.now()}")
        print(f"Samples: {len(X):,}")
        print(f"Batch size: {self.config['batch_size']}")
        print(f"Max epochs: {self.config['epochs']}")

        start_time = time.time()

        history = self.model.fit(
            X, y,
            batch_size=self.config['batch_size'],
            epochs=self.config['epochs'],
            validation_split=self.config['validation_split'],
            callbacks=callbacks,
            verbose=1
        )

        training_time = time.time() - start_time

        print("\n" + "="*60)
        print("TRAINING COMPLETE")
        print("="*60)
        print(f"Time: {training_time/3600:.2f} hours")
        print(f"Final loss: {history.history['loss'][-1]:.4f}")
        print(f"Final val loss: {history.history['val_loss'][-1]:.4f}")

        return history

    def save_model(self, history):
        """Save model, tokenizer, and config"""
        print("\n" + "="*60)
        print("SAVING MODEL")
        print("="*60)

        # Save model
        model_path = os.path.join(self.config['model_dir'], 'final_model.h5')
        self.model.save(model_path)
        print(f"✓ Model saved: {model_path}")

        # Save tokenizer
        tokenizer_path = os.path.join(
            self.config['model_dir'],
            'tokenizer.pkl'
        )
        with open(tokenizer_path, 'wb') as f:
            pickle.dump(self.tokenizer, f)
        print(f"✓ Tokenizer saved: {tokenizer_path}")

        # Save config
        config_data = {
            'vocab_size': self.vocab_size,
            'sequence_length': self.config['sequence_length'],
            'embedding_dim': self.config['embedding_dim'],
            'lstm_units': self.config['lstm_units'],
            'training_samples': len(history.history['loss']),
            'final_loss': float(history.history['loss'][-1]),
            'final_val_loss': float(history.history['val_loss'][-1]),
            'timestamp': datetime.now().isoformat()
        }

        config_path = os.path.join(self.config['model_dir'], 'config.json')
        with open(config_path, 'w') as f:
            json.dump(config_data, f, indent=2)
        print(f"✓ Config saved: {config_path}")

        # Save history
        history_path = os.path.join(
            self.config['model_dir'],
            'history.pkl'
        )
        with open(history_path, 'wb') as f:
            pickle.dump(history.history, f)
        print(f"✓ History saved: {history_path}")

        print("\n✓ All files saved successfully!")

    def run_full_training(self, embedding_paths=None):
        """Run complete training pipeline"""
        if embedding_paths is None:
            embedding_paths = [
                'glove.2024.dolma.300d/dolma_300_2024_1.2M.100_combined.txt',
                'dolma_300_2024_1.2M.100_combined.txt',
                'glove/glove.6B.300d.txt',
                'glove.6B.300d.txt'
            ]

        print("\n" + "="*70)
        print(" " * 15 + "RNN TRAINING PIPELINE")
        print("="*70)

        # 1. Download data
        raw_text = self.download_data()

        # 2. Clean text
        cleaned_text = self.clean_text(raw_text)

        # 3. Create tokenizer
        self.create_tokenizer(cleaned_text)

        # 4. Create sequences
        sequences = self.create_sequences(cleaned_text)

        # 5. Prepare data
        X, y = self.prepare_data(sequences)

        # 6. Load embeddings
        embeddings = self.load_embeddings(embedding_paths)

        # 7. Create embedding matrix
        self.create_embedding_matrix(embeddings)

        # 8. Build model
        self.build_model()

        # 9. Train
        history = self.train(X, y)

        # 10. Save everything
        self.save_model(history)

        print("\n" + "="*70)
        print(" " * 20 + "TRAINING COMPLETE!")
        print("="*70)
        print("\nModel files saved in:", self.config['model_dir'])
        print("\nYou can now:")
        print("  1. Test the model with test_generation.py")
        print("  2. Deploy with Flask (app.py)")
        print("  3. Use in React frontend")


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description='Train RNN next-word prediction model'
    )
    parser.add_argument(
        '--epochs',
        type=int,
        default=50,
        help='Number of training epochs (default: 50)'
    )
    parser.add_argument(
        '--batch-size',
        type=int,
        default=128,
        help='Batch size (default: 128)'
    )
    parser.add_argument(
        '--lstm-units',
        type=int,
        default=256,
        help='LSTM units (default: 256)'
    )
    parser.add_argument(
        '--embedding-dim',
        type=int,
        default=300,
        help='Embedding dimension (default: 300)'
    )

    args = parser.parse_args()

    # Create configuration
    config = {
        'epochs': args.epochs,
        'batch_size': args.batch_size,
        'lstm_units': args.lstm_units,
        'embedding_dim': args.embedding_dim
    }

    # Create trainer and run
    trainer = RNNTrainer(config)
    trainer.run_full_training()


if __name__ == '__main__':
    main()
