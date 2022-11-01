const express=require('express')
const router = express.Router()
const joi=require('joi')
const validator=require('express-joi-validation').createValidator({})
const auth=require('../middleware/auth')
const friendInvitationControllers=require('../controllers/friendInvitation/friendInvitationControllers')

const postInvitationSchema=joi.object({
    targetMailAddress: joi.string().email(),
    
});

const inviteDescisionSchema=joi.object({
    id: joi.string().required(),

    
});
router.post("/invite",auth,validator.body(postInvitationSchema),friendInvitationControllers.controllers.postInvite);
router.post("/accept",auth,validator.body(inviteDescisionSchema),friendInvitationControllers.controllers.postAccept)
router.post("/reject",auth,validator.body(inviteDescisionSchema),friendInvitationControllers.controllers.postReject)

module.exports =router;