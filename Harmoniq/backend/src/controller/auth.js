import { User } from "../models/user.model.js";

export const AuthCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl, email, username } = req.body;
        
        const user = await User.findOne({ clerkId: id });
 
        if (!id || !firstName || !lastName || !email) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
          }          
        if (!user) {
            // Create a new user if one does not exist
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
                email,
                username: username || (email ? email.split('@')[0] : undefined),
            });
        }
        res.status(200).json({ success: true });
    } catch (error) {
       console.error("Error in auth callback: ", error);
       next(error);
    }
} 