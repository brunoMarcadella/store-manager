const checkRequiredFields = require('../utils/checkRequiredFields');

const validateRegisterFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['productId', 'quantity'];

  for (let index = 0; index < body.length; index += 1) {
    const error = checkRequiredFields(body[index], requiredFields);
    if (error) {
      return res.status(400).json({ message: error });
    }
  }

  return next();
};

module.exports = validateRegisterFields;