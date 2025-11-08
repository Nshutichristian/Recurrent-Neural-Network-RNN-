# RNN Resource Mapping Document

## RNN Model Analysis
**Project:** Text Generator RNN
**Architecture:** Multi-layer LSTM with Embedding
**Analysis Date:** October 28, 2024

## Model Specifications from Codebase

### Architecture Details (from `text_generator.py`)
```python
class TextGenerator:
    def __init__(
        self,
        sequence_length: int = 50,
        embedding_dim: int = 100,
        lstm_units: int = 150,
        num_layers: int = 2,
        dropout_rate: float = 0.2
    )
```

### Model Layer Structure
1. **Embedding Layer**
   - Input dimension: Vocabulary size (varies by dataset)
   - Output dimension: 100
   - Input length: 49 (sequence_length - 1)

2. **LSTM Layers (x2)**
   - Units per layer: 150
   - Return sequences: True for first layer, False for second
   - Dropout: 0.2 after each layer

3. **Dense Output Layer**
   - Units: Vocabulary size
   - Activation: Softmax

### Training Configuration (from `train.py`)
```python
epochs=50
batch_size=128
validation_split=0.1
sequence_length=50
```

## Parameter Count Analysis

### Calculation Method
For LSTM layers with embedding:

**Embedding Layer Parameters:**
- Parameters = vocab_size × embedding_dim
- Estimated: 10,000 × 100 = 1,000,000 parameters

**LSTM Layer Parameters (per layer):**
- Parameters = 4 × (embedding_dim + lstm_units + 1) × lstm_units
- Layer 1: 4 × (100 + 150 + 1) × 150 = 150,600 parameters
- Layer 2: 4 × (150 + 150 + 1) × 150 = 180,600 parameters

**Dense Output Layer:**
- Parameters = (lstm_units + 1) × vocab_size
- Estimated: 151 × 10,000 = 1,510,000 parameters

### Total Parameter Estimate
| Component | Parameters |
|-----------|------------|
| Embedding | 1,000,000 |
| LSTM Layer 1 | 150,600 |
| LSTM Layer 2 | 180,600 |
| Dense Output | 1,510,000 |
| **Total** | **2,841,200** |

## Resource Requirements Mapping

### Memory Requirements

| RNN Characteristic | Cloud Metric | Calculation | Result |
|-------------------|--------------|-------------|---------|
| **Model Parameters** | Memory (GB) | 2.84M × 4 bytes (float32) | 11.4 MB |
| **Training Memory** | Memory (GB) | Model × 3 (gradients + optimizer) | 34.2 MB |
| **Batch Processing** | Memory (GB) | Batch_size × sequence_len × features | Variable |
| **Total Training Memory** | Memory (GB) | Base + Batch + Buffer (2x) | ~2-4 GB |
| **Inference Memory** | Memory (GB) | Model + single batch | ~500 MB |

### Compute Requirements

| RNN Characteristic | Cloud Metric | Calculation | Recommendation |
|-------------------|--------------|-------------|----------------|
| **Training Duration** | Compute Hours | 50 epochs × dataset_size / batch_size | 2-8 hours |
| **Inference Latency** | Requests/Second | 1000ms / 50ms avg latency | 20 RPS |
| **CPU vs GPU** | Instance Type | Text generation, moderate size | CPU sufficient |
| **Parallel Processing** | vCPU Count | Batch processing capability | 4-8 vCPUs |

### Storage Requirements

| RNN Characteristic | Cloud Metric | Size Estimate | Notes |
|-------------------|--------------|---------------|-------|
| **Model Checkpoints** | Storage (GB) | 15 MB × 5 checkpoints | 75 MB |
| **Training Dataset** | Storage (GB) | Text file size | 100 MB - 1 GB |
| **Logs & Metrics** | Storage (GB) | Training logs + metrics | 50-100 MB |
| **Total Storage** | Storage (GB) | Sum of above | 1-2 GB |

### Network Requirements

| RNN Characteristic | Cloud Metric | Estimate | Calculation |
|-------------------|--------------|----------|-------------|
| **Request Size** | Data In (KB) | 1-5 KB | Input text length |
| **Response Size** | Data Out (KB) | 5-20 KB | Generated text length |
| **Model Download** | Data Transfer (MB) | 15 MB | Initial deployment |
| **Dataset Upload** | Data Transfer (GB) | 1 GB | Training data |

## Instance Type Selection

### Training Instance Recommendation

**Recommended:** `r6i.xlarge` (Memory-Optimized)
- **vCPUs:** 4
- **Memory:** 32 GB
- **Reason:** LSTM training requires substantial memory for:
  - Model parameters and gradients
  - Sequence batching
  - Optimizer states (Adam)
  - Training history storage

**Alternative:** `c6i.2xlarge` (Compute-Optimized)
- **vCPUs:** 8
- **Memory:** 16 GB
- **Reason:** Faster training with more CPU cores
- **Risk:** May hit memory limits with large vocabularies

### Inference Instance Recommendation

**Recommended:** `c6i.xlarge` (Compute-Optimized)
- **vCPUs:** 4
- **Memory:** 8 GB
- **Reason:**
  - Inference is CPU-bound
  - Lower memory requirements
  - Cost-effective for production
  - Can handle ~20 concurrent requests

**Scaling Options:**
- **Low traffic:** `c6i.large` (2 vCPU, 4 GB) - $0.085/hour
- **High traffic:** Multiple `c6i.xlarge` behind load balancer
- **Ultra-high traffic:** `c6i.4xlarge` (16 vCPU, 32 GB) - $0.68/hour

## Performance Benchmarking Plan

### Metrics to Measure

1. **Training Performance**
   ```python
   # Time per epoch
   # Memory usage during training
   # Model convergence rate
   # Checkpoint save times
   ```

2. **Inference Performance**
   ```python
   # Latency per request (ms)
   # Throughput (requests/second)
   # Memory usage during inference
   # Model loading time
   ```

3. **Resource Utilization**
   ```python
   # CPU utilization %
   # Memory utilization %
   # Disk I/O patterns
   # Network bandwidth usage
   ```

### Benchmarking Commands

```bash
# CPU and memory monitoring
top -p $PID
htop

# Memory profiling
python -m memory_profiler train.py

# Timing
time python train.py

# Disk usage
du -sh model_directory/
iostat -x 1

# Network monitoring
nethogs
iftop
```

## Scaling Considerations

### Horizontal Scaling (Multiple Instances)

| Scenario | Requests/Day | Instances | Instance Type | Load Balancer |
|----------|--------------|-----------|---------------|---------------|
| Low | < 1,000 | 1 | c6i.large | No |
| Medium | 1,000 - 100,000 | 2-3 | c6i.xlarge | Yes |
| High | > 100,000 | 5+ | c6i.xlarge | Yes |

### Vertical Scaling (Larger Instances)

| Scenario | Single Instance | Max RPS | Memory Usage |
|----------|----------------|---------|--------------|
| Basic | c6i.large | ~10 | 2-3 GB |
| Standard | c6i.xlarge | ~20 | 4-6 GB |
| High-perf | c6i.2xlarge | ~40 | 8-12 GB |

## Cost Optimization Strategies

### Training Optimization
1. **Use Spot Instances:** 70% cost reduction
2. **Right-size Memory:** Avoid over-provisioning
3. **Optimize Batch Size:** Balance memory vs. speed
4. **Early Stopping:** Prevent over-training

### Inference Optimization
1. **Reserved Instances:** 36% cost reduction for production
2. **Auto Scaling:** Scale down during low usage
3. **Model Caching:** Reduce loading overhead
4. **Request Batching:** Process multiple requests together

### Storage Optimization
1. **gp3 over gp2:** 20% cost reduction
2. **Lifecycle Policies:** Archive old logs to S3 IA
3. **Compression:** Compress model checkpoints
4. **Cleanup:** Remove unnecessary training artifacts

## Risk Assessment

### Memory Risks
- **Risk:** Out of memory during training with large vocabularies
- **Mitigation:** Monitor memory usage, use memory-optimized instances
- **Warning Signs:** Gradual memory increase, swap usage

### Performance Risks
- **Risk:** Inference latency spikes under load
- **Mitigation:** Load testing, horizontal scaling
- **Warning Signs:** Increasing response times, CPU > 80%

### Cost Risks
- **Risk:** Unexpected cost increases from data transfer
- **Mitigation:** Monitor CloudWatch billing alerts
- **Warning Signs:** High data egress charges

## Monitoring and Alerting

### Key Metrics to Monitor
1. **CPU Utilization** (Target: < 70%)
2. **Memory Utilization** (Target: < 80%)
3. **Request Latency** (Target: < 100ms p95)
4. **Error Rate** (Target: < 1%)
5. **Cost per Request** (Track over time)

### Recommended Alerts
```json
{
  "cpu_high": "CPU > 80% for 5 minutes",
  "memory_high": "Memory > 85% for 3 minutes",
  "latency_high": "P95 latency > 200ms for 2 minutes",
  "error_rate_high": "Error rate > 5% for 1 minute",
  "cost_anomaly": "Daily cost > 120% of average"
}
```

## Deployment Architecture Recommendation

### Production Setup
```
Internet → ALB → Target Group → EC2 Instances (c6i.xlarge)
                                    ↓
CloudWatch ← Logs/Metrics ← Application
                                    ↓
                              EBS (gp3) Storage
```

### Development/Testing Setup
```
Direct Access → Single EC2 (c6i.large)
                        ↓
              EBS Storage + Local Logs
```

This resource mapping provides the foundation for accurate cost calculations and deployment planning for the RNN text generation model.