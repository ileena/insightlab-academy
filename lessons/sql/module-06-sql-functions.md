# Module 6 -- SQL Functions

**Track 1 -- SQL Foundations to Analytics**

SQL functions are built-in operations that take input values, perform a calculation or transformation, and return a result. They are essential for cleaning, transforming, and analyzing data directly within your queries. This module covers the four categories of single-row functions -- string, numeric, date, and NULL -- plus type conversion techniques.

SQL functions fall into two main groups: **single-row functions** (which operate on one row at a time) and **multi-row functions** (which operate across many rows). This module focuses on single-row functions. Multi-row functions such as COUNT, SUM, and AVG are covered in Module 7 -- Aggregation.

---

## 6.1 -- String Functions

### Title

Manipulating Text Data with String Functions

### Why This Matters

Real-world data is messy. Customer names may have inconsistent casing, product codes may need to be extracted from longer strings, and phone numbers may contain unwanted characters. String functions let you clean and standardize text data directly in SQL, which is critical for accurate reporting and analysis.

### Explanation

String functions operate on text (character) data. They are divided into three categories:

- **Manipulation** -- changing or combining text values
- **Calculation** -- measuring text values
- **Extraction** -- pulling parts out of text values

Here are the key string functions:

| Function | Purpose |
|---|---|
| `CONCAT` | Combines multiple strings into one |
| `UPPER` | Converts all characters to uppercase |
| `LOWER` | Converts all characters to lowercase |
| `TRIM` | Removes leading and trailing spaces |
| `REPLACE` | Replaces a specific character or substring with a new one |
| `LEN` | Counts how many characters are in a string |
| `LEFT` | Extracts a specific number of characters from the start |
| `RIGHT` | Extracts a specific number of characters from the end |
| `SUBSTRING` | Extracts a part of a string starting at a specified position |

**Nesting functions:** You can pass the output of one function as the input to another. For example, `LEN(LOWER(LEFT('Maria', 2)))` first extracts 'Ma', converts it to 'ma', then counts the characters to return 2.

### Example

**Combine first and last name into a full name:**

```sql
SELECT
    CONCAT(FirstName, ' ', LastName) AS FullName
FROM Customers;
```

**Standardize customer names to uppercase:**

```sql
SELECT
    UPPER(FirstName) AS FirstNameUpper,
    UPPER(LastName) AS LastNameUpper
FROM Customers;
```

**Clean up product names with extra spaces:**

```sql
SELECT
    TRIM(ProductName) AS CleanProductName
FROM Products;
```

**Remove dashes from a phone number:**

```sql
SELECT
    REPLACE(Phone, '-', '') AS CleanPhone
FROM Customers;
```

**Get the length of each customer's last name:**

```sql
SELECT
    LastName,
    LEN(LastName) AS NameLength
FROM Customers;
```

**Extract the first 3 characters of a product code:**

```sql
SELECT
    LEFT(ProductName, 3) AS ProductPrefix
FROM Products;
```

**Extract a substring starting at position 3 with a length of 4:**

```sql
SELECT
    SUBSTRING(ProductName, 3, 4) AS NamePart
FROM Products;
```

### Practical Takeaway

Use `UPPER` or `LOWER` to standardize text before comparing values. Use `TRIM` to remove unwanted spaces from imported data. Use `CONCAT` when you need to display combined fields such as full names or full addresses. Use `LEFT`, `RIGHT`, and `SUBSTRING` to parse structured codes embedded in text columns.

### References

- Baraa Khatib Salkini, *SQL Course -- SQL Functions* (PDF), Slides 6--15: String Functions overview, CONCAT, LOWER, UPPER, TRIM, REPLACE, LEN, LEFT, RIGHT, SUBSTRING.

---

## 6.2 -- Numeric Functions

### Title

Rounding and Formatting Numbers with Numeric Functions

### Why This Matters

When working with financial data such as order totals, product prices, or calculated averages, you often get results with many decimal places. Numeric functions let you round and format these values so that reports are clean, readable, and consistent. Presenting a price as 29.99 instead of 29.987654 makes a significant difference in professional reporting.

### Explanation

Numeric functions operate on number values. The most commonly used numeric function is `ROUND`, which rounds a number to a specified number of decimal places.

**ROUND syntax:**

```sql
ROUND(value, decimal_places)
```

How rounding works:

- `ROUND(3.516, 2)` returns `3.520` -- the third decimal (6) is 5 or above, so the second decimal rounds up.
- `ROUND(3.516, 1)` returns `3.500` -- the second decimal (1) is below 5, so no rounding up.
- `ROUND(3.516, 0)` returns `4.000` -- the first decimal (5) is 5 or above, so the whole number rounds up.

Other useful numeric operations include standard arithmetic operators (`+`, `-`, `*`, `/`) and the modulus operator (`%`) for remainders.

### Example

**Round the unit price to 2 decimal places:**

```sql
SELECT
    ProductName,
    Price,
    ROUND(Price, 2) AS RoundedPrice
FROM Products;
```

**Calculate a discounted price and round it:**

```sql
SELECT
    OrderID,
    TotalAmount,
    ROUND(TotalAmount * 0.9, 2) AS DiscountedTotal
FROM Orders;
```

**Round the average order value to a whole number:**

```sql
SELECT
    CustomerID,
    ROUND(TotalAmount / Quantity, 0) AS AvgItemPrice
FROM Orders;
```

### Practical Takeaway

Always round calculated values before displaying them in reports. Use `ROUND(value, 2)` for currency values and `ROUND(value, 0)` when you need whole numbers. This keeps your output professional and avoids confusion caused by overly precise decimals.

### References

- Baraa Khatib Salkini, *SQL Course -- SQL Functions* (PDF), Slides 16--18: Numeric Functions overview and ROUND behavior at different decimal places.

---

## 6.3 -- Date Functions

### Title

Working with Dates and Times in SQL

### Why This Matters

Nearly every analytics question involves time: "What were last month's sales?", "How many days between order and shipment?", "Show me revenue by quarter." Date functions let you extract parts of dates, perform date arithmetic, and format dates for reports. Without them, time-based analysis is impossible.

### Explanation

Date and time values in SQL follow the format `YYYY-MM-DD` for dates and `HH:MM:SS` for times. A combined date and time is called a **timestamp** (Oracle, PostgreSQL, MySQL) or **datetime2** (SQL Server).

Date functions are organized into four categories:

**1. Part Extraction** -- Pull specific components from a date.

| Function | Purpose | Return Type |
|---|---|---|
| `YEAR(date)` | Extracts the year | INT |
| `MONTH(date)` | Extracts the month number | INT |
| `DAY(date)` | Extracts the day number | INT |
| `DATEPART(part, date)` | Extracts any date part as an integer | INT |
| `DATENAME(part, date)` | Returns the name of a date part | STRING |
| `DATETRUNC(part, date)` | Truncates a date to a specified precision | DATETIME |
| `EOMONTH(date)` | Returns the last day of the month | DATE |

`DATEPART` vs `DATENAME` example for the date `2025-08-20`:
- `DATEPART(month, '2025-08-20')` returns `8` (integer)
- `DATENAME(month, '2025-08-20')` returns `'August'` (string)
- `DATEPART(weekday, '2025-08-20')` returns `4` (integer)
- `DATENAME(weekday, '2025-08-20')` returns `'Wednesday'` (string)

`DATETRUNC` resets smaller parts to their starting values:
- `DATETRUNC(month, '2025-08-20')` returns `2025-08-01 00:00:00`
- `DATETRUNC(year, '2025-08-20')` returns `2025-01-01 00:00:00`

**2. Date Calculations** -- Add or subtract time intervals and find differences.

| Function | Purpose |
|---|---|
| `DATEADD(part, interval, date)` | Adds or subtracts an interval to/from a date |
| `DATEDIFF(part, start_date, end_date)` | Calculates the difference between two dates |

**3. Format and Casting** -- Change how dates are displayed or convert data types.

| Function | Purpose |
|---|---|
| `FORMAT(value, format)` | Converts a date or number to a formatted string |
| `CONVERT(data_type, value, style)` | Converts between data types with optional style |
| `CAST(value AS data_type)` | Converts between data types (no formatting) |

**4. Validation**

| Function | Purpose |
|---|---|
| `ISDATE(value)` | Returns 1 if the value is a valid date, 0 otherwise |

### Example

**Extract the year and month from order dates:**

```sql
SELECT
    OrderID,
    OrderDate,
    YEAR(OrderDate) AS OrderYear,
    MONTH(OrderDate) AS OrderMonth
FROM Orders;
```

**Get the day name for each order:**

```sql
SELECT
    OrderID,
    OrderDate,
    DATENAME(weekday, OrderDate) AS OrderDayName
FROM Orders;
```

**Find orders placed in Q3 (quarter 3):**

```sql
SELECT
    OrderID,
    OrderDate
FROM Orders
WHERE DATEPART(quarter, OrderDate) = 3;
```

**Calculate how many days between order and shipping:**

```sql
SELECT
    OrderID,
    OrderDate,
    ShipDate,
    DATEDIFF(day, OrderDate, ShipDate) AS DaysToShip
FROM Orders;
```

**Add 30 days to the order date to estimate a follow-up date:**

```sql
SELECT
    OrderID,
    OrderDate,
    DATEADD(day, 30, OrderDate) AS FollowUpDate
FROM Orders;
```

**Get the last day of the month for each order:**

```sql
SELECT
    OrderID,
    OrderDate,
    EOMONTH(OrderDate) AS MonthEnd
FROM Orders;
```

**Format an order date for a report:**

```sql
SELECT
    OrderID,
    FORMAT(OrderDate, 'MMM yyyy') AS FormattedDate
FROM Orders;
```

### Practical Takeaway

Use `YEAR`, `MONTH`, and `DAY` for simple extractions. Use `DATEPART` when you need quarter, week, or other parts. Use `DATENAME` when you want the text name (e.g., "August" instead of 8). Use `DATEDIFF` for calculating durations and `DATEADD` for projecting future or past dates. Use `FORMAT` to make dates human-readable in reports, and remember that date parts help you aggregate data at different levels of granularity -- by year, by quarter, by month, or by day.

### References

- Baraa Khatib Salkini, *SQL Course -- SQL Functions* (PDF), Slides 19--61: Date & Time Functions including Part Extraction (Slides 24--36), Format & Casting (Slides 37--53), Date Calculations (Slides 54--59), and Validation (Slide 60).

---

## 6.4 -- NULL Handling

### Title

Handling Missing Data with NULL Functions

### Why This Matters

NULL values represent missing or unknown information in a database. They appear when optional fields are left blank, when data is incomplete, or when a LEFT JOIN produces unmatched rows. If you do not handle NULLs properly, your calculations will produce unexpected results -- any arithmetic operation with NULL returns NULL, and comparisons with NULL do not behave like normal comparisons. NULL handling is essential for writing reliable queries.

### Explanation

**What is NULL?**

NULL is not zero, not an empty string, and not a blank space. It is a special marker that means "unknown" or "missing." NULLs come from optional form fields, incomplete data imports, or unmatched rows in joins.

| Concept | Representation | Meaning |
|---|---|---|
| NULL | `NULL` | Unknown value |
| Empty String | `''` | Known, empty value |
| Blank Space | `' '` | Known, space value |

**Key NULL functions:**

| Function | Purpose |
|---|---|
| `ISNULL(value, replacement)` | If value is NULL, returns the replacement; otherwise returns the value |
| `COALESCE(value1, value2, ...)` | Returns the first non-NULL value from the list |
| `NULLIF(value1, value2)` | Returns NULL if both values are equal; otherwise returns value1 |
| `IS NULL` | Checks if a value is NULL (used in WHERE clauses) |
| `IS NOT NULL` | Checks if a value is not NULL (used in WHERE clauses) |

**ISNULL vs COALESCE:**

- `ISNULL` accepts only two arguments and is faster. It is specific to SQL Server (Oracle uses `NVL`, MySQL uses `IFNULL`).
- `COALESCE` accepts unlimited arguments and is available in all database systems. It checks each value in order and returns the first one that is not NULL.

**Important rule:** Always use `IS NULL` instead of `= NULL` to filter for NULL values. The expression `WHERE column = NULL` will never return results because NULL is not equal to anything, not even itself.

### Example

**Replace NULL shipping addresses with a default label:**

```sql
SELECT
    OrderID,
    ISNULL(ShipAddress, 'N/A') AS ShipAddress
FROM Orders;
```

**Use COALESCE to fall back through multiple columns:**

```sql
SELECT
    OrderID,
    COALESCE(ShipAddress, BillingAddress, 'No Address') AS FinalAddress
FROM Orders;
```

**Find orders that have not been shipped yet:**

```sql
SELECT
    OrderID,
    OrderDate
FROM Orders
WHERE ShipDate IS NULL;
```

**Find customers who have placed orders (ship date exists):**

```sql
SELECT
    OrderID,
    OrderDate,
    ShipDate
FROM Orders
WHERE ShipDate IS NOT NULL;
```

**Use NULLIF to avoid division by zero:**

```sql
SELECT
    OrderID,
    TotalAmount / NULLIF(Quantity, 0) AS PricePerUnit
FROM Orders;
```

In this example, if `Quantity` is 0, `NULLIF` converts it to NULL, and the division returns NULL instead of causing an error.

### Practical Takeaway

Always check for NULLs in columns that may contain missing data before performing calculations. Use `ISNULL` for simple two-value replacements and `COALESCE` when you need to check multiple fallback values. Use `NULLIF` to protect against division-by-zero errors. When filtering, always use `IS NULL` or `IS NOT NULL` -- never use `= NULL`.

### References

- Baraa Khatib Salkini, *SQL Course -- SQL Functions* (PDF), Slides 62--77: NULL Functions including ISNULL (Slides 68--69), COALESCE (Slides 70--71), NULLIF (Slide 72), IS NULL / IS NOT NULL (Slides 73--74), Joins & IS NULL (Slide 75), NULL vs Empty vs Blank (Slide 76), and summary (Slide 77).

---

## 6.5 -- Type Conversion

### Title

Converting Data Types with CAST, CONVERT, and FORMAT

### Why This Matters

Data does not always arrive in the type you need. A price stored as text cannot be used in arithmetic. A date stored as a string cannot be compared with date functions. Type conversion (also called casting) lets you change data from one type to another so that your queries work correctly and your reports display data in the right format.

### Explanation

SQL provides three functions for type conversion, each with different capabilities:

| Function | Casting | Formatting |
|---|---|---|
| `CAST` | Any type to any type | No formatting support |
| `CONVERT` | Any type to any type | Formats date and time only (using style codes) |
| `FORMAT` | Any type to string only | Formats dates and numbers (using format specifiers) |

**CAST** is the simplest and most portable. It is part of the SQL standard and works across all database systems.

```sql
CAST(value AS data_type)
```

**CONVERT** is SQL Server-specific and adds an optional style parameter for date formatting.

```sql
CONVERT(data_type, value [, style])
```

**FORMAT** provides the most control over display formatting but always returns a string.

```sql
FORMAT(value, format [, culture])
```

Common CONVERT date styles:

| Style | Format | Example |
|---|---|---|
| 23 | yyyy-mm-dd | 2025-08-20 |
| 101 | mm/dd/yyyy | 08/20/2025 |
| 103 | dd/mm/yyyy | 20/08/2025 |
| 112 | yyyymmdd | 20250820 |

Common FORMAT specifiers for numbers:

| Specifier | Description | Example |
|---|---|---|
| N | Numeric with commas | 1,234.56 |
| C | Currency | $1,234.56 |
| P | Percentage | 123,456.00% |

### Example

**Convert a string to a number for calculations:**

```sql
SELECT
    CAST('150' AS INT) AS PriceAsNumber;
```

**Convert a string to a date:**

```sql
SELECT
    CAST('2025-08-20' AS DATE) AS OrderDate;
```

**Convert an order date to a specific format using CONVERT:**

```sql
SELECT
    OrderID,
    CONVERT(VARCHAR, OrderDate, 23) AS FormattedDate
FROM Orders;
```

**Format a price as currency:**

```sql
SELECT
    ProductName,
    FORMAT(Price, 'C') AS FormattedPrice
FROM Products;
```

**Format a number with commas and no decimals:**

```sql
SELECT
    OrderID,
    FORMAT(TotalAmount, 'N0') AS DisplayTotal
FROM Orders;
```

**Convert order date to European format:**

```sql
SELECT
    OrderID,
    CONVERT(VARCHAR, OrderDate, 103) AS EuropeanDate
FROM Orders;
```

### Practical Takeaway

Use `CAST` for simple type conversions that need to work across different database systems. Use `CONVERT` when you need to format dates in SQL Server using style codes. Use `FORMAT` when you need precise control over how dates or numbers are displayed in reports. Remember that `FORMAT` always returns a string, so do not use it for values that need further numeric or date calculations.

### References

- Baraa Khatib Salkini, *SQL Course -- SQL Functions* (PDF), Slides 42--53: Casting and Formatting with CAST (Slide 52), CONVERT (Slides 49--51), FORMAT (Slides 43--48), and comparison table (Slide 53).

---

## Module Summary

This module covered the four categories of single-row SQL functions plus type conversion:

| Lesson | Topic | Key Functions |
|---|---|---|
| 6.1 | String Functions | `CONCAT`, `UPPER`, `LOWER`, `TRIM`, `REPLACE`, `LEN`, `LEFT`, `RIGHT`, `SUBSTRING` |
| 6.2 | Numeric Functions | `ROUND` |
| 6.3 | Date Functions | `YEAR`, `MONTH`, `DAY`, `DATEPART`, `DATENAME`, `DATETRUNC`, `EOMONTH`, `DATEADD`, `DATEDIFF`, `FORMAT`, `CONVERT`, `CAST`, `ISDATE` |
| 6.4 | NULL Handling | `ISNULL`, `COALESCE`, `NULLIF`, `IS NULL`, `IS NOT NULL` |
| 6.5 | Type Conversion | `CAST`, `CONVERT`, `FORMAT` |

**Key principles to remember:**

1. **Single-row functions** operate on one row at a time and return one result per row. Multi-row (aggregate) functions are covered in Module 7.
2. **Functions can be nested** -- the output of one function can become the input of another.
3. **NULL is not zero or empty** -- always handle it explicitly with `ISNULL`, `COALESCE`, or `IS NULL`.
4. **Use the right tool for the job** -- `CAST` for portability, `CONVERT` for SQL Server date styles, `FORMAT` for display formatting.
5. **Date parts enable time-based analysis** -- extracting year, quarter, month, or day lets you aggregate and filter data at different levels of granularity.

---

## References

- Baraa Khatib Salkini, *SQL Course -- SQL Functions* (PDF):
  - Slides 1--5: Introduction to SQL Functions, single-row vs multi-row classification, nested functions.
  - Slides 6--15: String Functions (CONCAT, UPPER, LOWER, TRIM, REPLACE, LEN, LEFT, RIGHT, SUBSTRING).
  - Slides 16--18: Numeric Functions (ROUND).
  - Slides 19--61: Date & Time Functions (Part Extraction, Format & Casting, Calculations, Validation).
  - Slides 62--77: NULL Functions (ISNULL, COALESCE, NULLIF, IS NULL, IS NOT NULL, NULL vs Empty vs Blank).
  - Slides 42--53: Type Conversion (CAST, CONVERT, FORMAT).
