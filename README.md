# InsightLab

### A Data & Product Analytics Academy — built to turn curiosity into analytical thinking.

---

InsightLab is an open, structured learning platform for the next generation of **product analysts**, **product managers**, and **data analysts**.

It brings together three disciplines that rarely live under one roof — **SQL**, **Metrics & Dashboard Thinking**, and **Product Analytics** — and teaches them the way they’re actually used in modern product teams: together, in service of better decisions.

This project is more than a course. It is a demonstration of how **AI-assisted development**, **product thinking**, and **knowledge architecture** can be combined to design educational experiences that feel intentional, honest, and useful.

---

## Why InsightLab Exists

Most analytics learners face the same problem: scattered tutorials, disconnected concepts, and no clear path from *"I can write a SELECT statement"* to *"I can define a north star metric and defend it in a product review."*

InsightLab is built to close that gap.

The academy is designed around three beliefs:

1. **Analytics is a way of thinking, not a list of tools.**
2. **Every concept must be grounded in a real source** — no hallucinations, no hand-waving.
3. **Clarity beats cleverness** — beginner-friendly explanations, backed by professional rigor.

---

## The Three Learning Tracks

### Track 1 — SQL Foundations to Analytics
From your first `SELECT` to window functions, CTEs, and real analytical queries. Twelve modules that take a learner from database fundamentals to production-ready analytics SQL.

### Track 2 — Metrics & Dashboard Thinking
How businesses *actually* measure performance. Leading vs. lagging, vanity vs. actionable, KPI hierarchies, revenue and product metrics, and the design principles behind dashboards that drive decisions.

### Track 3 — Product Analytics
Understanding users, not just usage. Acquisition, activation, engagement, retention, monetization — and the tools (Mixpanel, Amplitude, GA) that power them.

A full breakdown of every module and lesson lives in [`TOPIC_MAP.md`](./TOPIC_MAP.md).

---

## Project Structure

```
InsightLab/
├── PROJECT_BRIEF.md      # The mission, audience, and design goals
├── TOPIC_MAP.md          # Every track, module, and lesson
├── CONTENT_RULES.md      # The editorial rules — how content is written
├── PROMPT.md             # The AI authoring prompt
├── REFERENCES/           # Source material that grounds every lesson
├── lessons/              # The academy itself, authored in Markdown
│   ├── sql/
│   ├── metrics/
│   └── product-analytics/
└── website/              # Next.js frontend that delivers the academy
```

---

## The Academy Platform

The lessons are delivered through a clean, professional web experience built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

### Run it locally

```bash
cd website
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## The Editorial Standard

Every lesson in InsightLab follows the same structure:

1. **Title**
2. **Why this concept matters**
3. **Explanation**
4. **Example**
5. **Practical takeaway**

And every lesson obeys one rule above all:

> Content must always be grounded in referenced material.
> If a source does not exist, the lesson says so — it does not invent.

The full editorial contract lives in [`CONTENT_RULES.md`](./CONTENT_RULES.md).

---

## Who This Is For

- Aspiring **product analysts** building their first analytical toolkit
- **Product managers** who want to stop guessing and start measuring
- **Data analysts** translating numbers into product decisions
- **Early-career professionals** looking for a structured, no-fluff path into analytics

---

## The Bigger Picture

InsightLab is also a portfolio project — a public demonstration of:

- **Product thinking** applied to education
- **Knowledge architecture** at scale
- **AI-assisted content development** done responsibly
- **Engineering craft** in delivering a clean, performant learning experience

Built in public. Shared openly. Improved continuously.

---

## Roadmap

- [x] Define tracks, modules, and editorial rules
- [x] Author lessons across all three tracks
- [x] Build the academy web platform
- [ ] Add interactive SQL exercises
- [ ] Add case studies and capstone projects
- [ ] Publish the academy publicly

---

## Contributing

InsightLab welcomes thoughtful contributions — corrections, clearer explanations, additional references, and new lessons grounded in trusted sources. Open an issue or a pull request and let’s make analytics education better, together.

---

## License

This project is released for educational and portfolio purposes. Please credit InsightLab when reusing material.

---

### Built with care, for people who want to think clearly with data.
