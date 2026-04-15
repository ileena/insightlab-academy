# Module 6 – Product Analytics Tools

**Track:** Track 3 – Product Analytics  
**Module:** Module 6 – Product Analytics Tools  
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Teams implement product analytics with **event-based platforms** and **digital analytics** products. This module surveys three widely used families—**Mixpanel**, **Amplitude**, and **Google Analytics**—at a conceptual level so you know what each is optimized for and how to learn the details in official docs.

---

## 6.1 – Mixpanel

### Why This Matters

Mixpanel is a common choice for **product-led** teams that want self-serve funnels, retention curves, and user flows on **first-party event data** without building everything in-house.

### Explanation

Typical strengths called out in product discussions and Mixpanel’s positioning:

- **Event-centric model** — you send named events with properties; analysis is built around users and events.  
- **Funnels and retention** — interactive breakdowns by properties and cohorts.  
- **User profiles** — aggregate behavior per `distinct_id` when identity merge rules are configured carefully.

Implementation responsibilities still live with your team: **taxonomy governance**, **identity resolution**, **server-side vs client-side tracking**, and **privacy/compliance** (consent, data residency options—verify current offerings in documentation).

### Example

A growth PM builds a **signup → verify email → create first project** funnel in Mixpanel, slices by **`signup_variant`** from experiments, and shares a board that updates daily—engineering owns event quality via a schema registry checklist.

### Practical Takeaway

Before expanding property payloads, read Mixpanel’s latest guidance on **high-cardinality properties** and **group analytics** (for B2B accounts) so reports stay fast and interpretable.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 3, Module 6 – Product Analytics Tools  
- Mixpanel documentation — https://docs.mixpanel.com/docs/what-is-mixpanel  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 6.2 – Amplitude

### Why This Matters

Amplitude is widely used when teams want **behavioral analytics** tightly coupled with **experimentation** concepts and **taxonomy** tooling at scale.

### Explanation

Commonly highlighted capabilities (see Amplitude’s product documentation for current feature names):

- **Behavioral charts** — paths, funnels, stickiness, and compositional analyses.  
- **Cohorts reusable across charts** — helpful for consistent segmentation.  
- **Taxonomy and data planning tools** — to manage large event catalogs in bigger orgs.

As with any CDP-like layer, success depends on **disciplined tracking plans** and alignment between PM, analytics, and engineering on **release tagging**.

### Example

A multi-product company uses **shared user properties** and **account-level groups** to report **workspace-level retention** while still debugging **user-level** onboarding friction—Amplitude charts reference the same cohort definitions the data science team exports for modeling.

### Practical Takeaway

Treat Amplitude’s **data taxonomy** features as part of your **definition of done** for new events—otherwise dashboards fragment across duplicate event names.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 3, Module 6 – Product Analytics Tools  
- Amplitude documentation — https://www.docs.developers.amplitude.com/  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  

---

## 6.3 – Google Analytics

### Why This Matters

**Google Analytics** (today commonly **Google Analytics 4**, GA4) remains central for **web and app traffic** measurement, **campaign attribution**, and **marketing performance**—often alongside a dedicated product analytics tool.

### Explanation

At a high level (see Google’s Help Center for exact definitions and UI paths):

- **GA4 is event-based** — page views and custom events feed into one model unlike older Universal Analytics patterns many teams remember.  
- **Acquisition reports** — help connect marketing channels to sessions and conversions you configure.  
- **Audiences** — can link to ads platforms for remarketing when policy-compliant.

Product teams often pair GA4’s **traffic and campaign view** with Mixpanel/Amplitude’s **deep product funnels**—duplicate tracking is costly, so many companies define **clear ownership** per metric family.

### Example

Marketing uses GA4 to monitor **paid landing-page sessions and bounce** while product uses an event tool for **in-app activation** post-login. A weekly sync reconciles **campaign IDs** so both systems classify the same acquisition cohort consistently.

### Practical Takeaway

Maintain a **source-of-truth matrix**: which tool owns **session marketing attribution**, which owns **product activation**, and how **IDs** map between them.

### References

- InsightLab Academy, `TOPIC_MAP.md` — Track 3, Module 6 – Product Analytics Tools  
- Google Analytics Help — https://support.google.com/analytics  
- Product Analytics Academy (YouTube) — https://www.youtube.com/@productanalyticsacademy  
