const reqAuthorRouter = require("express").Router();
const reqAuthorController = require("../controllers/requestAuthor.controller");

reqAuthorRouter.get("/", reqAuthorController.getAll);
reqAuthorRouter.post("/", reqAuthorController.reqAuthor);
reqAuthorRouter.delete("/:id", reqAuthorController.deleteRequest);

module.exports = reqAuthorRouter;
