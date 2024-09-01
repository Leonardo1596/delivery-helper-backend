const Entrie = require('../models/EntriesSchema');

const createEntrie = async (req, res) => {
    try {
        const {
            userId,
            date,
            initialKm,
            finalKm,
            grossGain,
            costPerKm,
            foodExpense,
            gasolinePrice,
            gasolineExpense
        } = req.body;

        const kmTraveled = finalKm - initialKm;
        const spent = (kmTraveled * costPerKm) + foodExpense;
        const liquidGain = grossGain - spent;
        const percentageSpent = grossGain !== 0 ? ((spent / grossGain) * 100) : 100;

        const [year, month, day] = date.split('-');
        const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const weekDay = weekDays[new Date(`${month}/${day}/${year}`).getDay()];

        const newEntrie = new Entrie({
            userId,
            date,
            weekDay,
            initialKm,
            finalKm,
            kmTraveled,
            grossGain,
            liquidGain,
            spent,
            percentageSpent,
            costPerKm,
            foodExpense,
            gasolinePrice,
            gasolineExpense
        });
        const savedEntrie = await newEntrie.save();

        res.json(savedEntrie);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocorrreu um erro ao criar o lançamento.' });
    }
};

const deleteEntrie = async (req, res) => {
    try {
        const { userId, entrieId } = req.params;

        const deletedEntrie = await Entrie.findOneAndDelete({
            userId,
            _id: entrieId
        });

        return res.json({ message: 'Lançamento deletado com sucesso.' });

    } catch (error) {
        console.error('Ocorreu um erro ao deletar o lançamento: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao deletar o lançamento' });
    }
};

const updateEntrie = async (req, res) => {
    try {
        const { userId, entrieId } = req.params;

        const {
            date,
            initialKm,
            finalKm,
            grossGain,
            costPerKm
        } = req.body;

        // Get existing entrie
        const existingEntrie = await Entrie.findOne({ userId, _id: entrieId });

        if (!existingEntrie) {
            return res.status(404).json({ error: 'Lançamento não encontrado' });
        }

        // Calculate weekday if the date is in req.body
        let updatedWeekDay = existingEntrie.weekDay;
        if (date !== undefined) {
            const [year, month, day] = date.split('-');
            const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            updatedWeekDay = weekDays[new Date(`${month}/${day}/${year}`).getDay()];
            console.log(updatedWeekDay);
        }

        // Use initialKm from req.body if available or use existent value
        const initialKmToUse = initialKm !== undefined ? initialKm : existingEntrie.initialKm;

        // Use finalKm from req.body if available or use existent value
        const finalKmToUse = finalKm !== undefined ? finalKm : existingEntrie.finalKm;

        // Calculate kmTraveled based on initialKm and finalKm
        const kmTraveled = finalKmToUse - initialKmToUse;

        const spent = kmTraveled * costPerKm;
        const liquidGain = grossGain !== undefined ? grossGain - spent : existingEntrie.grossGain - spent;
        const percentageSpent = (spent / grossGain) * 100;

        const updatedEntrie = await Entrie.findOneAndUpdate(
            { userId, _id: entrieId },
            { date, weekDay: updatedWeekDay, initialKm, finalKm, grossGain, kmTraveled, liquidGain, spent, percentageSpent },
            { new: true }
        );

        if (!updatedEntrie) {
            return res.status(404).json({ error: 'Lançamento não encontrado' });
        }

        res.json(updatedEntrie);

    } catch (error) {
        console.error('Ocorreu um erro ao atualizar o lançamento: ', error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o lançamento' });
    }
};

const getEntrieByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        Entrie.find({ userId })
            .then(entries => {
                res.json(entries);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao recuperar os lançamentos.', error);
            });
    } catch (error) {

    }
}

module.exports = {
    createEntrie,
    deleteEntrie,
    updateEntrie,
    getEntrieByUser
}
