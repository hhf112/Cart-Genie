const { Client } = require("pg");

require('dotenv').config();
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

const pg = new Client(dbConfig);

pg
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");


    pg.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.error("Error executing query", err);
      } else {
        console.log("Query result:", result.rows);
      }

      // Close the connection when done
      pg
        .end()
        .then(() => {
          console.log("Connection to PostgreSQL closed");
        })
        .catch((err) => {
          console.error("Error closing connection", err);
        });
    });
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

module.exports = pg;
