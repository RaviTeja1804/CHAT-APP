import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import tokenService from "../services/tokenService.js";

class authController{
    async logoutHandler(req, res) {
        try {
            res.cookie("jwt", "", {maxAge: 0})
            res.json({message: "Logged out successfully"})
        } catch (error) {
            console.log("Error in logout controller", error.message)
            res.json({error: "Internal server error"})
        }
    }
    async signupHandler(req, res) {
        try {
            const {fullName, username, password, confirmPassword, gender} = req.body

            if(password !== confirmPassword)
            {
                return res.json({error: "Passwords don't match"})
            }

            const user = await userModel.findOne({username})

            if(user)
            {
                return res.json({error: "Username already exists"})
            }

            // HASH PASSWORD

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

            const newUser = new userModel({
                fullName,
                username,
                password: hashedPassword,
                gender, 
                profilePic: gender==="male" ? boyProfilePic : girlProfilePic
            })
            
            if(newUser)
            {
                // Generate JWT token
                await newUser.save()
                tokenService.generateTokenAndSetCookie(newUser._id, res);
                res.json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic,
                })
            }
            else
            {
                res.json({error: "Invalid user data"})
            }
        } catch (error) {
            console.log("Error in signup controller", error.message)
            res.json({error: "Internal server error"})
        }
        
    }

    async loginHandler(req, res) {
        try {
            const {username, password} = req.body
            let user = await userModel.findOne({username});
            if(!user)
            {
                return res.json({error: "Username does not exist"})
            }
            const passCheck = await bcrypt.compare(password, user.password)
            if(!passCheck)
            {
                return res.json({error: "Incorrect password"})
            }
            tokenService.generateTokenAndSetCookie(user._id, res);
            res.json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic,
            })

        } catch (error) {
            console.log("Error in login controller", error.message)
            res.json({error: "Internal server error"})
        }

    }

}

export default new authController();
