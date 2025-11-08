# RNN Deployment Cost Research Documentation

## Cloud Provider Selection
**Selected Provider:** Amazon Web Services (AWS)
**Region:** US-East-1 (N. Virginia)
**Analysis Date:** October 28, 2024

## Cost Components Research

### 1. Compute Costs

#### EC2 Instance Types (On-Demand Pricing - US-East-1)

| Instance Type | vCPUs | Memory (GiB) | Storage | Network Performance | Price/Hour |
|---------------|-------|--------------|---------|-------------------|------------|
| **CPU-Optimized** |
| c6i.large | 2 | 4 | EBS-Only | Up to 12.5 Gbps | $0.0850 |
| c6i.xlarge | 4 | 8 | EBS-Only | Up to 12.5 Gbps | $0.1700 |
| c6i.2xlarge | 8 | 16 | EBS-Only | Up to 12.5 Gbps | $0.3400 |
| c6i.4xlarge | 16 | 32 | EBS-Only | Up to 12.5 Gbps | $0.6800 |
| **Memory-Optimized** |
| r6i.large | 2 | 16 | EBS-Only | Up to 12.5 Gbps | $0.2520 |
| r6i.xlarge | 4 | 32 | EBS-Only | Up to 12.5 Gbps | $0.5040 |
| r6i.2xlarge | 8 | 64 | EBS-Only | Up to 12.5 Gbps | $1.0080 |
| **GPU Instances** |
| p3.2xlarge | 8 | 61 | EBS-Only | Up to 10 Gbps | $3.0600 |
| g4dn.xlarge | 4 | 16 | 125 GB NVMe | Up to 25 Gbps | $0.5260 |

#### Spot Instance Pricing (70% discount typical)
- c6i.xlarge: ~$0.051/hour (70% savings)
- r6i.xlarge: ~$0.151/hour (70% savings)

#### Reserved Instance Pricing (1-year term, no upfront)
- c6i.xlarge: ~$0.108/hour (36% savings)
- r6i.xlarge: ~$0.322/hour (36% savings)

### 2. Storage Costs

#### EBS (Elastic Block Store) - US-East-1
| Storage Type | Use Case | Price/GB/Month |
|--------------|----------|----------------|
| gp3 (General Purpose SSD) | Root volumes, general workloads | $0.08 |
| gp2 (General Purpose SSD) | Legacy general purpose | $0.10 |
| io2 (Provisioned IOPS SSD) | High performance databases | $0.125 |
| st1 (Throughput Optimized HDD) | Big data, data warehouses | $0.045 |
| sc1 (Cold HDD) | Infrequent access | $0.015 |

#### S3 (Simple Storage Service) - US-East-1
| Storage Class | Use Case | Price/GB/Month |
|---------------|----------|----------------|
| Standard | Frequently accessed data | $0.023 |
| Standard-IA | Infrequently accessed | $0.0125 |
| Glacier | Long-term archival | $0.004 |

### 3. Data Transfer Costs

#### Internet Data Transfer (Outbound from AWS)
| Monthly Usage | Price/GB |
|---------------|----------|
| First 1 GB | Free |
| Next 9.999 TB | $0.09 |
| Next 40 TB | $0.085 |
| Next 100 TB | $0.07 |

#### Inter-Region Data Transfer
- Between US regions: $0.02/GB
- To/from other regions: $0.02-0.09/GB

#### Inbound Data Transfer
- From internet to AWS: **Free**
- From AWS services in same region: **Free**

### 4. Additional Services

#### Application Load Balancer (ALB)
- Load Balancer: $0.0225/hour
- Load Balancer Capacity Units (LCU): $0.008/hour

#### CloudWatch Monitoring
- First 10 metrics: Free
- Additional metrics: $0.30/metric/month
- Logs ingestion: $0.50/GB
- Logs storage: $0.03/GB/month

#### NAT Gateway
- NAT Gateway: $0.045/hour
- Data processing: $0.045/GB

## Pricing Sources

1. **AWS EC2 Pricing:** https://aws.amazon.com/ec2/pricing/on-demand/
2. **AWS EBS Pricing:** https://aws.amazon.com/ebs/pricing/
3. **AWS S3 Pricing:** https://aws.amazon.com/s3/pricing/
4. **AWS Data Transfer Pricing:** https://aws.amazon.com/ec2/pricing/on-demand/
5. **AWS Application Load Balancer:** https://aws.amazon.com/elasticloadbalancing/pricing/
6. **AWS CloudWatch Pricing:** https://aws.amazon.com/cloudwatch/pricing/

## Assumptions and Notes

### Key Assumptions:
1. **Region Selection:** US-East-1 chosen for lowest pricing and broad service availability
2. **Instance Sizing:** Assumed memory-optimized instances needed for RNN training due to large model states
3. **Storage:** Assumed gp3 EBS for cost efficiency with adequate performance
4. **Data Transfer:** Estimated 10KB average response size for inference requests
5. **Uptime:** Assumed 24/7 availability for inference, intermittent training workloads
6. **Scaling:** On-demand pricing used as baseline; spot/reserved pricing noted for optimization

### Pricing Model Assumptions:
- **Training workload:** Intermittent, can use spot instances for 70% cost reduction
- **Inference workload:** Continuous, should consider reserved instances for 36% savings
- **Free tier:** Not considered as production workloads exceed free tier limits
- **Support costs:** Not included in baseline calculations

### Regional Considerations:
- US-East-1 typically has lowest pricing
- Other regions may have 10-20% higher costs
- Data sovereignty requirements may dictate region choice regardless of cost

### Alternative Pricing Models Not Included:
- AWS Fargate (serverless containers)
- AWS Lambda (serverless functions) - limited by 15-minute execution time
- AWS SageMaker managed ML services
- Third-party cloud providers (Google Cloud, Azure)

## Cost Optimization Notes

### Potential Savings:
1. **Spot Instances for Training:** 50-90% cost reduction
2. **Reserved Instances for Inference:** 30-50% cost reduction
3. **S3 Intelligent Tiering:** Automatic cost optimization for data storage
4. **CloudWatch Logs Retention:** Reduce retention period to lower storage costs
5. **Data Transfer Optimization:** Use CloudFront CDN for global traffic

### Risk Considerations:
1. **Spot Instance Interruption:** May interrupt training jobs
2. **Reserved Instance Commitment:** 1-3 year commitments reduce flexibility
3. **Data Egress Charges:** Can become significant with high API usage
4. **Hidden Costs:** Monitoring, logging, and support can add 10-20% to base costs