const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const Kolbasaouter = require('./routes/kolbasa');
const questsListRouter = require('./routes/quests/list');
const questsIdRouter = require('./routes/quests/[id]');
const addQuest = require('./routes/quests/addQuest')
const registerRouter = require('./routes/auth/register')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/auth/auth')
const UserRouter = require("./routes/user")
const answerRouter = require('./routes/quests/postAnswer')
const mailRouter = require('./routes/mail/sendMail')
const codeRouter = require('./routes/mail/sendCode')
const acceptRouter = require('./routes/mail/acceptCode')
const delMailRouter = require('./routes/mail/delMail')
const uploadAva = require('./routes/auth/uploadAvatar')
const deletAva = require('./routes/auth/deleteAva')
const userByIdRouter = require('./routes/userBiId')
const addLike = require('./routes/addLike')
const delLike = require('./routes/delLike')
const personal = require('./routes/personal')
const deleteQuest = require('./routes/quests/deletQuest')
const search = require('./routes/quests/search')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '\\' + 'static')));


app.use(fileUpload({}))


app.use(loginRouter)
app.use(registerRouter)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kilbasa', Kolbasaouter)
app.use('/quests/list', questsListRouter)
app.use(questsIdRouter)
app.use(addQuest)
app.use(usersRouter)
app.use(UserRouter)
app.use(answerRouter)
app.use(mailRouter)
app.use(codeRouter)
app.use(acceptRouter)
app.use(delMailRouter)
app.use(uploadAva)
app.use(deletAva)
app.use(userByIdRouter)
app.use(addLike)
app.use(delLike)
app.use(personal)
app.use(deleteQuest)
app.use(search)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// app.use(express.static(__dirname + 'static'))

// error handler
app.use(function (err, req, res, next) {
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


app.use(cors(corsOptions)) // Use this after the variable declaration

module.exports = app;
