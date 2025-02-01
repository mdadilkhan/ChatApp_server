const mongoose = -require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    isGroup: {
      type: Boolean,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
    messagIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

// Create the Conversation model
const Conversation = new mongoose.model({ Conversation });

module.exports = Conversation;
