# Module 11 – SQL for Analytics

---

## Lesson 11.1 – Segmentation

### Why This Matters

Not all customers, products, or orders are the same. Segmentation is the practice of dividing data into meaningful groups so you can analyze each group separately. Product managers use segmentation to understand which customer groups generate the most revenue, which products perform best in certain regions, and where to focus their efforts.

### Explanation

Segmentation in SQL is typically done using **CASE expressions** inside a SELECT statement. You define rules that assign each row to a segment, then analyze each segment using aggregation.

Common segmentation approaches:

| Segmentation Type | What It Groups | Example |
|---|---|---|
| Value-based | Customers by spending level | High / Medium / Low spenders |
| Time-based | Orders by time period | Q1, Q2, Q3, Q4 |
| Behavioral | Users by activity frequency | Active / Inactive |
| Product-based | Products by price range | Budget / Mid-range / Premium |

The general pattern is:

```sql
SELECT
    CASE
        WHEN condition_1 THEN 'Segment A'
        WHEN condition_2 THEN 'Segment B'
        ELSE 'Segment C'
    END AS SegmentName,
    AGG_FUNCTION(column) AS Metric
FROM TableName
GROUP BY
    CASE
        WHEN condition_1 THEN 'Segment A'
        WHEN condition_2 THEN 'Segment B'
        ELSE 'Segment C'
    END;
```

### Example

Segment customers by their total spending into High, Medium, and Low value tiers:

```sql
SELECT
    c.CustomerID,
    c.FirstName,
    c.LastName,
    SUM(o.TotalAmount) AS TotalSpending,
    CASE
        WHEN SUM(o.TotalAmount) >= 10000 THEN 'High Value'
        WHEN SUM(o.TotalAmount) >= 3000  THEN 'Medium Value'
        ELSE 'Low Value'
    END AS CustomerSegment
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;
```

To see the count and revenue per segment:

```sql
SELECT
    CustomerSegment,
    COUNT(*) AS CustomerCount,
    SUM(TotalSpending) AS SegmentRevenue
FROM (
    SELECT
        c.CustomerID,
        SUM(o.TotalAmount) AS TotalSpending,
        CASE
            WHEN SUM(o.TotalAmount) >= 10000 THEN 'High Value'
            WHEN SUM(o.TotalAmount) >= 3000  THEN 'Medium Value'
            ELSE 'Low Value'
        END AS CustomerSegment
    FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
    GROUP BY c.CustomerID
) AS Segmented
GROUP BY CustomerSegment
ORDER BY SegmentRevenue DESC;
```

### Practical Takeaway

Segmentation turns raw data into actionable groups. Use CASE expressions to define segments, then combine with GROUP BY and aggregation functions to measure each segment. This is one of the most common patterns analysts use daily.

### References

- Standard SQL analytics practice (CASE + GROUP BY segmentation)
- Baraa Khatib Salkini, SQL Course – Aggregation & Analytical Functions (08_Aggregation_Analytical_Functions)

---

## Lesson 11.2 – Ranking

### Why This Matters

Ranking lets you answer questions like "Who are our top 10 customers?" or "Which product sold the most this quarter?" Ranking is fundamental to any analytics role — it turns flat data into prioritized lists that drive business decisions.

### Explanation

SQL provides several **window functions** specifically designed for ranking:

| Function | Behavior |
|---|---|
| `ROW_NUMBER()` | Assigns a unique sequential number to each row. No ties. |
| `RANK()` | Assigns the same rank to ties, then skips numbers (1, 2, 2, 4). |
| `DENSE_RANK()` | Assigns the same rank to ties, no gaps (1, 2, 2, 3). |

All ranking functions use the `OVER()` clause with `ORDER BY` to define the ranking order. You can add `PARTITION BY` to rank within groups.

```sql
RANK() OVER (ORDER BY column DESC) AS RankColumn
```

```sql
RANK() OVER (PARTITION BY group_column ORDER BY column DESC) AS RankWithinGroup
```

### Example

**Rank customers by total spending (overall):**

```sql
SELECT
    c.CustomerID,
    c.FirstName,
    c.LastName,
    SUM(o.TotalAmount) AS TotalSpending,
    RANK() OVER (ORDER BY SUM(o.TotalAmount) DESC) AS SpendingRank
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;
```

**Top 5 products by total revenue:**

```sql
SELECT *
FROM (
    SELECT
        p.ProductID,
        p.ProductName,
        SUM(o.TotalAmount) AS TotalRevenue,
        ROW_NUMBER() OVER (ORDER BY SUM(o.TotalAmount) DESC) AS RevenueRank
    FROM Products p
    JOIN Orders o ON p.ProductID = o.ProductID
    GROUP BY p.ProductID, p.ProductName
) AS Ranked
WHERE RevenueRank <= 5;
```

**Rank employees by sales within each department:**

```sql
SELECT
    e.Department,
    e.FirstName,
    e.LastName,
    COUNT(o.OrderID) AS TotalOrders,
    DENSE_RANK() OVER (
        PARTITION BY e.Department
        ORDER BY COUNT(o.OrderID) DESC
    ) AS DeptRank
FROM Employees e
JOIN Orders o ON e.EmployeeID = o.EmployeeID
GROUP BY e.Department, e.FirstName, e.LastName;
```

### Practical Takeaway

Use `ROW_NUMBER()` when you need a unique position for every row. Use `RANK()` or `DENSE_RANK()` when ties matter. Add `PARTITION BY` to rank within categories. Combine ranking with a subquery or CTE to filter for "Top N" results.

### References

- Baraa Khatib Salkini, SQL Course – Aggregation & Analytical Functions (08_Aggregation_Analytical_Functions)
- Standard SQL window function documentation

---

## Lesson 11.3 – Time Analysis

### Why This Matters

Most business questions are time-dependent: "How did sales perform last month compared to the previous month?" or "What is our weekly order trend?" Time analysis is the backbone of reporting and dashboards. Analysts who can slice data by time periods provide the most valuable insights.

### Explanation

Time analysis in SQL involves grouping and filtering data by date components. Common techniques:

**1. Extracting date parts**

```sql
YEAR(OrderDate)     -- returns the year
MONTH(OrderDate)    -- returns the month number
DATEPART(QUARTER, OrderDate)  -- returns the quarter (1-4)
```

**2. Grouping by time period**

```sql
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
```

**3. Filtering by date range**

```sql
WHERE OrderDate BETWEEN '2025-01-01' AND '2025-12-31'
```

**4. Period-over-period comparison using LAG()**

```sql
LAG(value, 1) OVER (ORDER BY period) -- previous period's value
```

### Example

**Monthly revenue report:**

```sql
SELECT
    YEAR(o.OrderDate)  AS OrderYear,
    MONTH(o.OrderDate) AS OrderMonth,
    SUM(o.TotalAmount) AS MonthlyRevenue,
    COUNT(o.OrderID)   AS TotalOrders
FROM Orders o
GROUP BY YEAR(o.OrderDate), MONTH(o.OrderDate)
ORDER BY OrderYear, OrderMonth;
```

**Month-over-month revenue comparison:**

```sql
WITH MonthlyRevenue AS (
    SELECT
        YEAR(OrderDate)  AS OrderYear,
        MONTH(OrderDate) AS OrderMonth,
        SUM(TotalAmount) AS Revenue
    FROM Orders
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT
    OrderYear,
    OrderMonth,
    Revenue,
    LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth) AS PreviousMonthRevenue,
    Revenue - LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth) AS RevenueChange
FROM MonthlyRevenue
ORDER BY OrderYear, OrderMonth;
```

**Quarterly sales summary:**

```sql
SELECT
    YEAR(OrderDate) AS OrderYear,
    DATEPART(QUARTER, OrderDate) AS Quarter,
    SUM(TotalAmount) AS QuarterlyRevenue,
    COUNT(DISTINCT CustomerID) AS UniqueCustomers
FROM Orders
GROUP BY YEAR(OrderDate), DATEPART(QUARTER, OrderDate)
ORDER BY OrderYear, Quarter;
```

### Practical Takeaway

Time analysis follows a consistent pattern: extract the date part, group by it, aggregate a metric, and optionally compare with previous periods using LAG(). Master this pattern and you can build any time-based report.

### References

- Baraa Khatib Salkini, SQL Course – Row Level Functions (07_Row_Level_Functions), date functions
- Baraa Khatib Salkini, SQL Course – Aggregation & Analytical Functions (08_Aggregation_Analytical_Functions)
- Standard SQL analytics practice

---

## Lesson 11.4 – Cumulative Metrics

### Why This Matters

Cumulative metrics show how a value builds up over time. A running total of revenue, for example, tells you not just what happened in January, but the total revenue accumulated from January through the current month. This is essential for tracking progress toward targets, understanding growth trajectories, and building executive dashboards.

### Explanation

A **cumulative metric** (also called a running total) is calculated using a window function with a specific frame:

```sql
SUM(value) OVER (ORDER BY date_column ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
```

This tells SQL: "For each row, sum all values from the very first row up to the current row."

Key frame options:

| Frame | Meaning |
|---|---|
| `UNBOUNDED PRECEDING` | Start from the first row in the partition |
| `CURRENT ROW` | Up to and including the current row |
| `UNBOUNDED FOLLOWING` | Continue to the last row in the partition |

You can also compute cumulative counts, cumulative averages, and cumulative distinct counts.

### Example

**Running total of revenue by month:**

```sql
WITH MonthlyRevenue AS (
    SELECT
        YEAR(OrderDate)  AS OrderYear,
        MONTH(OrderDate) AS OrderMonth,
        SUM(TotalAmount) AS MonthlyRevenue
    FROM Orders
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT
    OrderYear,
    OrderMonth,
    MonthlyRevenue,
    SUM(MonthlyRevenue) OVER (
        ORDER BY OrderYear, OrderMonth
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS CumulativeRevenue
FROM MonthlyRevenue
ORDER BY OrderYear, OrderMonth;
```

**Running total of orders per customer (to see how each customer's order count grows):**

```sql
SELECT
    CustomerID,
    OrderID,
    OrderDate,
    TotalAmount,
    SUM(TotalAmount) OVER (
        PARTITION BY CustomerID
        ORDER BY OrderDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS CustomerCumulativeSpend
FROM Orders
ORDER BY CustomerID, OrderDate;
```

**Cumulative customer count (how many unique customers have ordered by each month):**

```sql
WITH FirstOrder AS (
    SELECT
        CustomerID,
        MIN(OrderDate) AS FirstOrderDate
    FROM Orders
    GROUP BY CustomerID
),
MonthlyNew AS (
    SELECT
        YEAR(FirstOrderDate)  AS OrderYear,
        MONTH(FirstOrderDate) AS OrderMonth,
        COUNT(*) AS NewCustomers
    FROM FirstOrder
    GROUP BY YEAR(FirstOrderDate), MONTH(FirstOrderDate)
)
SELECT
    OrderYear,
    OrderMonth,
    NewCustomers,
    SUM(NewCustomers) OVER (
        ORDER BY OrderYear, OrderMonth
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS CumulativeCustomers
FROM MonthlyNew
ORDER BY OrderYear, OrderMonth;
```

### Practical Takeaway

Running totals are built with `SUM() OVER (ORDER BY ... ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`. Use `PARTITION BY` to reset the accumulation for each group (e.g., per customer, per product). Cumulative metrics are a staple of executive dashboards and progress-toward-goal reporting.

### References

- Baraa Khatib Salkini, SQL Course – Aggregation & Analytical Functions (08_Aggregation_Analytical_Functions)
- Standard SQL window function documentation

---

## Lesson 11.5 – Trend Analysis

### Why This Matters

Trends reveal whether things are getting better, getting worse, or staying flat. A single month's revenue number is just a data point — but comparing it to the previous months shows direction. Trend analysis helps teams detect growth patterns, seasonal effects, and early warning signs before they become problems.

### Explanation

Trend analysis in SQL combines several techniques from earlier modules:

**1. Period-over-period change** — Using `LAG()` to compare the current period with the previous one.

**2. Percentage change** — Calculating how much a metric grew or shrank in relative terms.

**3. Moving averages** — Smoothing out noise by averaging over a window of periods (e.g., 3-month moving average).

**Moving average formula:**

```sql
AVG(value) OVER (
    ORDER BY period
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
) AS MovingAvg3
```

This averages the current row and the 2 rows before it — a 3-period moving average.

**Percentage change formula:**

```sql
(Current - Previous) / Previous * 100.0
```

### Example

**Revenue trend with month-over-month change and percentage growth:**

```sql
WITH MonthlyRevenue AS (
    SELECT
        YEAR(OrderDate)  AS OrderYear,
        MONTH(OrderDate) AS OrderMonth,
        SUM(TotalAmount) AS Revenue
    FROM Orders
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT
    OrderYear,
    OrderMonth,
    Revenue,
    LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth) AS PrevMonthRevenue,
    Revenue - LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth) AS AbsoluteChange,
    CASE
        WHEN LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth) IS NULL THEN NULL
        WHEN LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth) = 0 THEN NULL
        ELSE ROUND(
            (Revenue - LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth))
            * 100.0
            / LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth),
            2
        )
    END AS PctChange
FROM MonthlyRevenue
ORDER BY OrderYear, OrderMonth;
```

**3-month moving average of revenue:**

```sql
WITH MonthlyRevenue AS (
    SELECT
        YEAR(OrderDate)  AS OrderYear,
        MONTH(OrderDate) AS OrderMonth,
        SUM(TotalAmount) AS Revenue
    FROM Orders
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT
    OrderYear,
    OrderMonth,
    Revenue,
    ROUND(
        AVG(Revenue) OVER (
            ORDER BY OrderYear, OrderMonth
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ), 2
    ) AS MovingAvg3Month
FROM MonthlyRevenue
ORDER BY OrderYear, OrderMonth;
```

**Order volume trend by week:**

```sql
SELECT
    DATEPART(YEAR, OrderDate)  AS OrderYear,
    DATEPART(WEEK, OrderDate)  AS WeekNumber,
    COUNT(OrderID) AS WeeklyOrders,
    LAG(COUNT(OrderID), 1) OVER (
        ORDER BY DATEPART(YEAR, OrderDate), DATEPART(WEEK, OrderDate)
    ) AS PrevWeekOrders
FROM Orders
GROUP BY DATEPART(YEAR, OrderDate), DATEPART(WEEK, OrderDate)
ORDER BY OrderYear, WeekNumber;
```

**Combining trends: full trend dashboard query:**

```sql
WITH MonthlyStats AS (
    SELECT
        YEAR(OrderDate)  AS OrderYear,
        MONTH(OrderDate) AS OrderMonth,
        SUM(TotalAmount) AS Revenue,
        COUNT(OrderID)   AS OrderCount,
        COUNT(DISTINCT CustomerID) AS UniqueCustomers
    FROM Orders
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT
    OrderYear,
    OrderMonth,
    Revenue,
    OrderCount,
    UniqueCustomers,
    -- Month-over-month revenue change
    Revenue - LAG(Revenue, 1) OVER (ORDER BY OrderYear, OrderMonth) AS RevenueChange,
    -- 3-month moving average
    ROUND(AVG(Revenue) OVER (
        ORDER BY OrderYear, OrderMonth
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS RevenueMA3,
    -- Cumulative revenue for the year
    SUM(Revenue) OVER (
        PARTITION BY OrderYear
        ORDER BY OrderMonth
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS YTDRevenue
FROM MonthlyStats
ORDER BY OrderYear, OrderMonth;
```

### Practical Takeaway

Trend analysis combines three tools: `LAG()` for period comparison, `AVG() OVER (ROWS BETWEEN ...)` for moving averages, and percentage calculations for growth rates. A well-built trend query gives you direction, velocity, and smoothed signals — everything a dashboard needs.

### References

- Baraa Khatib Salkini, SQL Course – Aggregation & Analytical Functions (08_Aggregation_Analytical_Functions)
- Baraa Khatib Salkini, SQL Course – AI and SQL (11_AI_and_SQL), SQL task-solving and query optimization patterns
- Standard SQL analytics practice

---

## Module Summary

In this module you learned how to apply SQL techniques to real analytics use cases:

1. **Segmentation** — Use CASE expressions with GROUP BY to divide data into meaningful groups (customer tiers, product categories, time periods).
2. **Ranking** — Use ROW_NUMBER(), RANK(), and DENSE_RANK() to create prioritized lists and identify top performers.
3. **Time Analysis** — Extract date parts, group by time periods, and use LAG() for period-over-period comparisons.
4. **Cumulative Metrics** — Use SUM() OVER() with UNBOUNDED PRECEDING to compute running totals and track progress toward goals.
5. **Trend Analysis** — Combine LAG(), moving averages, and percentage calculations to detect growth patterns and seasonal effects.

These five techniques form the core analytics toolkit. Nearly every business dashboard, report, or data product relies on one or more of these patterns.

---

## References

- Baraa Khatib Salkini, *SQL Course – Aggregation & Analytical Functions* (08_Aggregation_Analytical_Functions)
- Baraa Khatib Salkini, *SQL Course – Row Level Functions* (07_Row_Level_Functions)
- Baraa Khatib Salkini, *SQL Course – AI and SQL* (11_AI_and_SQL)
- TOPIC_MAP.md – Track 1, Module 11
- CONTENT_RULES.md – Lesson structure and writing guidelines
- Standard SQL analytics practices
