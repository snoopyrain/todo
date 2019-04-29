module.exports ={
  auth: (req, res, next)=>{
    if (req.isAuthenticated()){
      return next()
    }
    //send error message
  }
}