module.exports = {
  getTimeString(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}${ampm}`;
  },
  getDateDiffInDays(dueDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueDateObj = new Date(dueDate);
    const currentDateObj = new Date();
    const diffDays = Math.round(
      Math.abs((dueDateObj - currentDateObj) / oneDay)
    );
    return diffDays;
  },
};
