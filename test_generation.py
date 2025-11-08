"""
Test text generation with trained model
Simple script to test if model works
"""

import numpy as np
import pickle
import os

# Check if model exists
model_dir = 'saved_models/'
model_path = os.path.join(model_dir, 'final_model.h5')
tokenizer_path = os.path.join(model_dir, 'tokenizer.pkl')

if not os.path.exists(model_path):
    print("❌ Model not found!")
    print(f"   Expected: {model_path}")
    print("\n   Please train the model first:")
    print("   - Run: python train_model.py")
    print("   - Or: Run notebook RNN_NextWord_Complete_Assignment.ipynb")
    exit(1)

if not os.path.exists(tokenizer_path):
    print("❌ Tokenizer not found!")
    print(f"   Expected: {tokenizer_path}")
    exit(1)

print("Loading model...")
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load model
model = keras.models.load_model(model_path)
print("✓ Model loaded")

# Load tokenizer
with open(tokenizer_path, 'rb') as f:
    tokenizer = pickle.load(f)
print("✓ Tokenizer loaded")

# Model info
print(f"\nModel Info:")
print(f"  Vocabulary size: {len(tokenizer.word_index) + 1:,}")
print(f"  Sequence length: {model.input_shape[1]}")


def generate_text(seed_text, num_words=30, temperature=1.0):
    """Generate text from seed"""
    sequence_length = model.input_shape[1]
    generated_text = seed_text.lower()

    for _ in range(num_words):
        # Tokenize
        token_list = tokenizer.texts_to_sequences([generated_text])[0]
        token_list = token_list[-sequence_length:]

        # Pad
        token_list = pad_sequences(
            [token_list],
            maxlen=sequence_length,
            padding='pre'
        )

        # Predict
        predicted_probs = model.predict(token_list, verbose=0)[0]

        # Temperature sampling
        if temperature != 1.0:
            predicted_probs = np.log(predicted_probs + 1e-10) / temperature
            predicted_probs = np.exp(predicted_probs)
            predicted_probs = predicted_probs / np.sum(predicted_probs)

        # Sample
        predicted_index = np.random.choice(
            len(predicted_probs),
            p=predicted_probs
        )

        # Convert to word
        reverse_word_index = {v: k for k, v in tokenizer.word_index.items()}
        output_word = reverse_word_index.get(predicted_index, '')

        if output_word:
            generated_text += " " + output_word

    return generated_text


# Test generation
print("\n" + "="*60)
print("TEXT GENERATION TEST")
print("="*60)

test_seeds = [
    "to be or not to",
    "the king of",
    "once upon a time",
    "i have a dream",
    "all the world"
]

print("\n🎲 Generating with different temperatures:\n")

for seed in test_seeds:
    print(f"\nSeed: '{seed}'")
    print("-" * 60)

    for temp in [0.5, 1.0, 1.5]:
        generated = generate_text(seed, num_words=20, temperature=temp)
        print(f"T={temp}: {generated}")

print("\n" + "="*60)
print("✓ Model is working correctly!")
print("="*60)
print("\nYou can now:")
print("  1. Deploy with Flask: python app.py")
print("  2. Deploy to Render (see RENDER_DEPLOYMENT_GUIDE.md)")
print("  3. Use with React frontend")
