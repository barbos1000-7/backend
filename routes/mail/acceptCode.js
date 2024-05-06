const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require('../../middleware/authMiddleware')


router.get('/accept/:code', AuthMiddlle, function (req, res, next) {
    const sql = 'select code from users ' +
        'where id = ?'
    const params = [req.user.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.json(err.message)
            return
        }
        if (!rows[0].code) {
            console.log(rows[0])
            return res.status(403).json({"message": "Отправьте код еще раз"})
        } else if (rows[0].code == req.params.code) {
            const accept = 'UPDATE users ' +
                'SET mailAuth = ?' +
                'where id = ?'
            db.run(accept, ['true', req.user.id])
            res.json({"message": "Вы подтвердили свою почту"})
            return
        }
        res.status(400).json({
            "message": `код введен неверно`,
        })
    });
})

module.exports = router;
