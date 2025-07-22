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
- `POST /api/user/` — Register a new user
- `POST /api/user/login` — Login user
- `GET /api/user/:id` — Get user by ID
- `PUT /api/user/:id` — Update user by ID

### Restaurant APIs
- `POST /api/restaurant/` — Create a new restaurant
- `GET /api/restaurant/:id` — Get a restaurant by ID
- `PUT /api/restaurant/:id` — Update a restaurant by ID
- `DELETE /api/restaurant/:id` — Delete a restaurant by ID

### Menu Category APIs
- `POST /api/menucategory/` — Create a new menu category
- `GET /api/menucategory/:id` — Get all menu categories for a restaurant (by restaurantId)
- `PUT /api/menucategory/:id` — Update a menu category by ID
- `DELETE /api/menucategory/:id` — Delete a menu category by ID
- `GET /api/menucategory/getbyid/:id` — Get a menu category by its ID

### AddOns/Extras APIs
- `POST /api/addons/` — Create a new add-on/extra
- `DELETE /api/addons/:id` — Delete an add-on/extra by ID
- `GET /api/addons/getbyrestaurantid/:id` — Get all add-ons/extras for a restaurant
- `GET /api/addons/getbyid/:id` — Get an add-on/extra by its ID
- `PUT /api/addons/:id` — Update an add-on/extra by ID


### Menu APIs
- `POST /api/menu/` — Create a new menu item
- `GET /api/menu/:id` — Get all menu items for a restaurant (by restaurantId)
- `GET /api/menu/getbyid/:id` — Get a menu item by its ID
- `PUT /api/menu/:id` — Update a menu item by ID
- `DELETE /api/menu/:id` — Delete a menu item by ID

### Table APIs
- `POST /api/table/` — Add a new table
- `GET /api/table/:id` — Get all tables for a restaurant (by restaurantId)
- `PUT /api/table/:id` — Update a table by ID
- `DELETE /api/table/:id` — Delete a table by ID
- `GET /api/table/getbyid/:id` — Get a table by its ID

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
