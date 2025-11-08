import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CostAnalysis.css';

function CostAnalysis() {
  const [trainingCost] = useState(4.00); // $4 training cost as requested
  const [selectedScenario, setSelectedScenario] = useState('medium');

  // Cost data based on the $4 training cost analysis
  const costData = {
    training: {
      total: 4.00,
      breakdown: [
        { name: 'Compute', value: 3.99, color: '#8b5cf6' },
        { name: 'Storage', value: 0.01, color: '#3b82f6' },
        { name: 'Data Transfer', value: 0.00, color: '#10b981' }
      ]
    },
    scenarios: {
      low: {
        name: 'Low Volume',
        description: '100 requests/day',
        requestsPerMonth: 3000,
        requestsPerDay: 100,
        monthlyCost: 0.53,
        costPer1000: 0.18,
        tco12Months: 18.36
      },
      medium: {
        name: 'Medium Volume',
        description: '10K requests/day',
        requestsPerMonth: 300000,
        requestsPerDay: 10000,
        monthlyCost: 73.73,
        costPer1000: 0.25,
        tco12Months: 896.76
      },
      high: {
        name: 'High Volume',
        description: '1M requests/day',
        requestsPerMonth: 30000000,
        requestsPerDay: 1000000,
        monthlyCost: 341.03,
        costPer1000: 0.01,
        tco12Months: 4104.36
      }
    }
  };

  const scenario = costData.scenarios[selectedScenario];

  // TCO breakdown for selected scenario
  const tcoData = [
    { name: 'Initial Training', cost: 4.00, color: '#8b5cf6' },
    { name: 'Retraining (2x)', cost: 8.00, color: '#6366f1' },
    { name: 'Monthly Inference (12x)', cost: scenario.monthlyCost * 12, color: '#3b82f6' }
  ];

  // Comparison data
  const comparisonData = [
    { scenario: 'Low Volume', monthly: costData.scenarios.low.monthlyCost },
    { scenario: 'Medium Volume', monthly: costData.scenarios.medium.monthlyCost },
    { scenario: 'High Volume', monthly: costData.scenarios.high.monthlyCost }
  ];

  // TCO over time
  const tcoOverTime = Array.from({ length: 13 }, (_, month) => {
    const retrainingCost = month > 0 && month % 6 === 0 ? 4.00 : 0;
    const monthlyCost = month === 0 ? 4.00 : scenario.monthlyCost;
    const cumulativeCost = month === 0
      ? 4.00
      : tcoOverTime[month - 1].cumulative + monthlyCost + retrainingCost;

    return {
      month,
      cumulative: parseFloat(cumulativeCost.toFixed(2)),
      monthly: parseFloat((monthlyCost + retrainingCost).toFixed(2))
    };
  });

  // Cost per inference efficiency
  const efficiencyData = [
    { volume: 'Low\n(100/day)', costPer1000: costData.scenarios.low.costPer1000 },
    { volume: 'Medium\n(10K/day)', costPer1000: costData.scenarios.medium.costPer1000 },
    { volume: 'High\n(1M/day)', costPer1000: costData.scenarios.high.costPer1000 }
  ];

  return (
    <div className="cost-analysis">
      <div className="cost-header">
        <h2>💰 Comprehensive Cost Analysis</h2>
        <p className="cost-subtitle">
          Based on industry-standard pricing (AWS, Google Cloud, Azure)
        </p>
      </div>

      {/* Training Cost Section */}
      <div className="cost-section">
        <div className="section-header">
          <h3>1. Training Costs (One-Time)</h3>
          <div className="cost-badge large">${trainingCost.toFixed(2)}</div>
        </div>

        <div className="cost-grid">
          <div className="cost-card">
            <h4>Cost Breakdown</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={costData.training.breakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.training.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="cost-card">
            <h4>Training Details</h4>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Instance Type:</span>
                <span className="detail-value">m5.2xlarge (CPU)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">vCPUs:</span>
                <span className="detail-value">8 cores</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">RAM:</span>
                <span className="detail-value">32 GB</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Training Time:</span>
                <span className="detail-value">~10.4 hours</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cost/Hour:</span>
                <span className="detail-value">$0.384</span>
              </div>
              <div className="detail-item highlight">
                <span className="detail-label">Total Cost:</span>
                <span className="detail-value">${trainingCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inference Costs Section */}
      <div className="cost-section">
        <div className="section-header">
          <h3>2. Inference Costs (Monthly)</h3>
          <div className="scenario-selector">
            <button
              className={`scenario-btn ${selectedScenario === 'low' ? 'active' : ''}`}
              onClick={() => setSelectedScenario('low')}
            >
              Low Volume
            </button>
            <button
              className={`scenario-btn ${selectedScenario === 'medium' ? 'active' : ''}`}
              onClick={() => setSelectedScenario('medium')}
            >
              Medium Volume
            </button>
            <button
              className={`scenario-btn ${selectedScenario === 'high' ? 'active' : ''}`}
              onClick={() => setSelectedScenario('high')}
            >
              High Volume
            </button>
          </div>
        </div>

        <div className="scenario-details">
          <div className="scenario-card">
            <h4>{scenario.name}</h4>
            <p className="scenario-desc">{scenario.description}</p>
            <div className="scenario-stats">
              <div className="stat-item">
                <div className="stat-value">{scenario.requestsPerDay.toLocaleString()}</div>
                <div className="stat-label">Requests/Day</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{scenario.requestsPerMonth.toLocaleString()}</div>
                <div className="stat-label">Requests/Month</div>
              </div>
              <div className="stat-item highlight">
                <div className="stat-value">${scenario.monthlyCost.toFixed(2)}</div>
                <div className="stat-label">Monthly Cost</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">${scenario.costPer1000.toFixed(4)}</div>
                <div className="stat-label">Cost per 1000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Comparison Chart */}
        <div className="cost-card">
          <h4>Monthly Cost Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="monthly" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Cost of Ownership */}
      <div className="cost-section">
        <div className="section-header">
          <h3>3. Total Cost of Ownership (12 Months)</h3>
          <div className="cost-badge large">${scenario.tco12Months.toFixed(2)}</div>
        </div>

        <div className="cost-grid">
          <div className="cost-card">
            <h4>TCO Breakdown</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tcoData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Bar dataKey="cost">
                  {tcoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="cost-card">
            <h4>Cumulative Cost Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tcoOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="cumulative" stroke="#8b5cf6" strokeWidth={2} name="Cumulative Cost" />
                <Line type="monotone" dataKey="monthly" stroke="#3b82f6" strokeWidth={2} name="Monthly Cost" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cost Efficiency */}
      <div className="cost-section">
        <div className="section-header">
          <h3>4. Cost Efficiency Analysis</h3>
        </div>

        <div className="cost-card">
          <h4>Cost per 1000 Inferences (Economies of Scale)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="volume" />
              <YAxis label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `$${value.toFixed(4)}`} />
              <Bar dataKey="costPer1000" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
          <div className="efficiency-note">
            <p>💡 <strong>Key Insight:</strong> Higher volume = Lower cost per inference (economies of scale)</p>
            <p>At high volume, cost drops to <strong>$0.01 per 1000 inferences</strong> (95% cheaper than low volume)</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="cost-section">
        <div className="section-header">
          <h3>5. Optimization Recommendations</h3>
        </div>

        <div className="recommendations-grid">
          <div className="recommendation-card">
            <div className="recommendation-icon">💡</div>
            <h4>Use Spot Instances</h4>
            <p>Save 60-70% on training costs by using spot instances instead of on-demand.</p>
            <div className="savings-badge">Potential savings: $2.40-$2.80</div>
          </div>

          <div className="recommendation-card">
            <div className="recommendation-icon">📦</div>
            <h4>Model Quantization</h4>
            <p>Reduce model size and inference cost by 30-40% with INT8 quantization.</p>
            <div className="savings-badge">Inference cost: -30-40%</div>
          </div>

          <div className="recommendation-card">
            <div className="recommendation-icon">⚡</div>
            <h4>Serverless for Low Volume</h4>
            <p>Use AWS Lambda or Cloud Functions for low-volume deployments.</p>
            <div className="savings-badge">Pay only for usage</div>
          </div>

          <div className="recommendation-card">
            <div className="recommendation-icon">🔄</div>
            <h4>Reserved Instances</h4>
            <p>Save 30-40% on compute costs with 1-year reserved instances for predictable workloads.</p>
            <div className="savings-badge">High-volume savings: $100+/month</div>
          </div>

          <div className="recommendation-card">
            <div className="recommendation-icon">🌱</div>
            <h4>Google Colab for Training</h4>
            <p>Use free T4 GPU on Google Colab for training at zero cost.</p>
            <div className="savings-badge highlight">Save $4.00 per training</div>
          </div>

          <div className="recommendation-card">
            <div className="recommendation-icon">📊</div>
            <h4>Batch Inference</h4>
            <p>Process multiple requests together to reduce overhead and improve efficiency.</p>
            <div className="savings-badge">Cost reduction: 20-40%</div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="cost-section summary">
        <h3>📋 Cost Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-label">Training Cost (One-Time)</div>
            <div className="summary-value">${trainingCost.toFixed(2)}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Selected Scenario</div>
            <div className="summary-value">{scenario.name}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Monthly Operating Cost</div>
            <div className="summary-value">${scenario.monthlyCost.toFixed(2)}</div>
          </div>
          <div className="summary-item highlight">
            <div className="summary-label">12-Month TCO</div>
            <div className="summary-value">${scenario.tco12Months.toFixed(2)}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Average Monthly Cost</div>
            <div className="summary-value">${(scenario.tco12Months / 12).toFixed(2)}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Cost per 1000 Inferences</div>
            <div className="summary-value">${scenario.costPer1000.toFixed(4)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostAnalysis;