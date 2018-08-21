module.exports = function(app, db) {
  app.get('/maps/:id', (req, res) => {
    const mapId = req.params.id
    db.getMap(mapId)
      .then(data => res.send(data))
      .catch(err => res.send(err))

  })



  app.post('/maps', (req, res) => {
    const { name, url, description, themeId } = req.body;
    if (name == null) {
      res.send({ 'error' : 'map needs a name'})
      return
    }

    db.newMap(name, url, description, themeId, (error, result) => {
      if (error) {
        res.send({ 'error' : error})
      } else {
        res.send({ 'mapId' : result.insertId })
      }

    })
  })
}