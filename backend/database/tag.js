import { useTransaction } from "./utils.js";

const print_error = (err) => {
    console.log("error: " + err.message);
};

const get = () => {
    return new Promise(async (resolve, reject) => {
        var sqls =[
            "SELECT * FROM TAG"
        ];

        var values = [[]];

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

const check_tag = (spot_tag_name) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT * from TAG where name = ?;"
        ]

        var values = [
            [spot_tag_name]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const create = (tag_name, tag_color) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "INSERT INTO TAG VALUE(?,?)"
        ]

        var values = [
            [tag_name, tag_color]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

export default { get, check_tag, create };
