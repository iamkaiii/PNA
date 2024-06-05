const diff = (first, second) => {
    const result = [];
    for (const element of first) {
        if (!second.includes(element)) {
            result.push(element);
        }
    }
    result.push(10)
    result.sort()
    
    console.log(result);
    return result;
};

const first = [1, 2, 55 , 3, -4, 5, 28 ];
const second = [3, 4, 5, 6, 7];
diff(first, second);

"Напишите функцию diff, которая возвращает массив, содержащий все " +
"элементы первого, которые не находятся во втором на javascript"
"13"
function maxConsecutiveOnes(sequence) {
    let maxOnes = 0;
    let currentOnes = 0;

    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === '1') {
            currentOnes++;
        } else {
            maxOnes = Math.max(maxOnes, currentOnes);
            currentOnes = 0;
        }
    }

    maxOnes = Math.max(maxOnes, currentOnes);
    return maxOnes;
}

let sequence = '100111000';
const result = maxConsecutiveOnes(sequence);
console.log(result); // 7

"Дана строка - последовательность, которая может состоять как из 0, так и 1. " +
"Необходимо найти максимальную последовательность 1 и вывести ее длину на js"
"11"

