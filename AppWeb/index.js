const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");

dotenv.config({ path: './config.env' });

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))
app.set('view engine', 'ejs');


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

//Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log("Serveur lancé sur le port 3000");
});