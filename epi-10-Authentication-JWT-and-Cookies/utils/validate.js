var validator = require('validator');
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error(
      ' error caught by validate--->please write first and last name'
    );
  } else if (!validator.isEmail(emailId)) {
    throw new Error(
      ' error caught by validate--->please write valid email id ...'
    );
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      'error caught by validate -----> please write strong password'
    );
  }
};

module.exports = validateSignUpData;
