let auth=(req,res,next)=>{
    let token=req.headers.authorization;
    console.log(token,"toeknn");
    
    if(!token){
       return res.send("kaun hai app...")
    }
   let decode=  jwt.verify(token,"hehehehehe")
   console.log(decode,"isse");
   req.user=decode
 
   next()
 }


 module.exports=auth
 