const profileModel = require("../../models/profile.model");
const errorHandler = require("../../helpers/errorHandler.helper");
const fileRemover = require("../../helpers/fileRemover.helper");

exports.getAllProfiles = async (req, res) => {
    try {
        const data = { ...req.query };
        const profile = await profileModel.findAll(data);
        return res.json({
            success: true,
            message: "List of all profile",
            results: profile,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.getOneProfile = async (req, res) => {
    try {
        const data = await profileModel.findOne(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Detail profile",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.createProfile = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.picture = req.file.filename;
        }
        const profile = await profileModel.insert(data);
        return res.json({
            success: true,
            message: `Create profile ${req.body.fullName} successfully`,
            results: profile,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const img = await profileModel.findOne(req.params.id);
        const data = { ...req.body };
        if (req.file) {
            if (img.picture) {
                fileRemover({ filename: img.picture });
            }
            data.picture = req.file.filename;
        }
        const profile = await profileModel.update(req.params.id, data);
        if (!profile) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Update profile successfully",
            results: profile,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const data = await profileModel.destroy(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Delete profile successfully",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};
