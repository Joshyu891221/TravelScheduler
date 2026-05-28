import express from "express";
import { get1, get2, create, update, delete_ } from "./../controller/spot.js";
import { get_response, create_response, update_response, delete_response } from "./../middleware/spot.js";

const router = express.Router();
router.get("/get1", get1, get_response);
router.get("/get2", get2, get_response);
router.post("/create", create, create_response);
router.put('/update', update, update_response);
router.delete("/delete", delete_, delete_response);

export default router;
