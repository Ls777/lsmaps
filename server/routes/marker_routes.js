module.exports = function (app, db) {
  app.get('/markers/:id', (req, res) => {
    const markerId = req.params.id
    db
      .getMarker(markerId)
      .then(data => res.send(data))
      .catch(error => res.status(500).send(error))
  })

  app.delete('/markers/:id', (req, res) => {
    const markerId = req.params.id
    db
      .deleteMarker(markerId)
      .then(result => res.send(result))
      .catch(error => res.status(500).send({ error: error }))
  })

  app.post('/markers', (req, res) => {
    const { lat, lng, name, url, description, color, mapId } = req.body
    if (mapId == null || lat == null || lng == null) {
      res.status(500).send({ error: 'missing required info' })
      return
    }

    db
      .newMarker(mapId, lat, lng, name, url, description, color)
      .then(result => res.send({ markerId: result.insertId }))
      .catch(error => res.status(500).send({ error: error }))
  })

  app.put('/markers/:id', (req, res) => {
    const markerId = req.params.id
    const { mapId, ...body } = req.body

    db
      .updateMarker(markerId, { map_id: mapId, ...body })
      .then(result => res.send(result))
      .catch(error => res.status(500).send({ error: error }))
  })

  app.get('/markers/bymap/:id', (req, res) => {
    const mapId = req.params.id
    db
      .getMarkersFromMap(mapId)
      .then(data => res.send(data))
      .catch(error => res.status(500).send(error))
  })
}
