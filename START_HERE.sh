#!/bin/bash

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║   🤖 RNN NEXT-WORD PREDICTION - STARTER MENU           ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "You have TWO OPTIONS to run this project:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  OPTION 1: 📓 Jupyter Notebook (Recommended for Assignment)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Best Choice: Google Colab (FREE GPU!)"
echo "  1. Go to https://colab.research.google.com/"
echo "  2. Upload: RNN_Complete_Colab_Ready.ipynb"
echo "  3. Runtime → GPU (T4)"
echo "  4. Run all cells"
echo "  5. Done! ✅"
echo ""
echo "  Cost: \$0.00 (FREE)"
echo "  Time: ~30-45 minutes"
echo "  Perfect for assignment submission!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  OPTION 2: 🌐 Web Interface (For Quick Experimentation)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  What would you like to do?"
echo ""
echo "  [1] Train model locally (needed before using web interface)"
echo "  [2] Start web interface (after training)"
echo "  [3] View detailed documentation"
echo "  [4] Exit"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "╔══════════════════════════════════════════════════════════╗"
        echo "║   STARTING MODEL TRAINING                               ║"
        echo "╚══════════════════════════════════════════════════════════╝"
        echo ""
        echo "This will train the RNN model using Python script"
        echo "Estimated time: 30-60 minutes with GPU, 4-5 hours with CPU"
        echo ""
        read -p "Continue? (y/n): " confirm
        if [ "$confirm" = "y" ]; then
            echo ""
            echo "Activating virtual environment..."
            source notebook_env/bin/activate
            echo "Starting training..."
            echo ""
            python run_without_jupyter.py
        else
            echo "Training cancelled."
        fi
        ;;
    2)
        echo ""
        echo "╔══════════════════════════════════════════════════════════╗"
        echo "║   STARTING WEB INTERFACE                                ║"
        echo "╚══════════════════════════════════════════════════════════╝"
        echo ""
        if [ ! -d "saved_models" ]; then
            echo "❌ ERROR: Model not found!"
            echo ""
            echo "You need to train the model first. Options:"
            echo "  1. Use Google Colab (recommended)"
            echo "  2. Run: ./START_HERE.sh and choose option 1"
            echo ""
            exit 1
        fi
        echo "Activating virtual environment..."
        source notebook_env/bin/activate
        echo "Installing Flask..."
        pip install flask -q
        echo ""
        echo "Starting web server..."
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "  🌐 Open your browser and go to:"
        echo "     http://localhost:5000"
        echo ""
        echo "  Press Ctrl+C to stop the server"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        python app.py
        ;;
    3)
        echo ""
        echo "╔══════════════════════════════════════════════════════════╗"
        echo "║   DOCUMENTATION FILES                                    ║"
        echo "╚══════════════════════════════════════════════════════════╝"
        echo ""
        echo "Available documentation:"
        echo ""
        echo "  📖 README_FINAL.md          - Complete project overview"
        echo "  📊 RUN_OPTIONS.md            - Detailed comparison of options"
        echo "  🌐 QUICKSTART_WEB.md         - Web interface quick start"
        echo "  📓 NOTEBOOK_README.md        - Jupyter notebook guide"
        echo ""
        read -p "Press Enter to continue..."
        ;;
    4)
        echo ""
        echo "Goodbye! 👋"
        echo ""
        exit 0
        ;;
    *)
        echo ""
        echo "Invalid choice. Please run the script again."
        echo ""
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
