CREATE TABLE IF NOT EXISTS themes (
  id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  theme JSON
);
CREATE TABLE IF NOT EXISTS maps (
  id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  url VARCHAR(20),
  description VARCHAR(200),
  theme_id MEDIUMINT DEFAULT 1,
  CONSTRAINT FOREIGN KEY (theme_id) REFERENCES themes(id)
);
CREATE TABLE IF NOT EXISTS markers (
  id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
  lat FLOAT(10,2) NOT NULL,
  lng FLOAT(10,2) NOT NULL,
  name VARCHAR(20) NOT NULL,
  url VARCHAR(20),
  description VARCHAR(200),
  color VARCHAR(6),
  map_id MEDIUMINT,
  CONSTRAINT FOREIGN KEY (map_id) REFERENCES maps(id) ON DELETE CASCADE
);