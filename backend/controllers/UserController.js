const User = require('../models/User');
const { db } = require('../fbapi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { validationResult } = require('express-validator')
const { secret } = require("../config");
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue } = require('firebase/database');
const { logRegister, logLogin } = require('./EntryController');

class UserController {
    async register(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.send({ message: "Ошибка при регистрации", errors })
            }

            console.log(req.query);
            const { email, login, password } = req.query;
            const candidate = (await get(child(ref(db), 'users/' + login))).val();
            if (candidate) {
                return res.send({ message: "Пользователь с таким именем уже существует" })
            }
            const hashed_email = md5(email);
            const candidateByEmail = (await get(child(ref(db), "loginbyemail/" + hashed_email))).val();
            if (candidateByEmail) {
                return res.send({ message: "Пользователь с такой почтой уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User(login, email, hashPassword, new Date().getTime(), User.ROLE.CLIENT);
            await set(ref(db, "loginbyemail/" + hashed_email), login);
            await set(ref(db, 'users/' + login), user);
            logRegister(user, req);
            res.send({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.log(e)
            res.send({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try {
            const { loginOrEmail, password } = req.query;
            const isLogin = loginOrEmail.indexOf('@') === -1;
            let login;
            if (!isLogin) {
                const hashed_email = md5(loginOrEmail);
                login = (await get(child(ref(db), "loginbyemail/" + hashed_email))).val();
                if (!login) return res.status(400).json({ message: "Пользователь с такой почтой не зарегистрирован" })
            } else {
                login = loginOrEmail;
            }
            const user = (await get(child(ref(db), 'users/' + login))).val();
            if (!user) return res.status(400).json({ message: "Пользователь с таким именем не зарегистрирован" })
            if (user.blocked) return res.status(400).json({ message: "Пользователь заблокирован" });
            const isPasswordValid = bcrypt.compareSync(password, user.hashed_password);
            if (!isPasswordValid) { 
                set(ref(db, 'users/' + login), { tries: user.tries + 1 });
                if (user.tries > 5) {
                    set(ref(db, 'users/' + login), { blocked: true });
                    return res.status(400).json({ message: "Пользователь заблокирован" });
                }
                return res.status(400).json({ message: "Неверный пароль" })
            }
            const token = jwt.sign({ login }, secret, { expiresIn: '30m' });
            logLogin(user, req);
            return res.status(200).json({ token });
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async isAdmin(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try {
            const { token } = req.query;
            const decoded = jwt.verify(token, secret);
            const user = (await get(child(ref(db), 'users/' + decoded.login))).val();
            if (!user) return res.status(400).json({ message: "Пользователь не найден" });
            if (user.role !== User.ROLE.ADMIN) return res.status(400).json({ message: "Пользователь не администратор" });
            return res.status(200).json({ message: "Пользователь администратор" });
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }
}

module.exports = new UserController();