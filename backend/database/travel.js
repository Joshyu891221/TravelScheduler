import { pool } from "./pool.js";
import user from "./user.js";
import { useTransaction } from "./utils.js";

const print_error = (err) => {
  console.log("error: " + err.message);
};

const get1 = (user_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "SELECT * FROM `TRAVEL` WHERE user_id = ? OR group_id IN (SELECT group_id FROM `CONTAIN` WHERE user_id = ?)"
    ];
    var values = [ 
      [user_id, user_id]
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

const get2 = (travel_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "SELECT T.travel_id, T.name AS travel_name,T.date, T.people_num, T.description AS travel_description, T.done, if(T.user_id IS NULL, T.group_id, T.user_id) AS id, if(T.user_id IS NULL, GP.name, US.name) AS name, S.spot_id, S.name AS spot_name, S.location, S.ranking,S.open_hour,S.description,H.arrive_time,H.start_time,H.transportation,G.tag_id,G.name as tag_name,G.color FROM TRAVEL AS T INNER JOIN HAS AS H ON T.travel_id = H.travel_id INNER JOIN SPOT AS S ON H.spot_id = S.spot_id LEFT JOIN TAG AS G ON H.tag_id = G.tag_id left JOIN `GROUP` AS GP ON T.group_id = GP.group_id left JOIN USER AS US ON T.user_id = US.user_id WHERE T.travel_id = ?",
    ];
    var values = [[travel_id]];

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
  travel_id,
  group_id,
  user_id,
  travel_name,
  travel_date,
  travel_peoplenum,
  travel_description,
  travel_done
) => {
  return new Promise(async (resolve, reject) => {
    var sqls = ["INSERT INTO TRAVEL VALUE(?,?,?,?,?,?,?,?)"];

    if(group_id)
      user_id = null;

    var values = [
      [
        travel_id,
        group_id,
        user_id,
        travel_name,
        travel_date,
        travel_peoplenum,
        travel_description,
        travel_done,
      ],
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

const delete_ = (travel_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = ["DELETE FROM `TRAVEL` WHERE travel_id = ?"];

    var values = [[travel_id]];

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

const edit = (
  travel_id,
  group_id,
  travel_name,
  travel_date,
  travel_peoplenum,
  travel_description,
  travel_done
) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "UPDATE `TRAVEL` SET group_id = ?, name = ?, date = ?, people_num = ?, description = ?, done = ? WHERE travel_id = ?",
    ];

    var values = [
      [
        group_id,
        travel_name,
        travel_date,
        travel_peoplenum,
        travel_description,
        travel_done,
        travel_id,
      ]
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

export default { create, delete_, edit, get1, get2 };
