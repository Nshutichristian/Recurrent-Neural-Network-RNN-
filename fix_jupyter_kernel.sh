#!/bin/bash

echo "========================================="
echo "Fixing Jupyter Kernel for RNN Project"
echo "========================================="
echo ""

# Activate environment
echo "[1/4] Activating virtual environment..."
source notebook_env/bin/activate

# Install ipykernel
echo "[2/4] Installing ipykernel..."
pip install ipykernel

# Register kernel
echo "[3/4] Registering kernel with Jupyter..."
python -m ipykernel install --user --name=rnn_env --display-name="Python (RNN)"

echo ""
echo "========================================="
echo "✓ Kernel Registered Successfully!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Start Jupyter:"
echo "   jupyter notebook RNN_Next_Word_Prediction.ipynb --allow-root"
echo ""
echo "2. In Jupyter, change the kernel:"
echo "   Kernel → Change Kernel → Python (RNN)"
echo ""
echo "3. Run your cells!"
echo ""
echo "========================================="
