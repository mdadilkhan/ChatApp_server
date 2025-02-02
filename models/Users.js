const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    hashedPassword: {
      type: String,
      required: function () {
        return !this.isSocialLogin;
      },
      minlength: [6, "Password must be at least 6 characters long."],
    },
    isSocialLogin: { type: Boolean, default: false },
    provider: {
      type: String,
      enum: ["google-oauth2", "github", "manual"],
      default: "manual",
      required:true
    },
    conversationIds: [
      {
        type: mongoose.Schema.Types.ObjectId, // Store ObjectId
        ref: "Conversation", // Reference to the 'Conversation' model
      },
    ],
    seenMessageIds: [
      {
        type: mongoose.Schema.Types.ObjectId, // Store ObjectId
        ref: "Message", // Reference to the 'Message' model
      },
    ],
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId, // Store ObjectId
        ref: "Account", // Reference to the 'Account' model
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId, // Store ObjectId
        ref: "Message", // Reference to the 'Message' model
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a compound index for email and provider to enforce uniqueness
userSchema.index({ email: 1, provider: 1 }, { unique: true });
// Middleware to delete accounts associated with the user when the user is deleted
userSchema.pre("remove", async function (next) {
  try {
    // Delete all accounts where userId matches the current user's _id
    console.log(this._id);

    await mongoose.model("Account").deleteMany({ userId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
