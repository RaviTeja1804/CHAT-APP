import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token)
        {
            return res.json({error: "Unauthorized - No token found"})
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decoded)
        {
            return res.json({error: "Unauthorized - Invalid token"})
        }

        const user = await userModel.findById(decoded.userId).select("-password")
        if(!user)
        {
            return res.json({error: "User not found"})
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in protectRoute controller", error.message)
        res.json({error: "Internal server error"})
    }
}

export default protectRoute;