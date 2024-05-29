const Goals = require('../models/GoalsSchema');

const createGoalsLimit = async (limitGoalData) => {
    try {
        const newLimitGoal = new Goals(limitGoalData);

         const savedGoal = await newLimitGoal.save();

         return savedGoal;
    } catch (error) {
        console.log(error);
    }
};

const updateGoalsLimit = async (req, res) => {
    try {
        const { userId, goalId } = req.params;

        const {
            salaryLimit,
            goal1Limit,
            goal2Limit
        } = req.body;

        // Get existing goal
        const existingGoal = await Goals.findOne({ userId, _id: goalId });

        if (!existingGoal) {
            return res.status(404).json({ error: 'Metas não encontradas' });
        }

        const updatedGoal = await Goals.findOneAndUpdate(
            { userId, _id: goalId },
            { salaryLimit, goal1Limit, goal2Limit },
            { new: true }
        );

        res.json(updatedGoal);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar a meta' });
    }
}

module.exports = {
    createGoalsLimit,
    updateGoalsLimit
}