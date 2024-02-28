const checkRequiredFields = require('../utils/checkRequiredFields');

const validateUpdateFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['quantity'];

  const error = checkRequiredFields(body, requiredFields);
  if (error) {
    return res.status(400).json({ message: error });
  }

  return next();
};

module.exports = validateUpdateFields;