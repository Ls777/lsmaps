const mapRoutes = require ('./map_routes')
const markerRoutes = require('./marker_routes')
const themeRoutes = require('./theme_routes')

module.exports = function(app, db) {
  mapRoutes(app, db)
  markerRoutes(app, db)
  themeRoutes(app, db)
}