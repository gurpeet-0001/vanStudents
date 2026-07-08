import jwt from 'jsonwebtoken'

const tokenVerification = (req, res, next) => {
    const userToken = req.headers.token
    try {
        const decodedToken = jwt.verify(userToken,
            process.env.JWT_SECRET
        )
        req.user = decodedToken
        next();
    } catch (error) {
        console.log("wrong token" +error)
        res.json({'message':'wrong token' , 'tokenwas':userToken})
    }


}

export default tokenVerification