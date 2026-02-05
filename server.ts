import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {register, login} from "./controllers/auth.controller";

dotenv.config();

const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', register);
app.post('/login', login);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});