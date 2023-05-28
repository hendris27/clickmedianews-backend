const usersModel = require("../models/users.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.getUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await usersModel.findOne(id);
        return res.json({
            success: true,
            message: "List user",
            results: user,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};
