const PersonalExpense = require('../models/PersonalExpenseSchema');

const createPersonalExpense = async (req, res) => {
    try {
        const {
            userId,
            date,
            distance,
            costPerKm,
            gasolinePrice,
            gasolineExpense
        } = req.body;
        const expense = distance * costPerKm;

        const [year, month, day] = date.split('-');
        const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const weekDay = weekDays[new Date(`${month}/${day}/${year}`).getDay()];

        const newPersonalExpense = new PersonalExpense({
            userId,
            date,
            weekDay,
            distance,
            expense,
            costPerKm,
            gasolinePrice,
            gasolineExpense
        });
        const savedPersonalExpense = await newPersonalExpense.save();
        res.json(savedPersonalExpense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocorrreu um erro ao criar o lançamento.' });
    }
};

const deletePersonalExpense = async (req, res) => {
    try {
        const { userId, personalExpenseId } = req.params;

        const deletedPersonalExpense = await PersonalExpense.findOneAndDelete({
            userId,
            _id: personalExpenseId
        });
        return res.json({ message: 'Lançamento deletado com sucesso.' });
    } catch (error) {
        console.error('Ocorreu um erro ao deletar o lançamento: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao deletar o lançamento' });
    }
};

const getPersonalExpenseByUser = async (req, res) => {
    try {
        const { userId } = req.params

        PersonalExpense.find({ userId })
            .then(personalExpenses => {
                res.json(personalExpenses);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao recuperar os lançamentos.', error);
            });
    } catch (error) {
        
    }
};

module.exports = {
    createPersonalExpense,
    deletePersonalExpense,
    getPersonalExpenseByUser
};