# Module 6 – Dashboard Mistakes

**Track:** Track 2 – Metrics & Dashboard Thinking  
**Module:** Module 6 – Dashboard Mistakes  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Even accurate data misleads when framed poorly. This module highlights three frequent failure modes—metric overload, misaligned KPIs, and missing context—and how to fix them before they erode trust in analytics.

---

## 6.1 – Too Many Metrics

### Why This Matters

When everything is important, nothing is. Metric overload slows decisions, hides weak signals in noise, and encourages cherry-picking after the fact.

### Explanation

Symptoms include: dashboards nobody opens, meetings where each function cites a different number, or **p-hacking** behavior across many cuts until something looks “significant.”

Mitigations:

- **Tier metrics** — KPIs (few), health metrics (moderate), diagnostic metrics (on demand).  
- **Exception-based views** — default to summaries; show detail only when thresholds trip.  
- **Strong definitions catalog** — retire redundant metrics that differ by 5% naming only.  
- **Ownership** — each core metric has a named curator who approves changes.

### Example

A leadership dashboard trims from **42 to 9** tiles after a workshop. Squads keep their detailed explorations in separate workspaces. Meeting length drops because discussion centers on the same nine definitions weekly.

### Practical Takeaway

Apply a **“remove one to add one”** rule for executive dashboards during growth phases so sprawl stays controlled.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 6 – Dashboard Mistakes  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 6.2 – Wrong KPIs

### Why This Matters

Wrong KPIs distort incentives: teams ship features that juice the metric without improving customer outcomes, or they ignore existential risks the KPI cannot see.

### Explanation

Common ways KPIs go wrong:

- **Proxy drift** — the metric stopped correlating with value after a product pivot.  
- **Local optimization** — squad KPI improves while company KPI worsens (classic subgame).  
- **Unowned KPIs** — nobody can move them, so reviews become theater.  
- **Unmeasurable ambition** — KPI depends on data you do not trust yet.

**Review cadence** should include “is this still the right measure?” not only “did we hit the number?”

### Example

A support org is measured on **tickets closed per hour**. Agents batch-close simple tickets and defer complex customer issues; **CSAT** falls. Leadership replaces the lone KPI with a **balanced mini-scorecard**: resolved-first-contact rate, median time to resolution for P1 issues, and CSAT—each owned by a lead.

### Practical Takeaway

For every KPI, list **known failure modes** (how it could be gamed) and at least one **paired guardrail metric** before rolling it into compensation or bonuses.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 6 – Dashboard Mistakes  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 6.3 – Lack of Context

### Why This Matters

A number without baseline, comparison, or uncertainty feels arbitrary. Context is what separates analytics from raw counters—and prevents panic on random walk noise.

### Explanation

Essential context types:

- **Comparisons** — prior period, same period last year, plan, or control group in experiments.  
- **Denominators** — rates, not only counts (“signups +20%” matters differently if traffic +200%).  
- **Segmentation** — global averages hide winners and losers.  
- **Known events** — product launches, pricing changes, seasonality.  
- **Data quality notes** — tracking breaks, attribution gaps, delayed pipelines.

Without context, dashboards invite **narrative battles** instead of decisions.

### Example

**Conversion rose from 4.0% to 4.4%** week over week. Adding a **12-week band** and **confidence interval** shows the change is within normal variation. Further slicing reveals **mobile conversion** actually fell slightly while desktop rose—context redirects the investigation.

### Practical Takeaway

Add **comparison lines**, **population labels**, and **annotation layers** as non-optional dashboard components—same priority as the primary metric itself.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 6 – Dashboard Mistakes  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  
