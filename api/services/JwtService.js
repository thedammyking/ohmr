const jwt = require('jsonwebtoken');
const jwtSecret = sails.config.custom.jwtSecret;

module.exports = {
  issue: (payload) => {
    try {
      const token = jwt.sign(payload, jwtSecret, {
        expiresIn: 180 * 60
      });
      return token;
    } catch (error) {
      console.log(error);
    }
  },

  verify: (token, callback) => {
    return jwt.verify(token, jwtSecret, callback);
  }
};
