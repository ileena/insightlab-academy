# Module 7 – Aggregation

**Track:** Track 1 – SQL Foundations to Analytics
**Module:** Module 7 – Aggregation
**Academy:** InsightLab – Data & Product Analytics Academy

---

## Introduction

Aggregation is at the heart of data analytics. While individual rows of data tell a story about a single event, aggregation lets you step back and see the bigger picture: totals, averages, counts, and extremes across entire datasets or meaningful groups within them. This module covers the core SQL aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) and the grouping mechanisms (`GROUP BY`, `HAVING`) that give them real analytical power.

All examples in this module use the **SalesDB** schema, which contains four tables:

| Table | Description |
|-------|-------------|
| **Products** | Product catalog (ProductID, ProductName, Category, Price) |
| **Customers** | Customer records (CustomerID, CustomerName, City, Country) |
| **Orders** | Central transaction table (OrderID, CustomerID, EmployeeID, ProductID, Quantity, TotalAmount, OrderDate) |
| **Employees** | Staff records (EmployeeID, EmployeeName, Department, HireDate) |

**Orders** is the central table that links to Products, Customers, and Employees.

---

## 7.1 – COUNT

### Why This Matters

Before you analyze data, you need to know how much data you have. `COUNT` is the most fundamental aggregate function. It answers questions like "How many orders were placed?" or "How many customers do we have?" In product analytics, counting events, users, and transactions is often the first step in any investigation.

### Explanation

The `COUNT` function returns the number of rows that match a specified condition.

- **`COUNT(*)`** counts all rows in the result set, including rows with `NULL` values.
- **`COUNT(column_name)`** counts only the rows where the specified column is **not** `NULL`.
- **`COUNT(DISTINCT column_name)`** counts the number of unique, non-`NULL` values in a column.

The distinction between these forms is important. `COUNT(*)` gives you the total number of rows, while `COUNT(column_name)` can give you a different result if that column contains `NULL` values.

### Example

**How many orders exist in the database?**

```sql
SELECT COUNT(*) AS TotalOrders
FROM Orders;
```

**How many distinct customers have placed at least one order?**

```sql
SELECT COUNT(DISTINCT CustomerID) AS UniqueCustomers
FROM Orders;
```

**How many orders have a recorded TotalAmount?**

```sql
SELECT COUNT(TotalAmount) AS OrdersWithAmount
FROM Orders;
```

### Practical Takeaway

Use `COUNT(*)` when you want the total number of rows. Use `COUNT(DISTINCT column)` when you need to know how many unique entities exist. Always be aware of `NULL` values -- `COUNT(column)` silently skips them, which can lead to undercounting if you are not careful.

---

## 7.2 – SUM

### Why This Matters

Revenue, total units sold, cumulative costs -- these are the numbers that drive business decisions. `SUM` lets you add up numeric values across rows, transforming individual transaction records into meaningful totals. It is one of the most frequently used functions in financial and sales reporting.

### Explanation

The `SUM` function calculates the total of a numeric column across all rows in the result set. It ignores `NULL` values automatically. If all values in the column are `NULL`, `SUM` returns `NULL` (not zero).

`SUM` works only on numeric data types (integers, decimals, floats). Attempting to use `SUM` on a text column will produce an error.

### Example

**What is the total revenue from all orders?**

```sql
SELECT SUM(TotalAmount) AS TotalRevenue
FROM Orders;
```

**What is the total quantity of products sold?**

```sql
SELECT SUM(Quantity) AS TotalUnitsSold
FROM Orders;
```

**What is the total revenue for the year 2025?**

```sql
SELECT SUM(TotalAmount) AS Revenue2025
FROM Orders
WHERE OrderDate >= '2025-01-01'
  AND OrderDate < '2026-01-01';
```

### Practical Takeaway

`SUM` is your go-to function for calculating totals. Remember that it skips `NULL` values silently. If a column might contain `NULL` values and you need to treat them as zero, wrap the column with `COALESCE(column, 0)` before summing.

---

## 7.3 – AVG

### Why This Matters

Averages reveal the typical case. What is the average order value? What is the average quantity per order? These metrics help analysts understand normal behavior, set benchmarks, and detect anomalies. In product analytics, average revenue per user (ARPU) and average order value (AOV) are key performance indicators.

### Explanation

The `AVG` function calculates the arithmetic mean of a numeric column. Like `SUM`, it ignores `NULL` values. This is an important detail: `AVG` divides the sum by the count of **non-NULL** values, not the total number of rows.

For example, if you have five rows and two of them have `NULL` in the target column, `AVG` will divide the sum of the three non-NULL values by 3, not by 5.

### Example

**What is the average order amount?**

```sql
SELECT AVG(TotalAmount) AS AvgOrderValue
FROM Orders;
```

**What is the average quantity per order?**

```sql
SELECT AVG(Quantity) AS AvgQuantityPerOrder
FROM Orders;
```

**What is the average order amount for a specific product?**

```sql
SELECT AVG(TotalAmount) AS AvgAmountForProduct
FROM Orders
WHERE ProductID = 101;
```

### Practical Takeaway

`AVG` is essential for understanding typical values in your data. Be cautious with `NULL` handling: if `NULL` means "zero" in your business context (rather than "unknown"), convert it before averaging using `AVG(COALESCE(column, 0))`. Also consider whether the mean is the right measure -- outliers can heavily skew averages.

---

## 7.4 – MIN

### Why This Matters

Knowing the smallest value in a dataset answers critical questions: What was our lowest sale? When was the first order placed? What is our cheapest product? `MIN` helps you find boundaries, identify edge cases, and establish baselines for comparison.

### Explanation

The `MIN` function returns the smallest value in a column. It works on numeric columns, date/time columns, and even string columns (where it returns the value that comes first in alphabetical order). `NULL` values are ignored.

### Example

**What is the smallest order amount?**

```sql
SELECT MIN(TotalAmount) AS SmallestOrder
FROM Orders;
```

**When was the first order placed?**

```sql
SELECT MIN(OrderDate) AS FirstOrderDate
FROM Orders;
```

**What is the lowest-priced product?**

```sql
SELECT MIN(Price) AS LowestPrice
FROM Products;
```

### Practical Takeaway

Use `MIN` to find lower bounds and earliest dates. It is especially useful in data quality checks -- an unexpectedly low minimum (such as a negative order amount) can reveal data entry errors or system bugs.

---

## 7.5 – MAX

### Why This Matters

The counterpart to `MIN`, the `MAX` function identifies upper bounds: your highest-value sale, your most recent order, your most expensive product. Together, `MIN` and `MAX` define the range of your data and are often the first functions analysts use when exploring a new dataset.

### Explanation

The `MAX` function returns the largest value in a column. Like `MIN`, it works on numeric, date/time, and string columns. `NULL` values are ignored.

Using `MIN` and `MAX` together is a common pattern to quickly understand the spread of values in a dataset.

### Example

**What is the largest order amount?**

```sql
SELECT MAX(TotalAmount) AS LargestOrder
FROM Orders;
```

**When was the most recent order placed?**

```sql
SELECT MAX(OrderDate) AS MostRecentOrder
FROM Orders;
```

**What is the range of order amounts?**

```sql
SELECT
    MIN(TotalAmount) AS SmallestOrder,
    MAX(TotalAmount) AS LargestOrder,
    MAX(TotalAmount) - MIN(TotalAmount) AS OrderRange
FROM Orders;
```

### Practical Takeaway

Combine `MIN` and `MAX` to understand the range of your data. When exploring a new table, running `SELECT MIN(col), MAX(col)` on key columns is a quick and effective way to understand what you are working with.

---

## 7.6 – GROUP BY

### Why This Matters

Aggregate functions become truly powerful when combined with `GROUP BY`. Instead of computing a single total across the entire table, `GROUP BY` lets you compute totals, averages, and counts for each group separately. "Total revenue" is useful, but "total revenue by product category" or "total revenue by customer" is where real analytical insight begins.

### Explanation

The `GROUP BY` clause divides the result set into groups based on one or more columns. Aggregate functions then operate independently on each group, returning one row per group.

**Key rules:**

1. Every column in the `SELECT` list must either be inside an aggregate function or be listed in the `GROUP BY` clause.
2. `GROUP BY` is processed after `WHERE` but before `ORDER BY`.
3. You can group by multiple columns to create finer-grained groups.

**SQL execution order with GROUP BY:**

```
FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY
```

### Example

**Total revenue by product:**

```sql
SELECT
    ProductID,
    SUM(TotalAmount) AS ProductRevenue
FROM Orders
GROUP BY ProductID;
```

**Number of orders per customer:**

```sql
SELECT
    CustomerID,
    COUNT(*) AS NumberOfOrders
FROM Orders
GROUP BY CustomerID;
```

**Average order value by employee, sorted highest to lowest:**

```sql
SELECT
    EmployeeID,
    AVG(TotalAmount) AS AvgOrderValue,
    COUNT(*) AS OrderCount
FROM Orders
GROUP BY EmployeeID
ORDER BY AvgOrderValue DESC;
```

**Revenue by product category (using a JOIN):**

```sql
SELECT
    p.Category,
    SUM(o.TotalAmount) AS CategoryRevenue,
    COUNT(*) AS NumberOfOrders
FROM Orders o
JOIN Products p ON o.ProductID = p.ProductID
GROUP BY p.Category
ORDER BY CategoryRevenue DESC;
```

### Practical Takeaway

`GROUP BY` is one of the most important clauses in analytical SQL. Remember the rule: every non-aggregated column in `SELECT` must appear in `GROUP BY`. If you get an error about a column not being in the `GROUP BY` clause, check your `SELECT` list first.

---

## 7.7 – HAVING

### Why This Matters

`WHERE` filters individual rows before grouping occurs. But what if you want to filter groups after aggregation? For example, "show me only customers who have placed more than 5 orders" or "show me only products with total revenue above 10,000." This is exactly what `HAVING` does -- it filters the results of grouped and aggregated data.

### Explanation

The `HAVING` clause filters groups produced by `GROUP BY` based on aggregate conditions. It is evaluated **after** grouping and aggregation, which is why it can reference aggregate functions while `WHERE` cannot.

**`WHERE` vs. `HAVING`:**

| Clause | Filters | Evaluated | Can Use Aggregates? |
|--------|---------|-----------|---------------------|
| `WHERE` | Individual rows | Before `GROUP BY` | No |
| `HAVING` | Groups | After `GROUP BY` | Yes |

A common mistake is using `WHERE` with an aggregate function. For example, `WHERE COUNT(*) > 5` will produce an error. You must use `HAVING COUNT(*) > 5` instead.

### Example

**Customers who have placed more than 3 orders:**

```sql
SELECT
    CustomerID,
    COUNT(*) AS NumberOfOrders
FROM Orders
GROUP BY CustomerID
HAVING COUNT(*) > 3;
```

**Products with total revenue exceeding 50,000:**

```sql
SELECT
    ProductID,
    SUM(TotalAmount) AS ProductRevenue
FROM Orders
GROUP BY ProductID
HAVING SUM(TotalAmount) > 50000;
```

**Combining WHERE and HAVING -- employees with more than 10 orders in 2025:**

```sql
SELECT
    EmployeeID,
    COUNT(*) AS OrderCount,
    SUM(TotalAmount) AS TotalRevenue
FROM Orders
WHERE OrderDate >= '2025-01-01'
  AND OrderDate < '2026-01-01'
GROUP BY EmployeeID
HAVING COUNT(*) > 10
ORDER BY TotalRevenue DESC;
```

**Product categories with an average order value above 500:**

```sql
SELECT
    p.Category,
    AVG(o.TotalAmount) AS AvgOrderValue,
    COUNT(*) AS NumberOfOrders
FROM Orders o
JOIN Products p ON o.ProductID = p.ProductID
GROUP BY p.Category
HAVING AVG(o.TotalAmount) > 500
ORDER BY AvgOrderValue DESC;
```

### Practical Takeaway

Use `WHERE` to filter rows before grouping, and `HAVING` to filter groups after aggregation. A well-structured query often uses both: `WHERE` narrows down the raw data, `GROUP BY` organizes it, and `HAVING` removes groups that do not meet your criteria. This combination is a fundamental pattern in analytical SQL.

---

## Module Summary

This module covered the core building blocks of SQL aggregation:

| Lesson | Topic | Purpose |
|--------|-------|---------|
| 7.1 | `COUNT` | Count rows, non-NULL values, or distinct values |
| 7.2 | `SUM` | Calculate the total of a numeric column |
| 7.3 | `AVG` | Calculate the arithmetic mean of a numeric column |
| 7.4 | `MIN` | Find the smallest value in a column |
| 7.5 | `MAX` | Find the largest value in a column |
| 7.6 | `GROUP BY` | Divide results into groups for per-group aggregation |
| 7.7 | `HAVING` | Filter groups based on aggregate conditions |

**Key concepts to remember:**

- All aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) ignore `NULL` values, except `COUNT(*)` which counts all rows.
- `GROUP BY` transforms your query from producing a single aggregate result to producing one result per group.
- Every non-aggregated column in `SELECT` must appear in `GROUP BY`.
- `WHERE` filters rows before grouping; `HAVING` filters groups after aggregation.
- The SQL execution order is: `FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `SELECT` -> `ORDER BY`.

These aggregation tools form the foundation for more advanced analytics, including window functions, subqueries with aggregation, and complex reporting queries.

---

## References

1. Baraa Khatib Salkini, *SQL Course – Aggregation & Analytical Functions* (08_Aggregation_Analytical_Functions).
2. ISO/IEC 9075 – SQL Standard Documentation (Aggregate Functions and GROUP BY Clause).
3. Microsoft SQL Server Documentation – [Aggregate Functions (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql).
4. PostgreSQL Documentation – [Aggregate Functions](https://www.postgresql.org/docs/current/functions-aggregate.html).
