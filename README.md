# Ecommerce-Website

A responsive React storefront with a MongoDB/Express API, shared cart state, product browsing, and checkout order creation.

## Structure

```text
frontend/
	components/       Shared navigation and product card
	context/          CartContext and useCart
	data/             Local artwork used when the API is unavailable
	pages/            Home, Shop, Cart, Checkout routes
	services/         Fetch-based API client
backend/src/
	config/           MongoDB connection
	controllers/      Product and order request handlers
	middleware/       Express error handling
	models/           User, Product, and Order schemas
	routes/           Product and order endpoints
	seed.js           Example catalog seed
	server.js         Express entry point
```

## Run locally

1. Install frontend dependencies: `cd frontend` then `npm install`
2. Install backend dependencies: `cd backend` then `npm install`
3. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`.
4. Start MongoDB, seed the catalog with `npm run seed` from `backend`.
5. Start the API with `npm run dev` from `backend`.
6. In a second terminal, run `npm run dev` from `frontend`.

The frontend defaults to `http://localhost:5000/api`. Set `VITE_API_URL` when the API is deployed elsewhere.

If using local MongoDB, make sure the MongoDB service is running before `npm run seed`. If using MongoDB Atlas, replace `MONGO_URI` in `backend/.env` with the Atlas connection string.

## Deploy backend on Render

1. Create a free MongoDB Atlas database and copy its connection string.
2. In Render, choose **New > Blueprint**, connect this GitHub repository, and select `render.yaml`.
3. Add the Atlas connection string as the `MONGO_URI` environment variable when prompted.
4. Deploy the `ecommerce-api` service and verify `https://your-render-url.onrender.com/api/health`.
5. Run the seed command from the Render service shell, or run it locally with the Atlas `MONGO_URI`.
6. Set the frontend `VITE_API_URL` to `https://your-render-url.onrender.com/api`, rebuild, and run `npm run deploy` from `frontend`.

The Render service already sets `CLIENT_URL` to the GitHub Pages origin and generates `JWT_SECRET` automatically.

## API

- `GET /api/health`
- `GET /api/products?category=Women`
- `GET /api/products/:id`
- `POST /api/products`
- `GET /api/orders`
- `POST /api/orders`

Orders recalculate their total from database product prices before saving. Authentication and payment processing should be added before accepting real payments; the User schema is ready for that next layer.

## Checks

```bash
cd frontend
npm run build
npm run lint
```
