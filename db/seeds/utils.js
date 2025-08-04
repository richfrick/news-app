const db = require("../../db/connection");
const format = require("pg-format");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
    if (!created_at) return { ...otherProperties };
    return {
        created_at: new Date(created_at).toISOString(),
        ...otherProperties,
    };
};

exports.formatTopicsSeedingData = (topicData) => {
    try {
        return topicData.map((topic) => {
            return [topic.slug, topic.description, topic.img_url];
        });
    } catch (error) {
        console.log(error);
    }
};

exports.createLookup = (data, key, value) => {
    try {
        const lookupTable = {};
        data.forEach((dataElement) => {
            lookupTable[dataElement[key]] = dataElement[value];
        });
        return lookupTable;
    } catch (error) {
        console.log(error);
    }
};

exports.checkExists = async (table, column, value) => {
    const queryStr = format("SELECT * FROM %I WHERE %I = $1", table, column);
    const dbOutput = await db.query(queryStr, [value]);
    if (dbOutput.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
    } else {
        return dbOutput;
    }
};
