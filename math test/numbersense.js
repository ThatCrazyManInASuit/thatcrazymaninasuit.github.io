const questionBank = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
let problemText, rounding, correctAnswer, originTest;
let numBank = []
let operBank = []
let operationList = ['+', '-', '*', '/']
document.addEventListener('DOMContentLoaded', function() {
    generateProblem(); // Initialize the first problem on load
});
function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1);
}

function arithmetic() {
    return operationList[Math.floor(Math.random() * 2)];
}

function applyOperator(operator, num1, num2) {
    switch(operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : undefined;
        default: return null;
    }
}
function gcd(a, b) {
    if (b) {
        return gcd(b, a % b);
    } else {
        return Math.abs(a);
    }
  }

function factorial(x) {
    if (x < 0) {
      return -1
    } else if (x == 0) {
      return 1
    } else {
      return (x * factorial(x - 1))
    }
  }

function generateProblem() {
    numBank = []
    let question = questionBank[Math.floor(Math.random() * questionBank.length)];
    
    switch (question) {
        case '0': 
            rounding = 0
            originTest = 'Randomized Problem'
            numBank = [getRandomInt(5622), getRandomInt(1247), getRandomInt(525)]
            operBank = [arithmetic(), arithmetic()]
            problemText = `${numBank[0]} ${operBank[0]} ${numBank[1]} ${operBank[1]} ${numBank[2]}`
            correctAnswer = applyOperator(operBank[1], applyOperator(operBank[0], numBank[0], numBank[1]), numBank[2]);
            break;
        case '1': 
            rounding = 0
            originTest = 'Randomized Problem'
            var tempNumbers = [2, 4, 5, 8]
            numBank = [getRandomInt(99), tempNumbers[getRandomInt(4)-1], getRandomInt(8)+1]
            a()
            function a() {
                if (gcd(numBank[1],numBank[2]) != 1) {
                    numBank = [getRandomInt(99), tempNumbers[getRandomInt(4)-1], getRandomInt(8)+1]
                    a()
                }
            }
            
            problemText = `${numBank[0]/numBank[1]*numBank[2]} * ${numBank[1]}/${numBank[2]}`
            correctAnswer = `${numBank[0]}`;
            break;
        case '2':
            rounding = 0
            originTest = 'FOILing'
            numBank = [getRandomInt(90)+9, getRandomInt(90)+9]
            problemText = `${numBank[0]}*${numBank[1]}`
            correctAnswer = numBank[0]*numBank[1]
            break;
        case '3':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(990)+9]
            problemText = `${numBank[0]}*11`
            correctAnswer = numBank[0]*11
            break;
        case '4':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(9990)+9]
            problemText = `${numBank[0]}*111`
            correctAnswer = numBank[0]*111
            break;
        case '5':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(161)+17]
            problemText = `${numBank[0]*11} &divide 11`
            correctAnswer = numBank[0]
            break;
        case '6':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(9), getRandomInt(9), getRandomInt(19)]
            problemText = `${numBank[0]} * ${numBank[1]} * 11 * ${numBank[2]}`
            correctAnswer = numBank[0] * numBank[1] * 11 * numBank[2]
            break;
        case '7':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(9), getRandomInt(9), getRandomInt(9), getRandomInt(9)]
            problemText = `${numBank[0]} * ${numBank[1]} * ${numBank[2]} * ${numBank[3]} * 11`
            correctAnswer = numBank[0] * numBank[1] * numBank[2] * numBank[3] * 11 
            break;
        case '8':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(115)+9]
            problemText = `${numBank[0]} * 121`
            correctAnswer = numBank[0] * 121 
            break;
        case '9':
                rounding = 0
                originTest = 'FOILing'
                numBank = [getRandomInt(990)+9, getRandomInt(90)+9]
                problemText = `${numBank[0]}*${numBank[1]}`
                correctAnswer = numBank[0]*numBank[1]
                break;
        case '10':
                rounding = 0
                originTest = 'FOILing'
                numBank = [getRandomInt(990)+9, getRandomInt(590)+9]
                problemText = `${numBank[0]}*${numBank[1]}`
                correctAnswer = numBank[0]*numBank[1]
                break;
        case '11':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(9)]
            problemText = `11% of ${numBank[0]*11}`
            correctAnswer = numBank[0]*11*.11
            break;
        case '12':
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(421)]
            problemText = `${parseInt(`${numBank[0]}${numBank[1]}${numBank[0]}`)*111} &divide 111`
            correctAnswer = parseInt(`${numBank[0]}${numBank[1]}${numBank[0]}`)
            break;
    }

    console.log(originTest)
    document.getElementById('problem').innerHTML = problemText;

    document.getElementById('originTest').textContent = originTest;
    document.getElementById('userAnswer').value = ''

}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('userAnswer').value);
    if (userAnswer == correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong! Correct answer was " + correctAnswer);
    }
    generateProblem(); // Generate a new problem after checking the answer
}
