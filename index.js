const express = require('express')
const path = require('path');
const cors = require("cors");


const connectToDatabase = require('./db/db');
const authRouter = require('./routes/auth.route');




const app = express()

//cors option
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};


//for cors policy 
app.use(cors(corsOptions)); // Make sure this is placed early
app.options('*', cors(corsOptions)); // Preflight handler for all routes
app.use(express.json());




//Testing route
app.get('/',(req,res)=>{
  res.status(200).send('<div style="height:100vh; color: blue; font-size:40px; display: flex; justify-content:center; align-items:center;">Testing Success</div>');
})


//Actual Route
app.use('/api', authRouter);








PORT=process.env.PORT || 3000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if the database connection fails
  });