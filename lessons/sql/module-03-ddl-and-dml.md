# Module 3 -- DDL and DML

**Track 1 -- SQL Foundations to Analytics**

DDL (Data Definition Language) commands define the structure of your database -- they let you create, modify, and remove tables. DML (Data Manipulation Language) commands work with the data inside those tables -- they let you add, change, and remove rows. Together, these six commands give you full control over both the shape and the content of your database.

This module is divided into two parts:

- **Part A -- DDL:** CREATE, ALTER, DROP (Lessons 3.1--3.3)
- **Part B -- DML:** INSERT, UPDATE, DELETE (Lessons 3.4--3.6)

All examples use the **SalesDB** schema with the tables **Products**, **Customers**, **Orders**, and **Employees**. The **Orders** table is the central table that connects customers to products.

---

## Part A -- Data Definition Language (DDL)

DDL commands define the structure of your data. They operate on database objects such as tables and columns -- not on the rows of data inside those tables. The three core DDL commands are CREATE, ALTER, and DROP.

---

## Lesson 3.1 -- CREATE

### Why This Matters

Before you can store any data, you need a place to put it. The `CREATE TABLE` statement builds a new table in your database by defining its column names, data types, and constraints. Every analytics project starts here -- without a well-defined table structure, you cannot reliably store or query data.

### Explanation

The `CREATE TABLE` statement defines a new table. You specify the table name, then list each column with its data type and any constraints.

**Syntax:**

```sql
CREATE TABLE table_name (
    column1  datatype  constraint,
    column2  datatype  constraint,
    ...
);
```

Key points:

- Each column must have a **name** and a **data type** (for example, `INT`, `VARCHAR`, `DATE`, `DECIMAL`).
- **Constraints** are optional rules that enforce data quality. Common constraints include:
  - `PRIMARY KEY` -- uniquely identifies each row.
  - `NOT NULL` -- prevents empty values.
  - `FOREIGN KEY` -- links a column to a primary key in another table.
  - `DEFAULT` -- assigns a default value when none is provided.

### Example

Create the four core tables in SalesDB:

```sql
CREATE TABLE Customers (
    CustomerID   INT PRIMARY KEY,
    FirstName    VARCHAR(50) NOT NULL,
    LastName     VARCHAR(50) NOT NULL,
    Email        VARCHAR(100),
    City         VARCHAR(50)
);

CREATE TABLE Products (
    ProductID    INT PRIMARY KEY,
    ProductName  VARCHAR(100) NOT NULL,
    Category     VARCHAR(50),
    Price        DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Employees (
    EmployeeID   INT PRIMARY KEY,
    FirstName    VARCHAR(50) NOT NULL,
    LastName     VARCHAR(50) NOT NULL,
    Department   VARCHAR(50),
    HireDate     DATE
);

CREATE TABLE Orders (
    OrderID      INT PRIMARY KEY,
    CustomerID   INT NOT NULL,
    ProductID    INT NOT NULL,
    EmployeeID   INT,
    OrderDate    DATE NOT NULL,
    Quantity     INT NOT NULL,
    TotalAmount  DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ProductID)  REFERENCES Products(ProductID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
```

Notice that the **Orders** table uses foreign keys to reference the other three tables. This makes it the central table in the SalesDB schema.

### Practical Takeaway

Always plan your table structure before writing the `CREATE TABLE` statement. Choose appropriate data types and apply constraints like `NOT NULL` and `PRIMARY KEY` from the start. A well-designed table prevents bad data from entering your database.

---

## Lesson 3.2 -- ALTER

### Why This Matters

Business requirements change. You may need to add a new column, change a data type, or remove a column that is no longer needed. The `ALTER TABLE` statement lets you modify an existing table without deleting it and starting over. This is essential for maintaining a database that evolves alongside the business.

### Explanation

The `ALTER TABLE` statement modifies the structure of an existing table. Common operations include:

- **Add a column:** Introduce a new column to the table.
- **Drop a column:** Remove an existing column from the table.
- **Alter/modify a column:** Change the data type or constraints of an existing column.

**Syntax -- Add a column:**

```sql
ALTER TABLE table_name
ADD column_name datatype constraint;
```

**Syntax -- Drop a column:**

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

**Syntax -- Modify a column:**

```sql
ALTER TABLE table_name
ALTER COLUMN column_name new_datatype;
```

> Note: The exact syntax for modifying a column varies by database system. The example above uses SQL Server syntax. In MySQL, you would use `MODIFY COLUMN` instead of `ALTER COLUMN`.

### Example

**Add a phone number column to the Customers table:**

```sql
ALTER TABLE Customers
ADD Phone VARCHAR(20);
```

**Change the size of the Email column:**

```sql
ALTER TABLE Customers
ALTER COLUMN Email VARCHAR(150);
```

**Remove the Phone column if it is no longer needed:**

```sql
ALTER TABLE Customers
DROP COLUMN Phone;
```

### Practical Takeaway

Use `ALTER TABLE` to evolve your schema as requirements change. It is safer than dropping and recreating a table because it preserves the existing data. Always verify your changes afterwards to make sure the table structure matches your expectations.

---

## Lesson 3.3 -- DROP

### Why This Matters

Sometimes a table is no longer needed -- it may have been created for testing, or the business no longer tracks that data. The `DROP TABLE` statement permanently removes a table and all of its data from the database. Understanding this command is critical because it is irreversible.

### Explanation

The `DROP TABLE` statement deletes an entire table, including its structure and all the data it contains.

**Syntax:**

```sql
DROP TABLE table_name;
```

Key points:

- `DROP TABLE` is **permanent**. Once executed, the table and all its data are gone.
- You cannot drop a table that is referenced by a foreign key in another table unless you remove the foreign key constraint first or drop the dependent table first.
- Some databases support `DROP TABLE IF EXISTS`, which prevents an error if the table does not exist:

```sql
DROP TABLE IF EXISTS table_name;
```

### Example

**Drop a temporary test table:**

```sql
DROP TABLE IF EXISTS TestOrders;
```

**Drop the Orders table (since other tables depend on it being referenced, not the other way around, this will succeed):**

```sql
DROP TABLE Orders;
```

> Warning: If you drop the Customers table before dropping Orders, the command will fail because Orders has a foreign key that references Customers.

### Practical Takeaway

Treat `DROP TABLE` with extreme caution. Always confirm that the table is no longer needed and that no other tables depend on it. In a production environment, back up your data before dropping any table. When in doubt, use `DROP TABLE IF EXISTS` to avoid runtime errors.

---

## Part B -- Data Manipulation Language (DML)

DML commands modify the data inside your tables. While DDL defines the structure, DML works with the actual rows -- adding new records, changing existing values, and removing rows. The three core DML commands are INSERT, UPDATE, and DELETE.

---

## Lesson 3.4 -- INSERT

### Why This Matters

A table with no data is just an empty structure. The `INSERT INTO` statement adds new rows of data to a table. Whether you are loading initial data, recording a new customer, or logging a new order, `INSERT` is the command that populates your database.

### Explanation

The `INSERT INTO` statement adds one or more rows to a table. There are two main methods:

**Method 1 -- Manual entry with VALUES:**

You provide the values directly.

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

**Method 2 -- INSERT using SELECT:**

You insert rows based on the result of a query from another table (or the same table).

```sql
INSERT INTO table_name (column1, column2, column3)
SELECT column1, column2, column3
FROM source_table
WHERE condition;
```

Key rules:

- The number of values must **match** the number of columns specified.
- If you omit the column list, SQL expects values for **all** columns in the table, in order.
- You can insert **multiple rows** in a single statement by separating value sets with commas.

### Example

**Insert a single customer:**

```sql
INSERT INTO Customers (CustomerID, FirstName, LastName, Email, City)
VALUES (1, 'Sara', 'Ahmed', 'sara.ahmed@email.com', 'Dubai');
```

**Insert multiple products at once:**

```sql
INSERT INTO Products (ProductID, ProductName, Category, Price)
VALUES (101, 'Wireless Mouse', 'Electronics', 29.99),
       (102, 'Desk Lamp', 'Office', 45.00),
       (103, 'Notebook Pack', 'Stationery', 12.50);
```

**Insert a new order:**

```sql
INSERT INTO Orders (OrderID, CustomerID, ProductID, EmployeeID, OrderDate, Quantity, TotalAmount)
VALUES (5001, 1, 101, NULL, '2025-01-15', 2, 59.98);
```

### Practical Takeaway

Always specify the column names in your `INSERT` statement -- it makes your queries easier to read and protects you from errors if the table structure changes later. When loading multiple rows, use a single `INSERT` with multiple value sets for better performance.

---

## Lesson 3.5 -- UPDATE

### Why This Matters

Data is rarely static. Prices change, customers move to new cities, and order statuses get updated. The `UPDATE` statement lets you modify existing data in a table without deleting and reinserting rows.

### Explanation

The `UPDATE` statement changes the values of one or more columns in existing rows.

**Syntax:**

```sql
UPDATE table_name
SET column1 = value1,
    column2 = value2
WHERE condition;
```

Key rules:

- The `SET` clause specifies which columns to change and their new values.
- The `WHERE` clause filters which rows are affected.
- **Always use a WHERE clause.** Without it, the `UPDATE` will modify **every row** in the table, which is almost never what you intend.

### Example

**Update a product price:**

```sql
UPDATE Products
SET Price = 34.99
WHERE ProductID = 101;
```

**Update a customer's city and email:**

```sql
UPDATE Customers
SET City = 'Abu Dhabi',
    Email = 'sara.new@email.com'
WHERE CustomerID = 1;
```

**Update the total amount on an order after a price correction:**

```sql
UPDATE Orders
SET TotalAmount = 69.98
WHERE OrderID = 5001;
```

### Practical Takeaway

Never run an `UPDATE` without a `WHERE` clause unless you intentionally want to change every row. Before executing an update in a production environment, run a `SELECT` with the same `WHERE` condition first to verify which rows will be affected.

---

## Lesson 3.6 -- DELETE

### Why This Matters

Sometimes data needs to be removed -- a test record, a cancelled order, or a duplicate entry. The `DELETE` statement removes rows from a table. Like `UPDATE`, it requires careful use of the `WHERE` clause to avoid removing more data than intended.

### Explanation

The `DELETE FROM` statement removes one or more rows from a table.

**Syntax:**

```sql
DELETE FROM table_name
WHERE condition;
```

Key rules:

- The `WHERE` clause specifies which rows to delete.
- **Always use a WHERE clause.** Without it, `DELETE` removes **all rows** from the table.
- `DELETE` removes rows but keeps the table structure intact. This is different from `DROP`, which removes the entire table.

> **DELETE vs. DROP:**
> - `DELETE FROM Orders;` removes all rows but the Orders table still exists and can receive new data.
> - `DROP TABLE Orders;` removes the table itself -- structure, data, and all.

### Example

**Delete a specific order:**

```sql
DELETE FROM Orders
WHERE OrderID = 5001;
```

**Delete all orders for a customer who closed their account:**

```sql
DELETE FROM Orders
WHERE CustomerID = 1;
```

**Delete a product that is no longer sold:**

```sql
DELETE FROM Products
WHERE ProductID = 103;
```

### Practical Takeaway

Always include a `WHERE` clause when using `DELETE`. Before deleting, run a `SELECT` with the same `WHERE` condition to preview which rows will be removed. In analytics work, prefer soft deletes (adding a status column like `IsActive = 0`) over hard deletes so you retain historical data for analysis.

---

## Module Summary

| Command | Category | Purpose |
|---------|----------|---------|
| `CREATE` | DDL | Build a new table with defined columns and constraints |
| `ALTER` | DDL | Modify an existing table's structure (add, change, or remove columns) |
| `DROP` | DDL | Permanently delete an entire table and its data |
| `INSERT` | DML | Add new rows of data into a table |
| `UPDATE` | DML | Change existing values in one or more rows |
| `DELETE` | DML | Remove specific rows from a table |

**Key distinctions to remember:**

- **DDL vs. DML:** DDL commands change the structure (schema) of your database. DML commands change the data inside that structure.
- **DROP vs. DELETE:** `DROP` removes the table entirely. `DELETE` removes rows but keeps the table.
- **Safety rule:** Always use a `WHERE` clause with `UPDATE` and `DELETE` to avoid unintended changes to all rows.

---

## References

- Baraa Khatib Salkini, *SQL Course -- DDL Commands* (PDF), Slides 1--3: SQL command categories, DDL overview (CREATE, ALTER, DROP), and the concept of defining database structure.
- Baraa Khatib Salkini, *SQL Course -- DML Commands* (PDF), Slide 1--2: SQL command categories and DML overview (INSERT, UPDATE, DELETE) for modifying data.
- Baraa Khatib Salkini, *SQL Course -- DML Commands* (PDF), Slide 3: Visual overview showing INSERT adds rows, UPDATE modifies rows, and DELETE removes rows.
- Baraa Khatib Salkini, *SQL Course -- DML Commands* (PDF), Slide 4: INSERT methods -- manual entry with VALUES and INSERT using SELECT from a source table.
- Baraa Khatib Salkini, *SQL Course -- DML Commands* (PDF), Slide 5: INSERT syntax -- column list is optional; the number of values must match the number of columns; multiple inserts supported.
- Baraa Khatib Salkini, *SQL Course -- DML Commands* (PDF), Slide 6: UPDATE syntax -- SET clause for new values, WHERE clause required to avoid updating all rows.
- Baraa Khatib Salkini, *SQL Course -- DML Commands* (PDF), Slide 7: DELETE syntax -- WHERE clause required to avoid deleting all rows.
