# ✈️ Flight Voucher Backend

A Laravel-based backend API for managing crew vouchers based on flight details and aircraft seat layout rules.

## ✨ Features

- Laravel API backend
- SQLite file-based database
- API Resources for consistent JSON formatting
- Composite unique constraint (`flight_number` + `flight_date`)
- Aircraft seat layout validation
- Feature & Unit Testing

## 📦 Prerequisites

Make sure your system has the following installed:

- PHP 8.2+
- Composer
- Node.js 18+
- NPM
- SQLite (usually bundled with PHP)

#### Check Versions
```bash
php -v
composer -v
node -v
npm -v
```

#### Enable SQLite Extensions
Run `php -m | findstr sqlite` (Windows) or `php -m | grep sqlite` (macOS/Linux). You should see:
```
pdo_sqlite
sqlite3
```

## 🚀 Getting Started

### 1. Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd flight-vouchers/backend
    ```

2.  Install backend dependencies:
    ```bash
    composer install
    ```

3.  Install frontend dependencies:
    ```bash
    npm install
    ```

### 2. Environment Configuration

1.  Copy the environment file. This file will be ignored by Git.
    ```bash
    cp .env.example .env
    ```

2.  Generate a unique application key:
    ```bash
    php artisan key:generate
    ```

### 3. Database Setup

This project uses a SQLite file-based database.

1.  Create an empty database file in the `database/` directory:
    ```bash
    touch database/vouchers.db
    ```
    > **Note:** If you are on Windows and don't have `touch`, you can use `type nul > database/vouchers.db`.

2.  Update your `.env` file to use SQLite and provide the **absolute path** to the database file you just created.

    ```dotenv
    DB_CONNECTION=sqlite
    DB_DATABASE=/full/path/to/your/project/backend/database/vouchers.db
    
    # These variables are not used by the SQLite driver
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=
    ```

### 4. Run Database Migrations

Once the database is configured, run the migrations to create the table schema.

```bash
php artisan migrate
```

To start over with a clean database, you can use `migrate:fresh`:
```bash
php artisan migrate:fresh
```

## ▶️ Running the Application

### Backend Server (Artisan)

Start the Laravel development server:
```bash
php artisan serve
```
The API will be available at `http://127.0.0.1:8000`.

### Frontend Server (Vite)

To work on the frontend, start the Vite development server:
```bash
npm run dev
```

For a production-ready build of the frontend assets:
```bash
npm run build
```

## 🧪 Testing

Run the test suite using the following Artisan command:
```bash
php artisan test
```
