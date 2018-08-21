const mapRoutes = require ('./map_routes')
const markerRoutes = require('./marker_routes')

module.exports = function(app, db) {
  mapRoutes(app, db)
  markerRoutes(app, db)
}