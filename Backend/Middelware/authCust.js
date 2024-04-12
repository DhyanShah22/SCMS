require('dotenv').config();
const jwt = require('jsonwebtoken');
const {User} = require( '../Models/models' );

const authMiddleware=async(req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).send({msg: 'Authorization denied!'});
        }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        await User.findByPk(decoded.id).then((user)=>{
            if (user.role !== 'Consumer') {
                return res.status(403).send({ msg: 'Access Forbidden. Only admin users allowed.' });
            }
            req.user = decoded;
            next();
        }).catch((err)=>{
            console.log(err);
            return res.status(500).send({ msg: "Error in server!" })
        })
        
        }catch(err){
            console.log(err);
            res.status(403).send({msg:'Invalid Token'});
        };
}

module.exports = authMiddleware;
