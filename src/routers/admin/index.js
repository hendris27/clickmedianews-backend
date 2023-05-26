const adminRouter = require("express").Router();

adminRouter.use("/users", require("./users.router"));

module.exports = adminRouter;
