✈️ Flight Voucher Backend

A Laravel-based backend API for managing crew vouchers based on flight details and aircraft seat layout rules.

This project includes:

Laravel API backend

SQLite file-based database

API Resources for consistent JSON formatting

Composite unique constraint (flight_number + flight_date)

Aircraft seat layout validation

Feature & Unit Testing

📦 1. Prerequisites

Make sure your system has the following installed:

PHP 8.2+

Composer

Node.js 18+

NPM

SQLite (usually bundled with PHP)

Check versions:

php -v
composer -v
node -v
npm -v


Ensure SQLite extensions are enabled:

php -m | findstr sqlite


You should see:

pdo_sqlite
sqlite3

📥 2. Install Dependencies

Clone the repository:

git clone <repository-url>
cd flight-vouchers/backend


Install backend dependencies:

composer install


Install frontend dependencies:

npm install

⚙️ 3. Environment Configuration

Copy the environment file:

cp .env.example .env


Generate application key:

php artisan key:generate

🗄 SQLite Database Configuration

This project uses a SQLite file-based database.

Create the database file if it does not exist:

type nul > database/vouchers.db


Update your .env file:

DB_CONNECTION=sqlite
DB_DATABASE=E:/flight-vouchers/backend/database/vouchers.db


For SQLite:

DB_HOST is not used

DB_PORT is not used

DB_USERNAME is not used

DB_PASSWORD is not used

🗄 4. Run Database Migrations

After setting up the database file:

php artisan migrate


To reset the database:

php artisan migrate:fresh

🚀 5. Run the Application
▶️ Run Backend Server
php artisan serve


The application will run at:

http://127.0.0.1:8000

🎨 Run Frontend (Vite)

Start development server:

npm run dev


For production build:

npm run build
