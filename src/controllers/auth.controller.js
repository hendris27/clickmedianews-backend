const userModel = require("../models/users.model");
const profileModel = require("../models/profile.model");
const forgotRequestModel = require("../models/forgotRequest.model");
const errorHandler = require("../helpers/errorHandler.helper");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = process.env;
const argon = require("argon2");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOneByEmail(email);
        if (!user) {
            throw Error("wrong_credentials");
        }
        const verify = await argon.verify(user.password, password);
        if (!verify) {
            throw Error("wrong_credentials");
        }
        const token = jwt.sign({ id: user.id, role: user.role }, APP_SECRET);
        return res.json({
            success: true,
            message: "Login success!",
            results: { token },
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, roleId } = req.body;
        const hash = await argon.hash(password);
        const data = {
            ...req.body,
            password: hash,
            roleId: "2",
        };
        const user = await userModel.insert(data);
        if (roleId === "1") {
            const profileData = {
                email,
                roleId,
                userId: user.id,
                isAuthor: true,
            };
            await profileModel.insert(profileData);
            const token = jwt.sign({ id: user.id }, APP_SECRET);
            return res.json({
                success: true,
                message: "Register success!",
                results: { token },
            });
        }
        const profileData = {
            email,
            roleId,
            userId: user.id,
            isAuthor: false,
        };
        await profileModel.insert(profileData);
        const token = jwt.sign({ id: user.id }, APP_SECRET);
        return res.json({
            success: true,
            message: "Register success!",
            results: { token },
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOneByEmail(email);
        if (!user) {
            return errorHandler(res, undefined);
        }
        const randomNumber = Math.random();
        const rounded = Math.round(randomNumber * 100000);
        const padded = String(rounded).padEnd(6, "0");
        const forgot = await forgotRequestModel.insert({
            email: user.email,
            code: padded,
        });
        if (!forgot) {
            throw Error("forgot_failed");
        }
        return res.json({
            success: true,
            message: "Forgot password success!",
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { code, email, password } = req.body;
        const find = await forgotRequestModel.findOneByCodeAndEmail(
            code,
            email
        );
        if (!find) {
            throw Error("no_forgot_request");
        }
        const selectedUser = await userModel.findOneByEmail(email);
        const data = {
            password: await argon.hash(password),
        };
        const user = await userModel.update(selectedUser.id, data);
        if (!user) {
            return errorHandler(res, undefined);
        }
        await forgotRequestModel.destroy(find.id);
        return res.json({
            success: true,
            message: "Reset password success!",
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.changePassword = async (req, res) => {
    try {
        let data = {};
        if (req.body.password || req.body.email) {
            const password = await argon.hash(req.body.password);
            data.password = password;
            const email = req.body.email;
            data.email = email;
        }
        const { id } = req.user;
        await userModel.update(id, data);
        return res.json({
            success: true,
            message: "Update password & email successfully",
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};
