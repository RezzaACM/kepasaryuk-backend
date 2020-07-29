const sql = require('../config/db');

const User = function (user) {
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.country = user.country;
    this.province = user.province;
    this.city = user.city;
    this.postal_code = user.postal_code;
    this.detail_address = user.detail_address;
    this.status = user.status;
    this.profile = user.profile;
    this.remember_token = user.remember_token;
    this.otp_code = user.otp_code;
    this.updated_at = user.updated_at;
}

User.create = (newUser, result) => {
    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
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

// find username
User.findUserName = (username, result) => {
    sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("result: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);

    })
}

// find email user
User.findUserEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("result: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    })
}

// find user phone
User.findUserPhone = (phone, result) => {
    sql.query(`SELECT * FROM users WHERE phone = '${phone}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("result: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    })
}

User.findToken = (token, result) => {
    sql.query(`SELECT * FROM users WHERE remember_token = '${token}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("result: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    })
}

User.updateStatus = (token) => {
    let query = `UPDATE users SET status = '1' WHERE remember_token = '${token}' `;
    sql.query(query, (err, result) => {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    })
}

module.exports = User