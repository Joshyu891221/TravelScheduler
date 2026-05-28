import { pool } from "./pool.js";
import { useTransaction } from "./utils.js";

const print_error = (err) => {
  console.log("error: " + err.message);
};

const get = (user_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "SELECT `GROUP`.*, USER.name AS creator_name FROM `GROUP` INNER JOIN USER ON `GROUP`.creator_id = USER.user_id WHERE group_id in (SELECT group_id FROM CONTAIN WHERE user_id = ?)",
      "SELECT g.group_id, GROUP_CONCAT(u.user_id) AS user_ids, GROUP_CONCAT(u.name) AS names, GROUP_CONCAT(u.email) AS emails FROM `GROUP` AS g INNER JOIN CONTAIN AS c ON g.group_id = c.group_id INNER JOIN USER AS u ON c.user_id = u.user_id WHERE g.group_id IN (SELECT group_id FROM CONTAIN AS c1 WHERE c1.user_id = ?) GROUP BY g.group_id",
        "DELETE FROM `GROUP` WHERE people_num <= 0",
    ];

    var values = [[user_id], [user_id]];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

const create = (
  group_id,
  group_name,
  group_description,
  group_peoplenum,
  user_id
) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "INSERT INTO `GROUP` VALUE(?,?,?,?,?)",
      "INSERT INTO CONTAIN VALUE(?,?)",
    ];

    var values = [
      [group_id, group_name, group_description, group_peoplenum, user_id],
      [user_id, group_id],
    ];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

const update = (group_id, group_name, group_description) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "UPDATE `GROUP` SET name = ?, description = ? WHERE group_id = ?",
    ];

    var values = [[group_name, group_description, group_id]];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

const delete_ = (group_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = ["DELETE FROM `GROUP` WHERE group_id = ?"];

    var values = [[group_id]];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

const join = (user_id, group_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
        "INSERT INTO CONTAIN VALUE(?,?)",
        "UPDATE `GROUP` SET people_num = people_num + 1 WHERE group_id = ?",  
    ];

    var values = [
        [user_id, group_id],
        [group_id],
    ];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

const kick = (user_id, group_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
        "DELETE FROM CONTAIN WHERE user_id = ? AND group_id = ?",
        "UPDATE `GROUP` SET people_num = people_num - 1 WHERE group_id = ?",
    ];

    var values = [
        [user_id, group_id],
        [group_id],
    ];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

export default { get, create, update, delete_, join, kick };
