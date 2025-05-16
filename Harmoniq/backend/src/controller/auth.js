import { User } from "../models/user.model.js";

export const authCallback = async (req, res,next) => {
    try {
        const { id,firstName, lastName, imageUrl } = req.body;
        
        const user = await User.findOne({clearkId: id});

        if (!user) {
            // Create a new user if one does not exist
            await User.create({
                clearkId: id,
                firstName: `${firstName} ${lastName}`,
                imageUrl,
            });
        }
         res.status(200).json({sucess:true});
    } catch (error) {
        console.error("Error in auth callback:", error);
       next(error);
    }
} 