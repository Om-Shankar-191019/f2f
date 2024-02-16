const errorHandler = async (err, req, res, next) => {
  console.log(err.stack);
  let statusCode = err.statusCode || 500;
  let error = err.message || "Something went wrong. Try again later";

  if (err.code && err.code === 11000) {
    error = `value entered for ${Object.keys(
      err.keyValue
    )} is already in use. Please pick another one.`;
  }

  return res.status(statusCode).json({ error });
  return res.status(400).json({ msg: err });
};

export default errorHandler;

// if (err.name === 'ValidationError') {
//     customError.msg = Object.values(err.errors)
//       .map((item) => item.message)
//       .join(',');
//     customError.statusCode = 400;
//   }

//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id : ${err.value}`;
//     customError.statusCode = 404;
//   }
