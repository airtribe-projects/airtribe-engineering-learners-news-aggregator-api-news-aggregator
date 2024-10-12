import jwt from 'jsonwebtoken';
import User from './../models/userSchema.mjs'; // Import the User model

const { verify } = jwt;

// Middleware to verify JWT and fetch full user info
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;  // Extract the token from the cookie

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });

    try {
      // Fetch the full user from the database using the ID from the decoded token
      const user = await User.findById(decoded.id).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;  // Attach the full user object to the request
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
};

export default authenticateToken;
