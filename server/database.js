const mysql = require('mysql');
const hashids = require('hashids')

class database{
  constructor() {
    this.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'lsmapszsqox',
      database : 'lsmaps'
    });

    this.hashid = new hashids('lsmaps', 8)
  
    this.connection.connect();
    this.createTables();
    this.initializeDefaultTheme();
    
    
  }

  createTables() {
    const queryStrings = [
      `CREATE TABLE IF NOT EXISTS themes (
        id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        theme JSON
      )`,

      `CREATE TABLE IF NOT EXISTS maps (
        id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        url VARCHAR(20),
        description VARCHAR(200),
        theme_id MEDIUMINT DEFAULT 1,
        CONSTRAINT FOREIGN KEY (theme_id) REFERENCES themes(id)
      )`,

      `CREATE TABLE IF NOT EXISTS markers (
        id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
        lat FLOAT(10,2) NOT NULL,
        lng FLOAT(10,2) NOT NULL,
        name VARCHAR(20) NOT NULL,
        url VARCHAR(20),
        description VARCHAR(200),
        color VARCHAR(6),
        map_id MEDIUMINT,
        CONSTRAINT FOREIGN KEY (map_id) REFERENCES maps(id) ON DELETE CASCADE
      )`,

    ]

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

  newMarker(mapId, lat, long, name = "anonymous", url = null, description = null, color = null) {
    return this.newRow('markers', {lat, long, name, url, description, color, mapId})
  }

  newMap(name, url = null, description = null, themeId = 1) {
    return this.newRow('maps', {name, url, description, themeId})
  }

  newTheme(name, theme) {
    return this.newRow('themes', {name, theme})
  }

  updateMap(mapId, args) {
    return this.updateRow(mapId, 'maps', args)
  }

  updateMarker(markerId, args) {
    return this.updateRow(markerId, 'markers', args)
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

  printTables() {
    this.connection.query(`SELECT * FROM maps`,
      function (error, results, fields) {
      if (error) throw error;
      results.forEach(el => console.log(el))
    });
  }

  getMap(mapId) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM maps WHERE id = ?`

      this.connection.query(queryString, mapId, (error, rows, fields) => {
        if (error) {
          return reject(error)
        }

        if (rows.length == 0) {
          return reject({'error': 'map not found'})
        }

        resolve(rows)
      })
    })
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



  destroy() {
    this.connection.end();
  }
}


module.exports = database