# RNN Text Generator - React Frontend

Beautiful React application for text generation and comprehensive cost analysis visualization.

## Features

### 📝 Text Generation Tab
- Interactive text input with seed text
- Adjustable parameters (words to generate, temperature)
- Quick example prompts
- Real-time generation
- History of generated results
- Beautiful UI with gradient backgrounds

### 💰 Cost Analysis Tab
- **Training Cost Visualization** ($4 training cost)
  - Interactive pie chart breakdown
  - Detailed cost components
- **Inference Cost Scenarios**
  - Low Volume (100 requests/day)
  - Medium Volume (10K requests/day)
  - High Volume (1M requests/day)
  - Switchable scenarios
- **Total Cost of Ownership (TCO)**
  - 12-month projection
  - Cumulative cost chart
  - Cost breakdown visualization
- **Cost Efficiency Analysis**
  - Economies of scale visualization
  - Cost per 1000 inferences
- **Optimization Recommendations**
  - 6 actionable recommendations
  - Savings calculations
- **Interactive Charts**
  - Pie charts, bar charts, line charts
  - Built with Recharts library

## Prerequisites

- Node.js 14+ and npm
- Flask backend running on port 5000
- Trained RNN model

## Quick Start

### 1. Install Dependencies

```bash
cd react-rnn-frontend
npm install
```

### 2. Start the Backend Server

In a separate terminal:

```bash
cd ..
source notebook_env/bin/activate
python app.py
```

The Flask backend should be running on http://localhost:5000

### 3. Start the React Frontend

```bash
npm start
```

The app will open at http://localhost:3000

## Project Structure

```
react-rnn-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── TextGenerator.js    # Text generation component
│   │   ├── TextGenerator.css   # Styling for text generator
│   │   ├── CostAnalysis.js     # Cost analysis component
│   │   └── CostAnalysis.css    # Styling for cost analysis
│   ├── App.js                  # Main app component
│   ├── App.css                 # Main app styling
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies
└── README.md                   # This file
```

## Usage

### Text Generation

1. Click on the **"📝 Text Generation"** tab
2. Enter your seed text in the text box
   - Or click one of the quick example prompts
3. Adjust parameters:
   - **Number of Words**: 5-100 words
   - **Temperature**: 0.5 (conservative) to 2.0 (creative)
4. Click **"✨ Generate Text"**
5. View your generated text with highlighted seed text
6. See history of recent generations

### Cost Analysis

1. Click on the **"💰 Cost Analysis"** tab
2. Explore different sections:
   - **Training Costs**: See the $4 training cost breakdown
   - **Inference Costs**: Switch between Low/Medium/High volume scenarios
   - **TCO**: View 12-month total cost of ownership
   - **Efficiency**: See cost per 1000 inferences
   - **Recommendations**: Explore optimization strategies

## API Endpoints Used

The React app communicates with the Flask backend:

- **GET** `/api/status` - Get model information
- **POST** `/api/generate` - Generate text
  ```json
  {
    "seed_text": "to be or not to",
    "num_words": 30,
    "temperature": 1.0
  }
  ```

## Cost Data

The cost analysis uses real pricing data:

- **Training**: $4.00 (10.4 hours on m5.2xlarge @ $0.384/hr)
- **Low Volume**: $0.53/month (100 requests/day)
- **Medium Volume**: $73.73/month (10K requests/day)
- **High Volume**: $341.03/month (1M requests/day)

All costs based on AWS, Google Cloud, and Azure pricing.

## Technologies Used

- **React 18** - UI framework
- **Recharts** - Data visualization
- **Axios** - HTTP requests
- **CSS3** - Styling with gradients and animations

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Environment Variables

The app uses a proxy to connect to the Flask backend (port 5000).
This is configured in `package.json`:

```json
"proxy": "http://localhost:5000"
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deploy with Flask

To serve the React app from Flask:

1. Build the React app: `npm run build`
2. Copy `build/` contents to Flask's `static/` directory
3. Update Flask to serve the React app

## Troubleshooting

### Issue: "Failed to connect to server"

**Solution**: Make sure the Flask backend is running on port 5000.

```bash
cd ..
source notebook_env/bin/activate
python app.py
```

### Issue: "Module not found"

**Solution**: Install dependencies:

```bash
npm install
```

### Issue: Port 3000 already in use

**Solution**: Kill the process or use a different port:

```bash
PORT=3001 npm start
```

### Issue: CORS errors

**Solution**: The Flask backend needs CORS enabled. Update `app.py`:

```python
from flask_cors import CORS
CORS(app)
```

Then install flask-cors:

```bash
pip install flask-cors
```

## Screenshots

### Text Generation Tab
- Clean, modern interface
- Purple gradient design
- Real-time generation
- Interactive controls

### Cost Analysis Tab
- Interactive charts and graphs
- Scenario comparison
- TCO visualization
- Optimization recommendations
- Professional business analytics

## Performance

- **Initial Load**: < 2 seconds
- **Text Generation**: Depends on backend (usually 1-3 seconds)
- **Chart Rendering**: Instant
- **Responsive**: Works on mobile, tablet, and desktop

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- [ ] Dark mode
- [ ] Export cost reports to PDF
- [ ] Save favorite prompts
- [ ] Compare multiple cost scenarios side-by-side
- [ ] Real-time latency monitoring
- [ ] Custom cost inputs
- [ ] Multi-provider comparison toggle

## License

Part of CST 435 - Neural Networks and Deep Learning project.

## Credits

- **RNN Model**: LSTM with Dolma 300D embeddings
- **Cost Analysis**: Based on industry-standard cloud pricing
- **UI Design**: Modern gradient design with React
- **Charts**: Recharts library

---

**Ready to use!** Start both the Flask backend and React frontend, then open http://localhost:3000 🚀