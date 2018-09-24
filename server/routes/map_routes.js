module.exports = function (app, db) {
  app.get('/maps/:id', (req, res) => {
    const mapId = req.params.id
    db.getMap(mapId).then(data => res.send(data[0])).catch(error => {
      if (error.error === 'data not found') {
        res.status(500).send({ error: 'map not found' })
      } else {
        res.status(500).send(error)
      }
    })
  })

  app.delete('/maps/:id', (req, res) => {
    const mapId = req.params.id
    db
      .deleteMap(mapId)
      .then(result => res.send(result))
      .catch(error => res.send({ error: error }))
  })

  app.post('/maps', (req, res) => {
    const { name, url, description, themeId } = req.body
    if (name == null) {
      res.statusCode = 500
      res.send({ error: 'map needs a name' })
      return
    }

    db
      .newMap(name, url, description, themeId)
      .then(result => res.send({ mapId: result.insertId }))
      .catch(error => res.status(500).send({ error: error }))
  })

  app.put('/maps/:id', (req, res) => {
    const mapId = req.params.id
    const { themeId, ...body } = req.body

    db
      .updateMap(mapId, { theme_id: themeId, ...body })
      .then(result => res.send(result))
      .catch(error => res.status(500).send({ error: error }))
  })
}
