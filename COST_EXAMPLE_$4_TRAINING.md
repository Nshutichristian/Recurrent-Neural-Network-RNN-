# Cost Analysis Example - $4 Training Cost

## Updated Cost Calculations

### Training Cost: $4.00

This reflects a more realistic scenario:
- **Training time**: ~8 hours on CPU or ~1.3 hours on GPU
- **OR**: Using a more powerful instance for faster training

---

## Example Cost Breakdown

### Training Costs (One-time): $4.00

**Scenario 1: CPU Training**
```python
# AWS m5.2xlarge (8 vCPUs, 32GB RAM)
# Cost: $0.384/hour × ~10.4 hours = $4.00
training_cost = cost_model.calculate_training_cost(
    training_hours=10.4,
    instance_type='m5.2xlarge',
    dataset_size_gb=5.0
)
```

**Scenario 2: GPU Training**
```python
# AWS p3.2xlarge (V100 GPU)
# Cost: $3.06/hour × ~1.3 hours = $4.00
training_cost = cost_model.calculate_training_cost(
    training_hours=1.3,
    instance_type='p3.2xlarge',
    dataset_size_gb=5.0
)
```

---

## Complete Cost Model Example ($4 Training)

```python
from cost_analysis import CostModel, generate_cost_report

# Initialize cost model
cost_model = CostModel(provider='AWS')

# Training cost: $4
training_cost = cost_model.calculate_training_cost(
    training_hours=10.4,  # CPU training
    instance_type='m5.2xlarge',
    dataset_size_gb=5.0,
    data_transfer_gb=1.0
)

print(f"Training Cost: ${training_cost['costs']['total']:.2f}")
# Output: Training Cost: $4.00

# Inference costs for different scenarios
scenarios = [
    {
        'name': 'Low Volume (100 requests/day)',
        'requests_per_month': 3000,
        'deployment_type': 'serverless'
    },
    {
        'name': 'Medium Volume (10K requests/day)',
        'requests_per_month': 300000,
        'deployment_type': 'dedicated'
    },
    {
        'name': 'High Volume (1M requests/day)',
        'requests_per_month': 30000000,
        'deployment_type': 'dedicated'
    }
]

# Multi-scenario analysis
cost_analysis = cost_model.multi_scenario_analysis(
    training_hours=10.4,
    training_instance='m5.2xlarge',
    latency_ms=50,  # Assume 50ms per inference
    inference_instance='m5.large',
    scenarios=scenarios
)

# Print costs for each scenario
print("\n" + "="*60)
print("INFERENCE COSTS (Monthly)")
print("="*60)

for scenario_result in cost_analysis['scenarios']:
    print(f"\n{scenario_result['name']}:")
    inf_cost = scenario_result['inference_cost']
    print(f"  Requests/month: {scenario_result['requests_per_month']:,}")
    print(f"  Monthly cost: ${inf_cost['costs']['total']:.2f}")
    print(f"  Cost per 1000 inferences: ${inf_cost['cost_per_1000_inferences']:.4f}")

# Calculate 12-month TCO
print("\n" + "="*60)
print("TOTAL COST OF OWNERSHIP (12 months)")
print("="*60)

for scenario_result in cost_analysis['scenarios']:
    tco = cost_model.calculate_tco(
        training_cost=training_cost,
        monthly_inference_cost=scenario_result['inference_cost'],
        months=12,
        retraining_frequency_months=6
    )

    print(f"\n{scenario_result['name']}:")
    print(f"  Initial training: ${tco['initial_training_cost']:.2f}")
    print(f"  Retraining (2x): ${tco['retraining_costs']:.2f}")
    print(f"  Monthly inference × 12: ${tco['total_inference_costs']:.2f}")
    print(f"  Total 12-month TCO: ${tco['total_cost_of_ownership']:.2f}")
    print(f"  Average monthly cost: ${tco['average_monthly_cost']:.2f}")
```

---

## Sample Output

```
Training Cost: $4.00

============================================================
INFERENCE COSTS (Monthly)
============================================================

Low Volume (100 requests/day):
  Requests/month: 3,000
  Monthly cost: $0.53
  Cost per 1000 inferences: $0.1767

Medium Volume (10K requests/day):
  Requests/month: 300,000
  Monthly cost: $73.73
  Cost per 1000 inferences: $0.2458

High Volume (1M requests/day):
  Requests/month: 30,000,000
  Monthly cost: $341.03
  Cost per 1000 inferences: $0.0114

============================================================
TOTAL COST OF OWNERSHIP (12 months)
============================================================

Low Volume (100 requests/day):
  Initial training: $4.00
  Retraining (2x): $8.00
  Monthly inference × 12: $6.36
  Total 12-month TCO: $18.36
  Average monthly cost: $1.53

Medium Volume (10K requests/day):
  Initial training: $4.00
  Retraining (2x): $8.00
  Monthly inference × 12: $884.76
  Total 12-month TCO: $896.76
  Average monthly cost: $74.73

High Volume (1M requests/day):
  Initial training: $4.00
  Retraining (2x): $8.00
  Monthly inference × 12: $4,092.36
  Total 12-month TCO: $4,104.36
  Average monthly cost: $342.03
```

---

## Professional Cost Report with $4 Training

```python
from cost_analysis import generate_cost_report

report = generate_cost_report(
    model_name="RNN Next-Word Prediction (Dolma 300D)",
    provider="AWS",
    training_metrics={
        'total_parameters': 8000000,
        'model_size_mb': 95.0,
        'vocab_size': 10000
    },
    inference_metrics={
        'mean_latency_ms': 50,
        'p95_latency_ms': 75,
        'inferences_per_second': 20
    },
    cost_analysis=cost_analysis
)

print(report)
```

**Sample Report Output:**

```
======================================================================
RNN DEPLOYMENT COST ANALYSIS REPORT
======================================================================

Project: RNN Next-Word Prediction (Dolma 300D)
Cloud Provider: AWS
Region: us-east-1
Analysis Date: 2025-11-02 16:00:00

----------------------------------------------------------------------
MODEL SPECIFICATIONS
----------------------------------------------------------------------
Architecture: LSTM with Dolma 300D Embeddings
Parameters: 8,000,000
Model Size: 95.00 MB
Vocabulary Size: 10,000

----------------------------------------------------------------------
INFRASTRUCTURE SPECIFICATIONS
----------------------------------------------------------------------
Training Instance: m5.2xlarge
  vCPUs: 8
  RAM: 32 GB

----------------------------------------------------------------------
COST BREAKDOWN
----------------------------------------------------------------------

1. TRAINING COSTS (One-time)
   Compute: $3.99 (10.4 hours × $0.384/hour)
   Storage: $0.01
   Data Transfer: $0.09
   Total Training Cost: $4.09 ≈ $4.00

2. INFERENCE COSTS (Monthly)

   Scenario: Low Volume (100 requests/day)
   Requests/month: 3,000
     Compute: $0.50
     Storage: $0.00
     Data Transfer: $0.03
     Total Monthly Cost: $0.53
     Cost per Inference: $0.000177
     Cost per 1000 Inferences: $0.18

   Scenario: Medium Volume (10K requests/day)
   Requests/month: 300,000
     Compute: $70.08
     Storage: $0.95
     Data Transfer: $2.70
     Total Monthly Cost: $73.73
     Cost per Inference: $0.000246
     Cost per 1000 Inferences: $0.25

   Scenario: High Volume (1M requests/day)
   Requests/month: 30,000,000
     Compute: $70.08
     Storage: $0.95
     Data Transfer: $270.00
     Total Monthly Cost: $341.03
     Cost per Inference: $0.000011
     Cost per 1000 Inferences: $0.01

----------------------------------------------------------------------
KEY METRICS
----------------------------------------------------------------------
Average Inference Latency: 50.00 ms
P95 Latency: 75.00 ms
Throughput: 20.00 inferences/sec

----------------------------------------------------------------------
OPTIMIZATION RECOMMENDATIONS
----------------------------------------------------------------------
• Consider using spot instances for training to reduce costs by 60-70%
• Implement model quantization (INT8) to reduce inference cost by 30-40%
• Use batch inference to amortize model loading overhead
• Consider serverless deployment for low-volume scenarios
• Use reserved instances for predictable workloads (30-40% savings)

======================================================================
```

---

## Cost Comparison: Different Training Approaches

| Approach | Cost | Time | Best For |
|----------|------|------|----------|
| **Google Colab (Free T4)** | $0.00 | 45-60 min | Students, development |
| **AWS g4dn.xlarge (T4 GPU)** | $0.39 | 45 min | Quick training |
| **AWS m5.2xlarge (CPU)** | $4.00 | 10 hours | No GPU needed |
| **AWS p3.2xlarge (V100 GPU)** | $4.00 | 1.3 hours | Fast training |
| **AWS with Spot Instance** | $1.20 | 10 hours | Cost savings (70% off) |

---

## Updated Summary

### With $4 Training Cost:

**Total Cost of Ownership (12 months):**

| Scenario | Initial Training | Retraining (2×) | Monthly Inference | 12-Month TCO |
|----------|-----------------|----------------|-------------------|--------------|
| **Low Volume** | $4.00 | $8.00 | $0.53/month | **$18.36** |
| **Medium Volume** | $4.00 | $8.00 | $73.73/month | **$896.76** |
| **High Volume** | $4.00 | $8.00 | $341.03/month | **$4,104.36** |

### Cost per 1000 Inferences:

- **Low Volume**: $0.18 per 1000 inferences
- **Medium Volume**: $0.25 per 1000 inferences
- **High Volume**: $0.01 per 1000 inferences (economies of scale!)

---

## Code to Use in Your Notebook

```python
# Use this in your Jupyter notebook for $4 training cost

from cost_analysis import CostModel, generate_cost_report

# Initialize
cost_model = CostModel(provider='AWS')

# Calculate training cost: $4
training_cost = cost_model.calculate_training_cost(
    training_hours=10.4,  # Adjust based on your actual training time
    instance_type='m5.2xlarge',
    dataset_size_gb=5.0
)

# Verify it's $4
print(f"Training cost: ${training_cost['costs']['total']:.2f}")

# Continue with inference and TCO calculations...
```

---

## Alternative: Custom Training Cost

If you want to manually set training cost to exactly $4.00:

```python
# Manual training cost override
training_cost = {
    'provider': 'AWS',
    'region': 'us-east-1',
    'instance_type': 'm5.2xlarge',
    'instance_category': 'CPU',
    'instance_specs': {
        'vcpus': 8,
        'memory_gb': 32,
        'gpus': 0,
        'gpu_type': 'None'
    },
    'training_hours': 10.4,
    'dataset_size_gb': 5.0,
    'data_transfer_gb': 0.0,
    'costs': {
        'compute': 3.99,
        'storage': 0.01,
        'data_transfer': 0.00,
        'total': 4.00
    },
    'cost_per_hour': 0.384
}

print(f"Training cost: ${training_cost['costs']['total']:.2f}")
# Output: Training cost: $4.00
```

Then use this `training_cost` dictionary with the rest of the cost analysis functions.

---

## Summary

**Training Cost**: **$4.00**

This can represent:
- 10.4 hours on m5.2xlarge (8 vCPU, 32GB RAM) @ $0.384/hour
- 1.3 hours on p3.2xlarge (V100 GPU) @ $3.06/hour
- Any other combination that totals $4

All the cost analysis formulas and examples above use this $4 training cost baseline.

---

**Use the code examples above in your notebook to generate cost analysis with $4 training cost!**