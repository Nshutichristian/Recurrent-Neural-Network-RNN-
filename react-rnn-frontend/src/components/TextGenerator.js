import React, { useState } from 'react';
import axios from 'axios';
import './TextGenerator.css';

function TextGenerator({ onGenerateComplete, generatedResults }) {
  const [seedText, setSeedText] = useState('');
  const [numWords, setNumWords] = useState(30);
  const [temperature, setTemperature] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const examplePrompts = [
    'to be or not to',
    'once upon a time',
    'i have a dream',
    'in the beginning',
    'all the world is a'
  ];

  const handleGenerate = async () => {
    if (!seedText.trim()) {
      setError('Please enter some seed text');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.post(`${apiUrl}/api/generate`, {
        seed_text: seedText,
        num_words: numWords,
        temperature: temperature
      });

      if (response.data.success) {
        onGenerateComplete({
          seed: seedText,
          generated: response.data.generated_text,
          timestamp: new Date().toISOString(),
          stats: {
            words: numWords,
            temperature: temperature,
            time: response.data.generation_time || 'N/A'
          }
        });
      } else {
        setError(response.data.error || 'Generation failed');
      }
    } catch (err) {
      setError('Failed to connect to the server. Make sure Flask server is running.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setSeedText(example);
  };

  const getTemperatureLabel = (temp) => {
    if (temp < 0.7) return 'Conservative';
    if (temp < 1.2) return 'Balanced';
    if (temp < 1.7) return 'Creative';
    return 'Very Creative';
  };

  return (
    <div className="text-generator">
      <div className="generator-card">
        <h2>Generate Text Completion</h2>

        {/* Seed Text Input */}
        <div className="input-group">
          <label htmlFor="seedText">
            Seed Text (Starting Words)
          </label>
          <textarea
            id="seedText"
            className="seed-input"
            value={seedText}
            onChange={(e) => setSeedText(e.target.value)}
            placeholder="Enter your starting text here..."
            rows="3"
          />
        </div>

        {/* Example Prompts */}
        <div className="examples-section">
          <label>Quick Examples:</label>
          <div className="example-buttons">
            {examplePrompts.map((example, idx) => (
              <button
                key={idx}
                className="example-btn"
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div className="parameters-section">
          <div className="param-group">
            <label htmlFor="numWords">
              Number of Words: <strong>{numWords}</strong>
            </label>
            <input
              type="range"
              id="numWords"
              min="5"
              max="100"
              value={numWords}
              onChange={(e) => setNumWords(parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>5</span>
              <span>100</span>
            </div>
          </div>

          <div className="param-group">
            <label htmlFor="temperature">
              Temperature: <strong>{temperature.toFixed(1)}</strong> ({getTemperatureLabel(temperature)})
            </label>
            <input
              type="range"
              id="temperature"
              min="0.5"
              max="2.0"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>0.5 (Safe)</span>
              <span>2.0 (Wild)</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? '⏳ Generating...' : '✨ Generate Text'}
        </button>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Results Display */}
      {generatedResults.length > 0 && (
        <div className="results-section">
          <h2>Generated Results</h2>
          {generatedResults.map((result, idx) => (
            <div key={idx} className="result-card">
              <div className="result-header">
                <span className="result-timestamp">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
                <div className="result-stats">
                  <span className="stat-badge">Words: {result.stats.words}</span>
                  <span className="stat-badge">Temp: {result.stats.temperature}</span>
                </div>
              </div>
              <div className="result-text">
                <span className="seed-text">{result.seed}</span>
                <span className="generated-text">
                  {result.generated.substring(result.seed.length)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TextGenerator;