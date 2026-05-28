import { useTransaction } from './utils.js';

const print_error = (err) => {
    console.log("error: " + err.message);
};

const get1 = (user_id) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT * FROM SPOT WHERE spot_id in (SELECT DISTINCT spot_id FROM HAS WHERE spot_id NOT IN (SELECT spot_id FROM HAS INNER JOIN TRAVEL ON HAS.travel_id = TRAVEL.travel_id WHERE TRAVEL.done = true AND (TRAVEL.user_id = ? OR TRAVEL.group_id IN (SELECT group_id FROM CONTAIN WHERE user_id = ?)))GROUP BY spot_id);",
            "SELECT * FROM SPOT WHERE spot_id in (SELECT DISTINCT spot_id FROM HAS WHERE spot_id IN (SELECT spot_id FROM HAS INNER JOIN TRAVEL ON HAS.travel_id = TRAVEL.travel_id WHERE TRAVEL.done = true AND (TRAVEL.user_id = ? OR TRAVEL.group_id IN (SELECT group_id FROM CONTAIN WHERE user_id = ?)))GROUP BY spot_id);",
            "SELECT * FROM SPOT WHERE spot_id in (SELECT spot_id FROM STAR WHERE user_id = ?);"
        ]

        var values = [
            [user_id, user_id],
            [user_id, user_id],
            [user_id]
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}

const get2 = (user_id, travel_id) => {
    // console.log(travel_id);

    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT HAS.has_id, HAS.arrive_id, SPOT.spot_id, SPOT.name as spot_name, SPOT.location, longtitude, latitude, HAS.transportation, SPOT.ranking, SPOT.open_hour, SPOT.description, TAG.name as spot_tag_name, TAG.color, HAS.start_time, HAS.arrive_time, TRAVEL.done from SPOT JOIN HAS ON HAS.spot_id = SPOT.spot_id JOIN TAG ON HAS.tag_name = TAG.name JOIN TRAVEL ON TRAVEL.travel_id = HAS.travel_id where TRAVEL.travel_id = ?;",
            "SELECT STAR.spot_id FROM `STAR` where user_id = ?"
        ]

        var values = [
            [travel_id],
            [user_id]
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });

}
const check_spot_exist = (spot_id) => {
    return new Promise(async(resolve, reject) => {
        var sqls = [
            "SELECT spot_id FROM SPOT WHERE spot_id = ?"
        ];
        
        var values = [  
            [spot_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}


// await Spot.create(spot_id, spot_name, spot_rank, spot_description, spot_longtitude, spot_latitude, spot_openhour, spot_location)
const create = (spot_id, spot_name, spot_rank, spot_description, spot_longtitude, spot_latitude, spot_openhour, spot_location) => {
    return new Promise(async(resolve, reject) => {
        var sqls = [
            "INSERT INTO SPOT VALUE(?,?,?,?,?,?,?,?)"
        ];
        
        var values = [
            [spot_id, spot_name, spot_rank, spot_description, spot_longtitude, spot_latitude, spot_openhour, spot_location],
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}

// await Spot.add_to_has(travel_id, spot_id, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id)
const add_to_has = (has_id, travel_id, spot_id, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id) => {
    var sql 
    if (arrive_id === null) {
        sql = "UPDATE HAS SET arrive_id = ? WHERE travel_id = ? AND arrive_id is ? AND has_id != ?;"
    } else (
        sql = "UPDATE HAS SET arrive_id = ? WHERE travel_id = ? AND arrive_id = ? AND has_id != ?;"
    )
    return new Promise(async(resolve, reject) => {
        var sqls = [
            "INSERT INTO HAS VALUE(?,?,?,?,?,?,?,?)",
            sql
        ];
        
        var values = [
            [has_id, travel_id, spot_id, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id],   
            [has_id, travel_id, arrive_id, has_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}

// await Spot.update(spot_id, spot_description, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id, travel_id)
const get_origin_spots = (has_id) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT HAS.has_id FROM HAS WHERE arrive_id = ?;",
            "SELECT HAS.arrive_id FROM HAS WHERE has_id = ?;"
            
        ];

        var values = [
            [has_id], 
            [has_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const get_new_last_spot = (arrive_id) => {
    return new Promise( async (resolve, reject) => {
        if(arrive_id === null){
            var sqls = [
                "SELECT HAS.has_id FROM HAS WHERE arrive_id is ? ;"
            ];
        }else{
            var sqls = [
                "SELECT HAS.has_id FROM HAS WHERE arrive_id = ? ;"
            ];
        }

        var values = [
            [arrive_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const update_has = (has_id, travel_id, spot_id, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id, origin_last_spot, origin_next_spot, new_last_spot) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "UPDATE HAS SET arrive_id = ? WHERE has_id = ?",
            "UPDATE HAS SET arrive_id = ? WHERE has_id = ?",
            "UPDATE HAS SET travel_id = ?, spot_id = ?, tag_name = ?, transportation = ?, start_time = ?, arrive_time = ?, arrive_id = ? WHERE has_id = ?",
            
        ];

        var values = [
            [origin_next_spot, origin_last_spot],
            [has_id, new_last_spot],
            [travel_id, spot_id, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id, has_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const update_spot = (spot_id, spot_description) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "UPDATE SPOT SET description = ? WHERE spot_id = ?;"
        ];

        var values = [
            [spot_description, spot_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const delete_ = (has_id, origin_next_spot, origin_last_spot) => {
    return new Promise( async (resolve, reject) => {
        
        var sqls = [
            "DELETE FROM `HAS` WHERE has_id = ?",
            "UPDATE `HAS` SET arrive_id = ? WHERE has_id = ?"
        ];

        var values = [
            [has_id],
            [origin_next_spot, origin_last_spot]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
};


export default { get1, get2, check_spot_exist, create, add_to_has, get_origin_spots, get_new_last_spot, update_has, update_spot, delete_ };
