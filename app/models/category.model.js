const sql = require('../config/db');

const Category = function (category) {
    this.name = category.name
};

Category.create = (newCategory, result) => {
    sql.query('INSERT INTO category SET ?', newCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log('created customer: ', {
            id: res.insertId,
            ...newCategory
        });
        result(null, {
            id: res.insertId,
            ...newCategory
        });
    })
};

Category.getAll = result => {
    sql.query('SELECT * FROM category', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return
        }

        console.log("customer: ", res);
        result(null, res);
    })
}

Category.findById = (categoryId, result) => {
    sql.query(`SELECT * FROM category WHERE id =${categoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    })
}

Category.updatedById = (id, category, result) => {
    sql.query(
        `UPDATE category SET name = ?,`, [category.name], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                result({
                    kind: 'not_found'
                }, null);
                return;
            }

            console.log('updated category: ', {
                id: id,
                ...category
            })
        }
    )
}

Category.remove = (id, result) => {
    sql.query(`DELETE FROM category WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({
                kind: 'not_found'
            }, null);
            return;
        }

        console.log('Deleted Category with id: ', id);
        result(null, res);
    })
}

module.exports = Category;