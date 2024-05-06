const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {body} = require("express-validator");
const {validationResult} = require("express-validator");

let db = require('../../database')

router.post("/register", body('nickname').notEmpty(), body('password').isLength({min: 4, max: 10}), (req, res) => {
    try {
        const er = validationResult(req)
        if (!er.isEmpty()) {
            return res.status(400).json({message: 'Ршибка при регистрации', er})
        }
        const {nickname, password, gender} = req.body
        const params = [nickname]
        const sql = 'select nickname, password from users ' +
            'where nickname = ?'
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.json(err.message)
                return
            }
            if (!rows[0]) {
                let img = Math.floor(Math.random() * 11) + '.jpg';
                const insert = 'INSERT or IGNORE INTO users (nickname, img, password, time) VALUES (?,?,?,?)'
                const hash = bcrypt.hashSync(password, 7)
                db.run(insert, [nickname, img, hash, Date()])
                return res.json({"message": "Пользователь зареган"})
            }
            res.status(403).json({
                "message": `Юзер с именем ${nickname} уже регистер`
            })
        });
    } catch (e) {
        res.status(400).json({"message": 'Ошибка регистрации', e})
    }

});

module.exports = router;
