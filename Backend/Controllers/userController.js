const {User} = require('../Models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async(req,res)=>{
    const{username,password,role}= req.body;
    if (!username || !password || !role) {
        return res.status(400).send({message: "Missing fields"})
    }
    try{
        let user= await User.findOne({where:{username}});
        if (user){
            return res.status(409).send({message:"Username already exists."});
        }else{
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            user = await User.create({username, password :hashedPassword, role });
            const token = jwt.sign({id: user.UserID}, process.env.SECRET_KEY ,{expiresIn:'3d' })
            return res.status(201).send({auth: true, message: 'User created', token})
        }  
    }catch(err){
        console.log("Error in SignUp", err);
        return res.status(500).send()
    }
}

const login = async(req,res)=>{
    const{ username, password } = req.body;
    if(!username || !password ){
       return res.status(400).send({ auth: false, message: 'Missing credentials.' })
    }

    try{
        let user = await User.findOne({ where: { username } });
        if(!user){
            return res.status(404).send({ auth: false, message: 'Authentication failed. User not found.' })
        }
        
        let validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).send({ auth: false, message: 'Invalid Password.' })
            }

        const token = jwt.sign({ id: user.UserID }, process.env.SECRET_KEY, { expiresIn: '8h' })
        res.json({token, auth:true, userId: user.id, username: user.username, role: user.role})
    }catch(err){
        console.error(err);
        return res.status(500).send();
    }

}

module.exports={signup,login}
