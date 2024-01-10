const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const userRole = require('../constants/userRole');

module.exports.checkAuth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            next({ status: 403, message: "auth header is missing" })
            return
        }
        const token = header.split('Bearer ')[1];

        if (!token) {
            next({ status: 403, message: "auth token is missing" })
            return
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        if (!userId) {
            next({ status: 403, message: "auth token is invalid" })
            return
        }

        const user = await User.findById(userId);

        if (!user) {
            next({ status: 404, message: "user not found" })
            return
        }

        res.locals.user = user
        next()
    } catch (err) {
        next(err)
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