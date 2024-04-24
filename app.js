import express from 'express';
import dotenv from 'dotenv';


const app = express();
const PORT = process.env.PORT_LOCAL || 5000;
import {router} from "./api/routes/index.js";

dotenv.config();

app.use(express.json());
app.use('/api', router)


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
