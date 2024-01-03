import jwt from 'jsonwebtoken';

// Now you can use jwt.sign, jwt.verify, etc.

//export const getLibro =
export const generateAccessToken = (user)=> {
    return jwt.sign(user,'palabra-secreta',{expiresIn:'1800s'});
}

export const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token== null) return res.sendStatus(401);
    jwt.verify(token,'palabra-secreta',(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next();
    });
}
export const authorizeEditor=(req,res,next)=>{
    if(req.user && req.user.role==='editor'){
        next()
    }else{
        res.sendStatus(403);
    }
}


//module.exports={generateAccessToken,authenticateToken,authorizeEditor}

