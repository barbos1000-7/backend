const express = require('express');
const router = express.Router();
const Uuid = require('uuid');
const authMiddle = require('../../middleware/authMiddleware');
const {staticPath} = require('../../config.js')

let db = require('../../database')

router.post("/upload", authMiddle, (req, res) => {
    try {
        const file = req.files.file
        const avatarName = Uuid.v4() + '.jpg'
        file.mv(staticPath + '\\' + avatarName)
        // const params = []
        // const sql = ''
        // db.all(sql, params, (err, rows) => {
        //     if (err) {
        //         res.status(404).json(err.message)
        //         return
        //     }
        const avatarAdd = 'UPDATE users ' +
            'SET img = ? ' +
            'where id = ?'
        db.run(avatarAdd, [avatarName, req.user.id])
        res.json({"message": 'Вы успешно загрузили аватарку'})
        // });
    } catch (e) {
        res.status(400).json({"message": 'ошибка загрузки авыыыыыыыыыыыыыыыыыы', e})
    }

});

module.exports = router;
