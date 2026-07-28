# Price Tracker

A full-stack web application that tracks product prices and detects real discounts using historical price analysis.

![Price Tracker Screenshot](docs/pantalla.png)

## The Problem

Most online "sales" are not real discounts. Price Tracker stores historical price data and alerts you only when a price genuinely drops below its 90-day baseline — not just when a store labels something as on sale.

## Features

- JWT-based authentication with register and login
- Product tracking via FakeStore API
- Automated price collection every hour via cron job
- Price evolution chart with interactive tooltips
- Smart alerts triggered when price drops below the 20th percentile of 90-day history
- Alert dashboard showing the 5 most recent price minimums per product

## Tech Stack

**Backend**
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT authentication with bcrypt
- node-cron for scheduled price updates

**Frontend**
- React + Vite
- Tailwind CSS
- Recharts
- Axios

## Getting Started

### Prerequisites
- Node.js 22+
- PostgreSQL

### Backend

```bash
cd price-tracker
npm install
```

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/pricetracker"
JWT_SECRET="your_secret_key"
```

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Create account | No |
| POST | /api/auth/login | Login | No |
| GET | /api/productos/mis-productos | Get user products | Yes |
| POST | /api/productos/track | Follow a product | Yes |
| GET | /api/productos/:id/historial | Price history | Yes |
| GET | /api/alertas | Price alerts | Yes |

## Smart Alert Algorithm

Alerts are triggered when the current price falls below the 20th percentile of the last 90 days of price history.

```javascript
const precios = historial.map(h => h.price).sort((a, b) => a - b)
const indice = Math.floor(precios.length * 0.2)
const percentil20 = precios[indice]

if (precioActual < percentil20) {
  // create alert
}
```

## Author

Cecilia Caraballo Pérez — [GitHub](https://github.com/ceciliacarpe)