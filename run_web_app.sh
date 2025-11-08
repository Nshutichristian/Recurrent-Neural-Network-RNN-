#!/bin/bash

echo "========================================="
echo "RNN Next-Word Prediction Web Application"
echo "========================================="
echo ""

# Activate virtual environment
echo "Activating virtual environment..."
source notebook_env/bin/activate

# Install Flask if not already installed
echo "Installing Flask..."
pip install flask -q

echo ""
echo "========================================="
echo "Starting Web Server..."
echo "========================================="
echo ""
echo "🌐 The web interface will open at:"
echo "   http://localhost:5000"
echo ""
echo "📝 Make sure you have trained the model first!"
echo "   (Run the Jupyter notebook or run_without_jupyter.py)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Run the Flask app
python app.py
