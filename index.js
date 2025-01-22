const express = require('express')
const path = require('path')


const app = express()



app.get('/',(req,res)=>{
   res.status(200).send('<div style="height:100vh; color: blue; font-size:40px; display: flex; justify-content:center; align-items:center;">Testing Success</div>');
})
app.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
})