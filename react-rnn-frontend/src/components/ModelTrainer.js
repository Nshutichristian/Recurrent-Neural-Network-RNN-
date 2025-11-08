import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModelTrainer.css';

function ModelTrainer() {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState(null);
  const [trainingLogs, setTrainingLogs] = useState([]);
  const [config, setConfig] = useState({
    epochs: 50,
    batch_size: 128,
    lstm_units: 256,
    embedding_dim: 300,
    learning_rate: 0.001
  });
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // Poll for training status
  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        checkTrainingStatus();
      }, 2000); // Check every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  const checkTrainingStatus = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${apiUrl}/api/training/status`);

      if (response.data) {
        setTrainingStatus(response.data);
        if (response.data.logs) {
          setTrainingLogs(prev => [...prev, ...response.data.logs]);
        }
        if (response.data.progress) {
          setProgress(response.data.progress);
        }
        if (response.data.status === 'completed' || response.data.status === 'failed') {
          setIsTraining(false);
        }
      }
    } catch (err) {
      console.error('Error checking training status:', err);
    }
  };

  const startTraining = async () => {
    setIsTraining(true);
    setError(null);
    setTrainingLogs([]);
    setProgress(0);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.post(`${apiUrl}/api/training/start`, config);

      if (response.data.success) {
        setTrainingLogs([`Training started with ${config.epochs} epochs...`]);
      } else {
        setError(response.data.error || 'Failed to start training');
        setIsTraining(false);
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure Flask server is running.');
      setIsTraining(false);
      console.error('Training start error:', err);
    }
  };

  const stopTraining = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      await axios.post(`${apiUrl}/api/training/stop`);
      setIsTraining(false);
      setTrainingLogs(prev => [...prev, 'Training stopped by user']);
    } catch (err) {
      console.error('Error stopping training:', err);
    }
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: parseFloat(value) || value
    }));
  };

  return (
    <div className="model-trainer">
      <div className="trainer-card">
        <h2>🎓 Train RNN Model</h2>
        <p className="trainer-description">
          Configure and train your LSTM model for next-word prediction
        </p>

        {/* Training Configuration */}
        <div className="config-section">
          <h3>Training Configuration</h3>

          <div className="config-grid">
            <div className="config-item">
              <label htmlFor="epochs">
                Epochs: <strong>{config.epochs}</strong>
              </label>
              <input
                type="range"
                id="epochs"
                min="10"
                max="100"
                value={config.epochs}
                onChange={(e) => handleConfigChange('epochs', e.target.value)}
                disabled={isTraining}
                className="config-slider"
              />
              <div className="slider-labels">
                <span>10</span>
                <span>100</span>
              </div>
            </div>

            <div className="config-item">
              <label htmlFor="batch_size">
                Batch Size: <strong>{config.batch_size}</strong>
              </label>
              <input
                type="range"
                id="batch_size"
                min="32"
                max="256"
                step="32"
                value={config.batch_size}
                onChange={(e) => handleConfigChange('batch_size', e.target.value)}
                disabled={isTraining}
                className="config-slider"
              />
              <div className="slider-labels">
                <span>32</span>
                <span>256</span>
              </div>
            </div>

            <div className="config-item">
              <label htmlFor="lstm_units">
                LSTM Units: <strong>{config.lstm_units}</strong>
              </label>
              <input
                type="range"
                id="lstm_units"
                min="128"
                max="512"
                step="64"
                value={config.lstm_units}
                onChange={(e) => handleConfigChange('lstm_units', e.target.value)}
                disabled={isTraining}
                className="config-slider"
              />
              <div className="slider-labels">
                <span>128</span>
                <span>512</span>
              </div>
            </div>

            <div className="config-item">
              <label htmlFor="embedding_dim">
                Embedding Dimension: <strong>{config.embedding_dim}</strong>
              </label>
              <select
                id="embedding_dim"
                value={config.embedding_dim}
                onChange={(e) => handleConfigChange('embedding_dim', e.target.value)}
                disabled={isTraining}
                className="config-select"
              >
                <option value="100">100 (GloVe 100D)</option>
                <option value="200">200 (GloVe 200D)</option>
                <option value="300">300 (Dolma 300D)</option>
              </select>
            </div>

            <div className="config-item">
              <label htmlFor="learning_rate">
                Learning Rate: <strong>{config.learning_rate}</strong>
              </label>
              <input
                type="range"
                id="learning_rate"
                min="0.0001"
                max="0.01"
                step="0.0001"
                value={config.learning_rate}
                onChange={(e) => handleConfigChange('learning_rate', e.target.value)}
                disabled={isTraining}
                className="config-slider"
              />
              <div className="slider-labels">
                <span>0.0001</span>
                <span>0.01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Training Controls */}
        <div className="training-controls">
          {!isTraining ? (
            <button
              className="train-btn start"
              onClick={startTraining}
            >
              🚀 Start Training
            </button>
          ) : (
            <button
              className="train-btn stop"
              onClick={stopTraining}
            >
              ⏹️ Stop Training
            </button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Training Progress */}
        {isTraining && (
          <div className="progress-section">
            <h3>Training Progress</h3>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              >
                {progress > 5 && `${progress.toFixed(1)}%`}
              </div>
            </div>
            {trainingStatus && (
              <div className="training-stats">
                <div className="stat-item">
                  <span className="stat-label">Status:</span>
                  <span className="stat-value">{trainingStatus.status}</span>
                </div>
                {trainingStatus.current_epoch && (
                  <div className="stat-item">
                    <span className="stat-label">Epoch:</span>
                    <span className="stat-value">
                      {trainingStatus.current_epoch} / {trainingStatus.total_epochs}
                    </span>
                  </div>
                )}
                {trainingStatus.loss && (
                  <div className="stat-item">
                    <span className="stat-label">Loss:</span>
                    <span className="stat-value">{trainingStatus.loss.toFixed(4)}</span>
                  </div>
                )}
                {trainingStatus.accuracy && (
                  <div className="stat-item">
                    <span className="stat-label">Accuracy:</span>
                    <span className="stat-value">{(trainingStatus.accuracy * 100).toFixed(2)}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Training Logs */}
        {trainingLogs.length > 0 && (
          <div className="logs-section">
            <h3>Training Logs</h3>
            <div className="logs-container">
              {trainingLogs.map((log, idx) => (
                <div key={idx} className="log-entry">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Info */}
        <div className="info-section">
          <h3>ℹ️ Training Information</h3>
          <ul className="info-list">
            <li>Training uses Shakespeare dataset (automatically downloaded)</li>
            <li>Model will be saved to <code>saved_models/</code> directory</li>
            <li>Training may take 15-60 minutes depending on configuration</li>
            <li>Higher epochs = better results but longer training time</li>
            <li>GPU acceleration will be used if available</li>
            <li>You can stop training at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModelTrainer;
