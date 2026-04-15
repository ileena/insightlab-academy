# Module 4 – Product Metrics

**Track:** Track 2 – Metrics & Dashboard Thinking  
**Module:** Module 4 – Product Metrics  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Product metrics describe how users discover value, return, and deepen usage. This module connects four families—activation, engagement, retention, and north star metrics—to the decisions product teams make weekly.

---

## 4.1 – Activation Metrics

### Why This Matters

**Activation** captures whether new users reach an “aha” moment that predicts long-term success. Improving activation often lifts retention and revenue more cheaply than buying more traffic.

### Explanation

**Activation metrics** measure completion of one or more **key early actions** correlated with retention or revenue—such as finishing setup, connecting data, sending a first message, or completing a first purchase.

Design choices:

- **Definition** — which events count as “activated” (sometimes a composite).  
- **Window** — activation within 1 day vs 7 days changes urgency of onboarding work.  
- **Population** — trials only, organic only, or all new accounts.

Activation is not a single universal event; it is **hypothesis-driven** and should be revalidated as the product evolves.

### Example

A project tool defines activation as **“created a project and invited a teammate within 72 hours of signup.”** They track **activation rate** = users meeting both conditions ÷ new signups. A redesign of the invite flow targets that rate while watching support tickets so shortcuts do not harm comprehension.

### Practical Takeaway

Pick activation criteria by analyzing **historical cohorts** (who stayed vs left) and then instrument one primary activation metric for exec dashboards plus a few diagnostic steps underneath.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 4 – Product Metrics  
- Product Analytics Academy (YouTube), product metrics and funnels — https://www.youtube.com/@productanalyticsacademy  

---

## 4.2 – Engagement Metrics

### Why This Matters

Engagement shows whether users **return to value** after activation. Flat engagement often precedes churn; spikes can signal successful launches—or confusion if low-quality engagement.

### Explanation

Common engagement families:

- **Frequency** — sessions per user per week, days active per month (DAU/MAU as a ratio is a common compact shape).  
- **Depth** — actions per session, time on task (interpret carefully for accessibility and background tabs).  
- **Breadth** — number of features or modules touched.  
- **Intensity for collaborative products** — messages sent, documents edited, invites accepted.

Engagement metrics should tie to **meaningful use**, not noise clicks. Pair volume metrics with **quality** (completion, successful outcomes) when possible.

### Example

A streaming analytics product tracks **weekly query runs per analyst** and **% of runs saved as scheduled reports**. After a UI change, runs increase but saved reports drop—the team investigates whether exploration became harder to persist, not just whether “activity” went up.

### Practical Takeaway

For each engagement KPI, add a **quality guardrail** (error rate, undo rate, refund rate) so you do not optimize hollow activity.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 4 – Product Metrics  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 4.3 – Retention Metrics

### Why This Matters

**Retention** is the proof that value repeats. Acquisition can hide weak product for a while; retention exposes product-market fit and drives compounding growth.

### Explanation

**Retention** usually means the share of a **cohort** still active after N time periods (day 1, day 7, week 4, month 12). Definitions vary on:

- **What “active” means** — any login vs core action completed.  
- **Unbounded vs bounded windows** — calendar month vs rolling 28 days.  
- **Account vs user level** — B2B products often retain accounts while individual users churn and are replaced.

**Net revenue retention** (from business metrics) complements usage retention when monetization and expansion matter.

### Example

Two features launch in the same quarter. Feature A lifts **week-1 feature adoption** but **month-6 account retention** is flat. Feature B has modest early adoption but appears in paths of accounts with **+9 pts** higher 90-day retention. Prioritization shifts toward B’s learnings even though A’s launch dashboard looked busier.

### Practical Takeaway

Report retention as **curves** (cohort tables or survival-style views), not only a single headline number, so you see *when* users drop and which segments diverge.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 4 – Product Metrics  
- Product Analytics Academy (YouTube), retention and cohort analysis — https://www.youtube.com/@productanalyticsacademy  

---

## 4.4 – North Star Metrics

### Why This Matters

A **north star metric** aligns teams on the single best summary of delivered customer value that predicts business outcomes. Without it, squads optimize local numbers that conflict.

### Explanation

A north star metric should be:

- **Customer-centered** — reflects meaningful value delivered, not internal efficiency alone.  
- **Leading enough** — moves on a useful cadence for product iteration.  
- **Honest** — hard to game without actually helping users (guardrails still required).  

Examples from industry discussions include **weekly active booking guests** (marketplaces), **learning minutes** (education), or **messages sent between teams** (collaboration)—each must map to *your* strategy.

The north star is **not** the only metric; finance, quality, and compliance still need their own KPIs. It is the **primary narrative metric** for product-led growth conversations.

### Example

A vertical SaaS tool for clinics chooses **appointments scheduled through the product per active clinic per week** as its north star, believing it captures adoption depth better than raw MAU. They still track revenue, NPS, and error rates—but roadmap debates start from appointment throughput and its drivers.

### Practical Takeaway

Revisit the north star annually or after major pivots; run a short workshop to stress-test whether marketing could inflate it without improving customer outcomes—if yes, refine the definition.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 4 – Product Metrics  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  
