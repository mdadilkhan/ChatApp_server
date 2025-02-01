const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
    },
    image: {
      type: String,
    },
    seenIds: [
      {
        type: mongoose.Schema.Types.ObjectId, // Array of ObjectId references
        ref: "User", // Reference the User model
        required: true, // Ensure this field is always present
      },
    ],
    seen: [
      {
        type: mongoose.Schema.Types.ObjectId, // Populate the full user details
        ref: "User", // Reference the User model
        required: true, // Ensure this field is always present
      },
    ],
    conversationId: {
      type: mongoose.Schema.Types.ObjectId, // Foreign key to Conversation model
      ref: "Conversation", // Reference the Conversation model
      required: true, // Ensure this field is always present
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId, // Foreign key to User model
      ref: "User", // Reference the User model
      required: true, // Ensure this field is always present
    },
  },
  {
    timestamps: true,
  }
);



someSchema.pre('remove', async function (next) {
    try {
        // Delete all messages associated with the conversation
        console.log(this.conversationId);
        
      await mongoose.model('Message').deleteMany({ conversationId: this.conversationId });
      next();
    } catch (error) {
      next(error);
    }
  });


const Message = new mongoose.Schema("Message", messageSchema);

module.exports = Message;
