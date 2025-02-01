const mongoose =require('mongoose')




const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,

    },
    type:{
        type:String,
        required:true,
    },
    provider:{
        type:String,
        required:true,

    },
    providerAccountId:{
        type:String,
        required:true,

    },
    refresh_token:{
        type:String,
    },
    access_token:{
        type:String,
    },
    expires_at:{
        type:Number,
    },
    token_type:{
        type:String,
    },
    scope:{
        type:String,
    },
    id_token:{
        type:String,
    },
    session_state:{
        type:String,
    },

    


})

// Create a compound unique index on the provider and providerAccountId fields
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });



const Account=mongoose.model(Account,accountSchema)

module.exports=Account 