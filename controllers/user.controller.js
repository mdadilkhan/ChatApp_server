const User = require("../models/Users");

const getUserDetials= async(req,res)=>{
    try {
        const user=req.user;
        console.log("user>>",user);
        
        const validUser=await User.findById({_id:user.id});
         console.log("validUSer>>",validUser);
         
        if(!validUser){
            return res.status(400).json({message:"User not found"})
        }

        const userData={
            _id:validUser._id || null,
            email:validUser.email || null,
            name:validUser.name || null,
            image:validUser.image || null,
            provider:validUser.provider || null
        }
        return res.status(200).json({message:"User detials fetched successfully",data:userData})
    } catch (error) {
        
    }
}

module.exports={
    getUserDetials
}