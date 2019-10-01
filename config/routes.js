/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /signup': 'UserController.create',
  'POST /signin': 'AuthController.login',
  'POST /event': 'EventController.create',
  'GET /event': 'EventController.get',
  'GET /event/:id': 'EventController.get',
  'DELETE /event': 'EventController.delete',
  'PUT /event/:id': 'EventController.update',
};
