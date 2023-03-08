import { Router } from "express";
import getAllTypes from "../controllers/typesController";
const typesRouter = Router();

typesRouter.get("/types", getAllTypes);

module.exports = typesRouter;
