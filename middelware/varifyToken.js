const jwt = require('jsonwebtoken');
const Jwt_Secret = "hellboy"

const varify = (req, res, next) => {

    let token = req.headers.authorization
    let ans = jwt.verify(token, Jwt_Secret, function(err, decoded) {
        if (err) {
            return res.json({ msg: "unauthorized token or invalid token" })
        } else {
            req.user = decoded
            console.log(req.user)
            next()
        }
    });
}
module.exports = varify