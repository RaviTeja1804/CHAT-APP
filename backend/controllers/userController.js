import userModel from "../models/userModel.js";

class userController{
    async getUsersForSidebar(req, res) {
        try {
            const {id: loggedInUserId} = req.params
            const allUsers = await userModel.find({}).select("-password")
            const filteredUsers = allUsers.filter(user => user._id.toString() !== loggedInUserId.toString());
            res.json(filteredUsers)

        } catch (error) {
            console.log("Error in getUsersForSidebar controller: ", error.message)
            res.json({error: "Internal server error"})
        }
    }

}

export default new userController();
