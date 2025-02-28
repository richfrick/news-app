const db = require('../../db/connection');

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.formatTopicsSeedingData = (topicData) => {
  return topicData.map((topic) => {
    return [topic.slug, topic.description, topic.img_url];
  });
};

exports.createLookup = (lookupInput) => {
  const returnObject = {};
  return returnObject;
};
