const generateToken = userId => {
  return JwtService.issue({
    id: userId
  });
};

const userExists = res => {
  return ResponseService.json(400, res, 'User exits already');
};

const create = (req, res) => {
  const allowedParameters = ['email', 'password'];

  const data = _.pick(req.body, allowedParameters);

  User.findOrCreate(
    {
      email: data.email
    },
    data
  ).exec((err, user, wasCreated) => {
    if (err) {
      return ResponseService.json(400, res, `${err.message}`, err.Errors);
    }

    if (wasCreated) {
      const responseData = {
        user: user,
        token: generateToken(user.id)
      };
      return ResponseService.json(
        200,
        res,
        'User created successfully',
        responseData
      );
    } else {
      return userExists(res);
    }
  });
};

module.exports = {
  create
};
