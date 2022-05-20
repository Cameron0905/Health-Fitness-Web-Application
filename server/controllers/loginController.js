const db = require('../../dbConnection');
const session = require('express-session');
const crypto = require('crypto');

// Handles main viewing of login page
exports.view = (req, res) => {
    res.render('login', {message: ""});
};

// Handles how application reacts to login attempt
exports.loginAttempt = (req, res) => {
    const {Username, Password} =  req.body;
    var newPassword = encrypt(Password);
    // Checks if user exists
    db.promise().query("SELECT * FROM Users WHERE username = '" + Username + "'AND password= '" + newPassword + "'").then(([rows]) => {
        if(rows.length>0){
            // Deletes session variables as possible new user signed in
            delete session.userID;
            delete session.infoMessage;
            // Sets userID session variable to userID in Users database table
            session.userID=rows[0].userID
            res.redirect('/user');
        }
        else{
            res.render('login', {message: "Username or password does not exist"});
        }
    })
}

// Encrypts password with MD5 hash
encrypt = (Password) => {
    Password = crypto.createHash('md5').update(Password).digest('hex');
    return Password;
}