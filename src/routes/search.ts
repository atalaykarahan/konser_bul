import express from "express";
import * as SearchController from "../controller/search";


const router = express.Router();

//login
router.post("/find_concert", SearchController.findConcert);

export default router;