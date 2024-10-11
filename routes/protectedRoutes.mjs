import authenticateToken from "./../middleware/authmiddleware.mjs";
import express from 'express';

const protectedRoute = express.Router();

protectedRoute.get('/protected', authenticateToken, (req, res) => {
  // This route is protected and requires a valid JWT token
  res.json({ message: 'Protected route accessed successfully' });
});


export default protectedRoute;