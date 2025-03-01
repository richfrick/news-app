const db = require('../../db/connection');

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
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
