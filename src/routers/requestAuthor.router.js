const reqAuthorRouter = require("express").Router();
const reqAuthorController = require("../controllers/requestAuthor.controller");
const profileController = require("../controllers/profile.controller");

reqAuthorRouter.get("/", reqAuthorController.getAll);
reqAuthorRouter.post("/", reqAuthorController.reqAuthor);
reqAuthorRouter.patch("/:userId", profileController.updateisAuthor);
reqAuthorRouter.delete("/:id", reqAuthorController.deleteRequest);

module.exports = reqAuthorRouter;
