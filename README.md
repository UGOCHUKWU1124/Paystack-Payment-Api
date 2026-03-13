# Paystack Payment Integration API

A robust, production-ready REST API for securely handling payments via **Paystack**. This application is built with **Node.js, Express, and TypeScript**, and it integrates seamlessly with a **Neon PostgreSQL** database using **Prisma ORM**.

## ✨ Features

- **Payment Processing**: End-to-end integration with the Paystack API for initializing and verifying transactions.
- **Database Persistence**: Securely stores successful payment details linking `email`, `amount`, `name`, and Paystack `reference` using Prisma and Neon DB.
- **Input Validation**: Strict schema validation on incoming API requests using **Joi** middleware.
- **Rate Limiting**: Includes global IP-based rate limiting to protect the endpoints against abuse and brute-force attacks (`express-rate-limit`).
- **Robust Error Handling**: Centralized global error handling middleware, capturing standard HTTP errors, application errors, and unhandled exceptions nicely.
- **Type Safety**: Fully typed codebase from request/response models to external API interfaces with TypeScript.
- **Security**: Configured CORS settings defining strict origin, credentials, and allowed headers.

## 🛠️ Tech Stack

- **Framework**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL (Neon)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Joi](https://joi.dev/)
- **Third-Party API**: [Paystack API](https://paystack.com/docs/api/)

## 📂 Project Structure

```text
src/
├── api/            # Wrapper for external service calls (Paystack HTTP endpoints)
├── controller/     # Express route controllers carrying application logic
├── packages/       # Core utilities (error handler, middleware, Prisma config)
├── routes/         # Express router configurations
├── service/        # Core business logic processing (transaction handling, etc.)
├── validator/      # Joi validation schemas for incoming payload requests
└── main.ts         # Application entry point & Express startup configuration
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18+ recommended)
- **NPM**, **Yarn**, or **pnpm**
- **Paystack keys** (Secret and Public Key from the developer dashboard)
- **Neon** PostgreSQL database connection string

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd "Paystack Payment"
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file in the root of the project and provide the following variables:

   ```env
   PORT=8000
   DATABASE_URL="postgresql://<username>:<password>@<host>/<database>?sslmode=require"
   PAYSTACK_SECRET_KEY="sk_....................."
   ```

4. Set up the Database with Prisma:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Run the server (Development Mode):
   ```bash
   npm run dev
   ```
   _The server should now be running locally, typically on `http://localhost:<PORT>/api`._

## 📌 API Endpoints

### 1. Initialize Payment

**POST** `/api/initialize`

Validates your payload and securely initializes a payment transaction with Paystack.

- **Request Body Configuration**:
  Expects `amount`, `email`, `name`, and optionally a `callbackUrl`.

- **Response Details**:
  Will return connection data to complete the transaction frontend (e.g., Paystack `authorization_url`).

### 2. Verify Payment

**GET** `/api/paystack/verify?reference=<PAYSTACK_REFERENCE>`

Verifies the transaction state with Paystack. If the payment was successful, it records the transaction safely into the configured PostgreSQL Database.

- **Query Parameters**:
  Needs a valid `reference` corresponding to an already initialized checkout transaction.

## 🤝 Contribution

Contributions, issues, and feature requests are always welcome! Feel free to check the issues page or submit a highly-detailed PR.

## 📝 License

This project is open-source and available under the ISC License.
