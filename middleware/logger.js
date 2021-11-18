// logger middleware for logging all incoming requests.
// Testing purposes only.

const logger = async (req, res, next) => {
  console.count('event');
  console.log(req.method);
  console.log(req.originalUrl);
  next();
};
module.exports = logger;
