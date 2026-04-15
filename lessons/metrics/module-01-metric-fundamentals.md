# Module 1 – Metric Fundamentals

**Track:** Track 2 – Metrics & Dashboard Thinking  
**Module:** Module 1 – Metric Fundamentals  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Metrics turn raw activity into comparable numbers. Before you design dashboards or argue about KPIs, you need a shared vocabulary: what counts as a metric, how metrics behave over time, and which numbers actually change decisions. This module builds that foundation.

---

## 1.1 – What Is a Metric

### Why This Matters

Teams waste hours debating charts when they never agreed on the definition of the number on the chart. A clear metric definition is the contract between data, product, and business: everyone knows what is measured, how it is calculated, and what “up” or “down” means.

### Explanation

A **metric** is a quantitative measure derived from events or records. It summarizes behavior or outcomes so you can compare periods, segments, or experiments.

Good metric definitions usually include:

- **Name** — what you call it in dashboards and meetings.  
- **Numerator and denominator** — for ratios (for example, conversions = completions ÷ eligible users).  
- **Population** — who or what is included (signed-up users, paying customers, active devices).  
- **Time window** — daily, weekly, monthly, trailing 28 days, etc.  
- **Unit** — count, percentage, currency, seconds.  

A metric is not the same as a **dimension** (attributes you slice by, such as country, plan type, or acquisition channel). Dimensions explain *who* or *what*; metrics summarize *how much*.

### Example

A product team tracks “Weekly active users (WAU).” A precise definition might read: “Count of distinct `user_id` with at least one `session_start` event in the UTC week Monday 00:00–Sunday 23:59, excluding internal test accounts flagged in `user_properties.is_test = true`.” That single paragraph prevents three different SQL queries from producing three different “WAU” numbers.

### Practical Takeaway

If you cannot write the definition in one short paragraph (population, event or field, time zone, filters), the metric is not ready for executive dashboards—only for exploratory analysis.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 1 – Metric Fundamentals  
- Product Analytics Academy (YouTube), topics: product metrics, dashboards — https://www.youtube.com/@productanalyticsacademy  

---

## 1.2 – Leading vs Lagging Metrics

### Why This Matters

Lagging metrics tell you if you won the quarter; leading metrics hint whether you are building the habits that *cause* wins later. Healthy metric systems use both so you do not optimize only for outcomes you cannot steer in the short term.

### Explanation

- **Lagging metrics** reflect results after the fact. Revenue, quarterly profit, annual churn, and NPS from a past survey are typical lagging indicators. They are often easier to agree on but slow to move.  
- **Leading metrics** are inputs or early signals correlated with future outcomes. Examples include trial-to-paid conversion within seven days, weekly feature adoption among new users, or time-to-first key action. They are more actionable but noisier and sometimes debated.

Leading metrics should be **plausible drivers** of lagging goals, not random early stats. The link can be validated with historical analysis, experiments, or qualitative research—not assumed.

### Example

A B2B SaaS team cares about **net revenue retention (lagging)**. They monitor **weekly active teams completing a collaborative export (leading)** because past data showed teams that export in week one are more likely to expand seats later. If exports drop, they investigate onboarding and integrations before quarterly revenue moves.

### Practical Takeaway

Pair each important lagging metric with one or two leading metrics you can influence this sprint, and review whether the lead indicators still predict the lagging outcome as the product changes.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 1 – Metric Fundamentals  
- Product Analytics Academy (YouTube), growth and product analysis topics — https://www.youtube.com/@productanalyticsacademy  

---

## 1.3 – Vanity vs Actionable Metrics

### Why This Matters

Vanity metrics feel good in slides but rarely change what you build next. Actionable metrics tie to decisions: ship, revert, invest, or stop. Learning to tell them apart protects roadmap time and analytics credibility.

### Explanation

**Vanity metrics** (in the practical sense used by many product teams) are numbers that scale easily with spend or time but do not, by themselves, indicate value delivered—for example, total registered users without activity, raw page views without context, or “downloads” for a free app that does not track activation.

**Actionable metrics** connect to a lever someone owns: funnel step conversion, retention at day 7 for a cohort, paid conversion rate, or support tickets per thousand active users. They suggest a next step when they move.

No metric is “vanity” in every context; **total users** might be vanity for a mature subscription product but actionable for a network-effects startup proving liquidity. Context and decisions matter.

### Example

Two numbers appear on a slide: “500k lifetime signups” and “38% of last month’s signups completed the core workflow within 48 hours.” The first might impress outsiders; the second helps the growth PM decide whether onboarding experiments worked.

### Practical Takeaway

For each metric on your roadmap review, ask: “If this moved 10% next month, what would we do differently?” If there is no clear owner or action, demote it from core KPIs or add context (segments, quality filters, paired rates).

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 1 – Metric Fundamentals  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  
