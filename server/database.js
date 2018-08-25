require('dotenv').config()
require('sql-require')
const mysql = require('mysql');
const hashids = require('hashids')

const createTableSQL = require('./createTables.sql')

class database{
  constructor() {
    this.connection = mysql.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT
    });

    this.hashid = new hashids('lsmaps', 8)
  
    this.connection.connect(err => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    
      console.log('connected as id ' + this.connection.threadId);
      this.createTables();
      this.initializeDefaultTheme();
    });

    this.keepAlive = setInterval(() => {
      this.connection.query('SELECT 1');
    }, 3600000);
  }

  createTables() {
    const queryStrings = []

    //convert object to array to ensure order is preserved
    for (const prop in createTableSQL) {
      queryStrings[prop] = createTableSQL[prop]
    }

    queryStrings.forEach((queryString, idx) => {
      this.connection.query(queryString, (error, results, fields) => {
          if (error) {
            console.log("Error is " + error.code);
            console.log(error.sqlMessage)
          } else {
            //Do anything with the query result
          } 
          console.log('newmap: ', idx);
        }
      );
    })
  }

  initializeDefaultTheme() {
    const queryString = `SELECT * FROM themes WHERE id = 1`
    this.connection.query(queryString, (error, rows, fields) => {
      if (error) console.log(error)
      if (rows.length == 0) {
        this.newTheme('default', `{"theme": "yes"}`)
      }
    })
  }

  newRow(table, args) {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO ${table} VALUES (`
      const values = [null]

      for (let key in args) {
        queryString += `?, `
        values.push(args[key])
      }

      queryString += '?)'

      this.connection.query(queryString, values, (error, result, fields) => {
        if (error) {
          return reject(error)
        }

        resolve(result)
      })
    })
  }

  newMarker(mapId, lat, lng, name = "anonymous", url = null, description = null, color = null) {
    return this.newRow('markers', {lat, lng, name, url, description, color, mapId})
  }

  newMap(name, url = null, description = null, themeId = 1) {
    return this.newRow('maps', {name, url, description, themeId})
  }

  newTheme(name, theme) {
    return this.newRow('themes', {name, theme})
  }

  updateRow(id, table, args) {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE ${table} SET `
      const values = [];
      
      for (let key in args) {
        queryString += `${key} = ?, `
        values.push(args[key])
      }
      queryString = queryString.slice(0, -2)
      queryString += ' WHERE id = ?'
  
      this.connection.query(queryString, [...values, id], (error, result, fields) => {
          if (error) {
            return reject(error)
          }
          resolve(result)
        }
      )
    })
  }

  updateMap(mapId, args) {
    return this.updateRow(mapId, 'maps', args)
  }

  updateMarker(markerId, args) {
    return this.updateRow(markerId, 'markers', args)
  }

  updateTheme(themeId, args) {
    return this.updateRow(themeId, 'themes', args)
  }



  deleteRow(id, table) {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM ${table} WHERE id = ?;`
      this.connection.query(queryString, id, (error, results, fields) => {
          if (error) {reject(error)}
          else resolve(results)
        }
      )
    })
  }

  
  deleteMap(mapId) {
    return this.deleteRow(mapId, 'maps')
  }
  
  deleteMarker(markerId) {
    return this.deleteRow(markerId, 'markers')
  }

  deleteTheme(themeId) {
    return this.deleteRow(themeId, 'themes')
  }


  
  getRow(id, table) {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM ${table} WHERE id = ?;`
      this.connection.query(queryString, id, (error, results, fields) => {
        if (error) {
          return reject(error)
        }

        if (results.length == 0) {
          return reject({'error': 'data not found'})
        }

        resolve(results)
      })
    })
  }

  getMap(mapId) {
    return this.getRow(mapId, 'maps')
  }

  getMarker(markerId) {
    return this.getRow(markerId, 'markers')
  }

  getTheme(themeId) {
    return this.getRow(themeId, 'themes')
  }

  getMarkersFromMap(mapId) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM markers WHERE map_id = ?`

      this.connection.query(queryString, mapId, (error, rows, fields) => {
        if (error) {
          return reject(error);
        }

        resolve(rows);
      });
    });
  }

  printTables() {
    this.connection.query(`SELECT * FROM maps`,
      function (error, results, fields) {
      if (error) throw error;
      results.forEach(el => console.log(el))
    });
  }

  destroy() {
    this.connection.end();
  }
}


module.exports = database