import e, { Router } from "express";
import jwt from 'jsonwebtoken'
import supabase from '../config/db.js'
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { parentNumber, password } = req.body
        const { data, error } = await supabase.from('Parents')
            .select('*')
            .eq('parentNumber', parentNumber)

        if (data && data.length > 0 && data[0].password == password ) {
            const token = jwt.sign({ 'parentNumber': parentNumber , 'role':data[0].role},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )
            return res.status(200).json({ 'token': token });
        }
        
        res.status(404).json({'message':'Wrong phoneNumber or Password'});
    } catch (error) {
        res.send({ 'message': 'error making token : ' + error })
    }


})

export default router