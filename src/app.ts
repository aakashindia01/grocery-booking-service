import express from 'express';
import { sequelize } from './config/db';
import userRouter from './routes/userRouter';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3100;

app.use('/users', userRouter);

sequelize
.sync()
.then(()=>{
    console.log('Database synced');
})
.catch((error: Error) => console.log('Error syncing database:', error));

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})