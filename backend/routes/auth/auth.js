const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const jwt = require("jsonwebtoken")
const {secret} = require("../../../config")
let db = require('../../database')
const bcrypt = require("bcryptjs");

const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

router.post("/login", body('nickname').notEmpty(), body('password').isLength({min: 4, max: 10}), (req, res) => {
    try {
        const {nickname, password} = req.body
        const params = [nickname]
        const sql = 'select nickname, password, id, img from users ' +
            'where nickname = ?'
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.json(err.message)
                return
            }
            if (!rows[0]) {
                res.status(400).json({"message": "такой пользователь не найден"})
                return
            }
            const validPass = bcrypt.compareSync(password, rows[0].password)
            if (!validPass) {
                res.status(405).json("Введен неправильеый пароль")
                return
            }
            const token = generateAccessToken(rows[0].id)
            return res.json({token});
        });
    } catch (e) {
        res.json({"message": 'Ошибка регистрации', e})
    }

});

module.exports = router;
