export const create_response = async (req, res, next) => {
  var response = {};

  // 如果req中帶有message則表示是錯誤回傳
  if (req.err) {
    response = {
      success: false,
      message: "新增群組失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "新增群組成功",
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
      message: "獲得群組失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "獲得群組成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};

export const update_response = async (req, res, next) => {
  var response = {};

  if (req.err) {
    response = {
      success: false,
      message: "更新群組失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "更新群組成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};

export const delete_response = async (req, res, next) => {
  var response = {};

  if (req.err) {
    response = {
      success: false,
      message: "刪除群組失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "刪除群組成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};

export const join_response = async (req, res, next) => {
  var response = {};

  if (req.err) {
    response = {
      success: false,
      message: "群組新增使用者失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "群組新增使用者成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};

export const kick_response = async (req, res, next) => {
  var response = {};

  if (req.err) {
    response = {
      success: false,
      message: "群組移除使用者失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "群組移除使用者成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};
