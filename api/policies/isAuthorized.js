module.exports = (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return ResponseService.json(401, res, 'Format is Authorization: Bearer [token]');
    }
  } else if (req.param('token')) {
    token = req.param('token');

    delete req.query.token;
  } else {
    return ResponseService.json(401, res, 'No authorization header was found');
  }

  JwtService.verify(token, (err, decoded) => {
    if (err) {
      return ResponseService.json(401, res, 'Invalid Token!');
    }
    req.token = token;
    User.findOne({
      id: decoded.id
    }).then((user) => {
      req.user = user;
      next();
    });
  });

}
