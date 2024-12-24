import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { router } from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || '', )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.json());
app.use("/api" , router);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
