const db = require('../../dbConnection');
const crypto = require('crypto');

// Handles main viewing of createAccount page
exports.view = (req, res) => {
    res.render('createAccount', {message: ""});
};

// Handles how application reacts to attempt to create account
exports.createAccount = async (req, res) => {
    const {Username, Password} =  req.body;
    // Checks if username doesn't already exist
    db.promise().query(`SELECT username FROM Users WHERE username='${Username}'`).then(([rows3]) => {
        if(rows3.length == 0){
            var newPassword = encrypt(Password);
            // Creates account in Users database table
            db.promise().query(`INSERT INTO Users (username, password) VALUES ('${Username}', '${newPassword}')`);
            res.render('createAccount', {message: "Account Created"})
        }
        else{
            res.render('createAccount', {message: "Unexpected error occurred, please try again"})
        }
    })
}

// Encrypts password with MD5 hash
encrypt = (Password) => {
    Password = crypto.createHash('md5').update(Password).digest('hex');
    return Password;
}