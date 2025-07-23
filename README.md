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
User management endpoints for registration, authentication, and profile updates.

- `POST /api/user/` — Register a new user
  - **Body:** `{ name, email, password }`
  - **Response:** User object with JWT token
- `POST /api/user/login` — Login user
  - **Body:** `{ email, password }`
  - **Response:** User object with JWT token
- `GET /api/user/:id` — Get user by ID
  - **Auth required**
  - **Response:** User object
- `PUT /api/user/:id` — Update user by ID
  - **Auth required**
  - **Body:** Fields to update
  - **Response:** Updated user object


### Restaurant APIs
Endpoints for creating, retrieving, updating, and deleting restaurant records.

- `POST /api/restaurant/` — Create a new restaurant
  - **Body:** Restaurant details
  - **Response:** Created restaurant object
- `GET /api/restaurant/:id` — Get a restaurant by ID
  - **Response:** Restaurant object
- `PUT /api/restaurant/:id` — Update a restaurant by ID
  - **Body:** Fields to update
  - **Response:** Updated restaurant object
- `DELETE /api/restaurant/:id` — Delete a restaurant by ID
  - **Response:** Success message


### Menu Category APIs
Manage categories for restaurant menus.

- `POST /api/menucategory/` — Create a new menu category
  - **Body:** Category details
  - **Response:** Created category object
- `GET /api/menucategory/:id` — Get all menu categories for a restaurant (by restaurantId)
  - **Response:** Array of categories
- `PUT /api/menucategory/:id` — Update a menu category by ID
  - **Body:** Fields to update
  - **Response:** Updated category object
- `DELETE /api/menucategory/:id` — Delete a menu category by ID
  - **Response:** Success message
- `GET /api/menucategory/getbyid/:id` — Get a menu category by its ID
  - **Response:** Category object


### AddOns/Extras APIs
Manage add-ons and extras for menu items.

- `POST /api/addons/` — Create a new add-on/extra
  - **Body:** Add-on details
  - **Response:** Created add-on object
- `DELETE /api/addons/:id` — Delete an add-on/extra by ID
  - **Response:** Success message
- `GET /api/addons/getbyrestaurantid/:id` — Get all add-ons/extras for a restaurant
  - **Response:** Array of add-ons
- `GET /api/addons/getbyid/:id` — Get an add-on/extra by its ID
  - **Response:** Add-on object
- `PUT /api/addons/:id` — Update an add-on/extra by ID
  - **Body:** Fields to update
  - **Response:** Updated add-on object



### Menu APIs
Endpoints for managing menu items for restaurants.

- `POST /api/menu/` — Create a new menu item
  - **Body:** Menu item details
  - **Response:** Created menu item object
- `GET /api/menu/:id` — Get all menu items for a restaurant (by restaurantId)
  - **Response:** Array of menu items
- `GET /api/menu/getbyid/:id` — Get a menu item by its ID
  - **Response:** Menu item object
- `PUT /api/menu/:id` — Update a menu item by ID
  - **Body:** Fields to update
  - **Response:** Updated menu item object
- `DELETE /api/menu/:id` — Delete a menu item by ID
  - **Response:** Success message


### Table APIs
Manage tables for each restaurant.

- `POST /api/table/` — Add a new table
  - **Body:** Table details
  - **Response:** Created table object
- `GET /api/table/:id` — Get all tables for a restaurant (by restaurantId)
  - **Response:** Array of tables
- `PUT /api/table/:id` — Update a table by ID
  - **Body:** Fields to update
  - **Response:** Updated table object
- `DELETE /api/table/:id` — Delete a table by ID
  - **Response:** Success message
- `GET /api/table/getbyid/:id` — Get a table by its ID
  - **Response:** Table object

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
