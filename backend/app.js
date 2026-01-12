import express from 'express';
import morgan from 'morgan';
const app = express();
import dotenv from 'dotenv';
import connectdb from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryroutes.js'
import courseRoutes from './routes/courseroutes.js'
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhooks.js";
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import instructorRoutes from "./routes/instructorRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


dotenv.config();

const port = process.env.PORT || 3000 ;



connectdb();


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/category', categoryRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/progress",progressRoutes );
app.use("/api/instructor", instructorRoutes);
app.use("/api/upload", uploadRoutes);



if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'));
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
