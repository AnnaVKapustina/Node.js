const colors = require('colors');
const x = process.argv[2];
const y = process.argv[3];
const simple_numbers = [];

if (isNaN(x) && isNaN(y)) {
    console.log(colors.red('Введенные данные не являются числами'));
} else {
    for (let i = x; i <= y; i++) {
        let flag = 1;
        if (i > 2 && i % 2 != 0) {
            for (let j = 3; j * j <= i; j = j + 2) {
                if (i % j == 0) {
                    flag = 0;
                    break;
                }
            }
        }
        else if (i != 2) flag = 0;
        if (flag == 1 && i >= 2) { simple_numbers.push(i) }
    }

    const Colors = (data) => {
        if (data.length === 0) {
            console.log(colors.red('В заданном промежутке нет простых чисел'));
        } else {
            for (let i = 0; i <= data.length - 1; i++) {
                if (i % 3 === 0) {
                    console.log(colors.red(data[i]))
                } else if (i % 3 === 1) {
                    console.log(colors.yellow(data[i]))
                } else {
                    console.log(colors.green(data[i]))
                }
            }
        }
    }
    Colors(simple_numbers);
}