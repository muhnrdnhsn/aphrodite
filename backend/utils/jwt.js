const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign(
        {username: user.username, id: user._id},
        "SecretKey",
        {expiresIn: "1h"}
    );

    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.headers["token"];

    if(!accessToken){
        return res.json({error: 'User is not Authenticated!'})
    }

    verify(accessToken, "SecretKey", (err, decoded) => {
        if(err){
            res.json({auth: false, message: 'Failed to Authenticated!'})
        }else{
            req.username = decoded.username
            next()
        }
    })
}

module.exports = { createToken, validateToken };