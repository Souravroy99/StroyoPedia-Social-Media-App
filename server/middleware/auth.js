import jwt from "jsonwebtoken"

export const verifyToken = async(req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token) {
            return res.status(403).json({ msg: "Access denied"});
        }

        token = token.split(" ")[1] ;

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log('Middleware', verified)
        req.user = verified;
        next();
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}