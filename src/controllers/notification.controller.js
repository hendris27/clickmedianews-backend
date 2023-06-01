const notificationModel = require("../models/notification.model");

exports.getAll = async (req, res) => {
    const { id } = req.user;
    if (!id) {
        throw Error("Unauthorized");
    }
    const notif = await notificationModel.insert(req.body);
    return res.json({
        success: true,
        message: "Insert notification successfully",
        results: notif,
    });
};
