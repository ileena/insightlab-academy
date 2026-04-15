export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type LessonQuiz = {
  questions: QuizQuestion[];
};

const quizData: Record<string, LessonQuiz> = {
  // ─────────────────────────────────────────────
  // METRICS TRACK
  // ─────────────────────────────────────────────

  "metrics/module-01-metric-fundamentals": {
    questions: [
      {
        id: "m1-q1",
        question:
          "A product team has two analysts who both track \"Weekly Active Users\" but produce different numbers. What is most likely missing from the metric definition?",
        options: [
          "A memorable short name for the dashboard",
          "A precise population, event definition, time zone, and exclusion filters",
          "A bar chart instead of a line chart",
          "An executive sponsor who owns the number",
        ],
        correctIndex: 1,
        explanation:
          "Without a shared definition — which users count, which events qualify, which time zone, and which accounts to exclude — two analysts will always produce different results. A one-paragraph contract prevents this.",
      },
      {
        id: "m1-q2",
        question:
          "Which of the following is a LEADING metric for predicting long-term subscription retention?",
        options: [
          "Annual churn rate reported at year-end",
          "Quarterly net revenue for the past fiscal year",
          "Feature adoption rate among new users in their first 30 days",
          "Net Promoter Score collected in a survey last month",
        ],
        correctIndex: 2,
        explanation:
          "Leading metrics are early signals correlated with future outcomes. Feature adoption in the first 30 days hints whether new users are building habits that predict retention — unlike annual churn or last quarter's NPS, which reflect outcomes already in the past.",
      },
      {
        id: "m1-q3",
        question:
          "In the metric \"Revenue ÷ Active Users,\" what does \"Active Users\" represent?",
        options: [
          "A lagging indicator",
          "A KPI",
          "The denominator — the population the metric is normalized against",
          "A dimension used to slice the metric",
        ],
        correctIndex: 2,
        explanation:
          "In a ratio metric, the bottom number is the denominator. Here it is the population (active users) the revenue is divided by. Changing this denominator silently changes what the metric means.",
      },
      {
        id: "m1-q4",
        question:
          "A dimension in analytics is best described as:",
        options: [
          "A metric that summarizes behavior across many users",
          "A calculation that rolls up event counts into a single number",
          "An attribute used to slice a metric — such as country, plan type, or acquisition channel",
          "A target threshold that defines success for a KPI",
        ],
        correctIndex: 2,
        explanation:
          "Dimensions describe WHO or WHAT (country, plan, channel), while metrics summarize HOW MUCH. You slice a metric by a dimension — for example, WAU broken down by country.",
      },
    ],
  },

  "metrics/module-02-kpi-design": {
    questions: [
      {
        id: "m2-q1",
        question:
          "A company tracks 47 metrics on its executive dashboard and team reviews regularly run over time. What KPI design principle is being violated?",
        options: [
          "Visual encoding — charts should use the right chart type",
          "KPIs should be few, accountable, and tied to strategy — not everything is a KPI",
          "Dashboards should load faster with pre-aggregation",
          "Time ranges must be consistent across all charts",
        ],
        correctIndex: 1,
        explanation:
          "Calling everything a KPI trains the organization to ignore numbers. A true KPI is prioritized, owned, and tied to the mission. Too many KPIs create noise, slow decisions, and invite cherry-picking.",
      },
      {
        id: "m2-q2",
        question:
          "In a three-layer KPI hierarchy, where does \"pipeline value from enterprise outbound campaigns\" typically sit for a B2B SaaS company?",
        options: [
          "Company / north-star layer — it drives overall revenue",
          "Function / domain layer — it is a sales or marketing metric that feeds company-level outcomes",
          "Team / initiative layer — it is a squad-level experiment metric",
          "Data infrastructure layer — it is an engineering reliability metric",
        ],
        correctIndex: 1,
        explanation:
          "Pipeline value is a function-level (sales/marketing) KPI that translates the company outcome (revenue) into a domain-specific measure. It is above individual squad experiments but below the company north star.",
      },
      {
        id: "m2-q3",
        question:
          "Which conditions must be true before a metric earns KPI status?",
        options: [
          "It is displayed on a real-time dashboard with color thresholds",
          "It is calculated automatically by a BI tool",
          "It has a named owner, a documented definition, a review cadence, and a line of sight to strategy",
          "It is stored in a relational database and queried via SQL",
        ],
        correctIndex: 2,
        explanation:
          "The 'key' in KPI means relative importance backed by accountability. Without an owner, a definition, a cadence, and strategic relevance, a metric is just a number on a screen.",
      },
      {
        id: "m2-q4",
        question:
          '"Proxy drift" in KPI design refers to:',
        options: [
          "A KPI whose SQL definition contains a calculation error",
          "A metric that stopped correlating with business value after a product pivot",
          "A KPI that is displayed on too many dashboards simultaneously",
          "A situation where a metric owner changed teams",
        ],
        correctIndex: 1,
        explanation:
          "Proxy drift happens when the original correlation between the KPI and real value breaks — often after a product change. Teams keep optimizing the old metric without realizing it no longer predicts what they care about.",
      },
    ],
  },

  "metrics/module-03-business-metrics": {
    questions: [
      {
        id: "m3-q1",
        question:
          "A SaaS company reports 20% MRR growth YoY, but 60% of that growth came from price increases on customers who are now churning faster. Which metrics would surface this risk?",
        options: [
          "Gross revenue and headcount growth",
          "ARPU trend and total signup volume",
          "Net revenue retention rate and cohort churn rate",
          "Impressions and organic traffic",
        ],
        correctIndex: 2,
        explanation:
          "Net revenue retention shows whether existing customers are expanding or contracting. Cohort churn reveals if recent pricing changes are driving cancellations. Gross MRR alone hides both signals.",
      },
      {
        id: "m3-q2",
        question:
          "The standard formula for Customer Acquisition Cost (CAC) is:",
        options: [
          "LTV ÷ Average Customer Lifespan",
          "Sales and marketing spend in a period ÷ new customers acquired in the same period",
          "Gross revenue ÷ total number of customers",
          "Net margin ÷ customer count",
        ],
        correctIndex: 1,
        explanation:
          "CAC measures how much you spend to win one new customer. Dividing total sales and marketing spend by the number of new customers acquired in the same period gives a blended CAC. The period boundaries must match to avoid distortions.",
      },
      {
        id: "m3-q3",
        question:
          "Two acquisition channels both report a $40 cost-per-acquisition. Channel A has 35% activation; Channel B has 18%. What is the correct analytical conclusion?",
        options: [
          "Both channels are equally efficient — CPA is identical",
          "Channel B is better because it has broader reach",
          "Channel A is more efficient on a quality-adjusted basis and warrants more budget",
          "Blended CPA is the only metric that should drive budget decisions",
        ],
        correctIndex: 2,
        explanation:
          "CPA alone ignores downstream quality. Channel A users activate at nearly twice the rate, meaning each productive user costs roughly half as much as from Channel B. Quality-adjusted CAC reveals the real efficiency difference.",
      },
      {
        id: "m3-q4",
        question:
          "When presenting revenue KPIs to stakeholders, which details are essential to include?",
        options: [
          "The chart color and font size used",
          "The SQL query used to calculate the number",
          "Recognition rules (cash vs. accrual, gross vs. net) and the customer segment shown",
          "The names of the engineers who built the pipeline",
        ],
        correctIndex: 2,
        explanation:
          "Revenue numbers look very different depending on whether they are gross or net of refunds, accrual or cash, and which segment is shown. Without these labels, different stakeholders are comparing different things.",
      },
    ],
  },

  "metrics/module-04-product-metrics": {
    questions: [
      {
        id: "m4-q1",
        question:
          "A project tool defines activation as \"created a project AND invited a teammate within 72 hours of signup.\" This is best described as:",
        options: [
          "A lagging metric — it reflects outcomes after the fact",
          "A composite activation metric correlated with long-term retention",
          "A KPI at the company north-star level",
          "A vanity metric with no business value",
        ],
        correctIndex: 1,
        explanation:
          "Activation often requires completing multiple meaningful actions — not just a single step. This composite definition (project + invite + time window) was likely chosen because historical cohort analysis showed these users retained better.",
      },
      {
        id: "m4-q2",
        question:
          "The DAU/MAU ratio measures:",
        options: [
          "Daily acquisition cost compared to monthly acquisition cost",
          "Stickiness — what fraction of monthly users return each day",
          "The daily average of monthly user counts",
          "Revenue per daily active user relative to monthly average",
        ],
        correctIndex: 1,
        explanation:
          "DAU/MAU (often called 'stickiness') shows how habitually monthly users engage. A ratio of 0.5 means half of your monthly actives use the product every day — indicating strong habitual use.",
      },
      {
        id: "m4-q3",
        question:
          "A strong north star metric must:",
        options: [
          "Be the metric that is easiest to increase in the short term",
          "Always be a revenue metric to align with finance",
          "Represent delivered customer value and correlate with sustainable business outcomes",
          "Be measured and reported only at the annual review",
        ],
        correctIndex: 2,
        explanation:
          "A north star metric is the organization's best single answer to 'Are we delivering more value over time?' It must reflect real customer value AND move on product cadences — not just financial ones.",
      },
      {
        id: "m4-q4",
        question:
          "Which metric measures engagement DEPTH rather than breadth?",
        options: [
          "Monthly active users (MAU)",
          "Number of distinct features used per account",
          "Average number of key actions completed per session",
          "DAU/MAU stickiness ratio",
        ],
        correctIndex: 2,
        explanation:
          "Depth metrics measure how intensely users engage per session or visit — actions per session, time on task, key events per week. Breadth metrics like MAU or feature count measure how wide the engagement is, not how deep.",
      },
    ],
  },

  "metrics/module-05-dashboard-design": {
    questions: [
      {
        id: "m5-q1",
        question:
          "Before building a new executive dashboard, the most important first step is:",
        options: [
          "Choosing between bar charts and line charts for the KPI tiles",
          "Configuring real-time data refresh intervals",
          "Writing the one-sentence purpose and the three decisions it should support",
          "Selecting the color palette and dark mode settings",
        ],
        correctIndex: 2,
        explanation:
          "Audience-first design starts with purpose: what question does this dashboard answer, and what actions should it enable? Every chart that does not serve those actions should be removed — not added.",
      },
      {
        id: "m5-q2",
        question:
          "A revenue dashboard has 18 sparklines on the first screen. Executives rarely open it. The best redesign approach is:",
        options: [
          "Make the sparklines smaller so more fit on screen",
          "Add more color coding to highlight important tiles",
          "Replace them with 3 KPI tiles (with plan variance) and move breakdowns to secondary tabs",
          "Add a search bar so users can find the chart they need",
        ],
        correctIndex: 2,
        explanation:
          "Metric hierarchy on dashboards means putting the executive summary first (few KPIs vs target) and routing details to secondary tabs. Reducing from 18 to 3 tiles directly addresses the 'nobody opens it' problem.",
      },
      {
        id: "m5-q3",
        question:
          '"Trust cues" on a dashboard refer to elements that:',
        options: [
          "Use a blue-and-white color scheme associated with reliability",
          "Include the names of executives who approved the metrics",
          "Show as-of timestamps, metric definitions, and known data delays",
          "Display animated charts that load quickly",
        ],
        correctIndex: 2,
        explanation:
          "Trust is built when viewers know WHEN the data was last updated, WHAT the definitions mean, and WHAT known delays affect the numbers. Without these, users mentally discount or ignore dashboards.",
      },
      {
        id: "m5-q4",
        question:
          "The correct order of the metric hierarchy pattern on a well-designed dashboard is:",
        options: [
          "Diagnostic details → trend breakdown → executive summary",
          "Raw event data → SQL query results → aggregated chart",
          "Executive summary (KPIs vs target) → trend and decomposition → team-level diagnostic",
          "Individual user data → segment data → company totals",
        ],
        correctIndex: 2,
        explanation:
          "Layering summary → breakdown → diagnostic routes viewers from the high-level pulse to the root cause without forcing them to mentally reconstruct hierarchy from a flat grid of numbers.",
      },
    ],
  },

  "metrics/module-06-dashboard-mistakes": {
    questions: [
      {
        id: "m6-q1",
        question:
          "An executive dashboard grows from 9 to 42 tiles over two years. Which organizational symptom is most likely?",
        options: [
          "Better data-driven decision-making at all levels",
          "Improved trust in the analytics team",
          "Cherry-picking, metric overload, and meeting time wasted debating different numbers",
          "Faster product iteration cycles",
        ],
        correctIndex: 2,
        explanation:
          "Metric overload creates the paradox of choice — when everything is important, nothing is. Teams start cherry-picking the cut that tells the story they want. The fix is tiering metrics and enforcing a 'remove one to add one' rule.",
      },
      {
        id: "m6-q2",
        question:
          "A squad ships a feature that improves its own KPI (faster checkout time) but increases overall cart abandonment. This is an example of:",
        options: [
          "Proxy drift — the metric stopped correlating with value",
          "Local optimization — squad KPI improves while the company KPI worsens",
          "Metric overload — too many KPIs are tracked simultaneously",
          "Missing context — the dashboard lacks data delay information",
        ],
        correctIndex: 1,
        explanation:
          "Local optimization is a classic sub-game: a team hits their number while harming the broader outcome. A proper KPI hierarchy with guardrail metrics (like cart abandonment) makes this trade-off visible before it causes damage.",
      },
      {
        id: "m6-q3",
        question:
          "A metric shows a sharp 30% drop one day. Nobody on the team knows whether it was a real event or a data pipeline failure. This is a symptom of:",
        options: [
          "Metric overload — too many metrics dilute attention",
          "Proxy drift — the metric no longer correlates with value",
          "Missing context — no data health status, pipeline alerts, or known event flags on the dashboard",
          "Wrong KPIs — the metric does not align with strategy",
        ],
        correctIndex: 2,
        explanation:
          "Missing context causes misinterpretation. A 30% drop might be a Tuesday holiday, a tracking outage, or a real product problem. Dashboards need annotations, data freshness indicators, and alert thresholds to distinguish signal from noise.",
      },
      {
        id: "m6-q4",
        question:
          'The "remove one to add one" rule for executive dashboards is designed to:',
        options: [
          "Reduce cloud storage costs by limiting the number of materialized views",
          "Help designers maintain visual balance and symmetry",
          "Keep decision-relevant signal dense by preventing metric sprawl",
          "Ensure each dashboard has exactly the same number of charts",
        ],
        correctIndex: 2,
        explanation:
          "The rule creates a forcing function: before adding a new metric, you must retire an existing one. This keeps executive dashboards focused on the metrics that actually change decisions, rather than accumulating every number anyone ever requested.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PRODUCT ANALYTICS TRACK
  // ─────────────────────────────────────────────

  "product-analytics/module-01-introduction-to-product-analytics": {
    questions: [
      {
        id: "pa1-q1",
        question:
          "Product analytics primarily focuses on:",
        options: [
          "Financial forecasting, budget planning, and quarterly earnings",
          "External market research and competitor pricing strategies",
          "Measuring in-product user behavior to improve the experience and commercial outcomes",
          "Infrastructure monitoring, server performance, and uptime",
        ],
        correctIndex: 2,
        explanation:
          "Product analytics is specifically about what users DO inside the product — clicks, flows, funnels, cohorts — and how that behavior connects to retention, revenue, and satisfaction. It is distinct from marketing, finance, or infrastructure analytics.",
      },
      {
        id: "pa1-q2",
        question:
          "Many users open the \"import\" screen but few complete column mapping. What does product analytics contribute here?",
        options: [
          "Rebuilding the database schema to reduce latency",
          "Increasing the paid marketing budget to drive more users to the screen",
          "Quantifying the drop-off step, segmenting by data source, and comparing time-to-first-import before and after changes",
          "Sending an email survey to all users who opened the import screen",
        ],
        correctIndex: 2,
        explanation:
          "Product analytics turns 'many users drop off' into a precise, actionable finding: exactly where in the funnel the cliff is, which user segments are most affected, and whether a design change measurably moved the metric.",
      },
      {
        id: "pa1-q3",
        question:
          "Product analytics should be treated as:",
        options: [
          "A service desk that responds to ad hoc SQL requests from PMs",
          "A subset of financial reporting managed by the CFO's team",
          "A product discipline with its own roadmap — taxonomy, identity, data quality, and self-serve tooling",
          "A one-time setup task completed during the first product launch",
        ],
        correctIndex: 2,
        explanation:
          "Treating analytics as a reactive service leads to ungoverned event schemas, unreliable data, and slow iteration. Like the product itself, the analytics system needs deliberate investment in its taxonomy, identity resolution, and quality.",
      },
      {
        id: "pa1-q4",
        question:
          "Product analytics accelerates learning because it:",
        options: [
          "Replaces the need for user research and qualitative interviews",
          "Lets you see whether releases helped or hurt within days, aligned around shared definitions",
          "Guarantees that every product decision will be correct",
          "Provides exact causal proof that a feature caused a business outcome",
        ],
        correctIndex: 1,
        explanation:
          "Faster feedback loops are the core value: you do not need to wait a quarter to see if a release worked. But analytics shows correlation and narrows hypotheses — it does not replace qualitative insight or prove causality alone.",
      },
    ],
  },

  "product-analytics/module-02-product-metrics": {
    questions: [
      {
        id: "pa2-q1",
        question:
          "A developer-tools company picks \"successful CI runs per active org per week\" as its north star. Why is this better than Monthly Active Orgs for this company?",
        options: [
          "It is easier to calculate from server logs",
          "It aligns directly with marketing campaign goals",
          "It reflects integrated product value — orgs are actually getting work done, not just logging in",
          "It is a lagging metric and therefore more accurate",
        ],
        correctIndex: 2,
        explanation:
          "A north star should represent delivered value. 'Active org' only means someone logged in; 'successful CI run' means the product is embedded in a real workflow. The latter correlates far better with retention and expansion.",
      },
      {
        id: "pa2-q2",
        question:
          'Running a "pre-mortem" on a proposed north star metric means:',
        options: [
          "Testing the metric in staging before rolling it out to production",
          "Asking the question: \"How could we double this number while actually harming customers?\"",
          "Reviewing the metric after a failed quarter to understand what went wrong",
          "Having the engineering team calculate it in advance of the board meeting",
        ],
        correctIndex: 1,
        explanation:
          "A pre-mortem surfaces gaming risk before it becomes a real problem. If a credible path to 'winning' the metric exists that doesn't create real customer value, the definition needs to be tightened or guardrails added.",
      },
      {
        id: "pa2-q3",
        question:
          "A balanced product success metric set should cover all of the following EXCEPT:",
        options: [
          "Acquisition and activation rates",
          "Engagement depth and retention curves",
          "Total employee headcount and org chart depth",
          "Revenue and quality guardrails",
        ],
        correctIndex: 2,
        explanation:
          "A product success metric set spans acquisition, activation, engagement, retention, revenue, and quality. Headcount is an operational HR metric, not a product success indicator.",
      },
      {
        id: "pa2-q4",
        question:
          "Input metrics in relation to a north star are best described as:",
        options: [
          "Metrics that are harder to measure accurately than the north star",
          "Leading indicators the team expects to drive movement in the north star",
          "Metrics that replace the north star when it is gamed",
          "Annual financial metrics reviewed by the board",
        ],
        correctIndex: 1,
        explanation:
          "Input metrics (activation depth, frequency of core actions) are the levers teams pull to move the north star. Tracking them creates a causal hypothesis: if we improve X (input), the north star should rise.",
      },
    ],
  },

  "product-analytics/module-03-user-acquisition": {
    questions: [
      {
        id: "pa3-q1",
        question:
          "Two acquisition campaigns both cost $40 CPA. Channel A has 35% activation, Channel B has 18%. What is the correct analytical action?",
        options: [
          "Treat both channels equally since CPA is identical",
          "Shift budget toward Channel B because it has broader reach",
          "Shift budget toward Channel A — it is more efficient on a quality-adjusted basis",
          "Pause both channels until activation rates equalize",
        ],
        correctIndex: 2,
        explanation:
          "CPA only counts acquisition, not quality. On a quality-adjusted basis, Channel A delivers roughly twice the activated users per dollar spent. The blended CPA masks this — always link acquisition channels to downstream activation and retention.",
      },
      {
        id: "pa3-q2",
        question:
          "UTM parameters in acquisition analytics are used to:",
        options: [
          "Encrypt user identity data before it reaches the analytics platform",
          "Tag traffic sources so signups can be attributed to acquisition channels and linked to downstream behavior",
          "Speed up page load times by caching campaign assets",
          "Define relational database schemas for the marketing data warehouse",
        ],
        correctIndex: 1,
        explanation:
          "UTM parameters are URL tags (source, medium, campaign, etc.) that carry traffic origin through the funnel. When captured at signup, they allow product analytics to compare activation and retention across channels.",
      },
      {
        id: "pa3-q3",
        question:
          "Why should your acquisition channel taxonomy be audited quarterly?",
        options: [
          "To update dashboard color themes with each brand refresh",
          "To comply with new GDPR consent requirements",
          "Because broken UTM tags silently misroute budget decisions into the wrong channels",
          "To retrain ML attribution models with fresh seasonal data",
        ],
        correctIndex: 2,
        explanation:
          "Untagged or miscategorized traffic defaults to 'direct' or 'unknown,' which inflates that bucket and deflates everything else. Without regular audits, budget optimization decisions are made on corrupted data.",
      },
      {
        id: "pa3-q4",
        question:
          '"Share of voice" is used in acquisition analytics as a proxy for:',
        options: [
          "Server capacity compared to competitor infrastructure",
          "The percentage of the sales team active in a given month",
          "Brand awareness relative to competitors — how often your brand is mentioned vs the category",
          "The ratio of paid to organic traffic in your acquisition mix",
        ],
        correctIndex: 2,
        explanation:
          "'Share of voice' is a social listening and media metric that tracks how much of the total category conversation features your brand. It approximates awareness ceiling — a key strategic input for acquisition strategy.",
      },
    ],
  },

  "product-analytics/module-04-onboarding-and-activation": {
    questions: [
      {
        id: "pa4-q1",
        question:
          "A whiteboard app removes mandatory workspace naming before the first canvas interaction. Median time-to-first-stroke drops from 4 min to 40 sec and week-1 return rate rises. This is an example of:",
        options: [
          "Improving activation breadth by adding more features to the first screen",
          "Reducing onboarding friction by applying progressive disclosure — defer what isn't needed immediately",
          "Increasing engagement depth by making each session longer",
          "Improving retention through push notification campaigns",
        ],
        correctIndex: 1,
        explanation:
          "Mandatory fields that don't serve the user's immediate goal create friction. Deferring workspace naming (progressive disclosure) let users reach value faster, proving that the path to activation is often about removing steps, not adding them.",
      },
      {
        id: "pa4-q2",
        question:
          "For each onboarding step, which three signals should be logged to prioritize redesign efforts?",
        options: [
          "Screen resolution, browser type, and operating system",
          "UTM source, device model, and plan tier",
          "Completion time, error rate, and skip/back rates",
          "Server response time, memory usage, and CPU load",
        ],
        correctIndex: 2,
        explanation:
          "These three signals reveal where users slow down (completion time), where they fail (error rate), and where they disengage or reconsider (skip/back rates). Ranking steps by volume × drop-off rate reveals the highest-leverage redesign opportunities.",
      },
      {
        id: "pa4-q3",
        question:
          "What makes a milestone qualify as an 'activation event'?",
        options: [
          "It happens in under 5 seconds for any user regardless of product",
          "The marketing team considers it impressive for press releases",
          "Historical cohort analysis shows users who hit it have significantly higher retention or revenue",
          "It is the first screen a new user sees after signup",
        ],
        correctIndex: 2,
        explanation:
          "Activation is hypothesis-driven and data-validated: you identify candidates, then verify with cohort analysis that users who reach this milestone genuinely retain better. It is not just any early action — it must predict long-term value.",
      },
      {
        id: "pa4-q4",
        question:
          '"Defaults and templates" as an onboarding practice work because:',
        options: [
          "They prevent users from ever making a wrong choice",
          "They reduce blank-page paralysis so users reach value faster instead of stalling on setup decisions",
          "They increase time-on-site by showing more interactive elements",
          "They reduce engineering complexity by limiting configuration options",
        ],
        correctIndex: 1,
        explanation:
          "Blank-page syndrome is a real activation killer. Opinionated defaults and templates give users a working starting point they can customize later, dramatically reducing the cognitive load of first sessions.",
      },
    ],
  },

  "product-analytics/module-05-engagement-and-retention": {
    questions: [
      {
        id: "pa5-q1",
        question:
          "A retention cohort table has rows = signup weeks and columns = weeks since signup. Each cell shows the percentage still active. What does a cell showing '45%' in week 4, cohort 3 mean?",
        options: [
          "45% of all users were active in week 4",
          "45% of the users who signed up in cohort week 3 are still active 4 weeks after signup",
          "45 users signed up during week 3",
          "45% of week-4 sessions came from the cohort 3 group",
        ],
        correctIndex: 1,
        explanation:
          "Cohort retention tables track the same starting group over time. A cell is always 'X% of the original cohort still active at period N' — it is not a cross-sectional percentage of all active users.",
      },
      {
        id: "pa5-q2",
        question:
          "An analytics SaaS sees only 10% trial of a new natural-language query feature. But those users run 3× more saved reports and convert 2× to paid. What is the right interpretation?",
        options: [
          "The feature is failing and should be removed due to low adoption",
          "The 10% headline is meaningless — only conversion rates matter",
          "High-value engagement in a small high-intent slice is more actionable than forcing headline adoption up",
          "The feature needs more marketing to push adoption above 50%",
        ],
        correctIndex: 2,
        explanation:
          "Global averages obscure segment-level signals. A feature adopted by 10% but doubling conversion in that slice is a strong signal for packaging, education targeting, and potentially gating it behind a paid tier — not a sign of failure.",
      },
      {
        id: "pa5-q3",
        question:
          "Product 'stickiness' is calculated as:",
        options: [
          "Total revenue multiplied by the retention rate",
          "Daily Active Users divided by Monthly Active Users (DAU/MAU)",
          "Average session length per user per day",
          "Number of features used divided by number of features available",
        ],
        correctIndex: 1,
        explanation:
          "DAU/MAU (stickiness) answers: of all users who used the product this month, what fraction used it today? A high ratio (e.g., 0.6) suggests daily habitual use — a strong signal of product-market fit.",
      },
      {
        id: "pa5-q4",
        question:
          "Why is maximizing raw 'time in app' a potentially misleading engagement goal?",
        options: [
          "It increases server costs proportionally",
          "It is not measurable in all analytics platforms",
          "Long sessions may mean users are lost or confused, not experiencing value — tie metrics to task completion instead",
          "It violates GDPR data retention regulations",
        ],
        correctIndex: 2,
        explanation:
          "Time in app conflates happy exploration with confusion and frustration. A user spending 20 minutes on an error page counts the same as one efficiently completing a workflow. Engagement metrics should ideally tie to outcomes or task completions.",
      },
    ],
  },

  "product-analytics/module-06-product-analytics-tools": {
    questions: [
      {
        id: "pa6-q1",
        question:
          "Mixpanel's core data model is built around:",
        options: [
          "SQL tables with rows and foreign keys, like a relational database",
          "Named events with properties sent by users, analyzed per distinct user identity",
          "Document-based JSON records similar to MongoDB",
          "Graph nodes and edges representing user relationships",
        ],
        correctIndex: 1,
        explanation:
          "Mixpanel is event-centric: you send named events (e.g., 'button_clicked') with properties (e.g., plan, page). Analysis is built around users and the events they trigger — not around pre-defined page views or sessions.",
      },
      {
        id: "pa6-q2",
        question:
          "A key advantage of reusable behavioral cohorts in Amplitude is:",
        options: [
          "They automatically run and publish A/B test results",
          "Once defined, they can be applied consistently across multiple charts and analyses",
          "They permanently store raw event data for compliance",
          "They replace the need for SQL in all analytical workflows",
        ],
        correctIndex: 1,
        explanation:
          "In Amplitude, a cohort defined once (e.g., 'users who completed onboarding in the first 7 days') can be reused across retention charts, funnel comparisons, and feature adoption reports — ensuring consistent segmentation across all analyses.",
      },
      {
        id: "pa6-q3",
        question:
          "Google Analytics 4 (GA4) fundamentally differs from Universal Analytics by:",
        options: [
          "Using a session-first model where every interaction belongs to a session",
          "Using an event-based model that unifies measurement across web and mobile app",
          "Only supporting mobile app tracking, not web",
          "Removing support for custom event definitions",
        ],
        correctIndex: 1,
        explanation:
          "GA4 replaced the session-based hit model with an event-based model. Every interaction — page view, scroll, click, purchase — is an event with parameters. This unifies web and app data in a single property.",
      },
      {
        id: "pa6-q4",
        question:
          "Before significantly expanding the number of properties sent with each event in Mixpanel, you should check guidance on:",
        options: [
          "Dashboard color themes and UI customization options",
          "High-cardinality properties and group analytics performance implications",
          "Upgrading to the next pricing tier to unlock more storage",
          "Configuring server-side API rate limiting rules",
        ],
        correctIndex: 1,
        explanation:
          "High-cardinality properties (like unique IDs or freeform text) can make Mixpanel reports slow and less useful. Group analytics for B2B account-level analysis has specific configuration needs. Both should be understood before expanding payloads.",
      },
    ],
  },

  "product-analytics/module-07-monetization-and-revenue": {
    questions: [
      {
        id: "pa7-q1",
        question:
          "After introducing seat-based pricing, account ARPU rises 12% but large-seat accounts open significantly more support tickets. What is the correct next step?",
        options: [
          "Roll back the pricing change — the ticket increase negates the ARPU gain",
          "Ignore tickets as they belong to the customer success team",
          "Bundle admin training for large-seat purchases to stabilize ARPU while reducing ticket rate",
          "Remove large-seat accounts from the ARPU calculation to clean the metric",
        ],
        correctIndex: 2,
        explanation:
          "ARPU must be read alongside retention and cost-to-serve. Higher support costs erode margin. The right response is to address the root cause (complexity for admins) with onboarding investment — not to game the denominator.",
      },
      {
        id: "pa7-q2",
        question:
          "A product analyst builds a tiered LTV score from early usage intensity and hands it to sales for prioritization. This demonstrates:",
        options: [
          "A lagging metric being used for retrospective reporting",
          "A behavioral predictor creating a real-time LTV proxy before actual cash is collected",
          "A marketing attribution model that assigns revenue to campaigns",
          "A churn prediction model trained purely on financial data",
        ],
        correctIndex: 1,
        explanation:
          "Waiting years for 'true' LTV is impractical. Early usage signals (features adopted, depth of activation) can proxy LTV for immediate prioritization. This lets sales focus expensive resources on high-value segments weeks after signup.",
      },
      {
        id: "pa7-q3",
        question:
          "ARPPU (Average Revenue Per Paying User) differs from standard ARPU because:",
        options: [
          "ARPPU includes both paying and free users in the denominator",
          "ARPPU uses monthly revenue; ARPU uses annual revenue",
          "ARPPU excludes free users from the denominator, giving a higher and more focused monetization view",
          "ARPPU is only used in consumer apps, not B2B",
        ],
        correctIndex: 2,
        explanation:
          "ARPPU isolates monetization quality by only counting paying users. If you include free users in the denominator (ARPU across all users), a freemium product with many free users will always show a low number that doesn't reflect paying customer value.",
      },
      {
        id: "pa7-q4",
        question:
          "ARPU rising while churn accelerates next quarter is best interpreted as:",
        options: [
          "A clear product success — revenue per user is improving",
          "A data quality issue — churn and ARPU cannot move in opposite directions",
          "A warning sign — aggressive upsells may be extracting short-term revenue at the cost of long-term retention",
          "Normal variance that can be ignored for one quarter",
        ],
        correctIndex: 2,
        explanation:
          "ARPU in isolation can be gamed by upselling accounts that then churn. Pairing ARPU with net revenue retention and cohort churn exposes this pattern. A genuine monetization win shows ARPU rising without a corresponding churn increase.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SQL TRACK
  // ─────────────────────────────────────────────

  "sql/module-01-introduction": {
    questions: [
      {
        id: "sql1-q1",
        question: "SQL stands for:",
        options: [
          "System Query Logic",
          "Structured Query Language",
          "Simple Queue Language",
          "Standard Query Lookup",
        ],
        correctIndex: 1,
        explanation:
          "SQL — Structured Query Language — is the standard language for communicating with relational databases. It can be pronounced 'sequel' or spelled out as S-Q-L.",
      },
      {
        id: "sql1-q2",
        question:
          "A manager asks: 'What was our total spending last quarter?' Which query correctly answers this?",
        options: [
          "SELECT * FROM Orders WHERE Q4 = 2025",
          "SELECT SUM(TotalAmount) AS TotalSpending FROM Orders WHERE OrderDate BETWEEN '2025-10-01' AND '2025-12-31'",
          "FIND SUM(TotalAmount) FROM Orders IN Q4",
          "SELECT TotalAmount FROM Orders GROUP BY Q4",
        ],
        correctIndex: 1,
        explanation:
          "SUM() aggregates all matching rows into a total. The WHERE clause filters to Q4 2025 using a BETWEEN range on the date column. The alias AS TotalSpending makes the result readable.",
      },
      {
        id: "sql1-q3",
        question:
          "Why is SQL essential for data analyst roles specifically?",
        options: [
          "It is the only way to create charts and dashboards",
          "It lets analysts query databases directly to answer business questions without waiting for engineers",
          "It is required only for software developers building applications",
          "It replaces the need for any BI or visualization tool",
        ],
        correctIndex: 1,
        explanation:
          "SQL gives analysts direct access to data at scale. Instead of waiting for someone else to pull a report, an analyst can write a query and get the answer in seconds — this is the fundamental productivity unlock SQL provides.",
      },
      {
        id: "sql1-q4",
        question:
          "A database is best described as:",
        options: [
          "A spreadsheet program used to display charts",
          "An organized collection of structured data stored in tables, accessible via queries",
          "A programming language for building web applications",
          "A cloud storage system for files and documents",
        ],
        correctIndex: 1,
        explanation:
          "A relational database stores data in structured tables with rows and columns. SQL is the language you use to ask questions of that data — far more powerful than scrolling through spreadsheets for millions of rows.",
      },
    ],
  },

  "sql/module-02-select-queries": {
    questions: [
      {
        id: "sql2-q1",
        question:
          "Which query retrieves only the CustomerName and Country columns from the Customers table?",
        options: [
          "SELECT * FROM Customers",
          "SELECT CustomerName, Country FROM Customers",
          "RETRIEVE CustomerName, Country FROM Customers",
          "SELECT Customers WHERE columns = CustomerName, Country",
        ],
        correctIndex: 1,
        explanation:
          "Listing specific column names after SELECT returns only those columns. SELECT * returns all columns — useful for exploration but less efficient when you only need specific fields.",
      },
      {
        id: "sql2-q2",
        question: "The asterisk (*) in `SELECT * FROM Products` means:",
        options: [
          "Select only the numeric (non-text) columns",
          "Multiply all values in the table together",
          "Select all columns from the Products table",
          "Select only the first row of the table",
        ],
        correctIndex: 2,
        explanation:
          "The asterisk is a wildcard meaning 'all columns.' `SELECT * FROM Products` returns every column and every row — a convenient way to explore a table's full structure.",
      },
      {
        id: "sql2-q3",
        question:
          "SELECT belongs to which SQL command category?",
        options: [
          "DDL — Data Definition Language (defines structure)",
          "DML — Data Manipulation Language (inserts/updates/deletes)",
          "DCL — Data Control Language (grants/revokes permissions)",
          "DQL — Data Query Language (reads/retrieves data)",
        ],
        correctIndex: 3,
        explanation:
          "SELECT is the core of DQL — it reads data without changing it. DDL (CREATE, ALTER, DROP) defines structure. DML (INSERT, UPDATE, DELETE) modifies data. DCL (GRANT, REVOKE) manages permissions.",
      },
      {
        id: "sql2-q4",
        question:
          "To return a list of countries from the Customers table without showing the same country more than once, you would use:",
        options: [
          "SELECT UNIQUE Country FROM Customers",
          "SELECT DISTINCT Country FROM Customers",
          "SELECT ONLY Country FROM Customers",
          "SELECT FILTER Country FROM Customers",
        ],
        correctIndex: 1,
        explanation:
          "DISTINCT eliminates duplicate values from the result. `SELECT DISTINCT Country FROM Customers` returns each country exactly once, no matter how many customers share that country.",
      },
    ],
  },

  "sql/module-03-ddl-and-dml": {
    questions: [
      {
        id: "sql3-q1",
        question:
          "Which SQL command removes a column from an existing table?",
        options: [
          "DELETE column FROM table",
          "REMOVE COLUMN FROM table",
          "ALTER TABLE table_name DROP COLUMN column_name",
          "DROP column_name FROM table_name",
        ],
        correctIndex: 2,
        explanation:
          "ALTER TABLE is the DDL command for changing existing table structure. DROP COLUMN within ALTER TABLE removes a specific column — be careful, this is permanent and removes all data in that column.",
      },
      {
        id: "sql3-q2",
        question: "The INSERT INTO statement belongs to which SQL category?",
        options: [
          "DDL — Data Definition Language",
          "DML — Data Manipulation Language",
          "DQL — Data Query Language",
          "DCL — Data Control Language",
        ],
        correctIndex: 1,
        explanation:
          "INSERT INTO is DML — it manipulates data by adding new rows to a table. DDL (CREATE, ALTER, DROP) changes the structure. DQL (SELECT) reads data.",
      },
      {
        id: "sql3-q3",
        question:
          "Which constraint prevents a column from storing NULL (empty) values?",
        options: [
          "PRIMARY KEY",
          "FOREIGN KEY",
          "UNIQUE",
          "NOT NULL",
        ],
        correctIndex: 3,
        explanation:
          "NOT NULL enforces that every row must have a value for that column — it cannot be left empty. PRIMARY KEY also implies NOT NULL, but NOT NULL alone does not require uniqueness.",
      },
      {
        id: "sql3-q4",
        question:
          "What is the difference between `DELETE FROM Products WHERE Category = 'Discontinued'` and `DROP TABLE Products`?",
        options: [
          "They produce identical results",
          "DELETE removes specific rows matching the condition; DROP removes the entire table and its structure",
          "DROP removes specific rows; DELETE removes the entire table",
          "DELETE is DDL; DROP is DML",
        ],
        correctIndex: 1,
        explanation:
          "DELETE is DML — it removes rows from a table based on a condition, leaving the table structure intact. DROP is DDL — it destroys the entire table, all its data, and its definition. DROP cannot be easily undone.",
      },
    ],
  },

  "sql/module-04-filtering-data": {
    questions: [
      {
        id: "sql4-q1",
        question:
          "Which WHERE clause correctly finds all orders where TotalAmount is between 100 and 500, inclusive of both endpoints?",
        options: [
          "WHERE TotalAmount > 100 AND TotalAmount < 500",
          "WHERE TotalAmount BETWEEN 100 AND 500",
          "WHERE TotalAmount IN (100, 500)",
          "WHERE 100 < TotalAmount < 500",
        ],
        correctIndex: 1,
        explanation:
          "BETWEEN is inclusive of both boundary values. `BETWEEN 100 AND 500` is equivalent to `>= 100 AND <= 500`. Option A uses strict inequalities (> and <) and would exclude orders of exactly 100 or 500.",
      },
      {
        id: "sql4-q2",
        question:
          "Which condition finds all products whose name begins with the word 'Pro'?",
        options: [
          "WHERE ProductName = 'Pro%'",
          "WHERE ProductName LIKE 'Pro%'",
          "WHERE ProductName STARTS 'Pro'",
          "WHERE ProductName IN ('Pro')",
        ],
        correctIndex: 1,
        explanation:
          "LIKE enables pattern matching. The % wildcard means 'any characters.' `LIKE 'Pro%'` matches any product name that starts with 'Pro' — like 'Pro Keyboard', 'Projector', or 'Product A'.",
      },
      {
        id: "sql4-q3",
        question:
          "The condition `WHERE Country NOT IN ('USA', 'Canada', 'UK')` returns:",
        options: [
          "Only rows where Country is USA, Canada, or UK",
          "All rows where Country is none of those three values",
          "Only rows where Country is NULL",
          "An error — NOT IN is not valid SQL syntax",
        ],
        correctIndex: 1,
        explanation:
          "NOT IN excludes all values in the list. Note: if Country can be NULL, those rows are also excluded by NOT IN (NULL comparisons in SQL return UNKNOWN, not TRUE). Handle NULLs explicitly with IS NULL if needed.",
      },
      {
        id: "sql4-q4",
        question:
          "To find all employees hired strictly after January 1, 2020, which WHERE clause is correct?",
        options: [
          "WHERE HireDate = '2020-01-01'",
          "WHERE HireDate AFTER '2020-01-01'",
          "WHERE HireDate > '2020-01-01'",
          "WHERE HireDate <> '2020-01-01'",
        ],
        correctIndex: 2,
        explanation:
          "The > operator means 'greater than' — for dates, that means after the given date. `= '2020-01-01'` would find only that exact date. `<>` means 'not equal,' which would include dates before 2020 as well.",
      },
    ],
  },

  "sql/module-05-joins": {
    questions: [
      {
        id: "sql5-q1",
        question: "An INNER JOIN between Orders and Customers returns:",
        options: [
          "All orders, with NULLs for orders that have no matching customer",
          "All customers, with NULLs for customers who have placed no orders",
          "Only rows where the CustomerID matches in BOTH the Orders and Customers tables",
          "All rows from both tables, including unmatched rows",
        ],
        correctIndex: 2,
        explanation:
          "INNER JOIN is the intersection: only rows that satisfy the ON condition in both tables appear in the result. Unmatched rows from either table are excluded entirely.",
      },
      {
        id: "sql5-q2",
        question:
          "In the SalesDB schema, what shared column connects the Orders table to the Customers table?",
        options: [
          "OrderID — the primary key of the Orders table",
          "ProductID — the product referenced in each order",
          "CustomerID — present in both Orders (FK) and Customers (PK)",
          "EmployeeID — the employee who handled the order",
        ],
        correctIndex: 2,
        explanation:
          "CustomerID is the foreign key in Orders that references the primary key in Customers. The ON clause of the join would be `ON Orders.CustomerID = Customers.CustomerID`.",
      },
      {
        id: "sql5-q3",
        question:
          "A LEFT JOIN from Customers to Orders (with Customers as the left table) returns:",
        options: [
          "Only customers who have placed at least one order",
          "Only orders that have a matching customer record",
          "All customers — with order columns as NULL for customers who have no orders",
          "All orders — with customer columns as NULL for orders without a customer",
        ],
        correctIndex: 2,
        explanation:
          "LEFT JOIN returns all rows from the left table (Customers) plus matching rows from the right (Orders). Customers with no orders still appear — with NULL in every Orders column. This is how you find all customers including inactive ones.",
      },
      {
        id: "sql5-q4",
        question:
          "You want to find all customers who have NEVER placed an order. Which query pattern achieves this?",
        options: [
          "INNER JOIN Orders ON CustomerID — filters to matching customers only",
          "LEFT JOIN Orders ON CustomerID, then WHERE Orders.CustomerID IS NULL",
          "RIGHT JOIN Orders ON CustomerID — includes all order records",
          "FULL OUTER JOIN with no WHERE filter — returns all rows from both tables",
        ],
        correctIndex: 1,
        explanation:
          "LEFT JOIN keeps all customers. Adding WHERE Orders.CustomerID IS NULL filters to only those customers for whom no matching order row was found — the classic 'anti-join' pattern for finding records with no match.",
      },
    ],
  },

  "sql/module-06-sql-functions": {
    questions: [
      {
        id: "sql6-q1",
        question:
          "Which function combines FirstName, a space, and LastName into a single full name column?",
        options: [
          "JOIN(FirstName, ' ', LastName)",
          "MERGE(FirstName, LastName)",
          "CONCAT(FirstName, ' ', LastName)",
          "COMBINE(FirstName, ' ', LastName)",
        ],
        correctIndex: 2,
        explanation:
          "CONCAT takes two or more string arguments and joins them together. Including ' ' as the middle argument adds the space between the names. Some SQL dialects also support the || operator for the same purpose.",
      },
      {
        id: "sql6-q2",
        question:
          "What does `ISNULL(Discount, 0)` return when the Discount column contains NULL?",
        options: [
          "An error — NULL cannot be used in mathematical operations",
          "NULL — the function has no effect on NULL values",
          "0 — replacing the NULL with a zero so calculations work correctly",
          "FALSE — converting NULL to a boolean",
        ],
        correctIndex: 2,
        explanation:
          "ISNULL (or COALESCE in standard SQL) replaces NULL with a specified substitute value. This is essential for arithmetic: any calculation involving NULL returns NULL, so replacing NULLs with 0 keeps totals and averages meaningful.",
      },
      {
        id: "sql6-q3",
        question:
          "What is the result of `UPPER(LEFT('product', 3))`?",
        options: [
          "pro",
          "PRO",
          "Pro",
          "PRODUCT",
        ],
        correctIndex: 1,
        explanation:
          "Function nesting works inside-out. LEFT('product', 3) extracts the first 3 characters: 'pro'. Then UPPER('pro') converts to uppercase: 'PRO'. This pattern is common for standardizing codes or initials.",
      },
      {
        id: "sql6-q4",
        question:
          "Which function removes the leading and trailing spaces from the string '  data analyst  '?",
        options: [
          "CLEAN('  data analyst  ')",
          "STRIP('  data analyst  ')",
          "TRIM('  data analyst  ')",
          "REMOVE('  data analyst  ')",
        ],
        correctIndex: 2,
        explanation:
          "TRIM removes whitespace from both ends of a string, returning 'data analyst'. This is a critical cleaning step when working with user-entered or imported data, where invisible spaces commonly break joins and lookups.",
      },
    ],
  },

  "sql/module-07-aggregation": {
    questions: [
      {
        id: "sql7-q1",
        question:
          "What is the key difference between `COUNT(*)` and `COUNT(TotalAmount)`?",
        options: [
          "There is no difference — both always return the same number",
          "COUNT(TotalAmount) counts all rows including NULLs; COUNT(*) skips NULLs",
          "COUNT(*) counts all rows including NULLs; COUNT(TotalAmount) skips rows where TotalAmount is NULL",
          "COUNT(*) only works with numeric columns like TotalAmount",
        ],
        correctIndex: 2,
        explanation:
          "COUNT(*) counts every row in the result set. COUNT(column) counts only rows where that column is NOT NULL. If some orders have no recorded TotalAmount, COUNT(*) and COUNT(TotalAmount) will return different numbers.",
      },
      {
        id: "sql7-q2",
        question:
          "Which clause filters groups AFTER aggregation has been applied?",
        options: [
          "WHERE — it filters individual rows before grouping",
          "GROUP BY — it defines which groups are formed",
          "HAVING — it filters groups based on an aggregate condition",
          "ORDER BY — it sorts the final result set",
        ],
        correctIndex: 2,
        explanation:
          "WHERE runs before GROUP BY and cannot reference aggregate results. HAVING runs after GROUP BY and filters based on aggregate conditions like `HAVING SUM(TotalAmount) > 50000`. You cannot use WHERE SUM(...) > 50000.",
      },
      {
        id: "sql7-q3",
        question:
          "You want the average order amount per product category. Which query is correct?",
        options: [
          "SELECT Category, AVG(TotalAmount) FROM Orders",
          "SELECT Category, AVG(TotalAmount) FROM Orders GROUP BY Category",
          "SELECT AVG(TotalAmount) GROUP BY Category FROM Orders",
          "SELECT Category FROM Orders WHERE AVG(TotalAmount) > 0",
        ],
        correctIndex: 1,
        explanation:
          "When you use an aggregate function alongside a non-aggregated column, you must GROUP BY that column. Without GROUP BY, the database doesn't know how to group categories — it would return an error or a single row.",
      },
      {
        id: "sql7-q4",
        question:
          "Which query finds only product categories where total revenue exceeds $50,000?",
        options: [
          "SELECT Category, SUM(TotalAmount) FROM Orders WHERE SUM(TotalAmount) > 50000",
          "SELECT Category FROM Orders WHERE TotalAmount > 50000 GROUP BY Category",
          "SELECT Category, SUM(TotalAmount) FROM Orders GROUP BY Category HAVING SUM(TotalAmount) > 50000",
          "SELECT Category, SUM(TotalAmount) FROM Orders GROUP BY Category WHERE SUM > 50000",
        ],
        correctIndex: 2,
        explanation:
          "GROUP BY Category aggregates orders by category, then HAVING SUM(TotalAmount) > 50000 filters to only the categories exceeding the threshold. WHERE cannot filter on aggregate results, and WHERE must appear before GROUP BY.",
      },
    ],
  },

  "sql/module-08-window-functions": {
    questions: [
      {
        id: "sql8-q1",
        question:
          "What is the critical difference between `SUM(TotalAmount) ... GROUP BY Category` and `SUM(TotalAmount) OVER (PARTITION BY Category)`?",
        options: [
          "They produce exactly the same output",
          "OVER() is faster because it uses indexes more efficiently",
          "GROUP BY collapses the result to one row per group; OVER() keeps every individual row and adds the group total alongside",
          "OVER() only works with ORDER BY while GROUP BY does not require it",
        ],
        correctIndex: 2,
        explanation:
          "This is the core insight of window functions: OVER() performs the calculation across a defined window but does NOT collapse rows. Every order row remains visible, with the category total appearing next to it — impossible with plain GROUP BY.",
      },
      {
        id: "sql8-q2",
        question:
          "`ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC)` assigns numbers that:",
        options: [
          "Number all rows globally from 1 to the total number of rows",
          "Restart from 1 for each category, counting products from highest to lowest price",
          "Assign the same number to products with identical prices",
          "Skip numbers whenever a NULL price is encountered",
        ],
        correctIndex: 1,
        explanation:
          "PARTITION BY Category creates a separate window per category. ORDER BY Price DESC orders within each window. ROW_NUMBER() restarts at 1 for each category, so the highest-priced product in Electronics gets 1, the highest-priced in Clothing also gets 1.",
      },
      {
        id: "sql8-q3",
        question:
          "How does `RANK()` differ from `ROW_NUMBER()` when two rows have the same ORDER BY value?",
        options: [
          "RANK() can be used without ORDER BY; ROW_NUMBER() requires it",
          "RANK() assigns the same number to tied rows and then skips the next rank number(s)",
          "RANK() always assigns unique sequential numbers just like ROW_NUMBER()",
          "RANK() starts numbering from 0 while ROW_NUMBER() starts from 1",
        ],
        correctIndex: 1,
        explanation:
          "RANK() handles ties by giving them the same rank, then skipping. Two rows ranked 2 would both get rank 2, and the next row gets rank 4 (skipping 3). ROW_NUMBER() never ties — it gives each row a unique number even for identical values.",
      },
      {
        id: "sql8-q4",
        question:
          "A running total of daily sales is best computed using:",
        options: [
          "SUM(TotalAmount) GROUP BY OrderDate",
          "SUM(TotalAmount) OVER (ORDER BY OrderDate)",
          "CUMSUM(TotalAmount) ORDER BY OrderDate",
          "RUNNING_TOTAL(TotalAmount)",
        ],
        correctIndex: 1,
        explanation:
          "A running total accumulates as you move through ordered rows. `SUM() OVER (ORDER BY OrderDate)` sums everything from the first row up to and including the current row — because the default frame with ORDER BY is ROWS UNBOUNDED PRECEDING to CURRENT ROW.",
      },
    ],
  },

  "sql/module-09-advanced-sql": {
    questions: [
      {
        id: "sql9-q1",
        question:
          "A subquery in a WHERE clause that uses the `=` operator must:",
        options: [
          "Return multiple rows so the comparison has options",
          "Return exactly one scalar value — otherwise the query will error",
          "Always include a GROUP BY clause to aggregate results",
          "Reference columns from the outer query",
        ],
        correctIndex: 1,
        explanation:
          "The = operator compares to a single value. If the subquery returns multiple rows, SQL cannot determine which one to compare to and will throw an error. Use IN when the subquery may return multiple values.",
      },
      {
        id: "sql9-q2",
        question:
          "You want to find all customers who have placed at least one order. Which subquery approach is correct?",
        options: [
          "WHERE CustomerID = (SELECT CustomerID FROM Orders)",
          "WHERE CustomerID IN (SELECT DISTINCT CustomerID FROM Orders)",
          "WHERE CustomerID EXISTS Orders",
          "WHERE CustomerID FROM (SELECT CustomerID FROM Orders)",
        ],
        correctIndex: 1,
        explanation:
          "IN checks membership in a set of values. `IN (SELECT DISTINCT CustomerID FROM Orders)` returns all customer IDs that appear in the Orders table. Using = would fail if there are multiple orders, as it requires exactly one value.",
      },
      {
        id: "sql9-q3",
        question:
          "A CTE (Common Table Expression) defined with the WITH keyword is:",
        options: [
          "Stored as a permanent view in the database catalog",
          "A temporary named result set that exists only for the duration of the query it is part of",
          "A replacement for indexes that speeds up query execution",
          "Only usable in SELECT statements, not inside JOINs",
        ],
        correctIndex: 1,
        explanation:
          "A CTE is a named subquery defined at the top of a statement using WITH. It is temporary — it does not persist after the query runs. CTEs improve readability and let you reference the same derived result multiple times in one query.",
      },
      {
        id: "sql9-q4",
        question:
          "A subquery placed in the FROM clause must:",
        options: [
          "Return a single scalar value only",
          "Appear after the main SELECT list",
          "Be given an alias so the outer query can reference its columns",
          "Match the column count of the main table exactly",
        ],
        correctIndex: 2,
        explanation:
          "A subquery in the FROM clause (called an inline view or derived table) produces a temporary result set. The outer query treats it like a table, so it must have an alias to be referenced in SELECT, JOIN, or WHERE clauses.",
      },
    ],
  },

  "sql/module-10-performance-optimization": {
    questions: [
      {
        id: "sql10-q1",
        question:
          "A full table scan occurs when:",
        options: [
          "A clustered index is used to locate rows",
          "A query uses a covering index with all required columns",
          "There is no suitable index and the database must read every row in the table",
          "The query uses a DISTINCT clause on indexed columns",
        ],
        correctIndex: 2,
        explanation:
          "Without a relevant index, the database engine reads every data page row by row — a full table scan. On large tables this is extremely slow. Indexes provide shortcuts so the engine can jump directly to the relevant data.",
      },
      {
        id: "sql10-q2",
        question:
          "How many clustered indexes can a single table have?",
        options: [
          "Unlimited — you can add as many as needed",
          "Up to 10 per table",
          "Exactly 2 — one for reads, one for writes",
          "Only one — because the clustered index defines the physical order of the table data",
        ],
        correctIndex: 3,
        explanation:
          "A clustered index physically sorts and stores the table rows in index key order. Because data can only be physically ordered one way, there can be only one clustered index per table. Additional indexes must be non-clustered.",
      },
      {
        id: "sql10-q3",
        question:
          "Non-clustered indexes are most beneficial for:",
        options: [
          "Defining the primary key of a table",
          "Columns that are never referenced in WHERE clauses",
          "Columns frequently used in WHERE clauses, JOIN conditions, and equality lookups",
          "Tables with fewer than 100 rows where full scans are fast anyway",
        ],
        correctIndex: 2,
        explanation:
          "Non-clustered indexes create a separate lookup structure with pointers back to the main table. They accelerate searches on frequently filtered columns. Adding indexes to unqueried columns wastes space and slows INSERT/UPDATE/DELETE operations.",
      },
      {
        id: "sql10-q4",
        question:
          "The B-Tree structure used by most database indexes provides fast lookups because:",
        options: [
          "It stores data alphabetically in the main heap table",
          "It reads all leaf nodes simultaneously in parallel",
          "It allows the engine to narrow down the data location in a small number of steps using a hierarchical root-to-leaf traversal",
          "It eliminates the need for disk I/O by keeping data in memory",
        ],
        correctIndex: 2,
        explanation:
          "A balanced tree starts at the root, uses intermediate nodes to narrow the search range, and reaches the leaf nodes (which contain the actual data or row pointers) in O(log n) steps — regardless of table size. This scales far better than linear scanning.",
      },
    ],
  },

  "sql/module-11-sql-for-analytics": {
    questions: [
      {
        id: "sql11-q1",
        question:
          "To classify customers into 'High Value' (≥$10,000 spend), 'Medium Value' (≥$3,000), and 'Low Value' (below $3,000), which SQL technique is used?",
        options: [
          "GROUP BY with a HAVING clause to filter groups",
          "CASE expression inside SELECT to assign each customer to a segment",
          "Multiple separate WHERE conditions in union queries",
          "PARTITION BY with ROW_NUMBER() to rank customers",
        ],
        correctIndex: 1,
        explanation:
          "A CASE expression evaluates conditions row by row and returns a label. Combined with GROUP BY and SUM(), it lets you aggregate total spend per customer and assign a segment label — the standard pattern for value-based segmentation.",
      },
      {
        id: "sql11-q2",
        question:
          "Cohort analysis in SQL groups users by:",
        options: [
          "Their most recent activity date to rank current engagement",
          "Their signup period (e.g., signup month) to compare retention trajectories across groups over time",
          "Their total revenue to identify high-value vs low-value segments",
          "Their country or region for geographic reporting",
        ],
        correctIndex: 1,
        explanation:
          "A cohort groups users who share a starting point — typically signup period. By tracking what percentage of each cohort is still active in later periods, you can compare retention curves across groups and spot when product changes improved or harmed retention.",
      },
      {
        id: "sql11-q3",
        question:
          "Funnel analysis in SQL typically measures conversion by:",
        options: [
          "A single WHERE clause combining all funnel step conditions with AND",
          "UNION ALL to stack step counts from separate queries",
          "Using conditional COUNT with CASE expressions (or CTEs) to count users completing each sequential step",
          "A running total window function partitioned by user ID",
        ],
        correctIndex: 2,
        explanation:
          "Each funnel step is a condition. Conditional COUNT with CASE (or separate CTEs joined together) counts how many users completed step 1, step 2, etc. This reveals where the biggest drop-offs occur across the conversion path.",
      },
      {
        id: "sql11-q4",
        question:
          "An RFM analysis (Recency, Frequency, Monetary) requires aggregating the Orders table to compute, per customer:",
        options: [
          "Only the most recent order date for recency scoring",
          "Only the total spend for monetary value",
          "MAX(OrderDate) for recency, COUNT(OrderID) for frequency, and SUM(TotalAmount) for monetary value",
          "A self-join to compare consecutive orders",
        ],
        correctIndex: 2,
        explanation:
          "RFM scores each customer across three dimensions in a single aggregation query: MAX(OrderDate) = how recently they bought, COUNT(OrderID) = how often, SUM(TotalAmount) = how much they've spent. CASE expressions then assign scores per dimension.",
      },
    ],
  },

  "sql/module-12-sql-projects": {
    questions: [
      {
        id: "sql12-q1",
        question:
          "A VP of Sales asks for monthly revenue with month-over-month change. Beyond GROUP BY aggregation, which SQL feature is needed?",
        options: [
          "LIKE operator for pattern matching on date strings",
          "LAG() window function to access the previous month's revenue for each row",
          "HAVING clause to filter months below a revenue threshold",
          "UNION to combine separate monthly query results",
        ],
        correctIndex: 1,
        explanation:
          "LAG() looks back N rows in an ordered result — `LAG(TotalRevenue, 1) OVER (ORDER BY OrderYear, OrderMonth)` returns the previous month's revenue on the same row, making month-over-month calculation a simple subtraction.",
      },
      {
        id: "sql12-q2",
        question:
          "In the SalesDB schema, which table is central to most product analytics queries?",
        options: [
          "Customers — it has the most descriptive attributes",
          "Products — it defines the catalog and price points",
          "Orders — it links customers, products, and employees and holds all transaction data",
          "Employees — it records every business action taken",
        ],
        correctIndex: 2,
        explanation:
          "Orders is the fact table in SalesDB. It stores every transaction and connects via foreign keys to Customers, Products, and Employees. Nearly every revenue, volume, or behavioral analytics query starts from or joins to Orders.",
      },
      {
        id: "sql12-q3",
        question:
          "To find the top 5 customers by total revenue, which structure is correct?",
        options: [
          "SELECT TOP 5 * FROM Customers ORDER BY CustomerID",
          "SELECT CustomerID, SUM(TotalAmount) AS Revenue FROM Orders GROUP BY CustomerID ORDER BY Revenue DESC LIMIT 5",
          "SELECT CustomerID FROM Orders HAVING TotalAmount > 1000",
          "SELECT CustomerID, MAX(TotalAmount) FROM Orders GROUP BY CustomerID",
        ],
        correctIndex: 1,
        explanation:
          "GROUP BY CustomerID aggregates all orders per customer. SUM(TotalAmount) totals their revenue. ORDER BY Revenue DESC puts the highest spenders first. LIMIT 5 (or TOP 5 in SQL Server) returns only the top five. MAX() would return the single largest order, not total spend.",
      },
      {
        id: "sql12-q4",
        question:
          "A real-world sales analysis project should be built incrementally — starting simple and adding complexity. Which approach reflects this best practice?",
        options: [
          "Write the complete final query first, then test it",
          "Start with raw row-level data, verify it, then layer in aggregations, window functions, and date logic step by step",
          "Build the most complex version first and simplify if it runs slowly",
          "Use only CTEs so the query is always readable regardless of complexity",
        ],
        correctIndex: 1,
        explanation:
          "Incremental query building — verified at each step — prevents errors from compounding. Step 1: pull raw data and sanity-check it. Step 2: aggregate. Step 3: add window functions for period comparison. Each layer is validated before the next is added.",
      },
    ],
  },
};

export function getQuizForLesson(
  track: string,
  lessonSlug: string
): LessonQuiz | null {
  return quizData[`${track}/${lessonSlug}`] ?? null;
}
