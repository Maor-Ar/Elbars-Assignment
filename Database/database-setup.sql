CREATE DATABASE ProductManagement;
GO

USE ProductManagement;
GO

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Password NVARCHAR(256) NOT NULL,
    LastLogIn DATETIME,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE Products (
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    ProductName NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    UnitsInStock INT NOT NULL
);

-- Create stored procedures
GO
CREATE PROCEDURE sp_GetAllProducts
AS
BEGIN
    SELECT * FROM Products;
END

GO
CREATE PROCEDURE sp_SearchProducts
    @SearchTerm NVARCHAR(100),
    @Category NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Products
    WHERE (@SearchTerm IS NULL OR ProductName LIKE '%' + @SearchTerm + '%')
    AND (@Category IS NULL OR Category = @Category);
END

GO
CREATE PROCEDURE sp_AddProduct
    @ProductName NVARCHAR(100),
    @Category NVARCHAR(50),
    @Price DECIMAL(18,2),
    @UnitsInStock INT
AS
BEGIN
    INSERT INTO Products (ProductName, Category, Price, UnitsInStock)
    VALUES (@ProductName, @Category, @Price, @UnitsInStock);
    
    SELECT SCOPE_IDENTITY() as ProductId;
END

GO
CREATE PROCEDURE sp_UpdateProduct
    @ProductId INT,
    @ProductName NVARCHAR(100),
    @Category NVARCHAR(50),
    @Price DECIMAL(18,2),
    @UnitsInStock INT
AS
BEGIN
    UPDATE Products
    SET ProductName = @ProductName,
        Category = @Category,
        Price = @Price,
        UnitsInStock = @UnitsInStock
    WHERE ProductId = @ProductId;
END
