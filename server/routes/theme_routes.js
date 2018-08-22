module.exports = function(app, db) {
  app.get('/themes/:id', (req, res) => {
    const themeId = req.params.id
    db.getTheme(themeId)
      .then(data => res.send(data))
      .catch(error => res.send(error))

  })

  app.delete('/themes/:id', (req, res) => {
    const themeId = req.params.id
    db.deleteTheme(themeId)
      .then(result => res.send(result))
      .catch(error => res.send({ 'error' : error})) 
  })

  app.post('/themes', (req, res) => {
    const { name, theme } = req.body;
    if (name == null || theme == null) {
      res.send({ 'error' : 'missing fields'})
      return
    }

    db.newTheme(name, theme)
      .then(result => res.send({ 'themeId' : result.insertId }))
      .catch(error => res.send({ 'error' : error}))
  })


  app.put('/themes/:id', (req, res) => {
    const themeId = req.params.id
    const { name, theme } = req.body;
    
    db.updateTheme(themeId, { name, theme })
      .then(result => res.send(result))
      .catch(error => res.send({ 'error' : error})) 
  })
}