var mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect( (error) => {
    if(error){
        console.log(error);
    } else {
        console.log("Connexion avec la base effectué");
    }
})

module.exports = db;