# Module 8 -- Window Functions

**Track:** Track 1 -- SQL Foundations to Analytics
**Module:** Module 8 -- Window Functions
**Academy:** InsightLab -- Data & Product Analytics Academy

---

## Introduction

Window functions are one of the most powerful features in SQL. They let you perform calculations across a set of rows that are related to the current row -- without collapsing your result set the way `GROUP BY` does. Whether you need to rank products by revenue, compute running totals of sales, or calculate moving averages, window functions give you the tools to do it elegantly in a single query.

This module contains six lessons:

| Lesson | Topic |
|--------|-------|
| 8.1 | The OVER Clause |
| 8.2 | PARTITION BY |
| 8.3 | ROW_NUMBER |
| 8.4 | RANK |
| 8.5 | Running Totals |
| 8.6 | Moving Averages |

All examples use the **SalesDB** schema with the following tables:

- **Products** (ProductID, ProductName, Category, Price)
- **Customers** (CustomerID, FirstName, LastName, City, Country)
- **Orders** (OrderID, CustomerID, ProductID, EmployeeID, OrderDate, Quantity, TotalAmount)
- **Employees** (EmployeeID, FirstName, LastName, Department, HireDate)

**Orders** is the central table that links to Products, Customers, and Employees.

---

## Lesson 8.1 -- The OVER Clause

### Why This Matters

Standard aggregate functions like `SUM()` and `AVG()` collapse rows into a single result per group. But what if you want to see each order on its own row **and** also see the overall total alongside it? The `OVER` clause turns an aggregate function into a window function, keeping every row visible while still performing the calculation.

### Explanation

The `OVER()` clause tells SQL: "Apply this function across a window of rows, but do not collapse them." When you write `OVER()` with empty parentheses, the window is the entire result set.

The general syntax is:

```
<function>() OVER ( [PARTITION BY ...] [ORDER BY ...] [frame_clause] )
```

When `OVER()` is empty, the function operates over all rows returned by the query.

### Example

Show each order alongside the total revenue across all orders:

```sql
SELECT
    o.OrderID,
    o.OrderDate,
    o.TotalAmount,
    SUM(o.TotalAmount) OVER () AS OverallTotal
FROM Orders o;
```

| OrderID | OrderDate  | TotalAmount | OverallTotal |
|---------|------------|-------------|--------------|
| 1001    | 2025-01-15 | 250.00      | 48500.00     |
| 1002    | 2025-01-18 | 130.00      | 48500.00     |
| 1003    | 2025-02-02 | 475.00      | 48500.00     |

Every row shows its own `TotalAmount` and the same `OverallTotal` for the entire table. No `GROUP BY` is needed, and no rows are lost.

### Practical Takeaway

Use `OVER()` whenever you need an aggregate value displayed next to each detail row. This is especially useful for computing each row's percentage of a total:

```sql
SELECT
    o.OrderID,
    o.TotalAmount,
    ROUND(o.TotalAmount * 100.0 / SUM(o.TotalAmount) OVER (), 2) AS PctOfTotal
FROM Orders o;
```

---

## Lesson 8.2 -- PARTITION BY

### Why This Matters

Using `OVER()` with no arguments calculates across all rows. In practice, you often need calculations scoped to a group -- for example, the total revenue **per customer** or the average order value **per product category**. `PARTITION BY` divides the rows into groups (partitions) and applies the window function separately within each group.

### Explanation

`PARTITION BY` works inside the `OVER()` clause. It splits the result set into partitions based on one or more columns. The window function then resets and recalculates for each partition independently.

Think of it like `GROUP BY`, but with one critical difference: `PARTITION BY` does **not** reduce the number of rows in your output.

```
<function>() OVER (PARTITION BY column1, column2)
```

### Example

Show each order along with the total revenue for that order's customer:

```sql
SELECT
    o.OrderID,
    c.FirstName,
    c.LastName,
    o.TotalAmount,
    SUM(o.TotalAmount) OVER (PARTITION BY o.CustomerID) AS CustomerTotal
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID;
```

| OrderID | FirstName | LastName | TotalAmount | CustomerTotal |
|---------|-----------|----------|-------------|---------------|
| 1001    | Anna      | Meier    | 250.00      | 825.00        |
| 1005    | Anna      | Meier    | 575.00      | 825.00        |
| 1002    | Ben       | Schulz   | 130.00      | 130.00        |
| 1003    | Clara     | Fischer  | 475.00      | 950.00        |
| 1007    | Clara     | Fischer  | 475.00      | 950.00        |

Anna's two orders both display her `CustomerTotal` of 825.00. Clara's two orders each show 950.00. Every row is preserved.

### Practical Takeaway

Use `PARTITION BY` when you need group-level context on every detail row. Common analytics use cases include:

- Revenue per customer alongside each order.
- Average price per product category alongside each product.
- Order count per employee alongside each order record.

```sql
SELECT
    o.OrderID,
    e.FirstName AS Employee,
    o.TotalAmount,
    COUNT(*) OVER (PARTITION BY o.EmployeeID) AS EmployeeOrderCount,
    AVG(o.TotalAmount) OVER (PARTITION BY o.EmployeeID) AS EmployeeAvgOrder
FROM Orders o
JOIN Employees e ON o.EmployeeID = e.EmployeeID;
```

---

## Lesson 8.3 -- ROW_NUMBER

### Why This Matters

Assigning a sequential number to each row is one of the most common operations in analytics. You might need to identify the first order each customer placed, paginate results, or deduplicate data. `ROW_NUMBER()` gives every row a unique integer within its partition, based on the order you specify.

### Explanation

`ROW_NUMBER()` assigns a consecutive integer starting at 1 to each row within a partition. It always produces unique numbers -- even when rows have identical values in the `ORDER BY` column, one will get a lower number and the other a higher number (the assignment among ties is non-deterministic unless you add a tiebreaker column).

```sql
ROW_NUMBER() OVER (PARTITION BY column ORDER BY column)
```

- **PARTITION BY** is optional. Without it, the entire result set is one partition.
- **ORDER BY** is required to define the sequence.

### Example

Number each customer's orders from most recent to oldest:

```sql
SELECT
    o.OrderID,
    c.FirstName,
    c.LastName,
    o.OrderDate,
    o.TotalAmount,
    ROW_NUMBER() OVER (
        PARTITION BY o.CustomerID
        ORDER BY o.OrderDate DESC
    ) AS OrderRank
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID;
```

| OrderID | FirstName | LastName | OrderDate  | TotalAmount | OrderRank |
|---------|-----------|----------|------------|-------------|-----------|
| 1005    | Anna      | Meier    | 2025-03-10 | 575.00      | 1         |
| 1001    | Anna      | Meier    | 2025-01-15 | 250.00      | 2         |
| 1002    | Ben       | Schulz   | 2025-01-18 | 130.00      | 1         |

To retrieve only the most recent order for each customer, wrap this in a subquery or CTE:

```sql
WITH RankedOrders AS (
    SELECT
        o.OrderID,
        o.CustomerID,
        o.OrderDate,
        o.TotalAmount,
        ROW_NUMBER() OVER (
            PARTITION BY o.CustomerID
            ORDER BY o.OrderDate DESC
        ) AS rn
    FROM Orders o
)
SELECT OrderID, CustomerID, OrderDate, TotalAmount
FROM RankedOrders
WHERE rn = 1;
```

### Practical Takeaway

Use `ROW_NUMBER()` when you need exactly one row per group (e.g., the latest order per customer, the top product per category). It is also the standard technique for pagination in analytical queries. Remember that ties are broken arbitrarily -- if deterministic results matter, add a secondary column to `ORDER BY`.

---

## Lesson 8.4 -- RANK

### Why This Matters

When you rank items, ties matter. If two products have the same revenue, should they share a rank? `RANK()` and its sibling `DENSE_RANK()` handle ties explicitly, making them the right choice for leaderboards, performance reviews, and competitive rankings.

### Explanation

| Function | Behavior with Ties | Example Sequence |
|----------|-------------------|------------------|
| `ROW_NUMBER()` | No ties -- every row gets a unique number | 1, 2, 3, 4 |
| `RANK()` | Ties share a rank; the next rank skips | 1, 2, 2, 4 |
| `DENSE_RANK()` | Ties share a rank; the next rank does not skip | 1, 2, 2, 3 |

**RANK()** leaves gaps after ties. If two rows tie for rank 2, the next row is rank 4.
**DENSE_RANK()** does not leave gaps. If two rows tie for rank 2, the next row is rank 3.

```sql
RANK()       OVER (PARTITION BY column ORDER BY column)
DENSE_RANK() OVER (PARTITION BY column ORDER BY column)
```

### Example

Rank employees by the total revenue of orders they handled:

```sql
SELECT
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    SUM(o.TotalAmount) AS TotalRevenue,
    RANK() OVER (ORDER BY SUM(o.TotalAmount) DESC) AS RevenueRank,
    DENSE_RANK() OVER (ORDER BY SUM(o.TotalAmount) DESC) AS RevenueDenseRank
FROM Orders o
JOIN Employees e ON o.EmployeeID = e.EmployeeID
GROUP BY e.EmployeeID, e.FirstName, e.LastName;
```

| EmployeeID | FirstName | LastName | TotalRevenue | RevenueRank | RevenueDenseRank |
|------------|-----------|----------|--------------|-------------|------------------|
| 3          | Maria     | Wagner   | 12500.00     | 1           | 1                |
| 1          | Thomas    | Klein    | 9800.00      | 2           | 2                |
| 5          | Laura     | Braun    | 9800.00      | 2           | 2                |
| 2          | Stefan    | Richter  | 8200.00      | 4           | 3                |

Thomas and Laura tie at rank 2. With `RANK()`, Stefan is rank 4 (rank 3 is skipped). With `DENSE_RANK()`, Stefan is rank 3 (no gap).

Rank products within each category by total quantity sold:

```sql
SELECT
    p.Category,
    p.ProductName,
    SUM(o.Quantity) AS TotalQtySold,
    RANK() OVER (
        PARTITION BY p.Category
        ORDER BY SUM(o.Quantity) DESC
    ) AS CategoryRank
FROM Orders o
JOIN Products p ON o.ProductID = p.ProductID
GROUP BY p.Category, p.ProductName;
```

### Practical Takeaway

- Use **RANK()** when gaps after ties are acceptable or desired (e.g., competition standings where no one gets third place if two people tie for second).
- Use **DENSE_RANK()** when you want consecutive ranks without gaps (e.g., "show me the top 3 revenue tiers").
- Use **ROW_NUMBER()** when you need exactly one winner per position with no ties.

---

## Lesson 8.5 -- Running Totals

### Why This Matters

A running total (cumulative sum) shows how a value accumulates over time. It answers questions like: "How much total revenue have we earned up to this date?" or "What is the cumulative order count for this customer?" Running totals are fundamental in financial reporting, growth analysis, and KPI dashboards.

### Explanation

A running total is created by combining `SUM()` with an `ORDER BY` inside the `OVER()` clause. When you specify `ORDER BY`, SQL defaults to a frame that includes all rows from the start of the partition up to and including the current row.

```sql
SUM(column) OVER (ORDER BY column)
```

This is equivalent to the explicit frame:

```sql
SUM(column) OVER (
    ORDER BY column
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```

You can also partition the running total so it resets for each group.

### Example

Calculate a running total of revenue by order date:

```sql
SELECT
    o.OrderID,
    o.OrderDate,
    o.TotalAmount,
    SUM(o.TotalAmount) OVER (
        ORDER BY o.OrderDate
    ) AS RunningTotal
FROM Orders o
ORDER BY o.OrderDate;
```

| OrderID | OrderDate  | TotalAmount | RunningTotal |
|---------|------------|-------------|--------------|
| 1001    | 2025-01-15 | 250.00      | 250.00       |
| 1002    | 2025-01-18 | 130.00      | 380.00       |
| 1003    | 2025-02-02 | 475.00      | 855.00       |
| 1004    | 2025-02-14 | 320.00      | 1175.00      |
| 1005    | 2025-03-10 | 575.00      | 1750.00      |

Calculate a running total of revenue per customer:

```sql
SELECT
    o.OrderID,
    c.FirstName,
    c.LastName,
    o.OrderDate,
    o.TotalAmount,
    SUM(o.TotalAmount) OVER (
        PARTITION BY o.CustomerID
        ORDER BY o.OrderDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS CustomerRunningTotal
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
ORDER BY c.LastName, o.OrderDate;
```

### Practical Takeaway

Running totals are essential for cumulative revenue reports, budget tracking, and progress-toward-goal dashboards. Always include `ORDER BY` inside `OVER()` -- without it, the sum has no defined accumulation sequence. When building partitioned running totals, remember that the accumulation resets at the start of each partition.

---

## Lesson 8.6 -- Moving Averages

### Why This Matters

Raw data is noisy. Daily revenue can swing wildly based on individual large orders. A moving average smooths out these fluctuations by averaging a fixed number of recent rows, making trends easier to spot. Moving averages are widely used in sales analysis, financial reporting, and product analytics.

### Explanation

A moving average uses a **window frame** to define exactly which rows are included in the calculation. The frame is specified with `ROWS BETWEEN`:

```sql
AVG(column) OVER (
    ORDER BY column
    ROWS BETWEEN N PRECEDING AND CURRENT ROW
)
```

This computes the average of the current row and the N rows before it. For example, `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` creates a 3-row moving average (the current row plus the two before it).

Common frame specifications:

| Frame Clause | Meaning |
|-------------|---------|
| `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` | Current row + 2 previous rows (3-row window) |
| `ROWS BETWEEN 4 PRECEDING AND CURRENT ROW` | Current row + 4 previous rows (5-row window) |
| `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` | Previous row + current row + next row (centered 3-row window) |
| `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` | All rows from the start to the current row (cumulative) |

### Example

Calculate a 3-order moving average of revenue, ordered by date:

```sql
SELECT
    o.OrderID,
    o.OrderDate,
    o.TotalAmount,
    ROUND(
        AVG(o.TotalAmount) OVER (
            ORDER BY o.OrderDate
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ), 2
    ) AS MovingAvg3
FROM Orders o
ORDER BY o.OrderDate;
```

| OrderID | OrderDate  | TotalAmount | MovingAvg3 |
|---------|------------|-------------|------------|
| 1001    | 2025-01-15 | 250.00      | 250.00     |
| 1002    | 2025-01-18 | 130.00      | 190.00     |
| 1003    | 2025-02-02 | 475.00      | 285.00     |
| 1004    | 2025-02-14 | 320.00      | 308.33     |
| 1005    | 2025-03-10 | 575.00      | 456.67     |

For the first row, only one value is available, so the average equals itself. For the second row, the average is over two values. From the third row onward, the full 3-row window is used.

Calculate a moving average per product category:

```sql
SELECT
    p.Category,
    o.OrderDate,
    o.TotalAmount,
    ROUND(
        AVG(o.TotalAmount) OVER (
            PARTITION BY p.Category
            ORDER BY o.OrderDate
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ), 2
    ) AS CategoryMovingAvg
FROM Orders o
JOIN Products p ON o.ProductID = p.ProductID
ORDER BY p.Category, o.OrderDate;
```

### Practical Takeaway

Moving averages are your go-to tool for trend analysis. Use them to:

- Smooth daily or weekly revenue for executive dashboards.
- Compare current performance against the recent average to detect spikes or drops.
- Identify seasonality by comparing short-term and long-term moving averages.

Be mindful that the first few rows in each partition will have fewer data points than the full window size. The `ROWS BETWEEN` frame is based on physical row position; if you need a time-based window (e.g., the last 7 calendar days regardless of how many rows exist), use `RANGE BETWEEN` with an interval instead (syntax varies by database engine).

---

## Module Summary

Window functions allow you to perform calculations across related rows without collapsing your result set. Here is a recap of the key concepts covered in this module:

| Concept | Purpose | Key Syntax |
|---------|---------|------------|
| **OVER** | Turns an aggregate into a window function | `SUM(col) OVER ()` |
| **PARTITION BY** | Divides rows into groups for independent calculations | `OVER (PARTITION BY col)` |
| **ROW_NUMBER** | Assigns a unique sequential integer to each row | `ROW_NUMBER() OVER (ORDER BY col)` |
| **RANK / DENSE_RANK** | Assigns ranks with tie handling | `RANK() OVER (ORDER BY col)` |
| **Running Totals** | Cumulative sum that grows row by row | `SUM(col) OVER (ORDER BY col)` |
| **Moving Averages** | Average over a sliding window of N rows | `AVG(col) OVER (ORDER BY col ROWS BETWEEN N PRECEDING AND CURRENT ROW)` |

**Key principles to remember:**

1. Window functions do **not** reduce the number of rows in your output, unlike `GROUP BY`.
2. `ORDER BY` inside `OVER()` defines the sequence for running calculations and ranking.
3. `PARTITION BY` resets the calculation for each group, similar to `GROUP BY` but without collapsing rows.
4. Window frames (`ROWS BETWEEN`) give you precise control over which rows are included in each calculation.
5. You can combine window functions with CTEs and subqueries to filter on computed values (e.g., `WHERE rn = 1`).

---

## References

1. Baraa Khatib Salkini, *SQL Course -- Aggregation & Analytical Functions* (08_Aggregation_Analytical_Functions), InsightLab -- Data & Product Analytics Academy.
2. ISO/IEC 9075 -- SQL Standard, *Window Function Specifications*.
3. Microsoft SQL Server Documentation, "Window Functions (Transact-SQL)." [https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql)
4. PostgreSQL Documentation, "Window Functions." [https://www.postgresql.org/docs/current/tutorial-window.html](https://www.postgresql.org/docs/current/tutorial-window.html)

---

*InsightLab -- Data & Product Analytics Academy | Track 1 -- SQL Foundations to Analytics | Module 8*
