import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';



dotenv.config();
const protectedRoute = express.Router();

protectedRoute.get('/users/preferences', async (req, res) => {
  try {
    // Access user from the request after JWT authentication
    const user = req.user;

    // Send back the user's preferences
    res.json(user.preferences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


protectedRoute.put('/users/preferences', async (req, res) => {
  const { category, region } = req.body.preferences;

  try {
    // Get user from the request after JWT authentication
    let user = req.user;

    // Update preferences fields
    if (category) user.preferences.category = category;
    if (region) user.preferences.region = region;

    // Save updated user document
    await user.save();

    res.json({ message: 'Preferences updated successfully', preferences: user.preferences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



protectedRoute.get('/news', async (req, res) => {
  try {
    const { preferences } = req.user; // Assuming preferences contain category and region
    const { category, region } = preferences;

    // External News API endpoint
    const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

    // Request parameters
    const params = {
      apiKey: process.env.NEWS_API_KEY,  // Your NewsAPI key
      category: category || 'general',  // If user has no category preference, default to 'general'
      country: region || 'us',          // If user has no region preference, default to 'us'
      pageSize: 10,                     // Number of articles to fetch
    };

    // Fetch news from the NewsAPI
    const response = await axios.get(NEWS_API_URL, { params });

    if (response.data.status !== 'ok') {
      return res.status(500).json({ message: 'Error fetching news articles' });
    }

    // Send back the articles
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Failed to fetch news articles' });
  }
});





export default protectedRoute;