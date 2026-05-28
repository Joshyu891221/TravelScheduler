import express from "express";
import { get } from "./../controller/tag.js";
import { get_response } from './../middleware/tag.js';

const router = express.Router();

router.get("/", get, get_response);

export default router;
