const jwt = require("jsonwebtoken")
const {secret} = require("../../config")
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    } else
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(403).json({"message": "пользователь не авторизован"})
            }
            const decodeData = jwt.verify(token, secret)
            req.user = decodeData
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({"message": "пользователь не авторизован"})
        }
}