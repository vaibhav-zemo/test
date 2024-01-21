const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const userRole = require('../constants/userRole');

module.exports.checkAuth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            throw new Error("auth token is missing")
        }

        const token = header.split('Bearer ')[1];
        if (!token) {
            throw new Error("auth token is missing")
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        if (!userId) {
            throw new Error("auth token is invalid")
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("user not found")
        }

        res.locals.user = user
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.checkAdmin = async (req, res, next) => {
    const currentUser = res.locals.user;

    if (!currentUser) {
        return next({ status: 401, message: "Access deny for normal user" });
    }

    if (currentUser.role === userRole.ADMIN) {
        return next();
    }

    return next({ status: 401, message: "Access deny for normal user" });
}

module.exports.checkMerchant = async (req, res, next) => {
    const currentUser = res.locals.user;

    if (!currentUser) {
        return next({ status: 401, message: "Access deny for normal user" });
    }

    if (currentUser.role === userRole.MERCHANT) {
        return next();
    }

    return next({ status: 401, message: "Access deny for normal user" });
}