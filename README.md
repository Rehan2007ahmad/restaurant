# Restaurant Backend API

A Node.js Express backend for managing restaurants, users, and menu categories.

## Getting Started

1. Clone the repository and navigate to the `Backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend` folder (see example below).
4. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

Example `.env` file:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/restaurant
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### User APIs
- `POST /api/user/register` — Register a new user
- `POST /api/user/login` — Login user

### Restaurant APIs
- `POST /api/restaurant` — Create a new restaurant
  - Body: `{ name, address, logo, owner, phone }`
- `GET /api/restaurant` — Get all restaurants
- `GET /api/restaurant/:id` — Get a restaurant by ID
- `PUT /api/restaurant/:id` — Update a restaurant by ID
- `DELETE /api/restaurant/:id` — Delete a restaurant by ID

### Menu Category APIs
- `POST /api/menucategory` — Create a new menu category
  - Body: `{ categoryName, image, restaurantId }`
- `GET /api/menucategory/:id` — Get all menu categories for a restaurant (by restaurantId)

## Project Structure

```
Backend/
├── controllers/
├── models/
├── routes/
├── config/
├── middlewares/
├── app.js
├── package.json
├── .env
└── ...
```

## License
ISC
