# Module 5 – Dashboard Design

**Track:** Track 2 – Metrics & Dashboard Thinking  
**Module:** Module 5 – Dashboard Design  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Dashboards are **decision surfaces**, not wallpaper. Good design makes hierarchy obvious: what changed, why it matters, and what to do next. This module covers principles, how metrics stack from summary to detail, and narrative techniques that keep stakeholders aligned.

---

## 5.1 – Dashboard Principles

### Why This Matters

Poor dashboards hide problems in clutter or false precision. Principles keep BI work legible for busy executives and actionable for operators who live in the tool daily.

### Explanation

Common principles:

- **Audience-first** — an exec view differs from an analyst workspace; do not merge them without tabs or progressive disclosure.  
- **One primary question per view** — “Are we on track for quarterly revenue?” vs “Debug yesterday’s drop” are different screens.  
- **Consistent time ranges and comparisons** — WoW, YoY, or plan variance labeled clearly.  
- **Visual encoding that matches data type** — trends as lines, parts-of-whole sparingly and only when summing to 100%.  
- **Trust cues** — as-of timestamps, definitions, known data delays.  
- **Performance** — fast filters and pre-aggregations where possible so behavior matches the stated cadence of review.

Accessibility matters: colorblind-safe palettes, text not only color for status, readable font sizes.

### Example

A revenue dashboard removes 18 sparklines from the first screen and replaces them with **three KPI tiles** (net new ARR, churn ARR, expansion ARR) with **plan variance** and a single **waterfall** for the quarter. Detailed geo and product cuts move to secondary tabs used by finance and sales ops.

### Practical Takeaway

Before building tiles, write the **one-sentence purpose** of the dashboard and the **three actions** it should support; remove charts that do not serve those actions.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 5 – Dashboard Design  
- Product Analytics Academy (YouTube), product dashboards — https://www.youtube.com/@productanalyticsacademy  

---

## 5.2 – Metric Hierarchy on Dashboards

### Why This Matters

Flat grids of numbers force viewers to mentally rebuild hierarchy. Layering **summary → breakdown → diagnostic** speeds comprehension and routes questions to the right owner.

### Explanation

A practical layout pattern:

1. **Executive summary row** — KPIs vs target, with exception highlighting (red/amber only when statistically or materially meaningful—not noise).  
2. **Trend and decomposition** — how KPIs moved over time; simple variance drivers (region, product, channel).  
3. **Diagnostic tables** — top movers, worst deciles, recent cohorts—often filtered and sortable.

**Drill paths** should follow the business question tree: revenue down → volume vs price → segment → customer examples.

### Example

A growth dashboard’s first panel shows **signups, activation rate, and paid conversion** vs targets. A second panel breaks activation by **platform**; only when web lags mobile does the team open the third panel listing **funnel step drop-offs** for web onboarding.

### Practical Takeaway

Encode hierarchy spatially: top-of-page real estate for outcomes, lower or right-hand panels for levers and diagnostics; repeat the pattern across dashboards so muscle memory builds.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 5 – Dashboard Design  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 5.3 – Storytelling with Dashboards

### Why This Matters

Data without narrative gets ignored; narrative without data loses trust. Storytelling in dashboards means sequencing metrics so the viewer reaches a **conclusion and next step** naturally.

### Explanation

Techniques:

- **Headline + evidence** — a text callout states the finding; charts prove it.  
- **SCQA structure** (situation, complication, question, answer) in board decks derived from dashboard screenshots.  
- **Annotations** for events—launches, holidays, outages—that explain spikes.  
- **Counter-metrics** — show the cost side when celebrating a growth metric (support load, refund rate).

For recurring meetings, **standard story order** (what happened → why → what we did → expected impact) reduces improvisation and debate about framing.

### Example

Instead of emailing a static screenshot, the PM records a **2-minute Loom** walking through a dashboard filtered to **EU enterprise trials**, highlighting **+6 pts activation** after localized templates and noting **unchanged payback** as the honest caveat. Execs watch the clip and approve scaling translations.

### Practical Takeaway

Pair every recurring dashboard with a **one-page narrative template** (bullets + links) used by the owner each review cycle so context survives employee turnover.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 5 – Dashboard Design  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  
