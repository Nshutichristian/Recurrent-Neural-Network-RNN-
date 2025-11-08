#!/bin/bash

# RNN Flask Server Startup Script
# Authors: Christian Nshuti Manzi & Aime Serge Tuyishime

echo "=================================="
echo " RNN Server Startup"
echo "=================================="

# Navigate to project directory
cd "$(dirname "$0")"

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Check if Flask is installed
if ! python -c "import flask" 2>/dev/null; then
    echo "Installing dependencies..."
    pip install -r requirements_web.txt
fi

# Run the app
echo "Starting Flask server..."
echo "=================================="
python3 app.py
