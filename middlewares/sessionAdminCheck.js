module.exports = function sessionUserCheck(req,res,next){
    if(req.session.user && req.session.user.rol == 'admin'){
        next()
    }else{
        res.redirect('/')
    }
}