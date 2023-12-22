const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require("../../middleware/authMiddleware");

router.post("/quest", AuthMiddlle, (req, res) => {
    try {
        const {subject, title, body, time} = req.body
        const id = req.user.id
        const insert = 'INSERT or IGNORE INTO quests (subject, title, body, time, user_id) VALUES (?,?,?,?,?)'
        db.run(insert, [subject, title, body, time, id])
        setTimeout(() => {
            return res.json({"message": "Вопрос отправлен"})
        }, 1000)

    } catch (e) {
        res.status(400).json({"message": 'Ошибка отправки ответа на вопрос!!', e})
    }

});

module.exports = router;
