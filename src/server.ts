import express, {Request, Response} from 'express';
import dotenv from 'dotenv'; 
import sequelize from './config/db/database';
import router from './routes/route';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


sequelize.authenticate().then(() => {
    console.log('connection successfully!!!')
})
.catch((error) => {
    console.log(error);
    console.log("connect fail!!!")
})

app.use(router);
app.listen(PORT, () => {
    console.log(`app listen on port: http://localhost:${PORT}`);
})