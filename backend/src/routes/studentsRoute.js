import { Router } from "express";
const router = Router()

//importing Controllers 
import { getStudents } from "../controllers/studentsController.js";
import { createStudent } from "../controllers/studentsController.js";
import { getStudentsById } from "../controllers/studentsController.js";
import { addStudentFee } from "../controllers/studentsController.js";
import { updateStudentFee } from "../controllers/studentsController.js";
import tokenVerification from "../middleware/tokenVerification.js";


//goes to all students controllers
router.get('/', tokenVerification ,getStudents);
router.post('/', tokenVerification, createStudent);
router.get('/:id' ,tokenVerification, getStudentsById);
router.post('/:id' , addStudentFee );
router.put('/:id' , updateStudentFee);


export default router