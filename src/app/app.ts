import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './modules/user/user.route';
const app:Application = express();


//parsers
app.use(express.json());
app.use(cors());

//application routes

app.use("/api/users", UserRoute);
const getController=(req: Request, res: Response)=>[
  res.status(200).json({
    success: true,
    message: "welcome to apiiiiii"
  })
]
app.get("/", getController);

export default app;
