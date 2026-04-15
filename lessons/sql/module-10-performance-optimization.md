# Module 10 -- Performance Optimization

**Track:** Track 1 -- SQL Foundations to Analytics
**Module:** Module 10 -- Performance Optimization

---

## Lesson 10.1 -- Indexes

### Why This Matters

As your database tables grow from hundreds to millions of rows, queries that once ran instantly begin to slow down. Without indexes, the database engine must perform a **full table scan** -- reading every single row to find the data you need. Indexes solve this problem by providing a structured shortcut to locate data quickly, much like a book index helps you jump to the right page instead of reading every page from start to finish.

### Explanation

An **index** is a data structure that provides quick access to data, optimizing the speed of your queries. Instead of scanning every row in a table, the database engine uses the index to navigate directly to the relevant data.

**How data is stored without indexes (Heap):**

Without any index, a table is stored as a **heap** -- data pages with rows in no particular order. When you search for a specific row, the database must scan all data pages one by one. This is called a **full table scan**, and it becomes very slow on large tables.

**The B-Tree structure:**

Most indexes use a **B-Tree (Balanced Tree)** structure. This is a hierarchical structure with three levels:

- **Root Node** -- The top-level entry point for the search.
- **Intermediate Nodes** -- Guide the search toward the correct range of data.
- **Leaf Nodes** -- Contain the actual data or pointers to the data rows.

The B-Tree allows the database to find any row in just a few steps, regardless of table size.

**Types of Indexes:**

Indexes can be categorized by structure, storage, and function:

| Category | Types |
|----------|-------|
| **Structure** | Clustered Index, Non-Clustered Index |
| **Storage** | Rowstore Index, Columnstore Index |
| **Function** | Unique Index, Filtered Index |

**Clustered Index:**

- Physically sorts and stores the table rows based on the index key.
- There can be only **one** clustered index per table.
- The leaf level of a clustered index contains the actual data pages.
- Best for: primary keys, date columns, and range queries.

**Non-Clustered Index:**

- Creates a **separate structure** with pointers back to the data rows.
- A table can have **multiple** non-clustered indexes.
- The leaf level contains index pages that point to the base data pages using a Row ID (RID).
- Best for: columns used frequently in WHERE clauses, JOIN conditions, and exact match queries.

| Feature | Clustered Index | Non-Clustered Index |
|---------|----------------|---------------------|
| Definition | Physically sorts and stores rows | Separate structure with pointers to the data |
| Number per table | One | Multiple |
| Read performance | Faster | Slower |
| Write performance | Slower (data reordering) | Faster (physical order unaffected) |
| Storage | More efficient | Requires additional space |

**Index Syntax:**

```sql
CREATE [CLUSTERED | NONCLUSTERED] INDEX index_name
ON table_name (column1, column2, ...);
```

The default type, when not specified, is NONCLUSTERED.

### Example

Create a clustered index on the Orders table to speed up queries that filter or sort by OrderDate:

```sql
-- Clustered index on the primary key
CREATE CLUSTERED INDEX IX_Orders_OrderID
ON Orders (OrderID);

-- Non-clustered index on a frequently filtered column
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID
ON Orders (CustomerID);

-- Non-clustered index on OrderDate for date-range queries
CREATE NONCLUSTERED INDEX IX_Orders_OrderDate
ON Orders (OrderDate);
```

With these indexes in place, a query like the one below uses an **index seek** (fast, targeted lookup) instead of a full table scan:

```sql
SELECT OrderID, OrderDate, CustomerID
FROM Orders
WHERE CustomerID = 105;
```

### Practical Takeaway

- Every table should have a **clustered index** -- typically on the primary key.
- Add **non-clustered indexes** on columns you frequently use in WHERE, JOIN, and ORDER BY clauses.
- Avoid over-indexing: each additional index slows down INSERT, UPDATE, and DELETE operations because the index must also be maintained.
- Regularly review and drop unused indexes to save storage and improve write performance.
- Update table statistics weekly so the query optimizer makes the best decisions.

### References

- 10_Performance_Optimization.pdf -- Slides 2-18 (Index definition, B-Tree, Clustered Index, Non-Clustered Index, Syntax)
- 10_Performance_Optimization.pdf -- Slide 31 (When to use each index type)
- 10_Performance_Optimization.pdf -- Slide 34 (Indexing strategy)
- 10_SQL 30 Performance Tips.pdf -- Tips #4, #10, #24, #25, #26, #27, #28, #29

---

## Lesson 10.2 -- Query Performance

### Why This Matters

Writing a SQL query that returns the correct result is only half the job. In a production environment with large datasets, a poorly written query can take minutes instead of milliseconds. Understanding how the database engine executes your queries -- and how to measure and improve that execution -- is essential for any analyst or developer working with real-world data.

### Explanation

**How the database executes a query:**

When you submit a SQL query, the database engine goes through several steps:

1. **Parsing** -- Checks the syntax of your query.
2. **Optimization** -- The query optimizer evaluates different ways to retrieve the data (called execution plans) and picks the most efficient one.
3. **Execution** -- The engine runs the chosen plan, using table scans, index scans, or index seeks to access data.

**Key execution methods:**

| Method | Description | Speed |
|--------|-------------|-------|
| **Table Scan** | Reads every row in the table (heap) | Slowest |
| **Index Scan** | Reads every row through the index | Moderate |
| **Index Seek** | Jumps directly to the matching rows via the index | Fastest |

The goal is to write queries that enable the optimizer to use **index seeks** rather than full scans.

**What breaks index usage:**

Several common patterns prevent the database from using indexes effectively:

1. **Applying functions to columns in WHERE clauses.** When you wrap a column in a function, the database cannot use the index on that column.

2. **Starting LIKE patterns with a wildcard.** A pattern like `%example` forces a full scan because the database cannot predict where to start in the index.

3. **Using DISTINCT or ORDER BY unnecessarily.** Both operations require additional sorting, which adds processing time.

4. **Outdated statistics.** If the query optimizer has stale information about data distribution, it may choose a poor execution plan (for example, an index scan instead of a seek).

**Always test with the Execution Plan:**

The execution plan is a visual or textual representation of how the database engine will execute your query. It shows you whether the engine is using scans or seeks, and where bottlenecks exist. Always review the execution plan when troubleshooting slow queries.

### Example

**Bad: Function on column prevents index usage**

```sql
-- The YEAR() function prevents the index on OrderDate from being used
SELECT OrderID, OrderDate
FROM Orders
WHERE YEAR(OrderDate) = 2024;
```

**Good: Rewrite to allow index usage**

```sql
-- Use a date range instead, so the index on OrderDate can be used
SELECT OrderID, OrderDate
FROM Orders
WHERE OrderDate >= '2024-01-01'
  AND OrderDate < '2025-01-01';
```

**Bad: Leading wildcard disables index**

```sql
-- Leading wildcard forces a full scan
SELECT CustomerID, FirstName, LastName
FROM Customers
WHERE LastName LIKE '%son';
```

**Good: Use trailing wildcard when possible**

```sql
-- Trailing wildcard allows index usage
SELECT CustomerID, FirstName, LastName
FROM Customers
WHERE LastName LIKE 'John%';
```

**Using IN instead of multiple OR conditions:**

```sql
-- Instead of this:
SELECT OrderID, ProductID
FROM Orders
WHERE ProductID = 1 OR ProductID = 5 OR ProductID = 12;

-- Write this for better readability and performance:
SELECT OrderID, ProductID
FROM Orders
WHERE ProductID IN (1, 5, 12);
```

### Practical Takeaway

- Avoid wrapping columns in functions inside WHERE clauses -- rewrite the condition so the column stands alone.
- Never start a LIKE pattern with `%` unless absolutely necessary.
- Use `IN` instead of multiple `OR` conditions for cleaner and faster queries.
- Use `DISTINCT` and `ORDER BY` only when the result truly requires them.
- Limit rows during exploration with `TOP` to avoid fetching unnecessary data.
- Always review the execution plan for slow queries to identify table scans and other bottlenecks.
- Update table statistics regularly so the optimizer has current information.

### References

- 10_Performance_Optimization.pdf -- Slide 32 (How DB executes indexes: table scan, index scan, index seek)
- 10_SQL 30 Performance Tips.pdf -- Tips #2, #3, #5, #6, #7, #28

---

## Lesson 10.3 -- Avoiding SELECT *

### Why This Matters

`SELECT *` is one of the first things you learn in SQL, and it is convenient for quick exploration. However, using it in production queries, reports, or application code is a common source of poor performance. Understanding why -- and knowing what to do instead -- is a simple change that can make a noticeable difference in query speed and resource usage.

### Explanation

When you write `SELECT *`, you are telling the database to return **every column** from the table, even the ones you do not need. This causes several problems:

**1. Increased I/O and network traffic:**
The database must read more data from disk and send more data across the network. If a table has 20 columns but you only need 3, you are transferring roughly 7 times more data than necessary.

**2. Reduced effectiveness of indexes:**
Non-clustered indexes store only the indexed columns (plus a pointer to the full row). When you select only the indexed columns, the database can satisfy the query entirely from the index -- this is called a **covering index** or **index-only scan**. When you use `SELECT *`, the database must go back to the base data pages to retrieve all the other columns, adding extra work (a **key lookup**).

**3. Fragile application code:**
If the table structure changes (columns are added, renamed, or removed), queries using `SELECT *` may break or return unexpected results.

**The columnstore advantage when selecting specific columns:**

This connects to index storage types as well. A **columnstore index** organizes data column by column rather than row by row. When you select only specific columns, the database reads only those column segments. When you use `SELECT *`, it must read all column segments, eliminating the primary benefit of columnstore storage.

### Example

**Bad: Using SELECT ***

```sql
-- Returns all columns, even those not needed
SELECT *
FROM Orders;
```

**Good: Select only the columns you need**

```sql
-- Returns only the columns needed for the report
SELECT OrderID, CustomerID, OrderDate
FROM Orders;
```

**Covering index scenario:**

If you have this index:

```sql
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID
ON Orders (CustomerID)
INCLUDE (OrderDate);
```

Then the following query can be answered entirely from the index, without touching the base table:

```sql
-- This query is "covered" by the index
SELECT CustomerID, OrderDate
FROM Orders
WHERE CustomerID = 210;
```

But if you write `SELECT *`, the database must perform an additional key lookup to retrieve the remaining columns, making the query slower.

### Practical Takeaway

- Always list the specific columns you need instead of using `SELECT *`.
- This reduces I/O, lowers network traffic, and allows the optimizer to use covering indexes.
- During exploration, if you want to see what a table looks like, use `SELECT TOP 10 *` to limit the data returned.
- In production queries, dashboards, and reports, never use `SELECT *`.

### References

- 10_SQL 30 Performance Tips.pdf -- Tip #1 (Only select the columns you need; avoid SELECT *)
- 10_SQL 30 Performance Tips.pdf -- Tip #3 (Use TOP for exploration)
- 10_Performance_Optimization.pdf -- Slides 19-23 (Rowstore vs. Columnstore: column-level I/O efficiency)

---

## Lesson 10.4 -- Join Optimization

### Why This Matters

Joins are how you combine data from multiple tables, and they are at the heart of relational databases. But joins on large tables are one of the most common causes of slow queries. Small adjustments to how you write and structure your joins can dramatically reduce execution time -- from minutes to seconds.

### Explanation

**1. Use INNER JOIN when possible:**

Different join types have different performance characteristics. An `INNER JOIN` returns only matching rows from both tables, which typically produces a smaller result set than `LEFT JOIN`, `RIGHT JOIN`, or `FULL JOIN`. A smaller result set means less work for the database engine. Only use outer joins when you genuinely need unmatched rows.

**2. Use explicit ANSI-style join syntax:**

Always write joins using the explicit `INNER JOIN`, `LEFT JOIN` syntax rather than the older implicit style with comma-separated tables and conditions in the WHERE clause. Explicit syntax is easier to read, less error-prone, and allows the optimizer to work more efficiently.

**3. Index the columns used in JOIN conditions:**

The columns in the `ON` clause of your joins should be indexed. Without indexes on join columns, the database may resort to **nested loops** -- scanning one table for every row in the other -- which is extremely slow on large tables. Adding non-clustered indexes on foreign key columns used in joins is one of the highest-impact optimizations you can make.

**4. Filter before joining:**

When working with large tables, apply WHERE conditions **before** the join to reduce the number of rows being processed. You can do this with subqueries, CTEs, or by ensuring your WHERE clause filters are applied to the driving table first.

**5. Aggregate before joining:**

If you need aggregated data from a large table, perform the aggregation first (using a subquery or CTE), and then join the smaller, aggregated result to the other table. This avoids joining millions of raw rows when only summary data is needed.

**6. Replace OR in join logic with UNION:**

When join conditions contain `OR`, the optimizer may struggle to use indexes effectively. Replacing the `OR` with separate queries joined by `UNION` can improve performance.

**7. Use UNION ALL instead of UNION when duplicates are acceptable:**

`UNION` removes duplicates by performing an implicit `DISTINCT` operation, which requires sorting. If you know there will be no duplicates (or duplicates are acceptable), use `UNION ALL` -- it is faster because it skips the deduplication step.

### Example

**Filter before joining:**

```sql
-- Bad: Joins all rows first, then filters
SELECT o.OrderID, o.OrderDate, c.FirstName, c.LastName
FROM Orders o
INNER JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE o.OrderDate >= '2024-01-01';

-- Better: Filter Orders first using a CTE, then join
WITH RecentOrders AS (
    SELECT OrderID, OrderDate, CustomerID
    FROM Orders
    WHERE OrderDate >= '2024-01-01'
)
SELECT ro.OrderID, ro.OrderDate, c.FirstName, c.LastName
FROM RecentOrders ro
INNER JOIN Customers c ON ro.CustomerID = c.CustomerID;
```

**Aggregate before joining:**

```sql
-- Bad: Joins all order rows to Products, then aggregates
SELECT p.ProductName, SUM(o.Quantity) AS TotalQuantity
FROM Orders o
INNER JOIN Products p ON o.ProductID = p.ProductID
GROUP BY p.ProductName;

-- Better: Aggregate Orders first, then join to Products
WITH OrderTotals AS (
    SELECT ProductID, SUM(Quantity) AS TotalQuantity
    FROM Orders
    GROUP BY ProductID
)
SELECT p.ProductName, ot.TotalQuantity
FROM OrderTotals ot
INNER JOIN Products p ON ot.ProductID = p.ProductID;
```

**Index join columns:**

```sql
-- Create indexes on foreign key columns used in joins
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID
ON Orders (CustomerID);

CREATE NONCLUSTERED INDEX IX_Orders_ProductID
ON Orders (ProductID);
```

**UNION ALL instead of UNION:**

```sql
-- If duplicates are acceptable, UNION ALL is faster
SELECT CustomerID FROM Orders WHERE OrderDate >= '2024-01-01'
UNION ALL
SELECT CustomerID FROM Orders WHERE ProductID = 7;
```

### Practical Takeaway

- Prefer `INNER JOIN` over outer joins unless you specifically need unmatched rows.
- Always use explicit ANSI-style join syntax (`INNER JOIN ... ON`) instead of implicit comma joins.
- Index every column that appears in a JOIN `ON` clause -- especially foreign keys.
- Filter and aggregate large tables **before** joining them to reduce the dataset size.
- Replace `OR` conditions in join logic with `UNION` where possible.
- Use `UNION ALL` instead of `UNION` when duplicate rows are acceptable, to avoid the overhead of deduplication.
- Check the execution plan for **nested loop** warnings, which indicate missing indexes on join columns.

### References

- 10_SQL 30 Performance Tips.pdf -- Tips #8, #9, #10, #11, #12, #13, #14, #15, #16
- 10_Performance_Optimization.pdf -- Slide 31 (Non-clustered index for foreign keys, joins, and filters)
- 10_Performance_Optimization.pdf -- Slide 34 (Indexing strategy: scenario-based indexing)

---

## Module Summary

Performance optimization is about writing SQL that is not only correct but also efficient. This module covered four foundational topics:

| Lesson | Key Concept |
|--------|-------------|
| **10.1 -- Indexes** | Indexes are data structures (B-Tree) that speed up data retrieval. Use clustered indexes on primary keys and non-clustered indexes on columns used in WHERE, JOIN, and ORDER BY. Avoid over-indexing. |
| **10.2 -- Query Performance** | Write queries that allow the optimizer to use index seeks. Avoid functions on columns in WHERE clauses, leading wildcards in LIKE, and unnecessary DISTINCT/ORDER BY. Always check the execution plan. |
| **10.3 -- Avoiding SELECT \*** | Always specify only the columns you need. This reduces I/O, enables covering indexes, and improves overall query speed. |
| **10.4 -- Join Optimization** | Use INNER JOIN when possible, index join columns, filter and aggregate before joining large tables, and prefer UNION ALL over UNION when duplicates are acceptable. |

The overarching principle is: **always test using the execution plan**. The execution plan shows you exactly how the database engine processes your query and where the bottlenecks are.

---

## Consolidated References

- **10_Performance_Optimization.pdf** (Baraa Khatib Salkini -- SQL Course | Indexes)
  - Slide 2: Index definition
  - Slides 3-6: Index types, data pages, heap structure
  - Slides 7-8: B-Tree structure
  - Slides 9-12: Clustered index and data page relationship
  - Slides 13-16: Non-clustered index structure and comparison
  - Slide 17: Clustered vs. Non-Clustered comparison table
  - Slide 18: Index syntax (CREATE INDEX)
  - Slides 19-23: Rowstore vs. Columnstore indexes
  - Slides 25-27: Unique index
  - Slides 28-30: Filtered index
  - Slide 31: When to use each index type
  - Slide 32: How DB executes indexes (table scan, index scan, index seek)
  - Slide 33: OLAP vs. OLTP indexing
  - Slide 34: Indexing strategy (initial, usage patterns, scenario-based, monitoring)

- **10_SQL 30 Performance Tips.pdf** (Baraa Khatib Salkini -- SQL 30 Performance Tips Cheat Sheet)
  - Tip #1: Avoid SELECT *
  - Tip #2: Avoid unnecessary DISTINCT and ORDER BY
  - Tip #3: Use TOP for exploration
  - Tip #4: Create non-clustered indexes on frequently filtered columns
  - Tip #5: Avoid functions on columns in WHERE
  - Tip #6: Avoid leading wildcards
  - Tip #7: Use IN instead of multiple OR
  - Tips #8-16: Join optimization (INNER JOIN, explicit syntax, indexed join columns, filter before join, aggregate before join, UNION vs. UNION ALL)
  - Tip #17: Columnstore indexes for heavy aggregations
  - Tip #18: Pre-aggregate for faster reporting
  - Tips #19-20: Subquery and CTE best practices
  - Tips #21-25: DDL best practices (data types, NOT NULL, primary keys, foreign key indexes)
  - Tips #26-30: Index maintenance (avoid over-indexing, drop unused indexes, update statistics, rebuild fragmented indexes, partitioning with columnstore)
