import { Router } from "express";
import { supabase } from "../config/db.js";

const router = Router();

router.get('/',async (req, res) => {
    try {
        const {data,error} = await supabase.from('Smoothies').select("title");
        res.send(data);
    } catch (error) {
        console.log("the error is : " + error);
    }

})

export default router;
