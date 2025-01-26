import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/auth', authRoutes);

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