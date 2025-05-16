import { User } from "../models/user.model.js";
export const authCallback = async (req, res) => {
    try {
        const { id,firstName, lastName, imageUrl } = req.body;
        
        const user = await User.findOne({clearkId: id});
        if (!user) {
            // Create a new user if one does not exist
            const newUser = await User.create({
                clearkId: id,
                firstName: `${firstName} ${lastName}`,
                imageUrl,
            });
        }
         res.status(201).json({sucess:true});
    } catch (error) {
        console.error("Error in auth callback:", error);
        res.status(500).json({ message: "Internal server error",error });
    }
} 