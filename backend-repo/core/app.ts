import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AuthRoute, UserRoute } from '../routes';

const app = express();
const port = 3001;

app.use(cors({
 origin: 'http://localhost:3000',
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 allowedHeaders: ['Content-Type', 'Authorization'],
 credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
 res.send('Hello from Firebase + Express!');
});

app.use('/api', UserRoute);
app.use('/auth', AuthRoute);

app.listen(port, () => {
 console.log(`🚀 Server running at http://localhost:${port}`);
});
