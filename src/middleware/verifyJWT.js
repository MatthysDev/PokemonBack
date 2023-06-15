const jwt = require('jsonwebtoken');
require('dotenv').config();

verifyJWT = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        if(!decodedToken.admin) res.status(403).json({message: 'You are not an admin'})
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ message: 'Invalid request!' });
    }
};

module.exports = verifyJWT;