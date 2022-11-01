const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postLogin=async(req, res)=>{
    try {
        const{password,mail}=req.body;

        const user = await User.findOne({mail:mail.toLowerCase()});
        if(user && await bcrypt.compare(password,user.password)){

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
       return res.status(200).json({userdetails:{
        mail:user.mail,
        token:token,
        username:user.username,
        _id:user._id


    }})
        }
        return res.status(400).send("invalid credentials.please try again")

    } catch (error) {
        return res.status(500).send("error occured .please try again")

    }

}
module.exports=postLogin