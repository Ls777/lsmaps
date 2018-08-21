const mysql = require('mysql');
const hashids = require('hashids')
const hashid = new hashids('lsmaps', 8)

class database{
  constructor() {
    this.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'lsmapszsqox',
      database : 'lsmaps'
    });
  
    this.connection.connect();
    this.createTables();
    this.newTheme('default', `{"theme": "yes"}`)
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

  newRow(table, args) {
    let queryString = `INSERT INTO ${table} VALUES (`
    const values = [null]

    for (let key in args) {
      queryString += `?, `
      values.push(args[key])
    }

    queryString += '?)'

    this.connection.query(queryString, values, (error, results, fields) => {
        if (error) throw error;
        console.log(`update row ${table}: `, results[0]);
      }
    )
  }

  updateRow(id, table, args) {
    let queryString = `UPDATE ${table} SET `
    const values = [];
    
    for (let key in args) {
      queryString += `${key} = ?, `
      values.push(args[key])
    }
    queryString = queryString.slice(0, -2)
    queryString += ' WHERE id = ?'

    this.connection.query(queryString, [...values, id], (error, results, fields) => {
        if (error) throw error;
        console.log(`update row ${table}: `, results[0]);
      }
    )
  }

  newMarker(mapID, lat, long, name = "anonymous", url = null, description = null, color = null) {
    this.newRow('markers', {lat, long, name, url, description, color, mapID})
  }

  newMap(name, url = null, description = null, themeId = 1) {
    this.newRow('maps', {name, url, description, themeId})
  }

  newTheme(name, theme) {
    this.newRow('themes', {name, theme})
  }

  updateMap(mapID, args) {
    this.updateRow(mapID, 'maps', args)
  }

  updateMarker(markerID, args) {
    this.updateRow(markerID, 'markers', args)
  }

  deleteRow(id, table) {
    let queryString = `DELETE FROM ${table} WHERE id = ?;`
    this.connection.query(queryString, id, (error, results, fields) => {
        if (error) throw error;
        console.log('bby map bby: ', results[0]);
      }
    )
  }

  deleteMap(mapID) {
    this.deleteRow(mapID, 'maps')
  }

  deleteMarker(markerID) {
    this.deleteRow(markerID, 'markers')
  }

  printTables() {
    this.connection.query(`SELECT * FROM maps`,
      function (error, results, fields) {
      if (error) throw error;
      results.forEach(el => console.log(el))
    });
  }

  getMap(mapID) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM maps WHERE id = ?`

      this.connection.query(queryString, mapID, (err, rows, fields) => {
        if (err) {
          return reject(err)
        }

        resolve(rows)
      })
    })
  }

  getMarkersFromMap(mapID) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM markers WHERE map_id = ?`

      this.connection.query(queryString, mapID, (err, rows, fields) => {
        if (err) {
            return reject(err);
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