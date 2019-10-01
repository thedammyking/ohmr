/**
 * Ticket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    ticketNumber: {
      type: 'string',
      required: true,
      columnName: 'ticket_number',
    },
    status: {
      type: 'string',
      isIn: ['used', 'unused'],
      defaultsTo: 'unused'
    },

    // Add a reference to Event
    event: {
      model: 'event'
    }
  },

};
