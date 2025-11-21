import jwt from 'jsonwebtoken';
import User from '../models/userModel';


export const authProtect = async( req, res, next) =>{
    // get the token from request header
    // Bearer token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        return res.status(401).json({message:'Unauthorized, no token!'})
    }
    try {
        
        const tokenArr = req.headers.authorization.split(' ');
        const token = tokenArr[1];

        //decode the token
        // token info about user
        const decodeToken = jwt.verify(token , process.env.JWT_SECRET);

        //FETCH USER INFO FROM USERID STORED IN TOKEN
        req.user = await User.findById(decodeToken.user.id).select('-password');
        next();
    
        
    } catch (error) {
        return res.status(401).json({message:'Unauthorized, Invalid token!'})
    }
}