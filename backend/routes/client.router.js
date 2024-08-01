import express from "express";
import {Clientside,addMonthlySubscribe} from "../controller/Client.controller.js";
;
const router=express.Router();
router.post("/client",Clientside)
router.post("/addMonthlySubscribe",addMonthlySubscribe)
export default router