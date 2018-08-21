module.exports = function(app, db) {
  app.get('/markers/:id', (req, res) => {
    const markerId = req.params.id
    db.getMarker(markerId)
      .then(data => res.send(data))
      .catch(error => res.send(error))
  })

  app.delete('/markers/:id', (req, res) => {
    const markerId = req.params.id
    db.deleteMarker(markerId)
      .then(result => res.send(result))
      .catch(error => res.send({ 'error' : error})) 
  })

  app.post('/markers', (req, res) => {
    const { lat, long, name, url, description, color, mapId } = req.body;
    if (name == null) {
      res.send({ 'error' : 'marker needs a name'})
      return
    }

    db.newMarker(lat, long, name, url, description, color, mapId)
      .then(result => res.send({ 'markerId' : result.insertId }))
      .catch(error => res.send({ 'error' : error}))
  })


  app.put('/markers/:id', (req, res) => {
    const markerId = req.params.id
    const {mapId, ...body } = req.body;
    
    db.updateMap(markerId, {map_id: mapId, ...body})
      .then(result => res.send(result))
      .catch(error => res.send({ 'error' : error})) 
  })

  app.get('/markers/bymap/:id', (req, res) => {
    const mapId = req.params.id
    db.getMarkersFromMap(mapId)
      .then(data => res.send(data))
      .catch(error => res.send(error))
  })
}