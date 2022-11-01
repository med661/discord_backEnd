const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postRegister=async(req, res)=>{
  try {
    const{username, password,mail}=req.body;
 
    const userExists = await User.exists({mail:mail.toLowerCase()});
    if(userExists){
        return res.status(409).send("e-mail already exists")
    }
    const encryptedpassword = await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        mail:mail.toLowerCase(),
        password:encryptedpassword
    })
    
        const token=jwt.sign(

            {
                userId:user._id,
                mail
            },
            process.env.TOKEN_KEY,
            { 
                expiresIn:"24h"
            }
        )
        res.status(201).json({userdetails:{
            mail:user.mail,
            token:token,
            username:user.username,
            _id:user._id


        }})

  }catch(err){
    return res.status(500).send("error occured .please try again")

  }
}
module.exports=postRegister