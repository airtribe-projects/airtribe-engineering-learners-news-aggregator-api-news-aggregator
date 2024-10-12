import express, { json, urlencoded } from 'express';
import routes from './routes/userroutes.mjs';
import protectedRoute from './routes/protectedRoutes.mjs';
import mongoose from 'mongoose';
import authenticateToken from './middleware/authmiddleware.mjs';
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;
app.use(cookieParser())

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/api/protected', authenticateToken ,protectedRoute);

const dbURI = 'mongodb://localhost:27017/news-app';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));



app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



export default app;