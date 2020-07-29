const sql = require('../config/db');

// constructur
const Admin = function (user) {
    this.username = user.username
    this.password = user.password
}

// register
Admin.register = (newUser, result) => {
    sql.query(`INSERT INTO admin SET ?`, newUser, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('created user: ', {
            id: res.insertId,
            ...newUser
        })

        result(null, {
            id: res.insertId,
            ...newUser
        })
    })
}

// find by username
Admin.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM admin WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found admin: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    })
}

module.exports = Admin