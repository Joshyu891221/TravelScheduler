import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import Travel from "./../database/travel.js";
dotenv.config();

const parseEscape = (value) => {
  return typeof value === "boolean" ? value.slice(1, value.length - 1) : value;
};

export const create = async (req, res, next) => {
  const { user_id } = req?.session;
  const {
    group_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done
  } = req.body;

  const travel_id = uuid();

  await Travel.create(
    travel_id,
    group_id,
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done
  )
    .then((result) => {
      console.log(result);
      var data = {};
      req.data = JSON.stringify(data);
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};

export const delete_ = async (req, res, next) => {
  const { travel_id } = req.body;

  await Travel.delete_(travel_id)
    .then(result => {
      req.data = JSON.stringify({});
      next();
    })
    .catch(err => {
      req.err = err;
      next();
    });
};

export const edit = async (req, res, next) => {
  const {
    travel_id,
    group_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done,
  } = req.body;

  await Travel.edit(
    travel_id,group_id,
    travel_name,travel_date,
    travel_peoplenum, 
    travel_description,
    travel_done)
    .then(result => {
      req.data = JSON.stringify({});
      next();
    })
    .catch(err => {
      req.err = err;
      next();
    });
};


export const get1= async (req, res, next) => {
  const { user_id } = req?.session;
  await Travel.get1(user_id)
    .then((result) => {
      console.log(result);
      var data = {
        travels: [],
      };
      for (let i = 0; i < result[0].length; ++i) {
        var travel = {
          travel_id: parseEscape(result[0][i].travel_id),
          group_id: parseEscape(result[0][i].group_id),
          travel_name: parseEscape(result[0][i].name),
          travel_date: parseEscape(result[0][i].date),
          travel_peoplenum: parseEscape(result[0][i].people_num),
          travel_description: parseEscape(result[0][i].description),
          travel_done: parseEscape(result[0][i].done),
        };
        data.travels.push(travel);
      }
      req.data = JSON.stringify(data);
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};

export const get2 = async (req, res, next) => {
  const { travel_id } = req.body;
  await Travel.get2(travel_id)
    .then((result) => {
      //console.log(result);

      var data = {
        travel_id : parseEscape(result[0][0].travel_id),
        travel_name : parseEscape(result[0][0].travel_name),
        travel_date : parseEscape(result[0][0].date),
        travel_peoplenum : parseEscape(result[0][0].people_num),
        travel_description : parseEscape(result[0][0].travel_description),
        travel_done : parseEscape(result[0][0].done),
        id : parseEscape(result[0][0].id),
        name : parseEscape(result[0][0].name),
        days: []
      };


      
      const day = {};
      result[0].forEach((row) => {
        const spotDate = row.start_time.toISOString().split("T")[0];
        if (!day[spotDate]) {
          day[spotDate] = [];
        }

        day[spotDate].push({
          spot_id: row.spot_id,
          spot_name: row.spot_name,
          spot_location: row.location,
          spot_rank: row.ranking,
          spot_openhour: row.open_hour,
          spot_description: row.description,
          spot_arrive_time: row.arrive_time,
          spot_start_time: row.start_time,
          spot_transportation: row.transportation,
          spot_tag_id: row.tag_id,
          spot_tag_name: row.tag_name,
          spot_tag_color: row.color,
        });
      });
      //console.log(day);
     
      const dates = Object.keys(day).sort();

      for (const date of dates) {
        const spots = day[date];

        data.days.push({
          spots: spots,
        });
      }

      //console.log(days);
      //console.log(JSON.stringify(days, null, 2));
      //console.log(data);


      req.data = JSON.stringify(data);
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};
