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
        const { email, password, phoneNumber } = req.body;
        const hash = await argon.hash(password);
        const data = {
            ...req.body,
            password: hash,
        };
        const user = await userModel.insert(data);
        const profileData = {
            email,
            phoneNumber,
            userId: user.id,
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

// exports.resetPassword = async (req, res) => {
//     try {
//         const { code, email, password } = req.body;
//         const find = await forgotRequestModel.findOneByCodeAndEmail(
//             code,
//             email
//         );
//         if (!find) {
//             throw Error("no_forgot_request");
//         }
//         const selectedUser = await adminModel.findOneByEmail(email);
//         const data = {
//             password: await argon.hash(password),
//         };
//         const user = await adminModel.update(selectedUser.id, data);
//         if (!user) {
//             return errorHandler(res, undefined);
//         }
//         await forgotRequestModel.destroy(find.id);
//         return res.json({
//             success: true,
//             message: "Reset password success!",
//         });
//     } catch (err) {
//         return errorHandler(res, err);
//     }
// };
