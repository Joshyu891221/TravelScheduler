export const create_response = async (req, res, next) => {
  	var response = {};

  	// 如果req中帶有err則表示是錯誤回傳
  	if (req.err) {
    	response = {
			success: false,
			message: "新增地點失敗 err: " + req.err.message,
			data: {},
    	};
		console.log(response);
		res.status(500).json(response);
  	} else {
		req.data = JSON.parse(req.data);
		response = {
			success: true,
			message: "新增地點成功",
			data: {},
    	};
		response.data = req.data;
		res.status(201).json(response);
  	}
};

export const get_response = async (req, res, next) => {

  	var response = {};
  
  	if(req.err) {
      	response = {
			"success": false,
			"message": "獲得地點失敗 err: " + req.err.message,
			"data": {}
      	}
      	console.log(response);
      	res.status(500).json(response);
 	} else {
	    req.data = JSON.parse(req.data);
     	response = {
			"success": true,
			"message": "獲得地點成功",
			"data": {}
      	}
		// console.log(req.data);
		response.data = req.data;
		res.status(201).json(response);
  }
}

export const update_response = async (req, res, next) => {

  	var response = {};
  
  	if(req.err) {
      	response = {
			"success": false,
			"message": "更新地點失敗 err: " + req.err.message,
			"data": {}
      	}
		console.log(response);
		res.status(500).json(response);
  	} else {
		req.data = JSON.parse(req.data);
		response = {
			"success": true,
			"message": "更新地點成功",
			"data": {}
      	}
		response.data = req.data;
		res.status(201).json(response);
  	}
}

export const delete_response = async (req, res, next) => {

	var response = {};
	
	if(req.err) {
      	response = {
			"success": false,
			"message": "刪除地點失敗 err: " + req.err.message,
			"data": {}
      	}
      	// console.log(response);
      	res.status(500).json(response);
  	} else {
		response = {
			"success": true,
			"message": "刪除地點成功",
			"data": {}
      	}
		res.status(201).json(response);
	}
}