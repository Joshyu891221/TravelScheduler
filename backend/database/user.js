import { pool } from './pool.js';
import { useTransaction } from './utils.js';

const print_error = (err) => {
    console.log("error: " + err.message);
}

// TODO: transaction, prevent sql injection

const authenticate = (user_id) => {

    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT user_id FROM USER WHERE user_id = ?",
        ]

        var values = [
            [user_id],
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}


const register = (user_id, username, email, photoURL) => {

    return new Promise( async (resolve, reject) => {

        var sqls = [
            "INSERT INTO USER VALUE(?,?,?,?)",
        ]

        var values = [
            [user_id, username, email, photoURL],
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const get = (user_id) => {

    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT * FROM USER WHERE user_id = ?",
        ]

        var values = [
            [user_id],
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

export default { register, authenticate, get }
