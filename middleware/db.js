
const express = require('express');
const mysql = require('mysql');


// database connection and query promisify
var conn = mysql.createPool({
    host     : 'localhost',
    user     : 'interbrinksuser',
    password : '8Fsnt9?W3Wt3zahiy',
    database : 'admin_interbrinks',
    connectionLimit : 100
  });


const mySqlQury =(qry)=>{
    return new Promise((resolve, reject)=>{
        conn.query(qry, (err, row)=>{
            if (err) return reject(err);
            resolve(row)
        })
    }) 
}

  
module.exports = {conn, mySqlQury}