import dotenv from 'dotenv';
import http from 'http';
import app from './app';

dotenv.config();
const APP_PORT = process.env.PORT || 8088;
const APP_HOST = process.env.HOST || 'localhost';

const server = http.createServer(app);

server.listen(APP_PORT, () => {
  console.log(`Server is runing at port: ${APP_PORT}; http://${APP_HOST}:${APP_PORT}`);
});
