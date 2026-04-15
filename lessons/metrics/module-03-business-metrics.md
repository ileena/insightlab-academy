# Module 3 – Business Metrics

**Track:** Track 2 – Metrics & Dashboard Thinking  
**Module:** Module 3 – Business Metrics  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Business metrics connect product behavior to financial outcomes. This module covers core definitions used across SaaS, e-commerce, and subscription contexts: revenue, customer acquisition cost (CAC), lifetime value (LTV), churn, and conversion rate. Exact accounting rules vary by company; always align with finance on definitions.

---

## 3.1 – Revenue

### Why This Matters

Revenue is the lagging scoreboard almost every initiative eventually faces. Product analytics often starts with usage, but **monetization metrics** explain whether usage translates into sustainable business.

### Explanation

**Revenue** is income from goods or services, recognized according to your company’s accounting policy (cash vs accrual, gross vs net of refunds, taxes, and discounts).

Useful related constructs:

- **MRR / ARR** (common in subscription businesses) — normalized monthly or annual recurring revenue from subscriptions.  
- **ARPU** — average revenue per user or per account in a period (revenue ÷ paying users or accounts).  
- **Net vs gross** — “gross” might mean before platform fees; “net” often means what the company keeps—confirm internally.

Product teams usually care about **revenue by cohort, plan, or feature** to see which product bets pay off, not only company totals.

### Example

A team ships a pricing change. Finance reports **net MRR** by segment. Product compares **MRR from accounts using the new usage-based module** vs those on legacy pricing to judge adoption and revenue impact—not just whether global MRR moved (which could be marketing-driven).

### Practical Takeaway

Never present revenue KPIs without stating **recognition rules** and **segment** (new vs existing, geography, currency), and partner with finance before defining “official” revenue for targets.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 3 – Business Metrics  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 3.2 – CAC (Customer Acquisition Cost)

### Why This Matters

Growth that costs more than the customers will ever return destroys value. **CAC** helps marketing, sales, and product evaluate whether acquisition channels scale profitably.

### Explanation

**CAC** is typically:

\[
\text{CAC} = \frac{\text{Sales and marketing spend in a period}}{\text{New customers acquired in the same period}}
\]

Variations abound: include or exclude salaries, overhead, success costs, paid vs organic customers, or **fully loaded** acquisition costs. Some companies compute CAC by channel (paid search vs events) for planning.

CAC is usually paired with **LTV** or payback period: how many months of gross margin repay acquisition spend?

### Example

Last quarter, fully loaded S&M spend was **$480k**. The company added **800** new paying customers who met the “new logo” definition. **CAC = $480{,}000 ÷ 800 = $600** per new customer. If average gross margin per month is **$50**, simple payback is about **12 months** before other variable costs—leadership decides if that fits their funding and retention profile.

### Practical Takeaway

Document the **numerator window**, **which costs count**, and **what counts as a new customer**; changing any of these can “improve” CAC on paper without real efficiency gains.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 3 – Business Metrics  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 3.3 – LTV (Lifetime Value)

### Why This Matters

**LTV** answers whether customers are worth more than they cost to acquire and serve. It prioritizes segments, pricing experiments, and support models.

### Explanation

**LTV** estimates the **profit contribution** of a customer over their lifetime (or a long horizon like 36 months). Simple educational models often multiply **average revenue per account**, **gross margin %**, and **expected lifetime** (or sum of predicted periods).

More robust approaches use **cohort curves** (historical retention and spend by month-since-signup) or predictive models. LTV is sensitive to **discount rate**, **churn definition**, and **expansion revenue**—two teams rarely get identical answers without a shared model.

Rule-of-thumb **LTV:CAC** ratios (for example, 3:1) appear in industry writing as benchmarks; treat them as heuristics, not laws—your margin profile and payback tolerance matter more.

### Example

Using rounded illustrative numbers: average **gross margin** after variable costs is **$200/year** per customer, and median **lifetime** before churn is **4 years** for SMB cohorts. A simplified LTV might be **$200 × 4 = $800** before discounting—compared to **$250 CAC** for that segment to assess headroom.

### Practical Takeaway

Publish one **official LTV methodology** (horizon, margin line, churn/expansion handling) and label exploratory versions clearly when product uses LTV for prioritization.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 3 – Business Metrics  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 3.4 – Churn

### Why This Matters

Churn directly erodes recurring revenue and raises effective CAC (you must keep refilling the bucket). Product and success teams use churn metrics to detect **value gaps**, **competitive pressure**, or **onboarding failures**.

### Explanation

**Churn** can mean:

- **Logo churn** — customers who cancel or do not renew.  
- **Revenue churn** — MRR lost from downsells and cancellations, sometimes net of expansion (**net revenue retention**).

Common shapes:

- **Monthly churn rate** — churned customers in month ÷ customers at start of month (definitions vary for mid-month signups).  
- **Cohort retention** — % of a signup cohort still active after N periods—often clearer than single-month churn for product diagnostics.

Voluntary vs involuntary churn (payment failures) usually needs separate treatment for product action.

### Example

A SaaS company reports **2% monthly logo churn** overall, but cohort analysis shows **accounts without admin activity in the first 14 days** churn at **6%** in the first quarter. Product focuses on activation while success targets at-risk accounts with health scores.

### Practical Takeaway

Always pair churn **rate** with **composition** (plan, size, tenure, reason codes) so you know whether to fix product, pricing, or delivery—not only the headline percent.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 3 – Business Metrics  
- Product Analytics Academy (YouTube), retention topics — https://www.youtube.com/@productanalyticsacademy  

---

## 3.5 – Conversion Rate

### Why This Matters

Conversion rates translate traffic or trials into outcomes: signups, activations, purchases, or upgrades. They are the workhorse metric for funnels, experiments, and landing-page iteration.

### Explanation

**Conversion rate** is generally:

\[
\text{Conversion rate} = \frac{\text{Users who reached the success state}}{\text{Users who entered the funnel or were eligible}}
\]

Quality issues arise when the **denominator** is wrong: everyone who hit the homepage vs everyone who **started checkout** are different baselines. For experiments, use a consistent **intent** population.

Multi-step funnels yield **step conversion** (step n → n+1) and **overall conversion** (first → last). Both are useful; do not mix them without labeling.

### Example

In an A/B test, **4,000** visitors with intent to purchase see each variant. Variant A completes checkout **320** times; Variant B **368** times. **A: 8.0%**, **B: 9.2%** overall conversion to purchase—product decides whether the lift justifies the UX trade-off after checking guardrail metrics (returns, support tickets).

### Practical Takeaway

For every conversion metric, write the **entry condition**, **success event**, **time limit** (session vs 7-day window), and **deduping rule** so experiment tools and SQL match.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 2, Module 3 – Business Metrics  
- Product Analytics Academy (YouTube), funnel analysis topics — https://www.youtube.com/@productanalyticsacademy  
