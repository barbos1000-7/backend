const express = require('express');
const router = express.Router();

let db = require('../database')
const AuthMiddlle = require("../middleware/authMiddleware");

router.get("/delLike/:ID", AuthMiddlle, (req, res) => {
    try {
        const quest = [req.params.ID]
        const user = req.user.id
        console.log(user, quest[0])

        const del = 'delete from likes ' +
            'where quests_id = ? and users_id = ? '
        db.run(del, [quest[0], user])
        res.json({
            "message": `likeee удален`,
        })

    } catch
        (e) {
        res.status(400).json({"message": 'Ошибка удаления лайка на постикккккккккккккккккккк!!', e})
    }

})
;

module.exports = router;
