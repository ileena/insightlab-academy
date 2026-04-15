# Module 12 -- SQL Projects

## Track 1 -- SQL Foundations to Analytics

This capstone module brings together all the SQL techniques you have learned in Modules 1 through 11. Each project presents a realistic business scenario, walks you through the solution step by step, and shows you how to interpret the results. By the end of this module, you will have built four complete analytical queries that mirror real work in data and product analytics roles.

**Schema used throughout:** SalesDB (tables: Products, Customers, Orders, Employees). Orders is the central table.

---

## Lesson 12.1 -- Sales Analysis

### Title

Analyzing Overall Sales Performance

### Why This Matters

Every business needs to understand how much revenue it generates, which time periods perform best, and whether sales are growing or declining. A sales analysis query is one of the most common requests an analyst receives. Being able to answer "How are our sales doing?" with precise numbers is a foundational analytics skill.

### Business Scenario

The VP of Sales asks: "Give me a monthly breakdown of total sales for the past year. I want to see total orders, total revenue, and average order value for each month, along with the month-over-month change in revenue."

### Step-by-Step SQL Solution

**Step 1 -- Get basic order data with revenue.**

Start simple. Pull order dates and amounts from the Orders table.

```sql
SELECT
    OrderID,
    OrderDate,
    TotalAmount
FROM Orders
WHERE OrderDate >= '2025-01-01'
  AND OrderDate < '2026-01-01';
```

This gives you the raw data. Every row is one order with its date and amount.

**Step 2 -- Aggregate by month.**

Group the data into monthly buckets using date functions and aggregation.

```sql
SELECT
    YEAR(OrderDate)                AS OrderYear,
    MONTH(OrderDate)               AS OrderMonth,
    COUNT(OrderID)                 AS TotalOrders,
    SUM(TotalAmount)               AS TotalRevenue,
    ROUND(AVG(TotalAmount), 2)     AS AvgOrderValue
FROM Orders
WHERE OrderDate >= '2025-01-01'
  AND OrderDate < '2026-01-01'
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
ORDER BY OrderYear, OrderMonth;
```

Now you have one row per month with three key metrics.

**Step 3 -- Add month-over-month revenue change using a window function.**

Use the LAG window function to compare each month to the previous one.

```sql
SELECT
    OrderYear,
    OrderMonth,
    TotalOrders,
    TotalRevenue,
    AvgOrderValue,
    TotalRevenue - LAG(TotalRevenue) OVER (ORDER BY OrderYear, OrderMonth) AS RevenueMoMChange,
    ROUND(
        (TotalRevenue - LAG(TotalRevenue) OVER (ORDER BY OrderYear, OrderMonth))
        / LAG(TotalRevenue) OVER (ORDER BY OrderYear, OrderMonth) * 100,
        2
    ) AS RevenueMoMPct
FROM (
    SELECT
        YEAR(OrderDate)                AS OrderYear,
        MONTH(OrderDate)               AS OrderMonth,
        COUNT(OrderID)                 AS TotalOrders,
        SUM(TotalAmount)               AS TotalRevenue,
        ROUND(AVG(TotalAmount), 2)     AS AvgOrderValue
    FROM Orders
    WHERE OrderDate >= '2025-01-01'
      AND OrderDate < '2026-01-01'
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
) AS MonthlySales
ORDER BY OrderYear, OrderMonth;
```

### Final Query

The Step 3 query above is the final, complete solution. It combines filtering (WHERE), aggregation (COUNT, SUM, AVG, GROUP BY), subqueries, and window functions (LAG with OVER) in a single analytical query.

### Result Interpretation

| OrderYear | OrderMonth | TotalOrders | TotalRevenue | AvgOrderValue | RevenueMoMChange | RevenueMoMPct |
|-----------|-----------|-------------|-------------|---------------|-----------------|---------------|
| 2025 | 1 | 120 | 45000.00 | 375.00 | NULL | NULL |
| 2025 | 2 | 135 | 51200.00 | 379.26 | 6200.00 | 13.78 |
| 2025 | 3 | 148 | 55800.00 | 376.89 | 4600.00 | 8.98 |

- The first month shows NULL for the change columns because there is no prior month to compare against.
- A positive RevenueMoMPct indicates growth; a negative value indicates a decline.
- Pair this with the average order value to understand whether growth comes from more orders or higher-value orders.

### Practical Takeaway

When asked about sales performance, always start with the simplest aggregation and layer on complexity. Month-over-month change is one of the most requested metrics in business. The LAG window function lets you compute it without self-joins, making your query cleaner and faster.

---

## Lesson 12.2 -- Customer Segmentation

### Title

Segmenting Customers by Purchase Behavior

### Why This Matters

Not all customers are equal. Some buy frequently and spend a lot; others buy once and disappear. Customer segmentation helps businesses decide where to invest marketing budgets, which customers to prioritize for retention campaigns, and how to personalize communication. The ability to segment customers using SQL is a core skill for any analyst working with product or marketing teams.

### Business Scenario

The Marketing Director asks: "Segment our customers into tiers based on their total spending. I want to see how many customers fall into each tier: High Value (top 20% by spending), Medium Value (next 30%), and Standard (bottom 50%). Also show me the average number of orders and average spend per tier."

### Step-by-Step SQL Solution

**Step 1 -- Calculate total spend and order count per customer.**

Join Customers to Orders and aggregate.

```sql
SELECT
    c.CustomerID,
    c.FirstName,
    c.LastName,
    COUNT(o.OrderID)        AS OrderCount,
    SUM(o.TotalAmount)      AS TotalSpend
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;
```

**Step 2 -- Rank customers by total spend using NTILE.**

NTILE divides the result set into a specified number of roughly equal groups. We will use percentile ranking to classify customers.

```sql
SELECT
    CustomerID,
    FirstName,
    LastName,
    OrderCount,
    TotalSpend,
    NTILE(10) OVER (ORDER BY TotalSpend DESC) AS SpendDecile
FROM (
    SELECT
        c.CustomerID,
        c.FirstName,
        c.LastName,
        COUNT(o.OrderID)        AS OrderCount,
        SUM(o.TotalAmount)      AS TotalSpend
    FROM Customers c
    INNER JOIN Orders o ON c.CustomerID = o.CustomerID
    GROUP BY c.CustomerID, c.FirstName, c.LastName
) AS CustomerMetrics;
```

Decile 1 and 2 represent the top 20%. Deciles 3 through 5 represent the next 30%. Deciles 6 through 10 represent the bottom 50%.

**Step 3 -- Assign segment labels and summarize using a CTE.**

```sql
WITH CustomerMetrics AS (
    SELECT
        c.CustomerID,
        c.FirstName,
        c.LastName,
        COUNT(o.OrderID)        AS OrderCount,
        SUM(o.TotalAmount)      AS TotalSpend
    FROM Customers c
    INNER JOIN Orders o ON c.CustomerID = o.CustomerID
    GROUP BY c.CustomerID, c.FirstName, c.LastName
),
RankedCustomers AS (
    SELECT
        CustomerID,
        FirstName,
        LastName,
        OrderCount,
        TotalSpend,
        NTILE(10) OVER (ORDER BY TotalSpend DESC) AS SpendDecile
    FROM CustomerMetrics
),
SegmentedCustomers AS (
    SELECT
        CustomerID,
        FirstName,
        LastName,
        OrderCount,
        TotalSpend,
        CASE
            WHEN SpendDecile <= 2 THEN 'High Value'
            WHEN SpendDecile <= 5 THEN 'Medium Value'
            ELSE 'Standard'
        END AS CustomerSegment
    FROM RankedCustomers
)
SELECT
    CustomerSegment,
    COUNT(CustomerID)               AS CustomerCount,
    ROUND(AVG(OrderCount), 1)       AS AvgOrders,
    ROUND(AVG(TotalSpend), 2)       AS AvgSpend,
    SUM(TotalSpend)                 AS SegmentTotalRevenue
FROM SegmentedCustomers
GROUP BY CustomerSegment
ORDER BY AvgSpend DESC;
```

### Final Query

The Step 3 query above is the complete solution. It uses CTEs for readability, INNER JOIN to connect Customers and Orders, aggregation (COUNT, SUM, AVG, GROUP BY), a window function (NTILE), and CASE logic for classification.

### Result Interpretation

| CustomerSegment | CustomerCount | AvgOrders | AvgSpend | SegmentTotalRevenue |
|----------------|--------------|-----------|----------|-------------------|
| High Value | 40 | 8.2 | 3200.00 | 128000.00 |
| Medium Value | 60 | 4.5 | 1450.75 | 87045.00 |
| Standard | 100 | 1.8 | 420.30 | 42030.00 |

- High Value customers represent 20% of the customer base but contribute the largest share of revenue.
- The AvgOrders column reveals that high-value customers buy far more frequently, not just at higher amounts.
- This data helps the marketing team decide, for example, to run retention campaigns for the High Value segment and re-engagement campaigns for the Standard segment.

### Practical Takeaway

Customer segmentation is one of the most impactful analyses you can deliver. The NTILE window function is a clean way to divide customers into percentile-based groups without hardcoding dollar thresholds. Using CTEs keeps multi-step logic readable and maintainable. In real work, you would adapt the decile boundaries and segment names to match the specific business context.

---

## Lesson 12.3 -- Product Performance

### Title

Evaluating Product Performance Across the Catalog

### Why This Matters

Product teams and merchandising managers need to know which products drive the most revenue, which are underperforming, and how products compare to each other within their categories. A product performance analysis turns raw order data into decisions about inventory, pricing, and marketing investment.

### Business Scenario

The Product Manager asks: "Show me each product's total units sold, total revenue, and its rank within its product category. I also want to see what percentage of the category's total revenue each product represents."

### Step-by-Step SQL Solution

**Step 1 -- Join Orders to Products and get basic product metrics.**

```sql
SELECT
    p.ProductID,
    p.ProductName,
    p.Category,
    p.Price,
    COUNT(o.OrderID)                AS TimesSold,
    SUM(o.TotalAmount)              AS ProductRevenue
FROM Products p
INNER JOIN Orders o ON p.ProductID = o.ProductID
GROUP BY p.ProductID, p.ProductName, p.Category, p.Price;
```

**Step 2 -- Add category-level rank and totals using window functions.**

```sql
SELECT
    ProductID,
    ProductName,
    Category,
    Price,
    TimesSold,
    ProductRevenue,
    RANK() OVER (PARTITION BY Category ORDER BY ProductRevenue DESC) AS CategoryRank,
    SUM(ProductRevenue) OVER (PARTITION BY Category)                AS CategoryTotalRevenue
FROM (
    SELECT
        p.ProductID,
        p.ProductName,
        p.Category,
        p.Price,
        COUNT(o.OrderID)            AS TimesSold,
        SUM(o.TotalAmount)          AS ProductRevenue
    FROM Products p
    INNER JOIN Orders o ON p.ProductID = o.ProductID
    GROUP BY p.ProductID, p.ProductName, p.Category, p.Price
) AS ProductMetrics;
```

**Step 3 -- Calculate revenue share and format the final output with a CTE.**

```sql
WITH ProductMetrics AS (
    SELECT
        p.ProductID,
        p.ProductName,
        p.Category,
        p.Price,
        COUNT(o.OrderID)            AS TimesSold,
        SUM(o.TotalAmount)          AS ProductRevenue
    FROM Products p
    INNER JOIN Orders o ON p.ProductID = o.ProductID
    GROUP BY p.ProductID, p.ProductName, p.Category, p.Price
),
RankedProducts AS (
    SELECT
        ProductID,
        ProductName,
        Category,
        Price,
        TimesSold,
        ProductRevenue,
        RANK() OVER (PARTITION BY Category ORDER BY ProductRevenue DESC) AS CategoryRank,
        SUM(ProductRevenue) OVER (PARTITION BY Category)                AS CategoryTotalRevenue
    FROM ProductMetrics
)
SELECT
    ProductID,
    ProductName,
    Category,
    Price,
    TimesSold,
    ProductRevenue,
    CategoryRank,
    ROUND(ProductRevenue * 100.0 / CategoryTotalRevenue, 2) AS RevenuePctOfCategory
FROM RankedProducts
ORDER BY Category, CategoryRank;
```

### Final Query

The Step 3 query above is the complete solution. It combines INNER JOIN, aggregation (COUNT, SUM, GROUP BY), window functions (RANK with PARTITION BY, SUM as a window aggregate), CTEs, and arithmetic for percentage calculation.

### Result Interpretation

| ProductID | ProductName | Category | Price | TimesSold | ProductRevenue | CategoryRank | RevenuePctOfCategory |
|-----------|------------|----------|-------|-----------|---------------|-------------|---------------------|
| 5 | Widget Pro | Widgets | 49.99 | 210 | 10497.90 | 1 | 42.15 |
| 12 | Widget Basic | Widgets | 24.99 | 180 | 4498.20 | 2 | 18.06 |
| 8 | Widget Mini | Widgets | 14.99 | 150 | 2248.50 | 3 | 9.03 |

- CategoryRank shows each product's position within its own category, not across the entire catalog.
- RevenuePctOfCategory reveals concentration risk. If one product accounts for more than 40% of category revenue, the business is heavily dependent on that product.
- Products with high TimesSold but low ProductRevenue are lower-priced items. Products with low TimesSold but high ProductRevenue are premium items. This distinction matters for marketing strategy.

### Practical Takeaway

Product performance analysis almost always requires ranking within groups. The PARTITION BY clause in window functions is the key tool for this. Calculating a product's share of category revenue is a simple but powerful metric that immediately tells stakeholders which products matter most. Always present both absolute numbers (revenue) and relative numbers (percentage share) so decision-makers get the full picture.

---

## Lesson 12.4 -- Revenue Trends

### Title

Identifying Revenue Trends with Cumulative and Moving Metrics

### Why This Matters

A single month's revenue number tells you very little on its own. Trends tell the story. Executives and investors want to know: Is revenue growing? Is it accelerating or slowing down? Are there seasonal patterns? Building a revenue trend analysis with cumulative totals and moving averages is how analysts turn raw numbers into strategic insight.

### Business Scenario

The CFO asks: "I need a monthly revenue trend report that shows total monthly revenue, a 3-month moving average to smooth out volatility, cumulative revenue for the year, and each month's share of total annual revenue. Include data for the most recent full year."

### Step-by-Step SQL Solution

**Step 1 -- Aggregate monthly revenue.**

```sql
SELECT
    YEAR(OrderDate)            AS OrderYear,
    MONTH(OrderDate)           AS OrderMonth,
    SUM(TotalAmount)           AS MonthlyRevenue
FROM Orders
WHERE OrderDate >= '2025-01-01'
  AND OrderDate < '2026-01-01'
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
ORDER BY OrderYear, OrderMonth;
```

**Step 2 -- Add a 3-month moving average.**

Use the AVG window function with a ROWS frame to compute the moving average over the current row and the two preceding rows.

```sql
SELECT
    OrderYear,
    OrderMonth,
    MonthlyRevenue,
    ROUND(
        AVG(MonthlyRevenue) OVER (
            ORDER BY OrderYear, OrderMonth
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ), 2
    ) AS MovingAvg3Month
FROM (
    SELECT
        YEAR(OrderDate)        AS OrderYear,
        MONTH(OrderDate)       AS OrderMonth,
        SUM(TotalAmount)       AS MonthlyRevenue
    FROM Orders
    WHERE OrderDate >= '2025-01-01'
      AND OrderDate < '2026-01-01'
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
) AS MonthlySales
ORDER BY OrderYear, OrderMonth;
```

Note: The first two months will have a moving average based on fewer than three data points, since there are not yet enough preceding rows.

**Step 3 -- Add cumulative revenue and monthly revenue share.**

```sql
WITH MonthlySales AS (
    SELECT
        YEAR(OrderDate)        AS OrderYear,
        MONTH(OrderDate)       AS OrderMonth,
        SUM(TotalAmount)       AS MonthlyRevenue
    FROM Orders
    WHERE OrderDate >= '2025-01-01'
      AND OrderDate < '2026-01-01'
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
),
AnnualTotal AS (
    SELECT SUM(MonthlyRevenue) AS YearlyRevenue
    FROM MonthlySales
)
SELECT
    ms.OrderYear,
    ms.OrderMonth,
    ms.MonthlyRevenue,
    ROUND(
        AVG(ms.MonthlyRevenue) OVER (
            ORDER BY ms.OrderYear, ms.OrderMonth
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ), 2
    ) AS MovingAvg3Month,
    SUM(ms.MonthlyRevenue) OVER (
        ORDER BY ms.OrderYear, ms.OrderMonth
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS CumulativeRevenue,
    ROUND(ms.MonthlyRevenue * 100.0 / at.YearlyRevenue, 2) AS PctOfAnnualRevenue
FROM MonthlySales ms
CROSS JOIN AnnualTotal at
ORDER BY ms.OrderYear, ms.OrderMonth;
```

### Final Query

The Step 3 query above is the complete solution. It uses CTEs (two of them), aggregation (SUM, GROUP BY), window functions with explicit frame clauses (AVG with ROWS BETWEEN, SUM with UNBOUNDED PRECEDING), CROSS JOIN, and arithmetic for percentage calculation.

### Result Interpretation

| OrderYear | OrderMonth | MonthlyRevenue | MovingAvg3Month | CumulativeRevenue | PctOfAnnualRevenue |
|-----------|-----------|---------------|----------------|------------------|-------------------|
| 2025 | 1 | 45000.00 | 45000.00 | 45000.00 | 7.21 |
| 2025 | 2 | 51200.00 | 48100.00 | 96200.00 | 8.20 |
| 2025 | 3 | 55800.00 | 50666.67 | 152000.00 | 8.94 |
| 2025 | 4 | 48300.00 | 51766.67 | 200300.00 | 7.74 |

- The MovingAvg3Month column smooths out short-term fluctuations. If it is consistently rising, the trend is positive.
- CumulativeRevenue lets stakeholders see progress toward annual targets at any point in the year.
- PctOfAnnualRevenue reveals seasonality. If certain months consistently contribute a higher share, the business has seasonal patterns that should inform planning.
- A declining moving average alongside a rising cumulative total means growth is slowing even though total revenue is still increasing. This is an important nuance to communicate to leadership.

### Practical Takeaway

Revenue trend reports are among the highest-visibility deliverables for an analyst. Three techniques make them powerful: (1) moving averages smooth noise and reveal true direction, (2) cumulative totals show progress toward goals, and (3) percentage-of-total calculations reveal seasonality and distribution. Master the ROWS BETWEEN clause in window functions -- it is the mechanism behind all of these calculations and one of the most useful tools in analytical SQL.

---

## Module Summary

Module 12 applied every major SQL technique from this track to four realistic business projects:

| Project | Key Techniques Used |
|---------|-------------------|
| 12.1 -- Sales Analysis | WHERE filtering, date functions, COUNT/SUM/AVG, GROUP BY, subqueries, LAG window function |
| 12.2 -- Customer Segmentation | INNER JOIN, COUNT/SUM/AVG, GROUP BY, NTILE window function, CASE expressions, CTEs |
| 12.3 -- Product Performance | INNER JOIN, COUNT/SUM, GROUP BY, RANK with PARTITION BY, SUM as window aggregate, CTEs, percentage calculations |
| 12.4 -- Revenue Trends | SUM, GROUP BY, AVG with ROWS BETWEEN frame, SUM with UNBOUNDED PRECEDING, CROSS JOIN, multiple CTEs, percentage calculations |

These projects demonstrate that real analytics work is rarely about a single SQL feature. It is about combining SELECT, JOINs, filtering, aggregation, window functions, CTEs, and clear logic into queries that answer specific business questions.

The best way to solidify these skills is to modify the queries above: change the date ranges, add additional filters (such as filtering by employee or region), or create new metrics. Every variation you build strengthens your fluency.

---

## References

- Applied SQL techniques from Modules 1-11 (Track 1 -- SQL Foundations to Analytics)
- 09_Advanced_SQL_Techniques.pdf -- Advanced SQL Techniques reference material (REFERENCES/SQL/)
- 08_Aggregation_Analytical_Functions.pdf -- Aggregation and Analytical Functions reference material (REFERENCES/SQL/)
- The Complete SQL Bootcamp (Udemy) -- Course reference for SQL syntax and query patterns
