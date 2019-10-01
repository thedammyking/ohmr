const generateToken = userId => {
  return JwtService.issue({
    id: userId
  });
};

const signInUser = (req, res, password, user) => {
  User.comparePassword(password, user)
    .then(function(valid) {
      if (!valid) {
        return this.invalidEmailOrPassword();
      } else {
        var responseData = {
          user: user,
          token: generateToken(user.id)
        };
        return ResponseService.json(
          200,
          res,
          'Successfully signed in',
          responseData
        );
      }
    })
    .catch(() => {
      return ResponseService.json(403, res, 'Forbidden');
    });
};

const invalidEmailOrPassword = res => {
  return ResponseService.json(401, res, 'Invalid email or password');
};

const verifyParams = (res, email, password) => {
  if (!email || !password) {
    return ResponseService.json(401, res, 'Email and password required');
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  verifyParams(res, email, password);

  User.findOne({
    email: email
  })
    .then(user => {
      if (!user) {
        return invalidEmailOrPassword(res);
      }
      signInUser(req, res, password, user);
    })
    .catch(() => {
      return invalidEmailOrPassword(res);
    });
};

module.exports = {
  login
};
