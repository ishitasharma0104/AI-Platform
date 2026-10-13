let express= require('express')
 let router=   express.Router()
  let Interview=    require('./models/Interview')
   let auth=  require('./authCheck/auth')

 router.post('/interview',auth,async(req,res)=>{
   let {experience,role,interviewType,numberOfQuestions, questions}= req.body
   try{
    if(!experience || !role || !interviewType ||!numberOfQuestions||!questions){
        return res.status(400).json({msg:"achhe se fill kroo...."})
    }
     
     await  Interview.create({
        userId:req.user._id,
        experience,role,numberOfQuestions,questions

    })
    return res.send("done")

   }catch(err){

   }

 })