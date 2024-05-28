const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // console.log('token', + req.headers.authorization);
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Access denied' });
        // console.log('req.email: ' + req.email);
        // console.log('decoded: '+ JSON.stringify(decoded))
        // req.email = decoded.email;
        // console.log('token verified');
        next();
    });
}

module.exports = verifyToken;