const { startOfWeek, isSameWeek } = require('date-fns');

const isFirstLoginOfWeek = (lastLogin) => {
    if (!lastLogin) return true; // If there is no previous login, it is the first
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    return !isSameWeek(lastLogin, startOfCurrentWeek);
};

module.exports = { isFirstLoginOfWeek };