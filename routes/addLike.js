const express = require('express');
const router = express.Router();

let db = require('../database')
const AuthMiddlle = require("../middleware/authMiddleware");

router.get("/like/:ID", AuthMiddlle, async (req, res) => {
    try {
        const quest = req.params.ID
        const user = req.user.id
        const insert = 'INSERT or IGNORE INTO likes (users_id, quests_id) VALUES (?,?)'
        await db.run(insert, [user, quest])

        return res.json({"message": "лайки add отправлен"})


    } catch (e) {
        res.status(400).json({"message": 'Ошибка мтавления лайка на постикккккккккккккккккккк!!', e})
    }

});

module.exports = router;
