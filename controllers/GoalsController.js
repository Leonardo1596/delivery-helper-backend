const Goal = require('../models/GoalsSchema');

const createGoal = async (goalData) => {
    try {
        const newGoal = new Goal(goalData);

         const savedGoal = await newGoal.save();

         return savedGoal;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createGoal
}