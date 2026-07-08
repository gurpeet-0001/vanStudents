import { Router } from "express";
import jwt from 'jsonwebtoken'
const router = Router();

router.post('/', (req, res) => {
    try {
        const { phoneNumber, password } = req.body
        const token = jwt.sign({ 'phoneNumber': phoneNumber },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.send(token);
        
    } catch (error) {
        res.send({ 'message': 'error making token : ' + error })
    }


})

export default router