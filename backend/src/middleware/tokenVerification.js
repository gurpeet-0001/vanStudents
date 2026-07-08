import jwt from 'jsonwebtoken'

const tokenVerification = (req, res, next) => {
    const userToken = req.headers.authorization
    try {
        const decodedToken = jwt.verify(userToken,
            process.env.JWT_SECRET
        )
        req.user = decodedToken
        next();
    } catch (error) {
        console.log("wrong token" +error)
        res.status(404).json({'message':'Wrong or Expired token' })
    }


}

export default tokenVerification