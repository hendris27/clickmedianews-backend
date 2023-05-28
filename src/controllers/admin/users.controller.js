const usersModel = require("../../models/users.model");
const errorHandler = require("../../helpers/errorHandler.helper");
const argon = require("argon2");

exports.getAllUsers = async (req, res) => {
    try {
        const data = { ...req.query };
        const user = await usersModel.findAll(data);
        return res.json({
            success: true,
            message: "List of all users",
            results: user,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
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

exports.createUser = async (req, res) => {
    try {
        const hash = await argon.hash(req.body.password);
        const data = {
            ...req.body,
            password: hash,
        };
        const user = await usersModel.insert(data);
        return res.json({
            success: true,
            message: `Create user ${req.body.email} successfully`,
            results: user,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const hash = await argon.hash(req.body.password);
        const data = {
            ...req.body,
            password: hash,
        };
        const user = await usersModel.update(req.params.id, data);
        if (!user) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Update user successfully",
            results: user,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const data = await usersModel.destroy(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Delete user successfully",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};
