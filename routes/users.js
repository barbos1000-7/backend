var express = require('express');
var router = express.Router();
let db = require('../database')
const bcrypt = require("bcryptjs");
console.log(db)
/* GET users listing. */
router.get('/users', function (req, res, next) {
    const sql = 'select * from users'
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.json(err.message)
        }
        res.json({"Message": "suca", data: rows})
    })
});

module.exports = router;
