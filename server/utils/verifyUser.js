import jwt from 'jsonwebtoken';
import errorhandler from './error';

const verifyUser = (req,res,next) => {
    const cookie = req.cookies.access_token;
    if(!cookie) return next(errorHandler(401,"Unauthorized"));
    jwt.verify(cookie,process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Forbidden"));
        req.user = user;
        next();
    });
}

export default verifyUser;