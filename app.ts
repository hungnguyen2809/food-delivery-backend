import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import rotues from 'src/routes';
import { MONGO_DB } from 'src/services';

const app = express();

//Connect Mongo
MONGO_DB.connect();

//Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Static file
app.use('/static', express.static('static'));

//Routes
app.use(rotues);

app.get('/', (req, res) => {
  res.send('Wellcome, My name is Hung.');
});

export default app;
