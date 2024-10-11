import express, { json, urlencoded } from 'express';
import routes from './routes/userroutes.mjs';
import protectedRoute from './routes/protectedRoutes.mjs';
import mongoose from 'mongoose';


const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/api', protectedRoute);

const mongoURI = 'mongodb://localhost:27017/news-app';



app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



export default app;