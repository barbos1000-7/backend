const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require('../../middleware/authMiddleware')


router.get('/mail/:userMail', AuthMiddlle, function (req, res, next) {
    const sql = 'select mail from users ' +
        'where mail = ?'
    const params = [req.params.userMail.toLowerCase()]

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.json(err.message)
            return
        }
        if (rows[0]) {
            return res.status(403).json({"message": "Эта почта уже используется"})
        }
        res.json({
            "message": ``,
        })
    });

})

module.exports = router;
