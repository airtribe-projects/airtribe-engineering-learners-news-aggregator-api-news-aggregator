import express from 'express';

const protectedRoute = express.Router();

protectedRoute.get('/preferences', async (req, res) => {
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


protectedRoute.put('/preferences', async (req, res) => {
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


export default protectedRoute;