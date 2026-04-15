# Module 1 – Introduction to SQL

---

## Lesson 1.1 – What Is SQL

### Why This Matters

Every business stores data — customer records, orders, products, sales transactions. That data lives inside databases, and to access it you need a language the database understands. SQL is that language. Without SQL, you cannot ask questions about data, build reports, or make data-driven decisions.

### Explanation

SQL stands for **Structured Query Language**. It is pronounced "sequel" or "S-Q-L."

SQL is the standard language used to communicate with relational databases. When a business collects data from customers, products, and sales, that data is stored in a database. SQL lets you write instructions — called **queries** — to retrieve, insert, update, or delete that data.

Think of it this way: a database holds millions of records organized in tables. Instead of opening spreadsheets one by one and searching manually, you write a SQL query and the database returns exactly what you need in seconds.

### Example

Imagine a company has 30 million rows of sales data. A manager asks: "What was our total spending last quarter?" Rather than scrolling through spreadsheets, an analyst writes a single SQL query and gets the answer instantly.

```sql
SELECT SUM(TotalAmount) AS TotalSpending
FROM Orders
WHERE OrderDate BETWEEN '2025-10-01' AND '2025-12-31';
```

### Practical Takeaway

SQL is the bridge between you and data. If you work with data in any capacity — as an analyst, product manager, or developer — SQL is the first skill to learn.

### References

- Baraa Khatib Salkini, SQL Course – Intro to SQL (Slides 1–2)

---

## Lesson 1.2 – Why SQL Matters

### Why This Matters

Understanding why SQL is valuable helps you invest your learning time wisely. SQL is not just another technical skill — it is one of the most in-demand skills across multiple roles in the data industry.

### Explanation

There are three key reasons to learn SQL:

**1. Talk to Data**
Businesses store data across multiple databases. SQL gives you direct access to that data. You can query databases to answer business questions without relying on someone else to pull the numbers for you.

**2. High Demand**
SQL is required across many job roles, including:
- Data Analyst
- Data Scientist
- Data Engineer
- Software Developer

Virtually every data-related job listing mentions SQL as a core requirement.

**3. Industry Standard**
SQL works across many tools and platforms. Products like Power BI, Tableau, Kafka, Spark, and Synapse all use SQL or SQL-like syntax. Learning SQL once gives you a transferable skill that applies across the modern data ecosystem.

### Example

A product analyst needs to check how many users signed up last month. Instead of requesting a report from engineering, they write:

```sql
SELECT COUNT(*) AS NewCustomers
FROM Customers
WHERE SignUpDate >= '2026-03-01' AND SignUpDate < '2026-04-01';
```

This independence makes teams faster and decisions more timely.

### Practical Takeaway

SQL is not limited to one tool or one role. It is a universal data skill. The sooner you learn it, the sooner you become self-sufficient with data.

### References

- Baraa Khatib Salkini, SQL Course – Intro to SQL, "Why Learn SQL?" (Slide 9)

---

## Lesson 1.3 – Database Fundamentals

### Why This Matters

Before writing SQL, you need to understand where data lives. A database is more than a spreadsheet — it is a structured, secure, and scalable system designed to store and manage large amounts of data.

### Explanation

A **database** is an organized collection of data stored electronically. Unlike files scattered across a laptop (spreadsheets, text files, notes), a database keeps everything centralized, structured, and secure.

Databases are managed by a **Database Management System (DBMS)**. The DBMS sits between the database and its users. It receives SQL commands and translates them into operations on the stored data.

The architecture works like this:

```
Users / Apps / BI Tools
        |
    SQL Queries
        |
      DBMS
        |
    DATABASE
        |
   SERVER (Cloud or On-Premise)
```

Multiple users, applications, and tools (like Power BI) can send SQL queries to the DBMS at the same time. The DBMS handles all requests and keeps the database running 24/7.

### Example

A company has a web application, a Power BI dashboard, and a team of analysts. All three connect to the same database through the DBMS. Each sends SQL queries independently, and the DBMS serves them all without conflicts.

### Practical Takeaway

A database is not a file on your desktop. It is a managed system that runs on a server, handles multiple users at once, and is available around the clock. The DBMS is the gatekeeper that processes every SQL command.

### References

- Baraa Khatib Salkini, SQL Course – Intro to SQL, "DBMS & SQL Server" (Slide 3)

---

## Lesson 1.4 – Tables and Rows

### Why This Matters

Tables are the core building blocks of any relational database. Every query you write in SQL reads from or writes to a table. Understanding how tables are structured is essential before you write your first query.

### Explanation

A relational database organizes data into **tables**. Each table represents a specific entity, such as Customers, Products, or Orders.

A table is made up of:

- **Columns** – Define what information is stored (e.g., Id, Name, Score, Birthdate). Each column has a name and a data type.
- **Rows** – Each row is a single record (e.g., one customer, one order).
- **Cells** – The intersection of a row and a column. Each cell holds one value.
- **Primary Key** – A column (or set of columns) that uniquely identifies each row. No two rows can share the same primary key value.

Here is an example table:

| Id | Name  | Score | Birthdate  |
|----|-------|-------|------------|
| 1  | Maria | 350   | 1988-01-15 |
| 2  | John  | 900   | 2000-02-10 |
| 3  | Peter | 0     | 1990-03-20 |

In this table, **Id** is the primary key. **Name**, **Score**, and **Birthdate** are columns. Each row represents one person.

### Data Types

Every column stores a specific type of data:

| Category | Type    | Example            |
|----------|---------|--------------------|
| Numeric  | INT     | 1, 2, 30           |
| Numeric  | DECIMAL | 3.14, 100.50       |
| Text     | CHAR    | 'Maria', 'E5A6'    |
| Text     | VARCHAR | 'Maria', 'E5A6'    |
| DateTime | DATE    | '2025-10-30'       |
| DateTime | TIME    | '09:30:00'         |

### Database Hierarchy

Tables do not exist in isolation. They fit into a larger structure:

```
SERVER
  └── DATABASE (e.g., Sales, HR)
        └── SCHEMA (e.g., Orders, Customers)
              └── TABLE (e.g., Items, Purchases)
```

A server can hold multiple databases. Each database can hold multiple schemas. Each schema can hold multiple tables.

### Example

In the SalesDB database used throughout this course, the main tables are:

- **Products** – stores product information
- **Customers** – stores customer details
- **Orders** – stores transaction records (the central table)
- **Employees** – stores employee data

### Practical Takeaway

Everything in SQL revolves around tables. Columns define the structure, rows hold the data, and primary keys keep every record unique. Before you query a database, understand which tables exist and how they are organized.

### References

- Baraa Khatib Salkini, SQL Course – Intro to SQL, "Database Structure" (Slides 5–6)
- Baraa Khatib Salkini, SQL Course – Intro to SQL, "How Tables are Stored" (Slide 7)

---

## Lesson 1.5 – SQL Command Categories

### Why This Matters

SQL is not a single command — it is a language with different categories of commands. Knowing which category a command belongs to helps you understand what it does and when to use it.

### Explanation

SQL commands are grouped into three main categories:

### 1. DQL – Data Query Language

Used to **read** data from the database.

| Command | Purpose                |
|---------|------------------------|
| SELECT  | Retrieve data from tables |

This is the most commonly used category. Analysts spend most of their time writing SELECT queries.

### 2. DDL – Data Definition Language

Used to **define and modify** the structure of the database (tables, schemas, columns).

| Command | Purpose                        |
|---------|--------------------------------|
| CREATE  | Create a new table or database |
| ALTER   | Modify an existing structure   |
| DROP    | Delete a table or database     |

### 3. DML – Data Manipulation Language

Used to **modify the data** inside tables.

| Command | Purpose                   |
|---------|---------------------------|
| INSERT  | Add new rows to a table   |
| UPDATE  | Change existing row values|
| DELETE  | Remove rows from a table  |

### Example

Here is how the categories relate to a typical workflow:

1. **DDL** – An engineer creates the Orders table using `CREATE TABLE`.
2. **DML** – An application inserts new orders using `INSERT INTO`.
3. **DQL** – An analyst retrieves last month's orders using `SELECT`.

```sql
-- DDL: Create a table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    TotalAmount DECIMAL(10,2),
    OrderDate DATE
);

-- DML: Insert a record
INSERT INTO Orders (OrderID, CustomerID, TotalAmount, OrderDate)
VALUES (1, 101, 250.00, '2026-04-01');

-- DQL: Query the data
SELECT * FROM Orders;
```

### Practical Takeaway

As a data analyst, you will primarily use **DQL (SELECT)** to read data. Understanding DDL and DML helps you understand how data gets into the database in the first place. All three categories work together to form the full SQL lifecycle.

### References

- Baraa Khatib Salkini, SQL Course – Intro to SQL, "Types of SQL Commands" (Slide 8)

---

## Module Summary

In this module you learned:

1. **SQL** is Structured Query Language — the standard way to communicate with databases.
2. SQL is in **high demand** across data roles and is an **industry standard** used in many tools.
3. A **database** is a structured, centralized data store managed by a **DBMS**.
4. Data is organized in **tables** made up of columns, rows, cells, and primary keys.
5. SQL commands fall into three categories: **DQL** (read), **DDL** (define structure), and **DML** (modify data).

---

## References

- Baraa Khatib Salkini, *SQL Course – Intro to SQL*, Udemy SQL Bootcamp (Slides 1–10)
- TOPIC_MAP.md – Track 1, Module 1
- CONTENT_RULES.md – Lesson structure and writing guidelines
