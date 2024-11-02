import express from "express";
import * as SearchController from "../controller/search";


const router = express.Router();

//login
router.get("/find_concert/:artist/:country", SearchController.getConcert);

export default router;