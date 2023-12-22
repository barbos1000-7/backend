const express = require('express');
const router = express.Router();
const sendMail = require('../mail/SendMail')

let db = require('../database')
const AuthMiddlle = require('../middleware/authMiddleware')


router.get('/user', AuthMiddlle, function (req, res, next) {

    const sql = 'select * from users ' +
        'where users.id = ?'
    const params = [req.user.id]
    // ivanchina.anna07@mail.ru
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.json(err.message)
        }
        if (!rows[0]) {
            res.status(400).json({"message": "Недействительный токен"})
            return
        }
        setTimeout(() => {
            res.json({"Message": "suca", user: rows[0]})
        }, 500)
    })
});

module.exports = router;
