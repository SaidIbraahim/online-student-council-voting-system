// routes/passwordResetRoutes.js
import express from 'express';
import { requestAdminPasswordReset, requestVoterPasswordReset, resetAdminPassword, resetVoterPassword } from '../controllers/passwordResetController.js';

const router = express.Router();

// Routes for requesting password reset
router.post('/request-admin-reset', requestAdminPasswordReset);
router.post('/request-voter-reset', requestVoterPasswordReset);

// Routes for resetting password
router.post('/reset-admin-password', resetAdminPassword);
router.post('/reset-voter-password', resetVoterPassword);

export default router;