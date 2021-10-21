const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token']
    
    if (!token) {
        return res.status(403).json({
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        req.username = decoded.username;
        next();
    });
};

module.exports = verifyToken;