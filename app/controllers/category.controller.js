const Category = require('../models/category.model');

exports.create = (req, res) => {

    const category = new Category({
        name: req.body.name
    })

    Category.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the category"
            })
        else
            res.json({
                status_code: 201,
                status_message: 'Success create new category',
                data: data
            })
    })

}

exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the category"
            })
        else
            res.send({
                status_code: 200,
                status_message: 'Succes retrive category',
                data: data
            })
    })
}

exports.findById = (req, res) => {
    Category.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    status_code: 404,
                    message: `Not Found Category with Id ${req.params.id}`
                })
            else
                res.status(500).send({
                    message: `Error retriving Category with Id ${req.params.id}`
                })
        } else
            res.status(200).send({
                status_code: 200,
                status_message: `Success retrieving data`,
                data: data
            })
    })
}