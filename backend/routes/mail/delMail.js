const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require('../../middleware/authMiddleware')


router.get('/delMail', AuthMiddlle, function (req, res, next) {
    const sql = 'select * from users ' +
        'where id = ?'
    const params = [req.user.id]
    db.all(sql, params, (err, rows) => {
        const del = 'UPDATE users ' +
            'SET mail = ?, code = ?, mailAuth = ? ' +
            'where id = ?'
        db.run(del, [null, null, null, req.user.id])
        res.json({
            "message": ``,
        })
    });
})

module.exports = router;
