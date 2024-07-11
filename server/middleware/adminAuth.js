const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ msg: "Access denied, token missing" });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ msg: "Token verification failed" });

            req.user = user;
            if (user.role !== 'admin') {
                return res.status(403).json({ msg: "Admin resources access denied" });
            }
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};    
module.exports = authAdmin;  