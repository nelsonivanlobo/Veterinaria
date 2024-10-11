const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "veterinariaBD",
  });
  
  const queryDatabase = (query, values)=>{
    return new Promise((resolve,reject)=>{
        console.log(query,values)
        connection.query(query, values,(error, rows)=>{
            if (error) {
                reject(error);
            } else {
                resolve(rows);
                console.log("Respuesta base de datos --->",rows);
            }
        });
    });
};





const consultaTodosDatabase = (query)=>{
    return new Promise((resolve,reject)=>{
        console.log(query)
        connection.query(query,(error, rows)=>{
            if (error) {
                reject(error);
            } else {
                resolve(rows);
                console.log("Respuesta base de datos --->",rows);
            }
        });
    });
};


  
  module.exports ={connection,queryDatabase,consultaTodosDatabase}