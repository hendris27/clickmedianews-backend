const usersModel = require("../../models/users.model");
const errorHandler = require("../../helpers/errorHandler.helper");
const argon = require("argon2");

exports.getAllUsers = async (req, res) => {
    try {
        const data = { ...req.query };
        const { rows: users, pageInfo } = await usersModel.findAll(data);
        return res.json({
            success: true,
            message: "List of all users",
            pageInfo,
            results: users,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        // const { role } = req.user;
        // if (role !== "superadmin") {
        //     throw Error("do not have access");
        // }
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

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersModel.findOne(id);
        const hash = await argon.hash(req.body.password);
        const data = {
            ...req.body,
            password: hash,
        };
        const updateData = await usersModel.update(id, data);
        if (!user) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Update user successfully",
            results: updateData,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};
