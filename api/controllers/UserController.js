module.exports = {
  create: (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
      return ResponseService.json(401, res, `Password doesn't match`);
    }

    const allowedParameters = [
      'email', 'password'
    ];

    const data = _.pick(req.body, allowedParameters);


    User.findOne({
      email: data.email
    }).then(user => {
      if (!user) {
        return User.create(data).fetch().then(user => {
          const responseData = {
            user: user,
            token: JwtService.issue({
              id: user.id
            })
          };
          return ResponseService.json(200, res, 'User created successfully', responseData);
        });
      }
      return ResponseService.json(400, res, 'User exits already');
    }).catch(error => ResponseService.json(400, res, `${error.message}`, error.Errors));
  }
};
