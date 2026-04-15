# Module 5 -- Joins

**Track 1 -- SQL Foundations to Analytics**

---

## Lesson 5.1 -- Relational Thinking

### Title

Why Tables Need to Be Connected

### Why This Matters

In a relational database, data is deliberately split across multiple tables to reduce redundancy and keep information organized. The Customers table holds customer details, the Products table holds product details, and the Orders table ties everything together. To answer real business questions -- such as "What did each customer order?" -- you need to recombine this data. Understanding relational thinking is the foundation for writing any JOIN query.

### Explanation

There are two ways to combine data from multiple tables in SQL (Slide 2):

- **JOINs** combine data by adding **columns** side by side, using a shared key column to match rows between tables.
- **SET Operators** (such as UNION) combine data by stacking **rows** on top of each other. These are covered in a separate module.

This module focuses entirely on JOINs.

A JOIN works by connecting two tables through a **key column** -- a column that exists in both tables and represents the same entity. For example, `CustomerID` appears in both the Customers table and the Orders table. This shared column is what allows the database to match each order to the correct customer.

As shown in the course material (Slides 3-7), there are three core reasons to join tables:

1. **Recombine Data (Big Picture)** -- Bring together related tables (Customers, Orders, Products) to see the complete picture in a single result set.
2. **Data Enrichment (Extra Info)** -- Add supplementary information from a reference table to a main table, such as adding product category names to an order list.
3. **Check for Existence (Filtering)** -- Use a second table as a lookup filter to find, for example, which customers have placed orders and which have not.

### Example

Consider the SalesDB schema. The Orders table is the central table, and it connects to other tables through key columns:

- `Orders.CustomerID` links to `Customers.CustomerID`
- `Orders.ProductID` links to `Products.ProductID`
- `Orders.EmployeeID` links to `Employees.EmployeeID`

To answer "Which customer placed each order?", you need data from both the Orders table and the Customers table. You connect them using the shared `CustomerID` column:

```sql
SELECT
    o.OrderID,
    c.FirstName,
    c.LastName,
    o.OrderDate
FROM Orders AS o
INNER JOIN Customers AS c
    ON o.CustomerID = c.CustomerID;
```

The `ON` clause specifies the key column used to match rows between the two tables.

### Practical Takeaway

Before writing any JOIN, ask yourself two questions: (1) Which tables contain the data I need? (2) What key column do they share? Once you identify the shared key, you have everything you need to connect the tables.

---

## Lesson 5.2 -- INNER JOIN

### Title

INNER JOIN -- Returning Only Matching Rows

### Why This Matters

INNER JOIN is the most commonly used join type. It returns only the rows where a match is found in both tables. If a row in one table has no corresponding row in the other, it is excluded from the result. This makes INNER JOIN ideal when you need data that is confirmed to exist on both sides -- for example, showing only customers who have actually placed orders.

### Explanation

An INNER JOIN returns only the matching rows from both tables (Slide 11). If a customer exists in the Customers table but has no orders in the Orders table, that customer will not appear in the result. Similarly, if an order references a customer ID that does not exist in the Customers table, that order will not appear either.

Key characteristics of INNER JOIN (Slides 8-11):

- Returns **only common data** -- rows that have a matching key value in both tables.
- The **order of tables does not matter**. Writing `FROM A INNER JOIN B` produces the same result as `FROM B INNER JOIN A`.
- The `ON` clause defines how to match rows between the two tables.

The general syntax is:

```sql
SELECT *
FROM TableA
INNER JOIN TableB
    ON TableA.Key = TableB.Key;
```

### Example

Show all orders along with the product name for each order. Only orders that reference a valid product will appear:

```sql
SELECT
    o.OrderID,
    o.OrderDate,
    p.ProductName,
    p.Price
FROM Orders AS o
INNER JOIN Products AS p
    ON o.ProductID = p.ProductID;
```

Orders that reference a product ID not found in the Products table will be excluded. Products that have never been ordered will also be excluded.

You can also join multiple tables at once (Slide 25). To see the customer name, order details, and product name together:

```sql
SELECT
    c.FirstName,
    c.LastName,
    o.OrderID,
    o.OrderDate,
    p.ProductName
FROM Orders AS o
INNER JOIN Customers AS c
    ON o.CustomerID = c.CustomerID
INNER JOIN Products AS p
    ON o.ProductID = p.ProductID;
```

This returns only rows where a match is found across all three tables.

### Practical Takeaway

Use INNER JOIN when you only want rows that have confirmed matches in both tables. It is the safest default choice when you need complete, matching data and do not want NULL gaps in your results.

---

## Lesson 5.3 -- LEFT JOIN

### Title

LEFT JOIN -- Keeping All Rows from the Left Table

### Why This Matters

Sometimes you need to see all records from a primary table, even when some of them have no match in a secondary table. For example, you may want a full list of all customers, including those who have never placed an order. LEFT JOIN preserves every row from the left (first) table and fills in NULL where no match exists on the right side.

### Explanation

A LEFT JOIN returns all rows from the left table and only the matching rows from the right table (Slide 12). When a row in the left table has no match in the right table, the columns from the right table are filled with NULL.

Key characteristics of LEFT JOIN (Slides 12, 17):

- The **order of tables is important**. The table in the `FROM` clause is the left (primary) table. The table in the `LEFT JOIN` clause is the right (secondary) table.
- The left table is the **primary source of data** -- every row from it is preserved.
- The right table provides **additional data** -- only matching rows are included.
- Non-matching rows from the right table produce NULL values.

The general syntax is:

```sql
SELECT *
FROM TableA
LEFT JOIN TableB
    ON TableA.Key = TableB.Key;
```

LEFT JOIN is especially useful for **data enrichment** (Slide 7) -- adding extra information from a secondary table to your main dataset without losing any rows from the main table.

You can also use LEFT JOIN combined with a WHERE clause to find rows in the left table that have **no match** in the right table. This pattern is called a **Left Anti Join** (Slide 17):

```sql
SELECT *
FROM TableA
LEFT JOIN TableB
    ON TableA.Key = TableB.Key
WHERE TableB.Key IS NULL;
```

### Example

List all customers and their orders, including customers who have never ordered:

```sql
SELECT
    c.CustomerID,
    c.FirstName,
    c.LastName,
    o.OrderID,
    o.OrderDate
FROM Customers AS c
LEFT JOIN Orders AS o
    ON c.CustomerID = o.CustomerID;
```

Customers with no orders will appear in the result with NULL values in the `OrderID` and `OrderDate` columns.

To find only the customers who have **never** placed an order (Left Anti Join):

```sql
SELECT
    c.CustomerID,
    c.FirstName,
    c.LastName
FROM Customers AS c
LEFT JOIN Orders AS o
    ON c.CustomerID = o.CustomerID
WHERE o.OrderID IS NULL;
```

### Practical Takeaway

Use LEFT JOIN when you want to preserve all rows from your main table and enrich them with data from a secondary table. If you also add `WHERE RightTable.Key IS NULL`, you can identify records that exist in the main table but have no match in the secondary table -- a very common pattern for finding missing data.

---

## Lesson 5.4 -- RIGHT JOIN

### Title

RIGHT JOIN -- Keeping All Rows from the Right Table

### Why This Matters

RIGHT JOIN is the mirror image of LEFT JOIN. It preserves every row from the right (second) table and fills in NULL where no match exists on the left side. While less commonly used in practice, understanding RIGHT JOIN strengthens your overall grasp of how joins work and when table order matters.

### Explanation

A RIGHT JOIN returns all rows from the right table and only the matching rows from the left table (Slide 13). When a row in the right table has no match in the left table, the columns from the left table are filled with NULL.

Key characteristics of RIGHT JOIN (Slides 13-14):

- The **order of tables is important**. The table in the `RIGHT JOIN` clause is the primary table.
- The right table is the **primary source of data** -- every row from it is preserved.
- The left table provides **additional data** -- only matching rows are included.

The general syntax is:

```sql
SELECT *
FROM TableA
RIGHT JOIN TableB
    ON TableA.Key = TableB.Key;
```

An important insight from the course material (Slide 14): a RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping the table order. These two queries produce the same result:

```sql
-- Using RIGHT JOIN
SELECT *
FROM TableA
RIGHT JOIN TableB
    ON TableA.Key = TableB.Key;

-- Equivalent LEFT JOIN (swap the table order)
SELECT *
FROM TableB
LEFT JOIN TableA
    ON TableA.Key = TableB.Key;
```

Because of this equivalence, many teams prefer to use LEFT JOIN exclusively and simply change the table order when needed. This keeps queries more consistent and easier to read.

### Example

Show all employees and any orders they processed, including employees who have not processed any orders:

```sql
SELECT
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    o.OrderID,
    o.OrderDate
FROM Orders AS o
RIGHT JOIN Employees AS e
    ON o.EmployeeID = e.EmployeeID;
```

This can be rewritten equivalently as a LEFT JOIN:

```sql
SELECT
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    o.OrderID,
    o.OrderDate
FROM Employees AS e
LEFT JOIN Orders AS o
    ON e.EmployeeID = o.EmployeeID;
```

Both queries return the same result: all employees appear, and those without orders show NULL in the order columns.

### Practical Takeaway

RIGHT JOIN is functionally the reverse of LEFT JOIN. In practice, most SQL developers prefer to rewrite RIGHT JOINs as LEFT JOINs by swapping the table order. This produces identical results and makes queries easier to read. Understand RIGHT JOIN conceptually, but default to LEFT JOIN in your day-to-day work.

---

## Lesson 5.5 -- FULL JOIN

### Title

FULL JOIN -- Returning All Rows from Both Tables

### Why This Matters

FULL JOIN (also called FULL OUTER JOIN) is used when you need a complete view of two datasets, including all matches, all unmatched rows from the left table, and all unmatched rows from the right table. This is particularly useful for data reconciliation, auditing, and identifying mismatches between two related tables.

### Explanation

A FULL JOIN returns all rows from both tables (Slide 15). Where a match exists, the row contains data from both tables. Where no match exists, the missing side is filled with NULL.

Key characteristics of FULL JOIN (Slides 15, 20):

- Returns **everything** from both tables -- matched and unmatched rows.
- The **order of tables does not matter**. `FROM A FULL JOIN B` produces the same result as `FROM B FULL JOIN A`.
- Unmatched rows from either side will have NULL in the columns of the other table.

The general syntax is:

```sql
SELECT *
FROM TableA
FULL JOIN TableB
    ON TableA.Key = TableB.Key;
```

You can also use FULL JOIN combined with a WHERE clause to find rows that exist in one table but not the other -- from both sides simultaneously. This pattern is called a **Full Anti Join** (Slide 20):

```sql
SELECT *
FROM TableA
FULL JOIN TableB
    ON TableA.Key = TableB.Key
WHERE TableA.Key IS NULL
   OR TableB.Key IS NULL;
```

This returns only the unmatched rows from both tables, excluding all matching rows.

### Example

Compare the Customers table and the Orders table to see a complete picture -- all customers (even those without orders) and all orders (even those that may reference a missing customer):

```sql
SELECT
    c.CustomerID,
    c.FirstName,
    c.LastName,
    o.OrderID,
    o.OrderDate
FROM Customers AS c
FULL JOIN Orders AS o
    ON c.CustomerID = o.CustomerID;
```

In the result:
- Rows with data in both the customer and order columns represent matched records.
- Rows with NULL in the order columns represent customers who have not placed any orders.
- Rows with NULL in the customer columns represent orders with no matching customer record.

To find only the mismatches (Full Anti Join):

```sql
SELECT
    c.CustomerID,
    c.FirstName,
    o.OrderID,
    o.CustomerID AS OrderCustomerID
FROM Customers AS c
FULL JOIN Orders AS o
    ON c.CustomerID = o.CustomerID
WHERE c.CustomerID IS NULL
   OR o.CustomerID IS NULL;
```

### Practical Takeaway

Use FULL JOIN when you need to see all data from both tables, including mismatches on either side. This is especially valuable for data quality checks -- for example, finding customers without orders and orders without valid customers in a single query. Add a WHERE clause filtering for NULLs on either key to isolate only the unmatched records.

---

## Module Summary

| Join Type | What It Returns | Table Order Matters? | Common Use Case |
|-----------|----------------|---------------------|-----------------|
| **INNER JOIN** | Only rows that match in both tables | No | Show confirmed, complete data |
| **LEFT JOIN** | All rows from the left table, matching rows from the right | Yes | Data enrichment; find missing matches |
| **RIGHT JOIN** | All rows from the right table, matching rows from the left | Yes | Mirror of LEFT JOIN (rarely used in practice) |
| **FULL JOIN** | All rows from both tables | No | Data reconciliation and auditing |

Key concepts to remember:

1. **Relational thinking** is the foundation. Before writing a JOIN, identify which tables you need and what key column connects them.
2. **INNER JOIN** is the most selective -- it only returns rows with matches on both sides.
3. **LEFT JOIN** preserves the left table completely and is the most commonly used outer join.
4. **RIGHT JOIN** can always be rewritten as a LEFT JOIN by swapping the table order (Slide 14).
5. **FULL JOIN** is the most inclusive -- it preserves all rows from both tables.
6. Adding `WHERE Key IS NULL` to any outer join turns it into an **Anti Join**, which finds unmatched rows (Slides 17-20).
7. You can chain multiple JOINs to connect three or more tables in a single query (Slides 23-25). Start from a central table (such as Orders) and join outward to related tables.

---

## References

- Baraa Khatib Salkini, *SQL Course -- JOINS and SET Operators* (PDF), Slides 1-25 (Joins section).
  - Slide 2: Two methods of combining data (JOINs vs SET Operators).
  - Slide 3: What is a SQL JOIN -- connecting tables through key columns.
  - Slides 4-7: Why we join tables -- recombine data, data enrichment, check for existence.
  - Slides 8-9: Join possibilities and basic join types overview.
  - Slide 11: INNER JOIN -- returns only matching rows; table order does not matter.
  - Slide 12: LEFT JOIN -- all rows from left, matching from right; table order matters.
  - Slide 13: RIGHT JOIN -- all rows from right, matching from left; table order matters.
  - Slide 14: Alternative to RIGHT JOIN -- rewrite as LEFT JOIN by swapping table order.
  - Slide 15: FULL JOIN -- all rows from both tables; table order does not matter.
  - Slides 17-20: Anti Join patterns (Left Anti, Right Anti, Full Anti).
  - Slides 22-25: Joining multiple tables (multi-table joins).
