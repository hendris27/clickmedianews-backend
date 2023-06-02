const notificationModel = require("../models/notification.model");

exports.getAll = async (req, res) => {
    const { id } = req.user;
    if (!id) {
        throw Error("Unauthorized");
    }
    const { rows: notif, pageInfo } =
        await notificationModel.findAllNotificationByUserId(id, req.query);
    return res.json({
        success: true,
        message: "Get All notification successfully",
        pageInfo,
        results: notif,
    });
};
