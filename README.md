# **FinanceTracker**

## **Project Overview**
FinanceTracker is a personal finance management platform designed to help users track their incomes, expenses, budgets, financial goals, and fixed costs. The platform supports budget allocation, savings goals, and provides a comprehensive dashboard with analytics and dynamic views for managing personal finances.

The platform includes:

- **Income and Expense Tracking**: Record daily transactions with categories for better budget management.
- **Budget Management**: Set and track budgets and compare them with actual expenses.
- **Goals Management**: Create savings goals and track progress over time.
- **Fixed Costs**: Automatically add recurring monthly expenses (e.g., rent, insurance).
- **Dashboard**: A customizable dashboard that shows financial overviews with charts and key financial metrics.
## **Tech Stack**

### **Backend**:
- **Node.js** with **Express.js**: RESTful API services for managing user data, budgets, goals, and transactions.
- **PostgreSQL**: Database for storing user data, transactions, and financial configurations.
- **Redis**: Used for caching and enhancing performance.
- **Sequelize ORM**: Manages the database schema and migrations.
- **JWT**: For secure user authentication and session management.
- **Docker**: The backend runs inside a Docker container for consistent environments.
- **Node-Cron**: To handle recurring fixed cost entries automatically.

### **Frontend**:
- **React.js**: Single-page application for user interactions.
- **Chart.js** and **Recharts**: For visualizing financial data (e.g., income vs. expenses, goals progress, etc.).
- **Material-UI (MUI)**: For designing responsive and user-friendly interfaces.
- **Axios**: For making API requests to the backend.
- **React Router**: For navigation within the app.

### **Infrastructure**:
- **Docker Compose**: Manages multi-container setup (frontend, backend, database, Redis).
  
## **Features**

1. **Income & Expense Tracking**:
   - Add daily transactions with categories.
   - Assign transactions to budgets or savings goals.
  
2. **Budgets**:
   - Define monthly budgets and assign expenses to them.
   - View how much budget is left compared to actual expenses.

3. **Savings Goals**:
   - Define savings goals and track progress over time.
   - Automatically calculate the remaining amount to reach the goal.

4. **Fixed Costs**:
   - Automatically adds predefined recurring expenses every month (e.g., rent, bills).

5. **Dashboard**:
   - Income and expense trends over different timeframes.
   - Budget deviation analysis (actual vs. planned).
   - Progress toward savings goals.
   - Monthly breakdown of fixed costs.

6. **Dynamic Dashboard Views**:
   - Users can customize their dashboards by adding/removing widgets.
   - Widgets display different financial analytics (budgets, goals, expenses).
   - Users can filter and sort data or specify a time period.

7. **Authentication**:
   - User authentication with JWT (JSON Web Token) to ensure data security.

8. **Customization**:
   - Customizable views with interactive data analysis, including date filtering and sorting.

## **Getting Started**

### **Prerequisites**
- Docker installed on your machine.
- Node.js installed for local development (optional if you want to run without Docker).

### **Setup Instructions**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MayarAnon/FinanceTracker.git
   cd FinanceTracker
   ```

2. **Create a .env file in the FinanceTracker directory:**
```env
# Backend
NODE_ENV=development
REDIS_HOST=redis
JWT_SECRET=YourJWTToken
# Frontend
REACT_APP_BACKEND_URL=http://localhost:4000
# Datenbank
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=finanztracker_db
DB_HOST=db
DATABASE_URL=postgres://user:password@db:5432/finanztracker_db
```
3. **Run the application using Docker Compose:**
```bash
docker-compose up --build
```
4. **Access the application:**
- Frontend (React app): http://localhost:3000
- Backend API: http://localhost:4000

## **Directory Breakdown**
### **Backend**
  - index.js: Entry point for the Express server.
  - models/: Contains Sequelize models for Users, Transactions, Budgets, Goals, Fixed Costs, and Dashboard Configurations.
  - routes/: API routes to handle authentication, transactions, budgets, goals, etc.
  - migrations/: Sequelize migration files for managing database schema changes.
  - scheduler/: Contains a scheduler for handling monthly fixed cost auto-entries.
### **Frontend**
  - App.js: Entry point for the React application.
  - components/: Reusable UI components such as forms, lists, charts, and navbar.
  - pages/: Main pages such as Dashboard, BudgetsPage, GoalsPage, and TransactionsPage.
  - api.js: Axios configuration for making API requests.
  - styles/: CSS files for styling the frontend components.
## **How to Use**
  - **Register:** Users must register an account to start tracking their finances.
  - **Add Transactions:** Input daily transactions and assign them to categories or budgets.
  - **Set Budgets:** Define monthly budgets and track them against actual spending.
  - **Track Goals:** Define savings goals and track progress.
  - **View Dashboard:** See your overall financial health with visual charts and summaries.
## **Development**
  Running Locally Without Docker
Backend:
```bash
cd backend
npm install
npm run dev
Frontend:
```
```bash
cd frontend
npm install
npm start
```
Database: Make sure to run a PostgreSQL instance locally or use Docker.

## **Contributing**
Contributions are welcome! Please follow these steps:

  - Fork the repository.
  - Create a feature branch: git checkout -b feature-name.
  - Commit your changes: git commit -m 'Add some feature'.
  - Push to the branch: git push origin feature-name.
  - Open a pull request.
## **License**
This project is licensed under the ISC License.
