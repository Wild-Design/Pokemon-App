import { Router } from "express";

const typesRouter = Router();

typesRouter.get("/types", (req, res) => {
  const { name } = req.query;
  if (name) {
    res.status(200).send(`Has puesto un query con el nombre de ${name}`);
  }
  res.status(200).send("ruta Types funcando :)");
});

module.exports = typesRouter;
