const express = require('express');
const router = express.Router();

/* GET home page. */
let db = require('../database')


router.get('/user/:ID', (req, res, next) => {
    let sql = "select users.id as id, users.img as img, users.nickname as nickname from users " +
        "where users.id = ? "
    const params = [req.params.ID]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (!rows[0]) {
            res.status(400).json({"message": 'Пользователь не найден'})
            return
        }
        res.json({"message": 'Okay', "data": rows[0]})
    });
});

module.exports = router;
