import express from "express";
import {
  get,
  create,
  update,
  delete_,
  join,
  kick,
} from "./../controller/group.js";
import {
  get_response,
  create_response,
  update_response,
  delete_response,
  join_response,
  kick_response,
} from "./../middleware/group.js";

const router = express.Router();

router.get("/", get, get_response);
router.post("/create", create, create_response);
router.put("/update", update, update_response);
router.delete("/delete", delete_, delete_response);
router.post("/join", join, join_response);
router.delete("/kick", kick, kick_response);

export default router;
