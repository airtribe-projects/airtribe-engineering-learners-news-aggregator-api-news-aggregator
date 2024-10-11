import jwt from 'jsonwebtoken';
const { verify } = jwt;


// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  verify(token,process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });

    req.user = user;  // Attach the user to the request
    next();
  });
};

export default authenticateToken;
