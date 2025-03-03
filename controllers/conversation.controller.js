
const Conversation = require('../models/Conversations')
const createConversation = async (req, res) => {
    try {
      const { userId, isGroup, members, name } = req.body;
      const currentUser = req.user;
  
      if (!currentUser.id || !currentUser.email) {
        return res.status(400).json({ message: "User ID and email are required" });
      }
  
      // Validation for group chat
      if (isGroup && (!members || members.length < 2 || !name)) {
        return res.status(400).json({ message: "Invalid data for group chat" });
      }
  
      let newConversation;
  
      if (isGroup) {
        newConversation = new Conversation({
          name,
          isGroup: true,
          userIds: [
            ...members.map((member) => member.value), // Add selected members
            currentUser.id, // Add current user
          ],
        });
      } else {
        // Check if a conversation between the two users already exists
        const existingConversation = await Conversation.findOne({
          isGroup: false,
          userIds: { $all: [currentUser.id, userId] },
        });

        console.log("existingConversation>>",existingConversation);

        if (existingConversation) {
          return res.status(200).json({message:"Successfully Retrived All Conversation", data: existingConversation });
        }
  
        newConversation = new Conversation({
          isGroup: false,
          userIds: [currentUser.id, userId],
        });

        console.log("newConversation>>",newConversation);
        
      }
  
      // Save conversation
      await newConversation.save();
  
      // Populate users before returning
      const populatedConversation = await Conversation.findById(newConversation._id).populate("userIds");
      console.log("populatedConversation>>",populatedConversation);
      
      res.status(201).json({ data: populatedConversation });
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports={
    createConversation,
}