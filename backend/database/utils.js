import { pool } from './pool.js';

export const useTransaction = (sqls, values) => {
    return new Promise(async (resolve, reject) => {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.beginTransaction();
            var results = [];
            for (let i = 0; i < sqls.length; ++i) {
                const sql = sqls[i];
                const value = values[i] || [];

                for (let j = 0; j < value.length; ++j) {
                    if (typeof value[j] === "boolean") {
                        value[j] = conn.escape(value[j]);
                    }
                }

                const [result] = await conn.query(sql, value);
                results.push(result);
            }
            await conn.commit();
            resolve(results);
        } catch (err) {
            if (conn) await conn.rollback();
            reject(err);
        } finally {
            if (conn) conn.release();
        }
    });
};
