const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require("../../middleware/authMiddleware");

router.post("/answer", AuthMiddlle, (req, res) => {
    try {
        const {content, quest_id, time} = req.body
        const id = req.user.id
        console.log(id, 123)
        const insert = 'INSERT or IGNORE INTO answers (content, time, user_id, quest_id) VALUES (?,?,?,?)'
        db.run(insert, [content, time, id, quest_id])
        return res.json({"message": "Ответ отправлен"})
    } catch (e) {
        res.status(400).json({"message": 'Ошибка отправки ответа на вопрос!!', e})
    }

});

module.exports = router;
