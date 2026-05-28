import express from 'express';
import { register, get } from './../controller/user.js';
import { register_response, get_response } from './../middleware/user.js';

const router = express.Router();

router.get('/', get, get_response);
router.post('/register', register, register_response);

export default router;
