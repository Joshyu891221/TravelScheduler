export const create_response = async (req, res, next) => {
  var response = {};

  // 如果req中帶有err則表示是錯誤回傳
  if (req.err) {
    response = {
      success: false,
      message: "Travel新增失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    response = {
      success: true,
      message: "Travel新增成功",
      data: {},
    };
    res.status(201).json(response);
  }
};

export const delete_response = async (req, res, next) => {
  var response = {};
  if (req.err) {
    response = {
      success: false,
      message: "Travel刪除失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    response = {
      success: true,
      message: "Travel刪除成功",
      data: {},
    };
    res.status(201).json(response);
  }
};

export const edit_response = async (req, res, next) => {
  var response = {};
  if (req.err) {
    response = {
      success: false,
      message: "Travel更新失敗" + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "Travel更新成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};

export const get_response = async (req, res, next) => {
  var response = {};

  if (req.err) {
    response = {
      success: false,
      message: "獲得travel失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "獲得travel成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};