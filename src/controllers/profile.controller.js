const profileModel = require("../models/profile.model");
const errorHendler = require("../helpers/errorHandler.helper");
const userModel = require("../models/users.model");

exports.getProfileByUserId = async (req, res) => {
    try {
        const { id } = req.user;
        const data = await profileModel.findOne(id);
        if (!data) {
            throw Error("user not found");
        }
        return res.json({
            success: true,
            message: "Get profile success",
            results: data,
        });
    } catch (err) {
        return errorHendler(res, err);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await profileModel.findOneByUserId(id);
        const data = { ...req.body };
        if (req.file) {
            if (user.picture) {
                // fileRemover({ filename: user.picture });
            }
            // data.picture = req.file.filename;
            data.picture = req.file.path;
        }
        const profile = await profileModel.updateByUserId(id, data);
        if (!profile) {
            return errorHendler(res, undefined);
        }
        let updatedUser;
        if (data.email) {
            updatedUser = await userModel.update(id, data);
        } else {
            updatedUser = await userModel.findOne(id);
        }
        const results = {
            ...profile,
            email: updatedUser?.email,
        };
        return res.json({
            success: true,
            message: "Profile updated",
            results: results,
        });
    } catch (err) {
        return errorHendler(res, err);
    }
};

// exports.update = async (req, res) => {
//     try {
//         const { id } = req.user;
//         const data = { ...req.body };
//         if (req.file) {
//             data.picture = req.file.path;
//         }
//         const profileUpdate = await profileModel.updateByUserId(id, data);
//         if (!profileUpdate) {
//             throw Error("Update profile failed");
//         }

//         let userData;
//         if (data.email) {
//             userData = await userModel.update(id, data);
//         } else {
//             userData = await userModel.findOne(id);
//         }

//         const update = {
//             ...profileUpdate,
//             email: userData?.email,
//         };

//         return res.json({
//             success: true,
//             message: "Update profile success",
//             results: update,
//         });
//     } catch (err) {
//         return errorHendler(res, err);
//     }
// };
