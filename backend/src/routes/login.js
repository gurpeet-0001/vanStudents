import { Router } from "express";
const router = Router();


router.post('/', (req, res) => {
    try {
        const {phoneNumber, password} = req.body;
        console.log("The phone number received from frontend to backend is : " + phoneNumber);
        console.log("The passwrod received from frontend to backend is : " + password);
        res.json({ "message": "successful" })
    } catch (error) {
        console.log('error receiveing data : '+ error)
    }

})

export default router