const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    registerValidate
} = require('../helper/validation');


exports.register = async (req, res, next) => {

    // check username there or not
    Admin.findByUsername(req.body.username, async (err, data) => {
        if (data) {
            res.status(400).send('Username was Found!')
        } else {
            // run validation
            const {
                error
            } = registerValidate(req.body)
            if (error) return res.status(400).send(error.details[0].message);
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            const user = new Admin({
                username: req.body.username,
                password: hashPassword
            })

            Admin.register(user, (err, data) => {
                if (err)
                    res.status(400).send({
                        message: err.message || "Some error occured while creating the user"
                    })
                else
                    res.status(201).send({
                        status_code: 201,
                        status_message: 'Success create new User',
                        data: data
                    })
            })
        }
    })

}

// login before use api
exports.login = async (req, res) => {
    Admin.findByUsername(req.body.username, async (err, data) => {
        if (data) {
            const validPass = await bcrypt.compare(req.body.password, data.password) 
            if (!validPass) return res.status(400).send('Invalid Password') //checking password

            const token = jwt.sign({
                id: data.id
            }, process.env.TOKEN_SECRET,{
                expiresIn: '1d' //expiry in 1 day
            })

            res.header('auth-token', token) //response header
            res.json({
                'status_code': 200,
                'message': 'success login',
                'token': token
            }, 200)
        }
    })
}