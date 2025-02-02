const express = require('express')
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDatabase = require('./db/db');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');




const app = express()

//cors option
const allowedOrigins = [
  "http://localhost:5173",
  "https://sub.yourdomain.com",
  "https://anotherdomain.com"
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // ✅ Allow cookies & Authorization headers
  optionsSuccessStatus: 204,
};



//for cors policy 
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 



//Testing route
app.get('/',(req,res)=>{
  res.status(200).send('<div style="height:100vh; color: blue; font-size:40px; display: flex; justify-content:center; align-items:center;">Testing Success</div>');
})


//Actual Route
app.use('/api',authRouter);
app.use('/api',userRouter)







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