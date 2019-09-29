const generateToken = (userId) => {
  return JwtService.issue({
    id: userId
  });
};

const createUser = (res, data) => User.create(data).fetch().then(user => {
  const responseData = {
    user: user,
    token: generateToken(user.id)
  };
  return ResponseService.json(200, res, 'User created successfully', responseData);
});

const userExists = (res) => {
  return ResponseService.json(400, res, 'User exits already');
};

const verifyParams = (res, email, password) => {
  if (!email || !password) {
    return ResponseService.json(401, res, 'Email and password required');
  }
};

const create = (req, res) => {
  const {
    email,
    password
  } = req.body;

  verifyParams(res, email, password);

  const allowedParameters = [
    'email', 'password'
  ];

  const data = _.pick(req.body, allowedParameters);

  try {
    User.findOne({
      email: data.email
    }).then(user => {
      if (!user) {
        return createUser(res, data);
      }
      return userExists(res);
    });
  } catch (error) {
    return ResponseService.json(400, res, `${error.message}`, error.Errors)
  }
}

module.exports = {
  create
};
