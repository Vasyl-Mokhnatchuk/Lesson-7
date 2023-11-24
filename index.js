const readline = require('readline');
const { mergeSort, splitArray } = require('./mergeSort');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserArrayChoice() {
    rl.question("Оберіть варіант (1 - ввести самостійно, 2 - згенерувати): ", function(answer) {
        if (answer === "1") {
            rl.question("Введіть масив (розділіть елементи комою): ", function(input) {
                const inputArray = parseAndValidateArray(input);
                rl.close();
                if (inputArray !== null) {
                    proceedWithSorting(inputArray);
                } else {
                    console.log("Некоректний ввід. Будь ласка, введіть числа, розділені комами.");
                    process.exit(1);
                }
            });
        } else if (answer === "2") {
            const randomArrayLength = Math.floor(Math.random() * 10) + 5;
            const randomArray = Array.from({ length: randomArrayLength }, () => Math.floor(Math.random() * 100));
            rl.close();
            proceedWithSorting(randomArray);
        } else {
            console.log("Некоректний вибір. Оберіть 1 або 2.");
            rl.close();
        }
    });
}

function parseAndValidateArray(input) {
    const inputArray = input.split(",").map(str => {
        const num = Number(str);
        return isNaN(num) ? null : num;
    });

    if (inputArray.includes(null)) {
        return null;
    }

    return inputArray;
}

function proceedWithSorting(inputArray) {
    const sortedArray = mergeSort(inputArray);
    const [left, right] = splitArray(sortedArray);
    
    console.log("Вхідний масив:", inputArray);
    console.log("Відсортований масив:", sortedArray);
    console.log("Відсортовані підмасиви:");
    console.log("Перший підмасив:", left);
    console.log("Другий підмасив:", right);
}

getUserArrayChoice();
