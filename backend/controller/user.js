import crypto from "crypto";
import dotenv from "dotenv";
import User from "./../database/user.js";
dotenv.config();

const parseEscape = (value) => {
    var length = value.length;
    return (length >= 6 && typeof value.slice(1, length - 1) === "boolean") ? value.slice(1, length - 1) : value;
};

export const register = async (req, res, next) => {
  const { username, email, photoURL } = req.body;
  //使用email hash出 使用者id
  const sha256Hasher = crypto.createHmac("sha256", process.env.SECRET);
  const user_id = sha256Hasher.update(email).digest("base64");
  var isRegistered = false;

  // 將user_id, username, email寫入session
  req.session.user_id = user_id;
  req.session.username = username;
  req.session.email = email;
  req.session.photoURL = photoURL;

  await User.authenticate(user_id)
    .then((result) => {
      if (result[0].length !== 0) isRegistered = true;
      else isRegistered = false;
    })
    .catch((err) => {
      req.err = err;
      next();
    });

  if (!isRegistered) {
    await User.register(user_id, username, email, photoURL)
      .then((result) => {
        var data = {
          user_id: user_id,
        };
        req.data = JSON.stringify(data);
        next();
      })
      .catch((err) => {
        req.err = err;
        next();
      });
  } else {
    var data = {
      user_id: user_id,
    };
    req.data = JSON.stringify(data);
    next();
  }
};

export const get = async (req, res, next) => {
  const { user_id } = req?.session;
  console.log(req.session);

  await User.get(user_id)
    .then((result) => {
      var data = {
        user_id: parseEscape(result[0][0].user_id),
        username: parseEscape(result[0][0].name),
        email: parseEscape(result[0][0].email),
        photoURL: parseEscape(result[0][0].photoURL),
      };
      req.data = JSON.stringify(data);
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};
