import { Router } from "express";
const router = Router();
import bcyrpt from "bcrypt";

router.post('/',async (req,res)=>{
    const {userEmail , userName ,userPassword} = req.body ;
    const hashedpswrd = await bcyrpt.hash(userPassword , 10 )

    
})

export default router;