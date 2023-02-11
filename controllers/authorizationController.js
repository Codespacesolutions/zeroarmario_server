class AuthrorizationController{
    async refreshToken(req, res){
        return res.status(200).send('Token')
    }
}

module.exports = AuthrorizationController