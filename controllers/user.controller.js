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
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    
    }
}

const getAllUsers=async(req,res)=>{

    try {
        const currentUserId=req.user.id;

        const users=await User.find({_id:{$ne:currentUserId}}).sort({ createdAt: -1 }).exec();
        res.status(200).json({message:"Users retrived",data:users})
        
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });    
    }
}

module.exports={
    getUserDetials,
    getAllUsers
}