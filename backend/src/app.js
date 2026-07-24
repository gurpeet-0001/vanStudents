//importing dependencies
import express from 'express'
import cors from 'cors'
//importing files
import './config/env.js'
import supabase from './config/db.js'
import studentsRoute from './routes/studentsRoute.js'
import authRoute from './routes/authRoute.js'

const app = express();
const port = process.env.PORT

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/students/', studentsRoute);
app.use('/api/auth/', authRoute )

app.listen(port, (req,res)=>{
    console.log('App listening at PORT : '+ port)
})

