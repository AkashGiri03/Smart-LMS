import express from 'express';
import morgan from 'morgan';
const app = express();
import dotenv from 'dotenv';
import connectdb from './config/db.js';
import cors from 'cors';
import router from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryroutes.js'
import courseRoutes from './routes/courseroutes.js'

dotenv.config();

const port = process.env.PORT || 3000 ;



connectdb();


app.use(express.json());
app.use(cors());


app.use('/api/auth',router);
app.use('/api/course', courseRoutes);
app.use('/api/category', categoryRoutes);

if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'));
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
