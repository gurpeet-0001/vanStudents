import e, { Router } from "express";
import jwt from 'jsonwebtoken'
import supabase from '../config/db.js'
import tokenVerification from "../middleware/tokenVerification.js";
const router = Router();

router.post('/login', async (req, res) => {
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

router.post('/signup',tokenVerification,async (req,res)=>{
    try {
        if(req.user.role == 'admin'){
            const{parentNumber , password } = req.body
            const {data,error} = await supabase.from('Parents')
            .insert({'parentNumber': parentNumber,'password':password})
            .select('*');
            if(data){return res.send(data)}
            res.send(error);
        }
        res.json({'message':'user cant create new user'})
    } catch (error) {
        res.json({'message':'error creating new user'});
    }

})

export default router