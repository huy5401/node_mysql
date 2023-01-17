import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db/database';
import router from './routes/route';
import cors from 'cors'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

sequelize.authenticate().then(() => {
    console.log('connection successfully!!!')
})
    .catch((error) => {
        console.log(error);
        console.log("connect fail!!!")
    })

app.use(router);

app.listen(PORT, () => {
    console.log(`app listen on port : http://locahost:${PORT}`);
})