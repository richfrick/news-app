exports.handlePsqlErrors = (error, request, response, next) => {
  if (error.code === '22P02') {
    response
      .status(400)
      .send({ msg: 'Bad Request, incorrect type used in SQL query' });
  }
  next(error);
};

exports.handleServerErrors = (error, request, response, next) => {
  console.log(error);
  response.status(500).send({ msg: 'Internal Server Error' });
};
