const moment = require('moment');


function checkIfThisOrNextWeek(inputDateStr) {
    // Parse the input date (e.g., "04.20.2024")
    const inputDate = moment(inputDateStr, 'MM.DD.YYYY');

    if (!inputDate.isValid()) {
        return "Invalid date format. Please use 'MM.DD.YYYY'.";
    }

    // Get the current date
    const currentDate = moment();

    // Get the start (Monday) and end (Friday) of the current week
    const startOfThisWeek = moment().startOf('week').add(1, 'days'); // Monday of the current week
    const endOfThisWeek = moment().startOf('week').add(5, 'days');   // Friday of the current week

    // Get the start (Monday) and end (Friday) of the next week
    const startOfNextWeek = moment().add(1, 'weeks').startOf('week').add(1, 'days'); // Monday of next week
    const endOfNextWeek = moment().add(1, 'weeks').startOf('week').add(5, 'days');   // Friday of next week

    // Check if the input date is within the current week
    if (inputDate.isBetween(startOfThisWeek, endOfThisWeek, 'day', '[]')) {
        return `This ${inputDate.format('dddd')}`;
    }
    // Check if the input date is within the next week
    else if (inputDate.isBetween(startOfNextWeek, endOfNextWeek, 'day', '[]')) {
        return `Next ${inputDate.format('dddd')}`;
    } 
    // If the date is not within this week or next week, return the formatted date
    else {
        return inputDate.format('MM.DD.YYYY');
    }
}
module.exports = {checkIfThisOrNextWeek}