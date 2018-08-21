const mapRoutes = require ('./map_routes')

module.exports = function(app, db) {
  mapRoutes(app, db)
}