import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}
))

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.get('/', (req, res)=>{
    res.sendStatus(200);
})

app.get('/try', (req, res)=>{
    res.send(
        `<body style="background: pink; color: blue;"><h2>Hello World</h2></body>`
    )
})

app.listen(PORT, ()=>{
    console.log(`\nServer started at port ${PORT}`);
    // console.log(`\nlocalhost: http://localhost:3000/\nIP address: 127.0.0.1\n`);
    connectDB();
})