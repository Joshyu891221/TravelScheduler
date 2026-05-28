export const register_response = async (req, res, next) => {
  var response = {};

  // 如果req中帶有err則表示是錯誤回傳
  if (req.err) {
    response = {
      success: false,
      message: "使用者註冊失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "使用者註冊成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};

export const get_response = async (req, res, next) => {
  var response = {};

  // 如果req中帶有err則表示是錯誤回傳
  if (req.err) {
    response = {
      success: false,
      message: "獲得使用者資料失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "獲得使用者資料成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};
