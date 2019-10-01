/**
 * Event.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    dateTime: {
      type: 'number',
      required: true,
    },
    entry: {
      type: 'string',
      isIn: ['free', 'paid'],
      required: true,
    },
    price: {
      type: 'number',
      defaultsTo: 0,
      columnName: 'ticket_price',
    },
    location: {
      type: 'string',
      required: true,
    },
    // Add a reference to User
    organizer: {
      model: 'user'
    }
  },

};
