# Module 2 – Product Metrics

**Track:** Track 3 – Product Analytics  
**Module:** Module 2 – Product Metrics  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Product metrics translate behavior into comparable measures of success. This module focuses on two ideas used constantly in strategy conversations: the **north star metric** and the broader set of **product success metrics** that balance growth, quality, and economics.

---

## 2.1 – North Star Metric

### Why This Matters

The north star metric is the organization’s best single answer to: **“Are we delivering more customer value over time?”** It aligns squads and reduces thrash from conflicting local numbers.

### Explanation

Characteristics of a strong north star (recap from the metrics track, applied to product):

- **Represents delivered value** — not clicks for their own sake.  
- **Correlates with sustainable business outcomes** — retention, expansion, margin—validated for your context.  
- **Actionable on product cadences** — moves enough for monthly or weekly steering, not only annual financials.  

Implementation tips:

- Publish **definition, exclusions, and cadence** next to the number.  
- Pair with **input metrics** (activation depth, frequency of core action) you expect to move the north star.  
- Revisit after **major pivots** or when guardrails show gaming risk.

### Example

A developer-tools company picks **successful CI runs triggered per active organization per week** as its north star, arguing it reflects integrated value better than MAU. Sales still tracks pipeline; finance tracks gross margin—the north star is the **product narrative anchor**.

### Practical Takeaway

Run a **pre-mortem**: “How could we double this metric while harming customers?” If you find credible paths, tighten the definition or add guardrails before company-wide adoption.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 3, Module 2 – Product Metrics  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 2.2 – Product Success Metrics

### Why This Matters

No single number captures product health. A **success metric set** makes trade-offs explicit: you can grow fast and still fail if quality, cost-to-serve, or trust collapses.

### Explanation

A balanced product success layer often spans:

- **Acquisition** — signups, trials started, invite sends (with quality filters).  
- **Activation** — time-to-first value, setup completion, template use.  
- **Engagement** — recurring use of core workflows, breadth of features among ideal users.  
- **Retention** — cohort curves, account renewal where relevant.  
- **Satisfaction** — CSAT, NPS, qualitative themes—used carefully as lagging signals.  
- **Monetization** — conversion to paid, ARPU, expansion, downgrade patterns.  
- **Reliability** — latency, error rates, incident frequency affecting trust.

The exact mix depends on model (B2B SaaS vs consumer ads vs marketplace). The discipline is **choosing a small coherent bundle** reviewed together so nobody optimizes one leg of the stool alone.

### Example

A freemium notes app tracks **WAU**, **% of WAU with ≥3 note edits**, **week-4 retention**, and **free-to-paid conversion in first 30 days**. When a viral loop spikes WAU but **edits per WAU** fall, the team treats the surge as **fragile growth** and prioritizes editor performance over more sharing mechanics.

### Practical Takeaway

Create a **one-page metric tree** for your product line: north star → 4–6 success metrics → diagnostic metrics—revisit quarterly with PM, design, eng, and analytics leads.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 3, Module 2 – Product Metrics  
- Product Analytics Academy (YouTube), product metrics and growth analysis — https://www.youtube.com/@productanalyticsacademy  
