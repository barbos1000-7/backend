const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const indexRouter = require('../routes');
const Kolbasaouter = require('../routes/kolbasa');
const questsListRouter = require('../routes/quests/list');
const questsIdRouter = require('../routes/quests/[id]');
const addQuest = require('../routes/quests/addQuest')
const registerRouter = require('../routes/auth/register')
const usersRouter = require('../routes/users')
const loginRouter = require('../routes/auth/auth')
const UserRouter = require("../routes/user")
const answerRouter = require('../routes/quests/postAnswer')
const mailRouter = require('../routes/mail/sendMail')
const codeRouter = require('../routes/mail/sendCode')
const acceptRouter = require('../routes/mail/acceptCode')
const delMailRouter = require('../routes/mail/delMail')
const uploadAva = require('../routes/auth/uploadAvatar')
const deletAva = require('../routes/auth/deleteAva')
const userByIdRouter = require('../routes/userBiId')
const addLike = require('../routes/addLike')
const delLike = require('../routes/delLike')
const personal = require('../routes/personal')
const deleteQuest = require('../routes/quests/deletQuest')
const search = require('../routes/quests/search')


const index = express();

// view engine setup
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'pug');

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({extended: false}));
index.use(cookieParser());
index.use(express.static(path.join(__dirname + '\\' + 'static')));


index.use(fileUpload({}))


index.use(loginRouter)
index.use(registerRouter)
index.use('/', indexRouter);
index.use('/users', usersRouter);
index.use('/kilbasa', Kolbasaouter)
index.use('/quests/list', questsListRouter)
index.use(questsIdRouter)
index.use(addQuest)
index.use(usersRouter)
index.use(UserRouter)
index.use(answerRouter)
index.use(mailRouter)
index.use(codeRouter)
index.use(acceptRouter)
index.use(delMailRouter)
index.use(uploadAva)
index.use(deletAva)
index.use(userByIdRouter)
index.use(addLike)
index.use(delLike)
index.use(personal)
index.use(deleteQuest)
index.use(search)


// catch 404 and forward to error handler
index.use(function (req, res, next) {
    next(createError(404));
});
// index.use(express.static(__dirname + 'static'))

// error handler
index.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
const corsOptions = {
    origin: 'http://localhost:3001/',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


index.use(cors(corsOptions)) // Use this after the variable declaration
index.listen(3000, () => console.log('Server ready on port 3000.'));
module.exports = index;