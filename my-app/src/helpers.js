export const createCalendar = (year, month) => {
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

export const getDefaultStartDay = (date) => {
    function setMonth() { return (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1) };
    function setDay() { return (date.getDate()) < 10 ? `0${date.getDate()}` : (date.getDate()) };
    return `${date.getFullYear()}-${setMonth()}-${setDay()}`;
};

export const setFormatTime = (time) => {
    const hour = time.slice(0, 2);
    return hour >= 12 ? `${hour - 12}:${time.slice(3, 5)} PM` : `${hour}:${time.slice(3, 5)} AM`;
};
export const deleteElem = (index) => {
    notificationArr.splice(index, 1)
}

export const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const monthArr = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const yearsArr = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const timeStart = '09:00';
export const notifTimeObj = {
    'none': 0,
    '3 minutes before': 180,
    '5 minutes before': 300,
    '30 minutes before': 1800,
    '1 hour before': 3600,
};
export const notifTimeKeys = Object.keys(notifTimeObj);

export const notificationArr = [];

