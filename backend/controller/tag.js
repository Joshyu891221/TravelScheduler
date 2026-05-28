import dotenv from "dotenv";
import Tag from "./../database/tag.js";
dotenv.config();

export const get = async (req, res, next) => {

    await Tag.get().then((result) => {
        var data = {
            tags: [],
        }

        for(let i = 0; i < result[0].length; ++i) {
            var tag = {
                tag_id: result[0][i].tag_id,
                tag_name: result[0][i].name,
                tag_color: result[0][i].color,
            }
            data.tags.push(tag);
        }

        req.data = JSON.stringify(data);
        next();
    }).catch((err) => {
        req.err = err;
        next();
    })
}


