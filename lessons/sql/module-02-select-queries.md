# Module 2 -- SELECT Queries

**Track:** Track 1 -- SQL Foundations to Analytics
**Module:** Module 2 -- SELECT Queries
**Schema:** SalesDB (Tables: Products, Customers, Orders, Employees)

---

## Lesson 2.1 -- The SELECT Statement

### Why This Matters

The SELECT statement is the single most important command in SQL. It is the foundation of Data Query Language (DQL) and is how you retrieve information from a database. Every time you ask a business question -- "What products did we sell last month?" or "Which customers are from Germany?" -- you use a SELECT statement to get the answer. Mastering SELECT is the first step toward becoming proficient in data analytics with SQL.

### Explanation

SELECT belongs to the **DQL (Data Query Language)** category of SQL commands. While DDL (Data Definition Language) defines database structure and DML (Data Manipulation Language) modifies data, DQL is specifically designed for reading and querying data.

A SELECT statement is made up of several components:

- **Keywords**: Reserved words that SQL understands, such as `SELECT`, `FROM`, and `WHERE`.
- **Identifiers**: The names of tables and columns you are working with (for example, `name`, `country`, `customers`).
- **Operators**: Symbols used in conditions, such as `=`, `>`, `<`.
- **Values**: Literal data you compare against, such as `'Italy'` or `500`.
- **Functions**: Built-in operations applied to data, such as `LOWER()`.
- **Comments**: Notes for documentation, written with `--` for single-line comments.

The simplest form of a SELECT query uses two clauses:

```
SELECT [columns]
FROM [table]
```

You can select **all columns** using the asterisk (`*`) wildcard, or you can select **specific columns** by listing their names separated by commas.

### Example

**Select all columns from the Customers table:**

```sql
SELECT *
FROM Customers;
```

This retrieves every column and every row from the Customers table.

**Select specific columns from the Customers table:**

```sql
SELECT CustomerName, Country
FROM Customers;
```

This retrieves only the `CustomerName` and `Country` columns, keeping the result focused on what you need.

**Select all columns from the Orders table:**

```sql
SELECT *
FROM Orders;
```

Since Orders is the central table in SalesDB, this query returns all order records including order IDs, customer references, product references, order dates, and amounts.

### Practical Takeaway

Always prefer selecting specific columns over using `SELECT *` in production queries. Selecting only the columns you need makes your queries faster, easier to read, and more efficient. Use `SELECT *` only for quick exploration when you want to see what a table contains.

### References

- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 2--10 (SQL Components: statements, keywords, clauses, functions, identifiers, operators, values)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 11--13 (DQL and SQL command types)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slide 14 (Ask Your Data -- concept of querying)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 16--17 (SELECT * -- retrieving all columns)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 18--19 (SELECT specific columns)

---

## Lesson 2.2 -- The FROM Clause

### Why This Matters

A database can contain dozens or even hundreds of tables. The FROM clause tells SQL exactly which table to look in when retrieving data. Without it, the database would not know where to find the columns you are asking for. Understanding FROM is essential because every SELECT query requires it.

### Explanation

The FROM clause specifies the **source table** for your query. As the PDF illustrates, FROM tells SQL "where to find your data." When the database engine processes a query, it actually reads the FROM clause **first** -- before SELECT -- to determine which table to load into memory.

**Execution order vs. coding order:**

While you *write* `SELECT` before `FROM`, the database *executes* them in reverse:

1. **FROM** -- Identify and load the table
2. **SELECT** -- Pick the requested columns from that table

This distinction becomes important as queries grow more complex.

### Example

**Retrieve all products:**

```sql
SELECT *
FROM Products;
```

The FROM clause points to the `Products` table. The database loads all rows from Products, then SELECT * returns every column.

**Retrieve employee names:**

```sql
SELECT EmployeeName, Department
FROM Employees;
```

Here, FROM directs the query to the `Employees` table, and SELECT picks out only the `EmployeeName` and `Department` columns.

**Retrieve order details:**

```sql
SELECT OrderID, OrderDate, TotalAmount
FROM Orders;
```

Because Orders is the central table in SalesDB, this is a common starting point for analytics queries. FROM tells SQL to look in the Orders table for these three columns.

### Practical Takeaway

Always double-check that your FROM clause references the correct table. A common beginner mistake is selecting columns that do not exist in the specified table, which causes an error. If you are unsure which table contains the column you need, use `SELECT *` with the FROM clause to explore the table structure first.

### References

- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 16--17 (FROM clause -- tells SQL where to find your data)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 34--35 (Execution order vs. coding order)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 37--38 (Bonus sketches -- FROM executes first, then SELECT)

---

## Lesson 2.3 -- The WHERE Clause

### Why This Matters

Real-world databases contain thousands or millions of rows. Retrieving all of them is rarely useful. The WHERE clause lets you **filter rows** based on conditions so you get only the data that answers your specific question. Whether you need orders above a certain amount, customers from a specific country, or employees in a particular department, WHERE is the tool that narrows your results.

### Explanation

The WHERE clause filters your data based on a **condition**. It evaluates each row in the table: if the condition is true, the row is included in the result; if false, the row is excluded.

The basic syntax is:

```
SELECT [columns]
FROM [table]
WHERE [condition]
```

Conditions use **operators** to compare column values against a target:

| Operator | Meaning                  |
|----------|--------------------------|
| `=`      | Equal to                 |
| `>`      | Greater than             |
| `<`      | Less than                |
| `>=`     | Greater than or equal to |
| `<=`     | Less than or equal to    |
| `<>`     | Not equal to             |

**Execution order with WHERE:**

1. **FROM** -- Load the table
2. **WHERE** -- Filter rows based on the condition
3. **SELECT** -- Return the requested columns from the filtered rows

This means WHERE removes rows *before* the SELECT clause picks columns. This is an important concept: filtering happens early in the process.

### Example

**Find all orders with a total amount greater than 500:**

```sql
SELECT *
FROM Orders
WHERE TotalAmount > 500;
```

The database loads the Orders table, then checks each row. Only rows where `TotalAmount` is greater than 500 pass through to the result.

**Find customers from Germany:**

```sql
SELECT CustomerName, Country
FROM Customers
WHERE Country = 'Germany';
```

Text values in WHERE conditions must be enclosed in single quotes. This query returns only the customers whose country is Germany.

**Find products with a price less than or equal to 25:**

```sql
SELECT ProductName, Price
FROM Products
WHERE Price <= 25;
```

### Practical Takeaway

WHERE filters rows **before** any grouping or aggregation takes place. This is different from HAVING (covered in Module 7), which filters *after* aggregation. When working with large tables, always use WHERE to narrow your data early -- this improves both query performance and the clarity of your results.

### References

- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 20--21 (WHERE clause -- filters data based on a condition)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slide 29 (WHERE filters before aggregation vs. HAVING filters after)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 34--35 (Execution order: FROM, WHERE, then SELECT)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slide 39 (Bonus sketch -- FROM, WHERE, SELECT execution flow)

---

## Lesson 2.4 -- Aliases

### Why This Matters

As your queries grow more complex, column names and table names can become long, unclear, or hard to read in results. Aliases let you assign **temporary, readable names** to columns and tables within a query. They make your output cleaner for stakeholders and your SQL easier to maintain. Aliases are also essential when you start working with joins and calculated columns.

### Explanation

An alias is a temporary name you give to a column or table using the `AS` keyword. Aliases exist only for the duration of the query -- they do not change anything in the database.

**Column aliases** rename columns in the result set:

```
SELECT column_name AS alias_name
FROM table
```

**Table aliases** provide shorthand names for tables:

```
SELECT a.column_name
FROM TableName AS a
```

Table aliases are especially useful when working with multiple tables (joins), as shown in the PDF where `Table1 AS a` and `Table2 AS b` are used to simplify references like `a.id` and `b.id`.

The `AS` keyword is optional in most SQL dialects -- you can write `SELECT column_name alias_name` -- but using `AS` explicitly is considered best practice for readability.

### Example

**Use a column alias to rename output:**

```sql
SELECT ProductName AS Product, Price AS UnitPrice
FROM Products;
```

The result columns will display as `Product` and `UnitPrice` instead of the raw column names.

**Use a column alias with a space (requires quotes):**

```sql
SELECT CustomerName AS "Customer Name", Country AS "Customer Country"
FROM Customers;
```

When an alias contains spaces, wrap it in double quotes.

**Use a table alias for shorter references:**

```sql
SELECT o.OrderID, o.OrderDate, o.TotalAmount
FROM Orders AS o
WHERE o.TotalAmount > 100;
```

The table alias `o` replaces the full name `Orders` throughout the query, making it shorter and easier to read.

**Alias a calculated expression:**

```sql
SELECT OrderID, TotalAmount, TotalAmount * 0.10 AS TaxAmount
FROM Orders;
```

Here the alias `TaxAmount` gives a meaningful name to the calculated column.

### Practical Takeaway

Use column aliases whenever your output will be shared with non-technical stakeholders -- clean column headers make reports easier to understand. Use table aliases as a habit, especially when working with more than one table. This practice will pay off significantly when you reach Module 5 (Joins).

### References

- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slide 47 (Table aliases with AS: `Table1 AS a`, `Table2 AS b`, referencing `a.id`, `b.id`)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 2--10 (Identifiers -- column and table names as components of SQL statements)

---

## Lesson 2.5 -- Basic Functions

### Why This Matters

Raw data in a database is not always in the format you need. Basic SQL functions let you **transform, convert, and manipulate** data directly within your query. Instead of exporting data and cleaning it in a spreadsheet, you can apply functions to format text, perform arithmetic, or handle special cases right inside your SELECT statement.

### Explanation

A **function** in SQL is a built-in operation that takes one or more inputs (arguments), processes them, and returns a result. As shown in the PDF, functions like `LOWER()` are keywords that transform data within a query.

Functions can be used in the SELECT clause to modify how column values appear in the result. They can also be used in WHERE clauses to filter based on transformed values.

Here are some commonly used basic functions:

**Text functions:**

| Function    | Purpose                           | Example                |
|-------------|-----------------------------------|------------------------|
| `UPPER()`   | Converts text to uppercase        | `UPPER(country)`       |
| `LOWER()`   | Converts text to lowercase        | `LOWER(country)`       |
| `LEN()`     | Returns the length of a string    | `LEN(CustomerName)`    |
| `TRIM()`    | Removes leading/trailing spaces   | `TRIM(CustomerName)`   |

**Numeric functions:**

| Function    | Purpose                           | Example                |
|-------------|-----------------------------------|------------------------|
| `ROUND()`   | Rounds a number to specified decimals | `ROUND(Price, 2)` |
| `ABS()`     | Returns the absolute value        | `ABS(Discount)`        |
| `CEILING()` | Rounds up to the nearest integer  | `CEILING(Price)`       |
| `FLOOR()`   | Rounds down to the nearest integer| `FLOOR(Price)`         |

**Aggregate functions (preview):**

These functions summarize multiple rows into a single value. They are introduced here and covered in depth in Module 7.

| Function  | Purpose                      | Example            |
|-----------|------------------------------|---------------------|
| `COUNT()` | Counts the number of rows    | `COUNT(*)`          |
| `SUM()`   | Adds up all values           | `SUM(TotalAmount)`  |
| `AVG()`   | Calculates the average       | `AVG(Price)`        |
| `MIN()`   | Finds the smallest value     | `MIN(Price)`        |
| `MAX()`   | Finds the largest value      | `MAX(TotalAmount)`  |

### Example

**Convert customer country names to lowercase:**

```sql
SELECT CustomerName, LOWER(Country) AS CountryLower
FROM Customers;
```

This mirrors the example from the PDF where `LOWER(country)` is used in the SELECT clause.

**Round product prices to the nearest whole number:**

```sql
SELECT ProductName, Price, ROUND(Price, 0) AS RoundedPrice
FROM Products;
```

**Count the total number of orders:**

```sql
SELECT COUNT(*) AS TotalOrders
FROM Orders;
```

**Find the highest order amount:**

```sql
SELECT MAX(TotalAmount) AS HighestOrder
FROM Orders;
```

**Combine a function with WHERE:**

```sql
SELECT CustomerName, UPPER(Country) AS CountryUpper
FROM Customers
WHERE LEN(CustomerName) > 10;
```

This retrieves customers whose names are longer than 10 characters, with country names displayed in uppercase.

### Practical Takeaway

Use functions to clean and transform data directly in SQL rather than exporting raw data and processing it manually. This keeps your workflow efficient and ensures consistency. When using aggregate functions like COUNT or SUM, remember that they collapse multiple rows into one result -- this behavior connects directly to GROUP BY, which you will learn in Module 7.

### References

- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 2, 7 (Functions as SQL components; LOWER() as an example function)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 25--26 (SUM() used with GROUP BY -- aggregate function preview)
- Baraa Khatib Salkini, *SQL Course -- SELECT Query*, Slides 27--29 (Aggregate functions in HAVING -- SUM with conditions)

---

## Module Summary

Module 2 introduced the five foundational building blocks of SQL data retrieval:

| Lesson | Topic            | Key Concept                                                        |
|--------|------------------|--------------------------------------------------------------------|
| 2.1    | SELECT           | Specifies which columns to retrieve; use `*` for all or list specific columns. |
| 2.2    | FROM             | Specifies which table to query; executes first in the processing order.        |
| 2.3    | WHERE            | Filters rows based on conditions before results are returned.                  |
| 2.4    | Aliases          | Assigns temporary readable names to columns and tables using `AS`.             |
| 2.5    | Basic Functions  | Transforms data with built-in functions like LOWER(), ROUND(), COUNT().        |

**The basic SELECT query pattern:**

```sql
SELECT column1, column2, FUNCTION(column3) AS alias
FROM TableName
WHERE condition;
```

**Execution order to remember:**

1. FROM -- Load the table
2. WHERE -- Filter the rows
3. SELECT -- Return the columns

Understanding this execution order is critical as you progress to more advanced topics like joins (Module 5), aggregation (Module 7), and subqueries (Module 9).

---

## References

All lessons in this module are grounded in the following source material:

- Baraa Khatib Salkini, *SQL Course -- SELECT Query: SQL Components*, Slides 1--10
  - SQL statement structure, comments, clauses, keywords, functions, identifiers, operators, and values.
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: Query Data*, Slides 11--14
  - SQL command types (DQL, DDL, DML); the concept of querying data from a database.
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: SELECT ALL*, Slides 16--17
  - SELECT * to retrieve all columns; FROM tells SQL where to find data.
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: SELECT Few Columns*, Slides 18--19
  - Selecting specific columns instead of all; picking only what you need.
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: WHERE*, Slides 20--21
  - WHERE clause for filtering rows based on conditions.
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: GROUP BY*, Slides 25--26
  - Aggregate functions (SUM) used with GROUP BY (preview for Module 7).
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: HAVING*, Slides 27--29
  - WHERE filters before aggregation; HAVING filters after aggregation.
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: Execution Order*, Slides 34--35
  - Full execution order vs. coding order of SQL clauses.
- Baraa Khatib Salkini, *SQL Course -- SELECT Query: Bonus Sketches*, Slides 37--47
  - Visual walkthroughs of SELECT *, SELECT columns, WHERE filtering, GROUP BY, HAVING, ORDER BY, and table aliases.
