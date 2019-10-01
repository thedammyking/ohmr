const createEvent = (res, data) =>
  Event.create(data)
    .fetch()
    .then(event => {
      if (event) {
        return ResponseService.json(
          200,
          res,
          'Event created successfully',
          event
        );
      }

      return ResponseService.json(404, res, 'Event can not be created', ticket);
    });

const findOne = (res, id) =>
  Event.findOne({
    id
  })
    .then(event => {
      if (event) {
        return ResponseService.json(
          200,
          res,
          'Event fetched successfully',
          event
        );
      }
      return ResponseService.json(404, res, 'Event not found');
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const findAll = (res, organizer) =>
  Event.find({
    where: {
      organizer
    }
  })
    .then(events => {
      if (events.length) {
        return ResponseService.json(
          200,
          res,
          'Events fetched successfully',
          events
        );
      }
      return ResponseService.json(404, res, 'Events not found');
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const destroyOne = (res, id) =>
  Event.destroyOne({
    id
  })
    .then(event => {
      if (event) {
        return ResponseService.json(200, res, 'Event deleted successfully');
      }
      return ResponseService.json(404, res, `Event not found`);
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const updateOne = (res, data, id) =>
  Event.updateOne({
    id
  })
    .set(data)
    .then(event => {
      if (event) {
        return ResponseService.json(
          200,
          res,
          'Events updated successfully',
          event
        );
      }
      return ResponseService.json(404, res, `Event not found`);
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const create = (req, res) => {
  const allowedParameters = [
    'title',
    'description',
    'dateTime',
    'entry',
    'price',
    'location'
  ];
  const data = _.pick(req.body, allowedParameters);
  const { user } = req;

  try {
    createEvent(res, {
      ...data,
      organizer: user.id
    });
  } catch (error) {
    return ResponseService.json(400, res, `${error.message}`, error.Errors);
  }
};

const get = (req, res) => {
  const { user, params } = req;
  if (params && params.id) {
    return findOne(res, params.id);
  }
  return findAll(res, user.id);
};

const deleteEvent = (req, res) => {
  const { id } = req.body;

  return destroyOne(res, id);
};

const updateEvent = (req, res) => {
  const {
    params: { id }
  } = req;

  const allowedParameters = [
    'title',
    'description',
    'dateTime',
    'entry',
    'price',
    'location'
  ];
  const data = _.pick(req.body, allowedParameters);

  return updateOne(res, data, id);
};

module.exports = {
  create,
  update: updateEvent,
  delete: deleteEvent,
  get
};
