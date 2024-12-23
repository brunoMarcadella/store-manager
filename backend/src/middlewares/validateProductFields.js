const checkRequiredFields = require('../utils/checkRequiredFields');

const validateProductFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['name'];

  const error = checkRequiredFields(body, requiredFields);
  if (error) {
    return res.status(400).json({ message: error });
  }

  return next();
};

module.exports = validateProductFields;