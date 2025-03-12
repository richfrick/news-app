const { fetchUsers } = require('../models/users.model');

exports.getUsers = async (request, response, next) => {
  try {
    const users = await fetchUsers();
    response.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};
