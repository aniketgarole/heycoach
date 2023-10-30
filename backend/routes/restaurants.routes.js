const express = require('express');
const restaurantRoutes = express.restaurantRoutes();




// Create a new restaurant
restaurantRoutes.post('/', async (req, res) => {
    try {
      const { name, address, contact } = req.body;
      const newRestaurant = await Restaurant.create({ name, address, contact });
      res.json(newRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new restaurant.' });
    }
  });

// Get a list of all restaurants
restaurantRoutes.get('/', async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll();
      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve restaurants.' });
    }
  });

// Get a specific restaurant by ID
// restaurantRoutes.get('/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const restaurant = await Restaurant.findByPk(id);
//       if (!restaurant) {
//         res.status(404).json({ error: 'Restaurant not found' });
//       } else {
//         res.json(restaurant);
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to retrieve the restaurant.' });
//     }
//   });

// Update a restaurant by ID
restaurantRoutes.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, contact } = req.body;
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) {
        res.status(404).json({ error: 'Restaurant not found' });
      } else {
        restaurant.name = name;
        restaurant.address = address;
        restaurant.contact = contact;
        await restaurant.save();
        res.json(restaurant);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update the restaurant.' });
    }
  });

// Delete a restaurant by ID
restaurantRoutes.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) {
        res.status(404).json({ error: 'Restaurant not found' });
      } else {
        await restaurant.destroy();
        res.json({ message: 'Restaurant deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the restaurant.' });
    }
  });

module.exports = restaurantRoutes;