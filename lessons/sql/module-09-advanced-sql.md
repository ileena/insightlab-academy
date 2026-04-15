# Module 9 -- Advanced SQL

**Track:** Track 1 -- SQL Foundations to Analytics
**Module:** Module 9 -- Advanced SQL

---

## Lesson 9.1 -- Subqueries

### Why This Matters

Subqueries let you break a complex question into smaller, manageable parts. In analytics work you will often need the result of one query to feed into another -- for example, finding all orders whose total exceeds the company-wide average. Without subqueries you would need multiple manual steps; with them, a single statement can do the job.

### Explanation

A **subquery** (also called an inner query or nested query) is a SELECT statement embedded inside another SQL statement. The outer query uses the result of the inner query as though it were a value, a list of values, or even a temporary table.

Subqueries can appear in three places:

| Location | Purpose | Returns |
|---|---|---|
| WHERE clause | Filter rows based on a calculated value or list | A single value or a set of values |
| FROM clause (inline view) | Treat a derived result set as a virtual table | A result set (rows and columns) |
| SELECT clause (scalar) | Compute a per-row value | Exactly one value per row |

**Key rules:**

- A subquery is always enclosed in parentheses.
- A subquery in the WHERE clause that uses `=`, `<`, or `>` must return exactly one value (a scalar subquery).
- Use `IN` when the subquery may return multiple values.
- Subqueries in the FROM clause must be given an alias.

### Example

**Scalar subquery in WHERE -- find orders above the average order amount:**

```sql
SELECT OrderID, CustomerID, TotalAmount
FROM Orders
WHERE TotalAmount > (
    SELECT AVG(TotalAmount)
    FROM Orders
);
```

**Subquery with IN -- find customers who have placed at least one order:**

```sql
SELECT CustomerID, FirstName, LastName
FROM Customers
WHERE CustomerID IN (
    SELECT DISTINCT CustomerID
    FROM Orders
);
```

**Subquery in FROM -- rank products by total revenue:**

```sql
SELECT sub.ProductID, sub.TotalRevenue
FROM (
    SELECT ProductID, SUM(TotalAmount) AS TotalRevenue
    FROM Orders
    GROUP BY ProductID
) AS sub
ORDER BY sub.TotalRevenue DESC;
```

### Practical Takeaway

Start with the inner query first. Write it, run it, and confirm it returns what you expect. Then wrap it inside the outer query. This two-step habit prevents hard-to-debug errors and is the most reliable way to build subqueries in day-to-day analytics.

### References

- 09_Advanced_SQL_Techniques.pdf (PDF could not be parsed due to system tool limitations; content grounded in standard SQL knowledge per CONTENT_RULES.md source policy)
- Standard SQL documentation (ISO/IEC 9075)

---

## Lesson 9.2 -- Correlated Subqueries

### Why This Matters

A regular subquery runs once and hands its result to the outer query. A correlated subquery runs once for every row the outer query processes, which means it can reference columns from the outer query. This unlocks row-by-row comparisons that ordinary subqueries cannot express -- for example, finding each customer's most recent order.

### Explanation

A **correlated subquery** is a subquery that references one or more columns from the outer query. Because the inner query depends on the current row of the outer query, the database must re-evaluate it for each row.

**How to recognize a correlated subquery:** look inside the inner query for a table alias or column that belongs to the outer query.

**Execution flow (conceptual):**

1. The outer query picks a row.
2. The inner query executes using values from that row.
3. The inner query returns a result.
4. The outer query uses that result to decide whether to include the row.
5. Repeat for the next outer row.

**Performance note:** Because the inner query executes many times, correlated subqueries can be slower on large tables. In many cases they can be rewritten as JOINs or window functions for better performance. However, they remain valuable for readability and for situations where alternatives are not straightforward.

### Example

**Find each customer's most recent order:**

```sql
SELECT o.OrderID, o.CustomerID, o.OrderDate, o.TotalAmount
FROM Orders o
WHERE o.OrderDate = (
    SELECT MAX(o2.OrderDate)
    FROM Orders o2
    WHERE o2.CustomerID = o.CustomerID
);
```

Here, `o2.CustomerID = o.CustomerID` is the correlation -- the inner query refers to the outer query's current row.

**Find products that have generated above-average revenue compared to all products:**

```sql
SELECT p.ProductID, p.ProductName
FROM Products p
WHERE (
    SELECT SUM(o.TotalAmount)
    FROM Orders o
    WHERE o.ProductID = p.ProductID
) > (
    SELECT AVG(TotalRevenue)
    FROM (
        SELECT SUM(TotalAmount) AS TotalRevenue
        FROM Orders
        GROUP BY ProductID
    ) AS rev
);
```

**Using EXISTS with a correlated subquery -- find customers who have placed orders:**

```sql
SELECT c.CustomerID, c.FirstName, c.LastName
FROM Customers c
WHERE EXISTS (
    SELECT 1
    FROM Orders o
    WHERE o.CustomerID = c.CustomerID
);
```

`EXISTS` returns TRUE as soon as the inner query finds at least one matching row, making it efficient for existence checks.

### Practical Takeaway

Use correlated subqueries when each row needs its own individual lookup. Pair them with `EXISTS` for simple yes/no existence checks. If performance becomes a concern on large data sets, consider rewriting the logic with a JOIN or a window function, but start with the correlated subquery for clarity.

### References

- 09_Advanced_SQL_Techniques.pdf (PDF could not be parsed due to system tool limitations; content grounded in standard SQL knowledge per CONTENT_RULES.md source policy)
- Standard SQL documentation (ISO/IEC 9075)

---

## Lesson 9.3 -- Common Table Expressions (CTEs)

### Why This Matters

As queries grow in complexity -- multiple subqueries, several layers of nesting -- they become difficult to read, test, and maintain. Common Table Expressions (CTEs) solve this by letting you define named, temporary result sets at the top of your query. They make advanced SQL readable and modular, which is critical in analytics where queries are often shared across teams.

### Explanation

A **CTE** is a named temporary result set defined using the `WITH` keyword. It exists only for the duration of the single SQL statement that follows it.

**Syntax:**

```sql
WITH cte_name AS (
    SELECT ...
)
SELECT ...
FROM cte_name;
```

**Key characteristics:**

- Defined with the `WITH` keyword before the main SELECT.
- Can be referenced by name in the main query, just like a table.
- Multiple CTEs can be chained, separated by commas.
- A CTE can reference a previously defined CTE in the same WITH block.
- Improves readability by giving meaningful names to intermediate result sets.
- Unlike subqueries in the FROM clause, CTEs sit at the top of the query, making the logical flow easier to follow.

**CTEs vs. subqueries:**

| Feature | Subquery | CTE |
|---|---|---|
| Readability | Can be deeply nested | Flat, top-down structure |
| Reuse within query | Must repeat the subquery | Reference by name multiple times |
| Recursion support | No | Yes (recursive CTEs) |
| Scope | Inline only | Defined before the main query |

### Example

**Single CTE -- calculate total revenue per customer, then filter high-value customers:**

```sql
WITH CustomerRevenue AS (
    SELECT CustomerID, SUM(TotalAmount) AS TotalSpent
    FROM Orders
    GROUP BY CustomerID
)
SELECT c.CustomerID, c.FirstName, c.LastName, cr.TotalSpent
FROM Customers c
JOIN CustomerRevenue cr ON c.CustomerID = cr.CustomerID
WHERE cr.TotalSpent > 5000
ORDER BY cr.TotalSpent DESC;
```

**Multiple CTEs -- compare each customer's spending to the overall average:**

```sql
WITH CustomerRevenue AS (
    SELECT CustomerID, SUM(TotalAmount) AS TotalSpent
    FROM Orders
    GROUP BY CustomerID
),
AvgRevenue AS (
    SELECT AVG(TotalSpent) AS AvgSpent
    FROM CustomerRevenue
)
SELECT c.CustomerID, c.FirstName, cr.TotalSpent, ar.AvgSpent
FROM Customers c
JOIN CustomerRevenue cr ON c.CustomerID = cr.CustomerID
CROSS JOIN AvgRevenue ar
WHERE cr.TotalSpent > ar.AvgSpent;
```

Notice how `AvgRevenue` references `CustomerRevenue` -- CTEs can build on each other.

### Practical Takeaway

Whenever you find yourself nesting subqueries more than one level deep, rewrite with CTEs. Name each CTE after the business concept it represents (e.g., `CustomerRevenue`, `MonthlyTrends`). This practice produces queries that read like a narrative, making them far easier for teammates to review and maintain.

### References

- 09_Advanced_SQL_Techniques.pdf (PDF could not be parsed due to system tool limitations; content grounded in standard SQL knowledge per CONTENT_RULES.md source policy)
- Standard SQL documentation (ISO/IEC 9075)

---

## Lesson 9.4 -- Views

### Why This Matters

In analytics teams, the same base query is often needed by multiple reports, dashboards, and colleagues. Copying and pasting SQL is error-prone -- one person updates the logic, others do not. A **view** solves this by storing a query definition in the database so it can be reused like a table. Views promote consistency, simplify access control, and reduce duplication.

### Explanation

A **view** is a saved SELECT statement stored in the database under a name. It does not store data itself; each time you query the view, the database runs the underlying SELECT.

**Syntax:**

```sql
CREATE VIEW view_name AS
SELECT ...
FROM ...;
```

**To use a view:**

```sql
SELECT * FROM view_name;
```

**To remove a view:**

```sql
DROP VIEW view_name;
```

**To update a view definition:**

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT ...;
```

**Key characteristics:**

- A view behaves like a virtual table in SELECT statements.
- It always reflects the current data in the underlying tables.
- It does not store a separate copy of the data (unlike a materialized view, which some databases support).
- Views can simplify complex joins and calculations by hiding the complexity behind a clean name.
- Views can be used for security -- granting users access to a view without giving them access to the underlying tables.

**When to use views:**

- Repeated queries that multiple users or reports rely on.
- Providing a simplified interface to complex table structures.
- Restricting which columns or rows certain users can see.

### Example

**Create a view for order summaries:**

```sql
CREATE VIEW vw_OrderSummary AS
SELECT
    o.OrderID,
    c.FirstName,
    c.LastName,
    p.ProductName,
    o.OrderDate,
    o.TotalAmount
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
JOIN Products p ON o.ProductID = p.ProductID;
```

**Query the view as if it were a table:**

```sql
SELECT FirstName, LastName, SUM(TotalAmount) AS TotalSpent
FROM vw_OrderSummary
GROUP BY FirstName, LastName
ORDER BY TotalSpent DESC;
```

**Create a view that analysts can use for monthly revenue reporting:**

```sql
CREATE VIEW vw_MonthlyRevenue AS
SELECT
    YEAR(OrderDate) AS OrderYear,
    MONTH(OrderDate) AS OrderMonth,
    SUM(TotalAmount) AS MonthlyRevenue,
    COUNT(OrderID) AS TotalOrders
FROM Orders
GROUP BY YEAR(OrderDate), MONTH(OrderDate);
```

```sql
SELECT * FROM vw_MonthlyRevenue
ORDER BY OrderYear, OrderMonth;
```

### Practical Takeaway

Create views for any query that is used in more than one place. Use a consistent naming convention (e.g., prefix with `vw_`) so views are easily distinguishable from base tables. Remember that views do not cache data -- if performance is a concern on very large datasets, consider materialized views or temp tables instead.

### References

- 09_Advanced_SQL_Techniques.pdf (PDF could not be parsed due to system tool limitations; content grounded in standard SQL knowledge per CONTENT_RULES.md source policy)
- Standard SQL documentation (ISO/IEC 9075)

---

## Lesson 9.5 -- Temporary Tables

### Why This Matters

Some analytical workflows involve multiple steps: calculate an intermediate result, filter it, join it with another table, then aggregate. Subqueries and CTEs handle this within a single statement, but when you need to reuse an intermediate result across multiple separate queries -- or when the intermediate data set is large and you want to avoid recalculating it -- **temporary tables** are the right tool.

### Explanation

A **temporary table** is a real table that the database creates and stores, but only for the duration of the current session (or transaction, depending on the database). When the session ends, the temporary table is automatically dropped.

**Syntax (common across most databases):**

```sql
CREATE TEMPORARY TABLE temp_table_name AS
SELECT ...
FROM ...;
```

Some databases use slightly different syntax:

| Database | Syntax |
|---|---|
| MySQL / PostgreSQL | `CREATE TEMPORARY TABLE ...` |
| SQL Server | `SELECT ... INTO #temp_table_name FROM ...` |
| Oracle | `CREATE GLOBAL TEMPORARY TABLE ...` |

**Key characteristics:**

- Temporary tables store actual data (unlike views).
- They persist for the current session only -- no cleanup required.
- You can index a temporary table for faster querying within your session.
- You can INSERT, UPDATE, and DELETE rows in a temporary table.
- They are visible only to the session that created them -- other users cannot see your temp tables.

**When to use temporary tables:**

- Multi-step analytical workflows where the same intermediate result is needed in several queries.
- Large intermediate results that would be expensive to recalculate.
- Situations where you need to add indexes on intermediate results for performance.

**Temp tables vs. CTEs vs. views:**

| Feature | CTE | View | Temp Table |
|---|---|---|---|
| Stores data | No | No | Yes |
| Persists after query | No | Yes (definition only) | Until session ends |
| Reusable across queries | No | Yes | Yes (within session) |
| Can be indexed | No | No (base tables are) | Yes |
| Visible to other users | No | Yes | No |

### Example

**Create a temp table of high-value customers, then use it in multiple queries:**

```sql
CREATE TEMPORARY TABLE temp_HighValueCustomers AS
SELECT CustomerID, SUM(TotalAmount) AS TotalSpent
FROM Orders
GROUP BY CustomerID
HAVING SUM(TotalAmount) > 10000;
```

**Query 1 -- list the high-value customers with their details:**

```sql
SELECT c.CustomerID, c.FirstName, c.LastName, t.TotalSpent
FROM Customers c
JOIN temp_HighValueCustomers t ON c.CustomerID = t.CustomerID
ORDER BY t.TotalSpent DESC;
```

**Query 2 -- find recent orders from high-value customers:**

```sql
SELECT o.OrderID, o.CustomerID, o.OrderDate, o.TotalAmount
FROM Orders o
JOIN temp_HighValueCustomers t ON o.CustomerID = t.CustomerID
WHERE o.OrderDate >= '2025-01-01'
ORDER BY o.OrderDate DESC;
```

**Query 3 -- product preferences of high-value customers:**

```sql
SELECT p.ProductName, COUNT(o.OrderID) AS TimesOrdered
FROM Orders o
JOIN temp_HighValueCustomers t ON o.CustomerID = t.CustomerID
JOIN Products p ON o.ProductID = p.ProductID
GROUP BY p.ProductName
ORDER BY TimesOrdered DESC;
```

The temp table `temp_HighValueCustomers` was calculated once and reused across three separate queries without recalculation.

### Practical Takeaway

Use temporary tables when your analysis requires multiple separate queries against the same intermediate result. For a single query with intermediate steps, a CTE is simpler and sufficient. For a permanent, shared query definition, use a view. Choosing the right tool depends on scope: single statement (CTE), shared definition (view), or session-level reusable data (temp table).

### References

- 09_Advanced_SQL_Techniques.pdf (PDF could not be parsed due to system tool limitations; content grounded in standard SQL knowledge per CONTENT_RULES.md source policy)
- Standard SQL documentation (ISO/IEC 9075)

---

## Module Summary

Module 9 introduced five advanced SQL techniques that move you beyond basic queries into the kind of structured, maintainable SQL used in professional analytics:

| Lesson | Concept | Core Idea |
|---|---|---|
| 9.1 | Subqueries | Nest one query inside another to filter, compute, or derive data |
| 9.2 | Correlated Subqueries | Inner query references the outer query's current row for row-by-row logic |
| 9.3 | CTEs | Named temporary result sets that make complex queries readable and modular |
| 9.4 | Views | Saved query definitions stored in the database for reuse and consistency |
| 9.5 | Temporary Tables | Session-scoped tables that store intermediate results for multi-step analysis |

**How these concepts connect:**

- **Subqueries** are the foundation -- they let you compose queries within queries.
- **Correlated subqueries** extend that idea by letting the inner query adapt to each outer row.
- **CTEs** are the readability upgrade -- they replace deeply nested subqueries with a clean, top-down structure.
- **Views** take reuse to the database level -- a query definition that the whole team shares.
- **Temp tables** add persistence within a session -- real data you can query multiple times without recalculating.

Together, these tools form the backbone of intermediate-to-advanced analytical SQL. Mastering them will prepare you for Module 10 (Performance Optimization) and Module 11 (SQL for Analytics), where you will apply these techniques to real analytical workflows.

---

## References (Consolidated)

1. **09_Advanced_SQL_Techniques.pdf** -- InsightLab reference material. Note: the PDF file exists at `REFERENCES/SQL/09_Advanced_SQL_Techniques.pdf` but could not be parsed by the system's PDF tool due to platform limitations. Content in this module is grounded in standard industry SQL knowledge, as permitted by CONTENT_RULES.md source policy.
2. **ISO/IEC 9075** -- SQL standard documentation (subqueries, CTEs, views, temporary tables).
3. **PostgreSQL documentation** -- CTE syntax and behavior (https://www.postgresql.org/docs/current/queries-with.html).
4. **MySQL documentation** -- CREATE TEMPORARY TABLE (https://dev.mysql.com/doc/refman/8.0/en/create-temporary-table.html).
5. **Microsoft SQL Server documentation** -- Views and temporary tables (https://learn.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql).
