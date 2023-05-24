const admin = require("express").Router();

admin.use("/users", require("./users.router"));
admin.use("/profile", require("./profile.router"));

module.exports = admin;
