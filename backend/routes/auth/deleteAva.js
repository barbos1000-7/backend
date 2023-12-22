const express = require('express');
const router = express.Router();
const authMiddle = require('../../middleware/authMiddleware');
const {staticPath} = require('../../../config')
const fs = require('fs')


let db = require('../../database')

router.get("/delete", authMiddle, (req, res) => {
    try {
        const params = [req.user.id]
        const sql = 'select img from users ' +
            'where id = ?'
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(404).json(err.message)
                return
            }
            try {
                fs.unlinkSync(staticPath + '\\' + rows[0].img)
            } catch (e) {
                console.log(e)
            }
            const avatarAdd = 'UPDATE users ' +
                'SET img = "default.jpg"' +
                'where id = ?'
            db.run(avatarAdd, [req.user.id])
            res.json({'message': "Аватарка delete"})
        })
    } catch (e) {
        res.status(400).json({"message": 'Ошибка регистрации', e})
    }

});

module.exports = router;
