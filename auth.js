const jwt = require('jsonwebtoken')
const User = require('./mongoose')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({ _id: verifyToken._id})

        if(!rootUser){throw new Error("User not found")}

        next()
    }
    catch (err) {
        res.status(401).send("Unauthrized: No token provided")
    }
    
}

module.exports = auth;
