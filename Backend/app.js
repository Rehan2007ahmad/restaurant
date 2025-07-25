require('dotenv').config()
const express = require('express');
const { connectDb } = require('./config/db');
const app = express();


app.use(express.json());
connectDb()


app.use('/api/user', require('./routes/user.routes'))
app.use('/api/restaurant', require('./routes/restaurant.routes'))
app.use('/api/menucategory', require('./routes/menuCategory.routes'))
app.use('/api/addons', require('./routes/addOnsExtras.routes'))
app.use('/api/menu', require('./routes/menu.routes'))
app.use('/api/table', require('./routes/table.routes'))
app.use('/api/order', require('./routes/order.routes'))


const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
