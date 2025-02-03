# Product Management App

Hey! This is my solutאion for the assignment. It's a simple product management system where you can add, edit and search products.

## What it does

- Register and Log in to manage your products
- Add new products with name, category, price and stock
- Search through your products
- Edit existing products
- Nice and simple UI with Angular Material

## Tech Stack

- Backend: .NET Core Web API with Entity Framework
- Frontend: Angular with Material UI
- Database: MS SQL Server

## How to run it

1. Set up the database:
- Open SQL Server Management Studio
- Run the script in `Database/database-setup.sql`

2. Run the backend:
```bash
cd ProductManagement.API
dotnet run
```
The API will be at `http://localhost:5171`

3. Run the frontend:
```bash
cd product-management-ui
npm install
ng serve
```
Open `http://localhost:4200` in your browser

## Project Structure

I tried to keep it simple and organized:

### Backend
- Controllers for handling API requests
- Models for database stuff
- DTOs for data transfer
- Basic JWT auth

### Frontend
- Components for each page/feature
- Services for API calls
- Models for TypeScript interfaces
- Basic route protection

## Notes

- Used Material Design for a clean look
- Added basic input validation
- Secured API endpoints with JWT
- Tried to follow clean code practices

Let me know if you have any questions! (:
