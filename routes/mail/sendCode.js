const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require('../../middleware/authMiddleware')
const sendMail = require("../../mail/SendMail");


router.get('/code/:userMail', AuthMiddlle, function (req, res, next) {
    const sql = 'select mailAuth from users ' +
        'where id = ?'
    const params = [req.user.id]
    setTimeout(() => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.json(err.message)
                return
            }
            if (rows[0].mailAuth) {
                return res.status(403).json({"message": "Эта почта уже используется"})
            }
            const code = Math.floor(100000 + Math.random() * (999999 + 1 - 100000))
            const codeUpd = 'UPDATE users ' +
                'SET code = ?, mail = ? ' +
                'where id = ?'
            db.run(codeUpd, [code, req.params.userMail, req.user.id])
            sendMail(req.params.userMail, code).then()
            res.json({
                "message": `код отправлен`,
            })
        });
    }, 700)
})

module.exports = router;
