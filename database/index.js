const sqlite3 = require('sqlite3').verbose()
const path = require('path');

const DBSOURCE = path.join(__dirname, 'db.sqlite')
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log('Coerrrororororororororoororororororororororororororororororororoorororororororororororoororororor.')
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`Create table if not exists users (
            id  INTEGER PRIMARY KEY AUTOINCREMENT,
            nickname text UNIQUE, 
            img text,
            password text, 
            code integer,
            mail text,
            mailAuth text, 
            time text,
            CONSTRAINT nickname_unique UNIQUE (nickname)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                } else {
                    // Table just created, creating some rows
                    const insert = 'INSERT or IGNORE INTO users (nickname, img, password, mail) VALUES (?,?,?,?)'
                    // db.run(insert, ["admin","https://i.pinimg.com/736x/ef/84/33/ef8433606891928ab88136a23ade1553.jpg", '1234', 'awermin@mail.ru'])
                    // db.run(insert, ["user","https://i.pinimg.com/736x/ef/84/33/ef8433606891928ab88136a23ade1553.jpg",md5("user123456")])
                }
            });
        db.run(`Create table if not exists quests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            title text,
            body text,
          	time    TEXT    NOT NULL,
           	user_id INTEGER NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id))`
            ,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                } else {
                    const insert = 'INSERT or IGNORE INTO quests (subject, title, time, body, user_id) VALUES (?,?,?,?,?)'
                    // db.run(insert, [1, 'cосу член', '2023-11-23T13:51:50+07:00', 'ХВАВВВВВВВВВВВВВВВВВВВВВВВ',  1])
                    // db.run(insert, [1, 'cосу член', '2022-01-26T13:51:50+07:00', 'ХВАВВВВВВВВВВВВВВВВВВВВВВВ', 1])
                }
            }
        )
        db.run(`Create table if not exists answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content text,
          	time    TEXT    NOT NULL,
           	user_id INTEGER NOT NULL,
           	quest_id INTEGER NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id),
         FOREIGN KEY (quest_id) REFERENCES quests(id))`
            ,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                } else {
                    const insert = 'INSERT or IGNORE INTO answers (content, time, user_id, quest_id) VALUES (?,?,?,?)'
                }
            }
        )
        db.run(`Create table if not exists likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
           	users_id INTEGER NOT NULL ,
           	quests_id INTEGER NOT NULL,
         FOREIGN KEY (users_id) REFERENCES users(id),
         FOREIGN KEY (quests_id) REFERENCES quests(id))`
            ,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                } else {
                    const insert = 'INSERT or IGNORE INTO likes (users_id, quests_id) VALUES (?,?)'
                    // db.run(insert, [1, 1])
                }
            }
        )
    }
});


module.exports = db