import express from 'express';
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("query parser", "extended");

import router from './routes/user.route.js';
app.use("/api/v1/users", router);

export default app;