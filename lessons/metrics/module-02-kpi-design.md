# Module 2 – KPI Design

**Track:** Track 2 – Metrics & Dashboard Thinking  
**Module:** Module 2 – KPI Design  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

A **KPI (key performance indicator)** is a small set of metrics leadership uses to judge progress toward strategy—not every chart in your warehouse. This module covers what makes a metric “key,” how KPIs stack from company to team level, and common frameworks for choosing them without drowning in numbers.

---

## 2.1 – What Is a KPI

### Why This Matters

Calling everything a KPI trains the org to ignore numbers. Reserving the term for a few agreed outcomes keeps alignment: execs see the same pulse, teams see how their work ladders up, and analytics can instrument and QA those definitions first.

### Explanation

A KPI is a **prioritized metric** with a target, owner, and time horizon, used to steer the business or a major initiative. Compared to a generic metric:

- **Few in number** — often a handful at company level; more at department level but still bounded.  
- **Strategic** — tied to mission or annual plan, not every experiment.  
- **Accountable** — someone is responsible for interpretation and follow-up.  
- **Thresholds or targets** — “above 90%” or “grow 15% YoY” makes success unambiguous when definitions are stable.

Operational metrics (error rates, queue depth) can be KPIs for platform teams; growth metrics for product teams. The “key” part is **relative importance**, not a different mathematical type.

### Example

A consumer marketplace might declare three company KPIs: **gross merchandise value (GMV)**, **take rate**, and **buyer repeat purchase rate within 30 days**. Every product squad still tracks feature-level metrics, but exec reviews start from those three.

### Practical Takeaway

Promote a metric to KPI status only when it has an owner, a documented definition, a review cadence, and a line of sight to strategy; otherwise keep it in the supporting metrics catalog.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 2 – KPI Design  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 2.2 – KPI Hierarchy

### Why This Matters

Flat KPI lists create conflicts: one team optimizes conversion at the cost of support load because nobody connected the metrics. A hierarchy shows how squad KPIs support department and company KPIs, so trade-offs are explicit.

### Explanation

A typical **KPI hierarchy** has three layers (names vary by company):

1. **Company or north-star layer** — outcomes investors and leadership care about (revenue, margin, retention, market position).  
2. **Function or domain layer** — product, marketing, sales, success each translate those outcomes into their language (pipeline, activation, expansion, churn drivers).  
3. **Team or initiative layer** — squads tie experiments to metrics that should move the domain KPIs (onboarding completion, time-to-value, campaign ROI).

Cascading targets means: if company retention must improve, customer success and product both know which **input** metrics they are expected to move and how those roll up.

### Example

Company KPI: **annual net revenue retention**.  
Product domain KPI: **90-day paid expansion rate** among accounts over 50 seats.  
Squad KPI for onboarding: **% of new admins who invite ≥3 colleagues in week one**. The squad hypothesizes that invitations drive expansion; leadership agrees to watch expansion as the lagging check.

### Practical Takeaway

Draw your hierarchy as a simple tree once per planning cycle and mark which nodes are **shared** (two teams own levers) so you do not optimize locally against another team’s KPI.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 2 – KPI Design  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 2.3 – KPI Frameworks

### Why This Matters

Frameworks do not replace judgment, but they prevent blind spots: revenue without efficiency, growth without quality, or acquisition without retention. They are checklists for balanced scorecards.

### Explanation

Common patterns teams adapt:

- **AARRR (“Pirate metrics”)** — Acquisition, Activation, Retention, Referral, Revenue. Useful for funnel-shaped digital products.  
- **HEART (Google / UX research)** — Happiness, Engagement, Adoption, Retention, Task success. Useful when quality and usability matter as much as raw growth.  
- **Balanced scorecard (Kaplan & Norton, classic management)** — Financial, customer, internal process, learning & growth perspectives. Useful for enterprises aligning non-digital functions.

Frameworks are **lenses**, not laws. Pick elements that match your business model (subscription vs ads vs marketplace) and strip the rest to avoid metric fatigue.

### Example

A mobile subscription fitness app combines **AARRR** for growth reviews (paid acquisition → first workout completed → week-4 retention → referral invites → MRR) and borrows **HEART**’s “task success” for the coaching team (% of planned workouts completed).

### Practical Takeaway

Choose one primary framework for executive narrative and optionally a secondary lens for UX or finance; document how each box maps to your data events so reporting stays consistent.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 2 – KPI Design  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  
