export default function createCalendar(year, month) {
    const result = [];
    let day = 1;
    const daysInWeek = 7;
    const date = new Date(year, month);
    const nextMonth = new Date(year, month + 1);
    const monthStartsOn = date.getDay()
    const amountDays = Math.round((nextMonth - new Date(year, month, 1)) / 1000 / 3600 / 24);
    for (let i = 0; i < (amountDays + monthStartsOn) / daysInWeek; i += 1) {
        result[i] = [];
        for (let j = 0; j < daysInWeek; j += 1) {
            if ((i === 0 && j < monthStartsOn) || day > amountDays) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }
    return result
};