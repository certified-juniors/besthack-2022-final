const User = require('../models/User');
const { db } = require('../fbapi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { secret } = require("../config");
const { push, set, ref, get, child, equalTo, query } = require('firebase/database');

class UserController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const { email, login, password } = req.body;
            console.log(login);
            const candidate = (await get(child(ref(db), 'users/' + login))).val();
            const candidateMail = (await get(query(ref(db, 'regedMails'), equalTo(email)))).val();
            console.log(candidateMail);
            if (candidate || candidateMail) {
                return res.status(400).json({ message: "Пользователь с таким именем или электронной почтой уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User(login, email, hashPassword, new Date().getTime(), User.ROLE.CLIENT);
            await push(ref(db, 'regedMails'), email);
            await set(ref(db, 'users/' + login), user);
            res.status(200).json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` })
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController();