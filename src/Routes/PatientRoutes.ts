import express from 'express';
const router = express.Router();

import { authenticate } from '../middleware/authendicate';
import { checkRole } from '../middleware/roleCheck';
import { UserRole } from '../types';
import { PatientCrud } from '../Controller/PatientController';
import { validatePatient } from '../middleware/validation';

// Patient CRUD
router.post(
    '/patient',
    authenticate,
    // checkRole([UserRole.Receptionist]),
    validatePatient,
    PatientCrud
);

export default router;
