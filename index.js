import express from 'express';
import { connectToDB } from './db/db.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//connection to database.
connectToDB();

//import routes.
import userRouter from './routes/User.route.js'

app.use("/api/users" , userRouter);

app.listen(process.env.PORT , (req , res) => {
    console.log(`Server running on PORT : ${process.env.PORT}`)
})