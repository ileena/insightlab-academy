# Module 4 -- Filtering Data

**Track 1 -- SQL Foundations to Analytics**

Filtering is how you tell a database to return only the rows you care about. The `WHERE` clause is the gateway to precise, meaningful queries. Without it, every query returns every row -- which is rarely what an analyst needs.

This module covers the five categories of WHERE operators: comparison operators, logical operators (AND, OR, NOT), the BETWEEN range operator, the LIKE search operator, and the IN membership operator.

All examples in this module use the **SalesDB** schema with the tables **Products**, **Customers**, **Orders**, and **Employees**. The **Orders** table is the central table.

---

## Lesson 4.1 -- Comparison Operators

### Why This Matters

Comparison operators are the most fundamental building blocks of data filtering. Every time you need to find orders above a certain amount, customers in a specific country, or products at a particular price, you are using comparison operators. They are the first tool an analyst reaches for when writing a WHERE clause.

### Explanation

A comparison operator evaluates a condition by comparing two expressions. The general structure of a condition is:

```
Expression   Operator   Expression
```

An expression can be a column name, a literal value, a function result, a calculated expression, or even a subquery. The WHERE clause evaluates each row against the condition and returns only the rows where the condition is TRUE.

SQL provides six comparison operators:

| Operator | Meaning                        |
|----------|--------------------------------|
| `=`      | Checks if two values are equal |
| `<>` or `!=` | Checks if two values are not equal |
| `>`      | Checks if a value is greater than another value |
| `>=`     | Checks if a value is greater than or equal to another value |
| `<`      | Checks if a value is less than another value |
| `<=`     | Checks if a value is less than or equal to another value |

A condition can compare different kinds of expressions:

- **Column to column:** `first_name = last_name`
- **Column to value:** `first_name = 'John'`
- **Function to value:** `UPPER(first_name) = 'JOHN'`
- **Expression to value:** `Price * Quantity = 1000`

### Example

**Find all orders where the total amount is greater than 500:**

```sql
SELECT OrderID, CustomerID, TotalAmount
FROM Orders
WHERE TotalAmount > 500;
```

**Find all products that do not belong to the 'Electronics' category:**

```sql
SELECT ProductName, Category, Price
FROM Products
WHERE Category <> 'Electronics';
```

**Find all employees hired on or after January 1, 2023:**

```sql
SELECT FirstName, LastName, HireDate
FROM Employees
WHERE HireDate >= '2023-01-01';
```

### Practical Takeaway

Comparison operators are the foundation of every WHERE clause. Start with `=` for exact matches and use `>`, `<`, `>=`, `<=` for numeric or date ranges. Use `<>` or `!=` when you need to exclude a specific value. Remember that string values must be enclosed in single quotes.

---

## Lesson 4.2 -- AND, OR, and NOT (Logical Operators)

### Why This Matters

Real-world data questions almost never involve a single condition. "Show me high-value orders from customers in Germany" requires two conditions at once. Logical operators let you combine multiple conditions in a single WHERE clause, giving you the precision needed for meaningful analysis.

### Explanation

SQL provides three logical operators to combine or modify conditions:

**AND** -- All conditions must be TRUE for a row to be included. The row is returned only when every condition on both sides of AND evaluates to TRUE.

**OR** -- At least one condition must be TRUE. The row is returned when any one of the conditions evaluates to TRUE.

**NOT** -- Reverses the result of a condition. It excludes rows that match the specified condition, returning everything else instead.

**How AND works:**

When you write `WHERE Country = 'USA' AND Score > 500`, the database checks each row against both conditions. Only rows that satisfy both -- country is USA *and* score is above 500 -- are returned. A row where Country is 'USA' but Score is 0 would be excluded because the second condition fails.

**How OR works:**

When you write `WHERE Country = 'USA' OR Score > 500`, a row is included if it meets either condition (or both). A customer from the UK with a score of 750 would be included because the second condition is TRUE, even though the first is not.

**How NOT works:**

When you write `WHERE NOT Country = 'USA'`, all rows where Country is 'USA' are excluded. Every other row is returned. NOT reverses whatever condition follows it.

You can combine these operators. When mixing AND and OR, use parentheses to control evaluation order and avoid unexpected results.

### Example

**Find orders from customer 101 with a total amount greater than 200 (AND):**

```sql
SELECT OrderID, CustomerID, TotalAmount
FROM Orders
WHERE CustomerID = 101
  AND TotalAmount > 200;
```

**Find orders that are either high-value or placed recently (OR):**

```sql
SELECT OrderID, TotalAmount, OrderDate
FROM Orders
WHERE TotalAmount > 1000
   OR OrderDate >= '2024-01-01';
```

**Find all customers who are not from the USA (NOT):**

```sql
SELECT FirstName, LastName, Country
FROM Customers
WHERE NOT Country = 'USA';
```

**Combining AND and OR with parentheses:**

```sql
SELECT OrderID, CustomerID, TotalAmount
FROM Orders
WHERE (CustomerID = 101 OR CustomerID = 102)
  AND TotalAmount > 500;
```

### Practical Takeaway

Use AND when every condition must be met. Use OR when any condition is acceptable. Use NOT to exclude specific matches. Always use parentheses when combining AND and OR in the same query to make the logic explicit and avoid mistakes.

---

## Lesson 4.3 -- BETWEEN (Range Operator)

### Why This Matters

Analysts frequently need to filter data within a range -- orders placed during a specific quarter, products within a price band, or employees hired within a date window. The BETWEEN operator provides a clean, readable way to express range conditions without writing two separate comparisons.

### Explanation

BETWEEN is a range operator that checks whether a value falls within a lower boundary and an upper boundary, inclusive of both endpoints. It is equivalent to writing two conditions with `>=` and `<=` joined by AND, but in a more compact form.

The syntax is:

```sql
WHERE column BETWEEN lower_value AND upper_value
```

This is logically identical to:

```sql
WHERE column >= lower_value AND column <= upper_value
```

Key points about BETWEEN:

- **Inclusive:** Both the lower and upper boundary values are included in the result.
- **Works with numbers, dates, and text:** You can use BETWEEN with any data type that supports ordering.
- **NOT BETWEEN:** You can reverse it with NOT to exclude rows within the range.

As shown in the reference material, if you filter scores BETWEEN 100 AND 500, a score of 350 is included, a score of 500 is included (upper boundary), but a score of 900 or 0 is excluded.

### Example

**Find all orders with a total amount between 100 and 500:**

```sql
SELECT OrderID, CustomerID, TotalAmount
FROM Orders
WHERE TotalAmount BETWEEN 100 AND 500;
```

**Find all orders placed in the first quarter of 2024:**

```sql
SELECT OrderID, OrderDate, TotalAmount
FROM Orders
WHERE OrderDate BETWEEN '2024-01-01' AND '2024-03-31';
```

**Find all products whose price is NOT between 10 and 50:**

```sql
SELECT ProductName, Price
FROM Products
WHERE Price NOT BETWEEN 10 AND 50;
```

### Practical Takeaway

Use BETWEEN whenever you need to filter within a defined range. It makes your queries shorter and easier to read than writing two separate conditions. Remember that BETWEEN is inclusive on both ends. For date ranges, be mindful of whether your date column includes a time component, as this can affect boundary matching.

---

## Lesson 4.4 -- LIKE (Search Operator)

### Why This Matters

Not every filter is an exact match. When you need to find customers whose names start with a certain letter, products containing a keyword, or email addresses from a specific domain, the LIKE operator lets you search for patterns within text data. This is essential for exploratory analysis and data quality checks.

### Explanation

LIKE is a search operator used in the WHERE clause to match text values against a pattern. It uses two special wildcard characters:

- **`%` (percent)** -- Matches any sequence of zero, one, or many characters.
- **`_` (underscore)** -- Matches exactly one character.

Common pattern examples:

| Pattern   | Meaning                              | Matches             | Does Not Match |
|-----------|--------------------------------------|---------------------|----------------|
| `'M%'`    | Starts with M, followed by anything  | Maria, Ma, M        | Emma           |
| `'%in'`   | Ends with "in", preceded by anything | Martin, Vin, in     | Jasmine        |
| `'%r%'`   | Contains "r" anywhere                | Maria, Peter, Rayn  | Alice          |
| `'__b%'`  | Third character is "b", any length after | Albert, Rob, Abel | An             |

How the wildcards work:

- `'M%'` -- The first character must be M. The `%` allows anything (including nothing) to follow.
- `'%in'` -- The value must end with "in". Anything can come before it.
- `'%r%'` -- The letter "r" can appear anywhere in the value, with anything before or after.
- `'__b%'` -- The first two characters can be anything (two underscores), the third must be "b", and anything can follow.

You can also use `NOT LIKE` to exclude rows matching a pattern.

### Example

**Find all customers whose last name starts with 'S':**

```sql
SELECT FirstName, LastName, Country
FROM Customers
WHERE LastName LIKE 'S%';
```

**Find all products that contain 'Pro' in the name:**

```sql
SELECT ProductName, Price
FROM Products
WHERE ProductName LIKE '%Pro%';
```

**Find all employees whose first name has exactly four characters:**

```sql
SELECT FirstName, LastName
FROM Employees
WHERE FirstName LIKE '____';
```

**Find all customers whose email ends with '@gmail.com':**

```sql
SELECT FirstName, Email
FROM Customers
WHERE Email LIKE '%@gmail.com';
```

### Practical Takeaway

Use LIKE for pattern-based text searches. The `%` wildcard is the most common and handles most search needs. Use `_` when you need to match a specific number of characters. Keep in mind that LIKE is typically case-sensitive in many database systems -- use functions like UPPER() or LOWER() if you need case-insensitive matching.

---

## Lesson 4.5 -- IN (Membership Operator)

### Why This Matters

When you need to check whether a value matches any item from a specific list, writing multiple OR conditions becomes verbose and hard to maintain. The IN operator provides a concise way to test membership against a list of values, making your queries cleaner and your intent clearer.

### Explanation

IN is a membership operator that checks whether a value exists in a specified list of values. It is functionally equivalent to writing multiple OR conditions but is far more readable.

The syntax is:

```sql
WHERE column IN (value1, value2, value3, ...)
```

This is equivalent to:

```sql
WHERE column = value1 OR column = value2 OR column = value3
```

**NOT IN** does the opposite -- it returns rows where the column value does not match any item in the list.

As the reference material illustrates, if you filter `WHERE Country IN ('Germany', 'USA')`, rows with Country 'Germany' or 'USA' are included, while a row with Country 'UK' is excluded. Using `NOT IN ('Germany', 'USA')` reverses this: only the 'UK' row is returned.

### Example

**Find all orders placed by customers 101, 105, and 110:**

```sql
SELECT OrderID, CustomerID, TotalAmount
FROM Orders
WHERE CustomerID IN (101, 105, 110);
```

**Find all products in the 'Electronics', 'Clothing', or 'Books' categories:**

```sql
SELECT ProductName, Category, Price
FROM Products
WHERE Category IN ('Electronics', 'Clothing', 'Books');
```

**Find all employees who are NOT in the 'Sales' or 'Marketing' departments:**

```sql
SELECT FirstName, LastName, Department
FROM Employees
WHERE Department NOT IN ('Sales', 'Marketing');
```

### Practical Takeaway

Use IN whenever you need to match against a list of specific values. It replaces multiple OR conditions and keeps your query clean. Use NOT IN to exclude a known set of values. As your lists grow, IN remains readable where chained OR conditions would become unwieldy.

---

## Module Summary

This module covered the five categories of WHERE operators used to filter data in SQL:

| Lesson | Topic                  | Operator Category    | Key Idea                                      |
|--------|------------------------|----------------------|-----------------------------------------------|
| 4.1    | Comparison Operators   | Comparison           | Compare two values using =, <>, >, >=, <, <=  |
| 4.2    | AND, OR, NOT           | Logical              | Combine or negate conditions                   |
| 4.3    | BETWEEN                | Range                | Filter values within an inclusive range         |
| 4.4    | LIKE                   | Search               | Match text patterns using % and _ wildcards    |
| 4.5    | IN                     | Membership           | Check if a value exists in a list of values    |

These operators work together inside the WHERE clause to give you precise control over which rows your query returns. In practice, most analytical queries combine several of these operators -- for example, using BETWEEN for a date range, AND to add a category filter, and LIKE to search within product names.

Mastering these operators is essential before moving on to joins, aggregation, and more advanced SQL topics.

---

## References

- Baraa Khatib Salkini, *SQL Course -- Filtering Data* (PDF), Slides 1--17.
  - Slide 2: Overview of WHERE operator categories (Comparison, Logical, Range, Membership, Search).
  - Slides 3--6: Comparison Operators -- definitions, condition structure (Expression-Operator-Expression), and visual filtering example.
  - Slides 7--8: Logical Operators overview -- AND (all conditions TRUE), OR (at least one TRUE), NOT (excludes matching rows).
  - Slide 9: AND Operator -- visual example showing both conditions must be TRUE.
  - Slide 10: OR Operator -- visual example showing at least one condition must be TRUE.
  - Slide 11: NOT Operator -- visual example showing exclusion of matching rows.
  - Slides 12--13: BETWEEN Operator -- range filtering with lower and upper boundaries (inclusive).
  - Slides 14--15: IN and NOT IN Operators -- membership filtering against a list of values.
  - Slides 16--17: LIKE Operator -- pattern matching with `%` (any characters) and `_` (exactly one character) wildcards.
