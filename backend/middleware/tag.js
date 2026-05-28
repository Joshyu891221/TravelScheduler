export const get_response = async (req, res, next) => {
    var response = {};

    if (req.err) {
        response = {
            success: false,
            message: "獲得標籤失敗 err: " + req.err.message,
            data: {},
        };
        console.log(response);
        res.status(500).json(response);
    } else {
        req.data = JSON.parse(req.data);
        response = {
            success: true,
            message: "獲得標籤成功",
            data: {},
        };
        response.data = req.data;
        res.status(201).json(response);
    }
};
