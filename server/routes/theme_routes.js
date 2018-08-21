module.exports = function(app, db) {
  app.get('/themes/:id', (req, res) => {
    const mapId = req.params.id
    db.getMap(mapId)
      .then(data => res.send(data))
      .catch(error => res.send(error))

  })

  app.delete('/maps/:id', (req, res) => {
    const mapId = req.params.id
    db.deleteMap(mapId)
      .then(result => res.send(result))
      .catch(error => res.send({ 'error' : error})) 
  })

  app.post('/maps', (req, res) => {
    const { name, url, description, themeId } = req.body;
    if (name == null) {
      res.send({ 'error' : 'map needs a name'})
      return
    }

    db.newMap(name, url, description, themeId)
      .then(result => res.send({ 'mapId' : result.insertId }))
      .catch(error => res.send({ 'error' : error}))
  })


  app.put('/maps/:id', (req, res) => {
    const mapId = req.params.id
    const {themeId, ...body } = req.body;
    
    db.updateMap(mapId, {theme_id: themeId, ...body})
      .then(result => res.send(result))
      .catch(error => res.send({ 'error' : error})) 
  })
}