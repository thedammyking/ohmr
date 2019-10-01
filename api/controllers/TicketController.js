const createTicket = (res, data) =>
  Ticket.create(data)
    .fetch()
    .then(ticket => {
      if (ticket) {
        return ResponseService.json(
          200,
          res,
          'Ticket created successfully',
          ticket
        );
      }
      return ResponseService.json(400, res, 'Ticket can not be created');
    });

const findOne = (res, id, event) =>
  Ticket.findOne({
    id,
    event
  })
    .then(ticket => {
      if (ticket) {
        return ResponseService.json(
          200,
          res,
          'Ticket fetched successfully',
          ticket
        );
      }
      return ResponseService.json(404, res, 'Ticket not found');
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const findAll = (res, event) =>
  Ticket.find({
    event
  })
    .then(tickets => {
      if (tickets.length) {
        return ResponseService.json(
          200,
          res,
          'Tickets fetched successfully',
          tickets
        );
      }
      return ResponseService.json(404, res, 'Tickets not found');
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const destroyOne = (res, id, event) =>
  Ticket.destroyOne({
    id,
    event
  })
    .then(ticket => {
      if (ticket) {
        return ResponseService.json(200, res, 'Ticket deleted successfully');
      }
      return ResponseService.json(404, res, `Ticket not found`);
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const updateOne = (res, data, id) =>
  Ticket.updateOne({
    id,
    event: data.event
  })
    .set(data)
    .then(ticket => {
      if (ticket) {
        return ResponseService.json(
          200,
          res,
          'Ticket updated successfully',
          ticket
        );
      }
      return ResponseService.json(404, res, `Ticket not found`);
    })
    .catch(error =>
      ResponseService.json(400, res, `${error.message}`, error.Errors)
    );

const create = (req, res) => {
  const { params } = req;
  const allowedParameters = ['ticketNumber', 'status'];
  const data = _.pick(req.body, allowedParameters);
  data.event = params.event_id;

  try {
    return createTicket(res, data);
  } catch (error) {
    return ResponseService.json(400, res, `${error.message}`, error.Errors);
  }
};

const get = (req, res) => {
  const { params } = req;
  if (params && params.id) {
    return findOne(res, params.id, params.event_id);
  }
  return findAll(res, params.event_id);
};

const deleteTicket = (req, res) => {
  const { params } = req;
  const { id } = req.body;

  return destroyOne(res, id, params.id);
};

const updateTicket = (req, res) => {
  const { params } = req;
  const allowedParameters = ['ticketNumber', 'status'];
  const data = _.pick(req.body, allowedParameters);
  data.event = params.event_id;

  return updateOne(res, data, params.id);
};

module.exports = {
  create,
  update: updateTicket,
  delete: deleteTicket,
  get
};
