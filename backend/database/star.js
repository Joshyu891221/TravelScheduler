import { useTransaction } from "./utils.js";

const print_error = (err) => {
    console.log("error: " + err.message);
};

const create = (user_id, spot_id) => {
    return new Promise( async (resolve, reject) => {
        var sqls = [
            "INSERT INTO STAR value(?,?)"
        ];

        var values = [
            [user_id, spot_id]
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
}

const delete_ = (user_id, spot_id) => {
    return new Promise( async (resolve, reject) => {
        var sqls = [
            "DELETE FROM STAR WHERE user_id = ? AND spot_id = ?"
        ];

        var values = [
            [user_id, spot_id]
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
}

export default { create, delete_ };
