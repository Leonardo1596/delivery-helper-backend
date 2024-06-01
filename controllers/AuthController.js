const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Entrie = require('../models/EntriesSchema');
const Goal = require('../models/GoalsSchema');
const CostPerKm = require('../models/CostPerKmSchema');
const GoalsController = require('../controllers/GoalsController');
const LimitGoalsController = require('../controllers/LimitGoalsController');
const CostPerKmController = require('../controllers/CostPerKmController');
const { isFirstLoginOfWeek } = require('../utils/dateUltils');

const register = async (req, res, next) => {
    try {
        // Hash da senha
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        // Criação do novo usuário
        let user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPass,
            confirmPassword: req.body.confirmPassword,
        });

        // Verificar se o e-mail já existe
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.log('Email already exists');
            return res.json({ message: 'Email already exists' });
        }

        // Save user
        const savedUser = await user.save();

        // Create token
        const accessToken = jwt.sign({ _id: savedUser._id, email: savedUser.email }, process.env.JWT_KEY, {
            expiresIn: '3600s'
        });

        // Limit goal data
        const limitGoalData = {
            userId: savedUser._id,
            salaryLimit: 0.00,
            goal1Limit: 0.00,
            goal2Limit: 0.00,
        };
        
        // Create liit goal to user
        const limitGoal = await LimitGoalsController.createGoalsLimit(limitGoalData);

        // CostPerKm data
        const costPerKmData = {
            userId: savedUser._id,
            oleo: 0.03,
            relacao: 0.003,
            pneuDianteiro: 0.0035,
            pneuTraseiro: 0.0109,
            gasolina: 0.176
        };

        // Create costPerKm to user
        const costPerKm = await CostPerKmController.createCostPerKm(costPerKmData);

        console.log('Successfully registered');
        console.log(`User: ${savedUser.username}`);
        console.log(savedUser);

        res.status(201).json({ token: accessToken, userProfile: savedUser, message: 'Successfully registered' });
    } catch (error) {
        console.log(error);
        res.json({ message: 'An error occurred' });
    }
};

const login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(async user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, async (err, result) => {
                    1
                    if (err) {
                        res.json({ error: err });
                    }
                    if (result) {
                        // Create token
                        const accessToken = jwt.sign({ _id: user._id, email: user.email, username: user.username }, process.env.JWT_KEY, {
                            expiresIn: '3600s'
                        });

                        // Update lastLogin
                        const now = new Date();
                        const firstLoginOfWeek = isFirstLoginOfWeek(user.lastLogin);
                        user.lastLogin = now;
                        await user.save();

                        // Save user info
                        const entries = await Entrie.find({ userId: user._id });
                        const goals = await Goal.find({ userId: user._id });
                        const costPerKm = await CostPerKm.find({ userId: user._id });

                        let userInfo = {
                            _id: user._id,
                            email: user.email,
                            username: user.username,
                            costPerKm: user.costPerKm,
                            goals: goals,
                            entries: entries,
                            costPerKm: costPerKm,
                            lastLogin: user.lastLogin,
                            firstLoginOfWeek
                        };

                        // Successfully
                        console.log(`User: ${user.email} is signed`)

                        res.json({ token: accessToken, userInfo: userInfo, firstLoginOfWeek, message: 'Logado com sucesso' });
                        next();
                    } else {
                        res.json({ message: 'A senha está incorreta' });
                    }
                });
            } else {
                console.log('user not found');
                res.json({ message: 'Usuário não encontrado' });
            }
        });
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const {
            email,
            username,
        } = req.body;

        // Get existing user
        const existingUser = await User.findOne({ _id: userId });

        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        };

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { email: email, username: username },
            { new: true }
        );

        res.json(updatedUser);

    } catch (error) {
        console.error('Ocorreu um erro ao atualizar o usuário: ', error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o usuário' });
    }
};

const getUser = async (req, res) => {

    User.findOne({ _id: req.params.userId })
        .then(async user => {
            const goals = await Goal.find({ userId: user._id });
            const costPerKm = await CostPerKm.find({ userId: user._id });
            const entries = await Entrie.find({ userId: user._id });
            const firstLoginOfWeek = isFirstLoginOfWeek(user.lastLogin);

            let userInfo = {
                _id: user._id,
                email: user.email,
                username: user.username,
                goals: goals,
                costPerKm: costPerKm,
                entries: entries,
                lastLogin: user.lastLogin,
                firstLoginOfWeek
            }

            res.json(userInfo);
        })
};


module.exports = {
    register, login, updateUser, getUser
}