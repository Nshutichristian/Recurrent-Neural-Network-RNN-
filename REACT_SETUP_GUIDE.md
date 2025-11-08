# React Frontend Setup Guide

Complete guide to set up and run the React frontend with Flask backend.

## 🎯 What You Get

A beautiful React application with:
- **📝 Text Generation Tab**: Interactive text completion with your RNN model
- **💰 Cost Analysis Tab**: Comprehensive cost visualization with charts
  - Training cost breakdown ($4)
  - Inference cost scenarios (Low/Medium/High volume)
  - 12-month TCO projection
  - Cost efficiency analysis
  - 6 optimization recommendations

---

## 📋 Prerequisites

1. **Node.js and npm**
   ```bash
   # Check if installed
   node --version  # Should be 14+
   npm --version   # Should be 6+

   # If not installed, download from: https://nodejs.org/
   ```

2. **Python Environment** (already set up)
   ```bash
   cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
   source notebook_env/bin/activate
   ```

3. **Trained RNN Model** (in `saved_models/`)
   - `final_model.h5`
   - `tokenizer.pkl`
   - `config.json`

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install React Dependencies

```bash
cd react-rnn-frontend
npm install
```

This installs:
- React 18
- Recharts (for charts)
- Axios (for API calls)
- React Scripts (build tools)

**Time**: 2-3 minutes

### Step 2: Install Flask CORS Support

```bash
cd ..
source notebook_env/bin/activate
pip install flask-cors
```

### Step 3: Start Both Servers

**Terminal 1 - Flask Backend:**
```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
source notebook_env/bin/activate
python app_with_cors.py
```

**Terminal 2 - React Frontend:**
```bash
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN/react-rnn-frontend
npm start
```

**Done!** 🎉

- Backend API: http://localhost:5000
- React App: http://localhost:3000 (opens automatically)

---

## 📁 Project Structure

```
RNN/
├── react-rnn-frontend/           # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TextGenerator.js      # Text generation UI
│   │   │   ├── TextGenerator.css
│   │   │   ├── CostAnalysis.js       # Cost analysis with charts
│   │   │   └── CostAnalysis.css
│   │   ├── App.js                    # Main app with tabs
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
│
├── app_with_cors.py              # Flask backend with CORS
├── saved_models/                 # Trained model files
│   ├── final_model.h5
│   ├── tokenizer.pkl
│   └── config.json
└── REACT_SETUP_GUIDE.md         # This file
```

---

## 🎨 Using the Application

### Text Generation Tab

1. Click **"📝 Text Generation"** tab
2. Enter seed text or click an example
3. Adjust sliders:
   - **Words**: 5-100
   - **Temperature**: 0.5-2.0
4. Click **"✨ Generate Text"**
5. View results with history

**Example:**
- Seed: "to be or not to"
- Words: 30
- Temperature: 1.0 (balanced)
- Result: Real-time generated text

### Cost Analysis Tab

1. Click **"💰 Cost Analysis"** tab
2. Explore sections:

**Section 1: Training Costs**
- $4.00 one-time cost
- Pie chart breakdown
- Instance details

**Section 2: Inference Costs**
- Switch between scenarios (Low/Medium/High)
- View monthly costs
- Compare scenarios

**Section 3: Total Cost of Ownership**
- 12-month projection
- Cumulative cost chart
- TCO breakdown

**Section 4: Cost Efficiency**
- Economies of scale
- Cost per 1000 inferences

**Section 5: Recommendations**
- 6 optimization strategies
- Savings calculations

---

## 🔧 Configuration

### Backend API (Flask)

The React app connects to Flask on port 5000.

**File**: `package.json`
```json
{
  "proxy": "http://localhost:5000"
}
```

### API Endpoints

- `GET /api/status` - Model information
- `POST /api/generate` - Generate text
- `GET /api/examples` - Example prompts
- `GET /api/health` - Health check

### Environment Variables

**Development** (automatic):
- React: http://localhost:3000
- Flask: http://localhost:5000

**Production**:
```bash
# Build React app
cd react-rnn-frontend
npm run build

# Serve from Flask (optional)
# Copy build/ contents to Flask static/
```

---

## 🐛 Troubleshooting

### Issue 1: "Failed to connect to server"

**Symptoms**: React shows connection error

**Solution**:
```bash
# Make sure Flask is running
cd /mnt/c/Users/nshut/Documents/CST\ 435/projects/RNN
source notebook_env/bin/activate
python app_with_cors.py
```

Check: http://localhost:5000/api/status should return JSON

### Issue 2: "Module not found" in React

**Solution**:
```bash
cd react-rnn-frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: CORS errors

**Symptoms**: Browser console shows CORS error

**Solution**: Make sure you're using `app_with_cors.py`, not `app.py`

```bash
# Install flask-cors
pip install flask-cors

# Run the CORS-enabled version
python app_with_cors.py
```

### Issue 4: Port already in use

**React (3000)**:
```bash
PORT=3001 npm start
```

**Flask (5000)**:
Edit `app_with_cors.py`, change:
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

Then update React `package.json`:
```json
"proxy": "http://localhost:5001"
```

### Issue 5: Model not found

**Solution**:
```bash
# Check if model files exist
ls -lh saved_models/

# If missing, train the model first:
# Option 1: Use Google Colab with RNN_Complete_Colab_Ready.ipynb
# Option 2: Run locally: python run_without_jupyter.py
```

### Issue 6: Charts not displaying

**Solution**:
```bash
# Reinstall recharts
cd react-rnn-frontend
npm install recharts@2.10.0
```

---

## 📊 Cost Data Details

The cost analysis uses real data:

### Training Cost: $4.00
- Instance: m5.2xlarge (8 vCPUs, 32GB RAM)
- Duration: 10.4 hours
- Rate: $0.384/hour
- Breakdown:
  - Compute: $3.99
  - Storage: $0.01
  - Data Transfer: $0.00

### Inference Costs (Monthly)

| Scenario | Requests/Day | Monthly Cost | Cost per 1000 |
|----------|-------------|--------------|---------------|
| Low Volume | 100 | $0.53 | $0.18 |
| Medium Volume | 10,000 | $73.73 | $0.25 |
| High Volume | 1,000,000 | $341.03 | $0.01 |

### 12-Month TCO

| Scenario | Initial Training | Retraining | Inference | **Total** |
|----------|-----------------|------------|-----------|-----------|
| Low | $4.00 | $8.00 | $6.36 | **$18.36** |
| Medium | $4.00 | $8.00 | $884.76 | **$896.76** |
| High | $4.00 | $8.00 | $4,092.36 | **$4,104.36** |

---

## 🎯 Development Workflow

### Making Changes

1. **React Frontend**:
   ```bash
   cd react-rnn-frontend/src
   # Edit files in components/
   # Changes auto-reload in browser
   ```

2. **Flask Backend**:
   ```bash
   # Edit app_with_cors.py
   # Restart server to see changes
   ```

### Building for Production

```bash
cd react-rnn-frontend
npm run build

# Output in build/ directory
# Can be served by Flask or any web server
```

### Testing

```bash
# Test backend API
curl http://localhost:5000/api/status

# Test generation
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"seed_text": "hello world", "num_words": 10, "temperature": 1.0}'
```

---

## 🚀 Advanced: Deploy to Production

### Option 1: Build and Serve from Flask

```bash
# Build React app
cd react-rnn-frontend
npm run build

# Copy to Flask static folder
mkdir -p ../static
cp -r build/* ../static/

# Update Flask to serve React
# In app_with_cors.py, add:
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
```

### Option 2: Deploy Separately

**Backend** (Flask):
- Deploy to AWS EC2, Google Cloud, or Azure
- Use Gunicorn: `gunicorn app_with_cors:app`

**Frontend** (React):
- Deploy to Netlify, Vercel, or GitHub Pages
- Update API endpoint in build

---

## 📈 Performance Tips

1. **Backend**:
   - Use production WSGI server (Gunicorn)
   - Enable caching for model predictions
   - Add rate limiting

2. **Frontend**:
   - Build for production (`npm run build`)
   - Enable compression
   - Use CDN for static files

3. **Both**:
   - Use HTTPS in production
   - Add authentication if needed
   - Monitor with logging

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Node.js and npm installed
- [ ] React dependencies installed (`npm install`)
- [ ] Flask backend running (port 5000)
- [ ] React frontend running (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Text generation works
- [ ] Cost analysis displays charts
- [ ] No CORS errors in browser console
- [ ] Model status shows "loaded"

---

## 📞 Support

**Documentation**:
- React Frontend: `react-rnn-frontend/README.md`
- Cost Analysis: `COST_EXAMPLE_$4_TRAINING.md`
- Full Project: `README_FINAL.md`

**Common Commands**:
```bash
# Start backend
python app_with_cors.py

# Start frontend
cd react-rnn-frontend && npm start

# Install dependencies
npm install
pip install flask-cors

# Build for production
npm run build

# Check status
curl http://localhost:5000/api/status
```

---

## 🎉 Summary

You now have a complete React application with:

✅ Beautiful UI with gradient design
✅ Text generation interface
✅ Comprehensive cost analysis with charts
✅ Real-time updates
✅ Professional business analytics
✅ $4 training cost analysis
✅ Multi-scenario cost comparison
✅ Interactive visualizations

**Total Setup Time**: 5-10 minutes

**Cost to Run**: $0 (using existing model)

---

**Ready to use!** Start both servers and open http://localhost:3000 🚀