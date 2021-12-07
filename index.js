// Ответ на первое задание: Record 1, Record 5, Record 6, Record 2, Record 4, Record 3

const { EventEmitter } = require('events');
const colors = require('colors');
const inputArgument_1 = process.argv[2].split('-');
const inputArgument_2 = process.argv[3].split('-');
const deadlineDate_1 = new Date(`${inputArgument_1[3]}`, `${inputArgument_1[2]}` - 1, `${inputArgument_1[1]}`, `${inputArgument_1[0]}`, 0, 0);
const deadlineDate_2 = new Date(`${inputArgument_2[3]}`, `${inputArgument_2[2]}` - 1, `${inputArgument_2[1]}`, `${inputArgument_2[0]}`, 0, 0);
const eventEmitter = new EventEmitter();

const getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
const updateTimer = (endtime) => {
    setInterval(function () {
        let t = getTimeRemaining(endtime);
        if (t.total <= 0) {
            eventEmitter.emit('end');
            clearInterval(updateTimer);
        } else {
        eventEmitter.emit('update', t);
        }
    }, 1000);
}
updateTimer(deadlineDate_1);
updateTimer(deadlineDate_2);

eventEmitter.on('update', (t) => {
    console.log(`Осталось ${t.days} дней, ${t.hours} часов, ${t.minutes} минут, ${t.seconds} секунд`);
});

eventEmitter.on('end', () => {
    console.log(colors.red('Время вышло'));
});