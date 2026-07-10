import { Router } from "express";
const router = Router()

//importing Controllers 
import { getStudents  } from "../controllers/studentsController.js";
import { createStudent } from "../controllers/studentsController.js";
import { getStudentsFee } from "../controllers/studentsController.js";
import { addStudentFee } from "../controllers/studentsController.js";
import { updateStudentFee } from "../controllers/studentsController.js";
import tokenVerification from "../middleware/tokenVerification.js";


//goes to all students controllers
router.get('/', tokenVerification ,getStudents);
router.post('/', tokenVerification, createStudent);
router.get('/:id' , tokenVerification, getStudentsFee);
router.post('/:id' , tokenVerification, addStudentFee );
router.put('/:id' , tokenVerification, updateStudentFee);


export default router