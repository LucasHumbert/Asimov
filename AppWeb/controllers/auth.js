const jwt = require("jsonwebtoken");
const db = require('../models/database');

exports.login = async (req, res) => {
    
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).render('index',{
            message: 'Login ou mot de passe absent'
        });
    }

    db.query('SELECT * FROM user WHERE user_id = ?', [username], async (error, results) => {
        console.log(results)
        if(!results || password != results[0].user_mdp){
            res.status(401).render('index',{
                message: 'Login ou mot de passe incorrect'
            })
        } else {
            const id = results[0].user_id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            console.log("The token is: " +token);

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect("/accueil");
        }
    });

}