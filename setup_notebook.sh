#!/bin/bash

# Setup script for RNN Next-Word Prediction Jupyter Notebook
# This script creates a virtual environment and installs all dependencies

echo "========================================="
echo "RNN Notebook Setup Script"
echo "========================================="
echo ""

# Step 1: Create virtual environment
echo "[1/4] Creating virtual environment..."
python3 -m venv notebook_env

if [ $? -ne 0 ]; then
    echo "Error: Failed to create virtual environment"
    echo "Make sure python3-venv is installed: sudo apt install python3-venv"
    exit 1
fi

echo "✓ Virtual environment created successfully"
echo ""

# Step 2: Activate virtual environment
echo "[2/4] Activating virtual environment..."
source notebook_env/bin/activate

echo "✓ Virtual environment activated"
echo ""

# Step 3: Upgrade pip
echo "[3/4] Upgrading pip..."
pip install --upgrade pip

echo "✓ pip upgraded"
echo ""

# Step 4: Install requirements
echo "[4/4] Installing dependencies (this may take a few minutes)..."
pip install -r requirements_notebook.txt

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo ""
echo "========================================="
echo "✓ Setup Complete!"
echo "========================================="
echo ""
echo "To start using the notebook:"
echo ""
echo "1. Activate the virtual environment:"
echo "   source notebook_env/bin/activate"
echo ""
echo "2. Launch Jupyter:"
echo "   jupyter notebook RNN_Next_Word_Prediction.ipynb"
echo ""
echo "3. When done, deactivate:"
echo "   deactivate"
echo ""
echo "========================================="
