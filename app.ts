import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

//Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Wellcome, My name is Hung.');
});

export default app;
