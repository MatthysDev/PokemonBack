const mongoose = require('mongoose');
const user = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET

const usersController = {
    create: async (req, res) => {
        const newUser = new user(req.body);
        newUser.password = await bcrypt.hashSync(newUser.password, bcryptSalt);
        newUser.save().then((user) => {
            res.status(201).json(user);
        }).catch((err) => {
            res.status(404).json(err);
        });
    },
    login: async (req, res) => {
        const { email, password, username } = req.body;
        user.findOne({ email, username }).then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if (isValidPassword) {
                    jwt.sign({email: user.email, _id: user._id, admin: user.isAdmin}, jwtSecret, {}, (err, token) => {
                        if (err) {
                            res.status(500).json({ message: 'Internal server error' });
                        } else {
                            res.cookie('token', token).status(200).json({ token: token, data: user });
                        }
                    });
                } else {
                    res.status(404).json({ message: 'Invalid password' });
                }
            }
        }).catch((err) => {
            res.status(404).json(err);
        });
    },
    profile: async (req, res) => {
        const {token} = req.cookies;
        if(token){
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if(err) throw err
                const {email, username, _id, isAdmin} = await user.findById(userData._id)
                res.json({token, data:{email, username, _id, isAdmin}})
            })
        } else {
            res.status(204).json(null)
        }
    },
    logout: async (req, res) => {
        res.cookie('token','').status(204).json(null)
    }
}

module.exports = usersController;