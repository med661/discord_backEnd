const express=require('express')
const router = express.Router()
const authController=require('../controllers/auth/authControllers')
const joi=require('joi')
const validator=require('express-joi-validation').createValidator({})
const auth=require('../middleware/auth')
const registerShema=joi.object({
    username: joi.string().min(3).max(12).required(),
    password: joi.string().min(6).max(12).required(),    
    mail: joi.string().email().required()
});
const LoginShema=joi.object({
    password: joi.string().min(6).max(12).required(),    
    mail: joi.string().email().required()
})

router.post('/register',validator.body(registerShema),authController.controllers.postRegister)
router.post('/login',validator.body(LoginShema),authController.controllers.postLogin)

router.get('/test',auth,(req,res)=>{
    return res.status(402).json({msg:"you are autenticated" })
})
module.exports =router