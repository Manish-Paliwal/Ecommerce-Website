Ecommerce MERN — Local run instructions

Overview
- Backend: Express + MongoDB (Mongoose)
- Frontend: React (Parcel)
- Basic features: product listing, product page, cart, checkout, auth (register/login), admin product create/delete, seed script with dummy data.

Prereqs
- Node.js (>=16), npm
- MongoDB running locally or accessible via connection string

1) Get project files
- Ensure directory structure:
  ecommerce-mern/
    backend/
    frontend/

2) Backend setup
- cd ecommerce-mern/backend
- Copy .env.example -> .env and fill values if needed (default works for local MongoDB)
  - MONGO_URI (default: mongodb://127.0.0.1:27017/ecommerce_db)
  - JWT_SECRET (set to any string)
  - PORT (default 5000)
- Install:
  npm install
- Seed DB with dummy data:
  npm run seed
  (Output will show admin credentials: admin@example.com / admin123)
- Start backend:
  npm run dev
  or
  npm start

3) Frontend setup
- cd ../frontend
- Copy .env.example -> .env if you want to override BACKEND_URL (default http://localhost:5000/api)
- Install:
  npm install
- Start frontend (Parcel will open browser):
  npm start

4) Usage
- Open http://localhost:1234 (Parcel default) or the browser window Parcel opens.
- Login as admin (if you used seed): admin@example.com / admin123 — you can visit /admin to create/delete products.
- Register new users and place orders.

5) Build and production
- Build frontend:
  npm run build
  - deploy build/ contents to static host and set BACKEND_URL to your deployed backend.

6) Create zip (Linux/macOS)
- From parent directory:
  zip -r ecommerce-mern.zip ecommerce-mern
- Windows (PowerShell):
  Compress-Archive -Path .\ecommerce-mern\ -DestinationPath .\ecommerce-mern.zip

Notes & troubleshooting
- If MongoDB not running locally, provide a hosted Mongo URI in backend/.env MONGO_URI.
- If CORS issues occur, backend already uses cors(); ensure BACKEND_URL set correctly.
- Adjust images: seed.js uses placeholder image URLs, so no local images are required.
