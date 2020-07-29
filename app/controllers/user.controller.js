const User = require('../models/user.model');
const {
    registerUserValidate,
    loginUserValidate
} = require('../helper/validation');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {
    sendMail
} = require('../helper/send_email');


exports.register = async (req, res) => {

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const token = crypto.randomBytes(100).toString('hex');
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
        status: 0,
        remember_token: token
    })

    // run validation
    const {
        error
    } = registerUserValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // checking username there or not
    User.findUserName(req.body.username, (err, data) => {
        if (data) {
            res.status(400).send('Username was Found!')
        } else {
            // checking email
            User.findUserEmail(req.body.email, (err, data) => {
                if (data) {
                    res.status(400).send('Email was Found!')
                } else {
                    // checking phone
                    User.findUserPhone(req.body.phone, (err, data) => {
                        if (data) {
                            res.status(400).send('Phone was Found!')
                        } else {
                            User.create(user, (err, data) => {
                                if (err)
                                    res.status(400).send({
                                        message: err.message || "Some error occured while creating the user"
                                    })
                                else
                                    res.json({
                                        status_code: 201,
                                        message: 'Success create new User',
                                        data: data
                                    })
                                sendMail(data.remember_token, data)
                            })
                        }
                    })
                }
            })
        }
    })

}

exports.findTokenUser = async (req, res) => {
    User.findToken(req.params.token, (err, data) => {
        if (data) {
            res.json({
                status_code: 200,
                message: 'Token is valid!',
            })
            User.updateStatus(req.params.token)
        } else {
            res.status(404).send({
                status_code: 404,
                message: 'Token invalid!'
            })
        }
    })
}

exports.login = async (req, res) => {

    // validation
    const {
        error
    } = loginUserValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    User.findUserEmail(req.body.email, async (err, data) => {
        if (data) {
            const validPass = await bcrypt.compare(req.body.password, data.password)
            if (!validPass) return res.status(400).send('Password inCorrect')

            res.json({
                'status_code': 200,
                'message': 'Login Success',
                'data': data
            })
        } else {
            return res.status(400).send('Email inCorrect')
        }
    })
}