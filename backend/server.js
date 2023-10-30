const express = require('express');
const restaurantRoutes = require('./routes/restaurants.routes');
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 3000;


app.use(cors)

app.use('/restaurants', restaurantRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });