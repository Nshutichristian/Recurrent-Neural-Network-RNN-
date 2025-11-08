import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TextGenerator from './components/TextGenerator';
import CostAnalysis from './components/CostAnalysis';
import ModelTrainer from './components/ModelTrainer';

function App() {
  const [modelInfo, setModelInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('generate'); // 'generate', 'train', or 'costs'
  const [generatedResults, setGeneratedResults] = useState([]);

  useEffect(() => {
    // Fetch model status on load
    const apiUrl = process.env.REACT_APP_API_URL || '';
    axios.get(`${apiUrl}/api/status`)
      .then(response => {
        setModelInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching model status:', error);
      });
  }, []);

  const handleGenerateComplete = (result) => {
    // Add the new result to the list
    setGeneratedResults(prev => [result, ...prev].slice(0, 10)); // Keep last 10
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 RNN Next-Word Prediction</h1>
        <p className="subtitle">LSTM with Dolma 300D Embeddings + Cost Analysis</p>
        {modelInfo && (
          <div className="model-info">
            <span className="info-badge">
              <strong>Model:</strong> {modelInfo.model_type || 'LSTM'}
            </span>
            <span className="info-badge">
              <strong>Vocab:</strong> {modelInfo.vocab_size?.toLocaleString() || 'N/A'}
            </span>
            <span className="info-badge">
              <strong>Seq Length:</strong> {modelInfo.sequence_length || 'N/A'}
            </span>
          </div>
        )}
      </header>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          📝 Text Generation
        </button>
        <button
          className={`tab-button ${activeTab === 'train' ? 'active' : ''}`}
          onClick={() => setActiveTab('train')}
        >
          🎓 Train Model
        </button>
        <button
          className={`tab-button ${activeTab === 'costs' ? 'active' : ''}`}
          onClick={() => setActiveTab('costs')}
        >
          💰 Cost Analysis
        </button>
      </div>

      <main className="App-main">
        {activeTab === 'generate' && (
          <TextGenerator
            onGenerateComplete={handleGenerateComplete}
            generatedResults={generatedResults}
          />
        )}
        {activeTab === 'train' && (
          <ModelTrainer />
        )}
        {activeTab === 'costs' && (
          <CostAnalysis />
        )}
      </main>

      <footer className="App-footer">
        <p>CST 435 - Neural Networks and Deep Learning | RNN Project</p>
        <p className="authors">Authors: Christian Nshuti Manzi & Aime Serge Tuyishime</p>
      </footer>
    </div>
  );
}

export default App;