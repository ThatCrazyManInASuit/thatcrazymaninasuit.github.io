const questionBank = Array.from({ length: 2 }, (_, i) => i);
let problemText, rounding, correctAnswer, originTest, estimate, difficulty;
let right = attempted = 0 
let numBank = [];
const operationList = ['+', '-', '*', '/'];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userAnswer').style.display = 'none';
    document.getElementById('enter').style.display = 'none';
    document.getElementById('userAnswer').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    const difficultyBlocks = document.querySelectorAll('.diff-button');
            difficultyBlocks.forEach((block, index) => {
                setTimeout(() => {
                    block.classList.add('fade-in');
                }, index * 450);
            });
});

function toggleMenu() {
    document.getElementById("menu").classList.toggle("show-menu");
}

function startQuiz() {
    document.getElementById("quote").classList.add('hide');
    document.getElementById("start").style.display = 'none';
    document.getElementById("userAnswer").style.display = 'unset';
    document.getElementById("enter").style.display = 'unset';
    generateProblem();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1);
}

function arithmetic() {
    return operationList[Math.floor(Math.random() * 2)];
}

function applyOperator(operator, num1, num2) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : undefined;
        default: return null;
    }
}

function gcd(a, b) {
    return b ? gcd(b, a % b) : Math.abs(a);
}

function factorial(x) {
    return x < 0 ? -1 : x === 0 ? 1 : x * factorial(x - 1);
}

function setDifficulty(level) {
    let buttons = document.getElementsByClassName('diff-button');
    for (let button of buttons) {
        button.style.backgroundColor = 'lightgray';
    }
    document.getElementById(level).style.backgroundColor = 'darkgray';
    difficulty = level;
}

function generateProblem() {
    numBank = [];
    let question = questionBank[getRandomInt(questionBank.length) - 1];
    rounding = 0
    estimate = false;

    const operations = [
        function() {
            originTest = 'FOILing/LIOFing';
            switch (difficulty) {
                case 'easy':
                    numBank = [(getRandomInt(90) + 9), (getRandomInt(90) + 9)];
                    problemText = `$$${numBank[0]} \\times ${numBank[1]}$$`
                    correctAnswer = numBank[0] * numBank[1];
                    break;
                case 'medium': 
                    numBank = [(getRandomInt(900) + 99), (getRandomInt(90) + 9)];
                    problemText = `$$${numBank[0]} \\times ${numBank[1]}$$`
                    correctAnswer = numBank[0] * numBank[1];
                    break;
                case 'hard': 
                    numBank = [(getRandomInt(900) + 99), (getRandomInt(900) + 99)];
                    problemText = `$$${numBank[0]} \\times ${numBank[1]}$$`
                    correctAnswer = numBank[0] * numBank[1];
                    break;
            }
            
        },
        function() {
            originTest = 'Multiplying by 11s';
            switch (difficulty) {
                case 'easy':
                    switch(getRandomInt(14)) {
                        case 1:
                            numBank = [(getRandomInt(90) + 9)];
                            problemText = `11 x ${numBank[0]}`
                            correctAnswer = numBank[0] * 11;
                            break;
                        case 2:
                            numBank = [(getRandomInt(90) + 9), (getRandomInt(9)*11)];
                            problemText = `${numBank[1]} x ${numBank[0]}`
                            correctAnswer = numBank[0] * numBank[1];
                            break;
                        case 3: 
                            numBank = [(getRandomInt(90) + 9) / 10];
                            problemText = `1.1 x ${numBank[0]}`
                            correctAnswer = numBank[0] * 1.1;
                            rounding = 2
                            break;
                        case 4:
                            numBank = [(getRandomInt(90) + 9) * 11];
                            problemText = `${numBank[0]} / 11`
                            correctAnswer = numBank[0] / 11;
                            break;
                        case 5: 
                            rounding = 3
                            numBank = [(getRandomInt(90) + 9) / 100];
                            problemText = `1.1 x ${numBank[0]}`
                            correctAnswer = numBank[0] * 1.1;
                            rounding = 3
                            break;
                        case 6: 
                            numBank = [getRandomInt(9), getRandomInt(9)];
                            problemText = `${numBank[0]}00${numBank[1]} x 111`
                            correctAnswer = numBank[0] * 111000 + numBank[1] * 111;
                            break;
                        case 7: 
                            numBank = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
                            problemText = `${numBank[0]} x ${numBank[1]} x ${numBank[2]} x 11`
                            correctAnswer = numBank[0] * numBank[1] * numBank[2] * 11;
                            break;
                        case 8: 
                            numBank = [getRandomInt(9), getRandomInt(9)];
                            problemText = `${numBank[0]}${numBank[0]}${numBank[1]}${numBank[1]} / 11`
                            correctAnswer = numBank[0] * 100 + numBank[1];
                            break;
                        case 9: 
                            numBank = [(getRandomInt(9) * 11)];
                            problemText = `${numBank[0]} * 11`
                            correctAnswer = numBank[0] * 11;
                            break;
                        case 10: 
                            rounding = 2
                            numBank = [getRandomInt(9), getRandomInt(9)];
                            problemText = `${numBank[0]}0.0${numBank[1]} x 11`
                            correctAnswer = numBank[0] * 110 + numBank[1] * .11;
                            break;
                        case 11: 
                            rounding = 2
                            numBank = [(getRandomInt(90)+9)];
                            problemText = `11% of ${numBank[0]}`
                            correctAnswer = numBank[0] * .11;
                            break;
                        case 12: 
                            numBank = [getRandomInt(9), getRandomInt(9)];
                            problemText = `${numBank[0]}00${numBank[1]} x 11`
                            correctAnswer = numBank[0] * 11000 + numBank[1] * 11;
                            break;
                        case 13: 
                            numBank = [(getRandomInt(2) + 2)];
                            problemText = `$$11^${numBank[0]}$$`
                            correctAnswer = Math.pow(11, numBank[0]);
                            break;
                        case 14: 
                            numBank = [(getRandomInt(9)*11), (getRandomInt(9)*11)];
                            problemText = `$$${numBank[0]} \times ${numBank[1]}$$`
                            correctAnswer = numBank[0]*numBank[1];
                            break;
                    }
                    break;
                case 'medium': 
                    switch(getRandomInt(5)) {
                        case 1:
                            numBank = [(getRandomInt(900) + 99) * 11];
                            problemText = `${numBank[0]} / 11`
                            correctAnswer = numBank[0] / 11;
                            break;
                        case 2: 
                            numBank = [getRandomInt(9), getRandomInt(9), getRandomInt(9), getRandomInt(9)];
                            problemText = `$$${numBank[0]} \times ${numBank[1]} \times ${numBank[2]} \times ${numBank[3]} \times 11$$`
                            correctAnswer = numBank[0] * numBank[1] * numBank[2] * numBank[3] * 11;
                            break;
                        case 3: 
                            numBank = [getRandomInt(9), getRandomInt(9), (getRandomInt(90) + 9)];
                            problemText = `$$${numBank[0]} \times ${numBank[1]} \times ${numBank[2]} \times ${numBank[3]} \times 11$$`
                            correctAnswer = numBank[0] * numBank[1] * numBank[2] * 11;
                            break;
                        case 4:
                            numBank = [(getRandomInt(90) + 9)];
                            problemText = `121 x ${numBank[0]}`
                            correctAnswer = numBank[0] * 121;
                            break;
                        case 5:
                            estimate = true
                            rounding = 3
                            numBank = [(getRandomInt(9)*11.1).toFixed(2), (getRandomInt(9)*11.1).toFixed(2), (getRandomInt(9)*11.1).toFixed(2)];
                            problemText = `(*)$$${numBank[0]} \times ${numBank[1]} \times ${numBank[2]}$$`
                            correctAnswer = numBank[0]*numBank[1]*numBank[2];
                            break;
                    }
                    break;
                case 'hard': 
                    switch (getRandomInt(1)) {
                        case 1:
                            numBank = [(getRandomInt(90) + 9)];
                            problemText = `1111 x ${numBank[0]}`
                            correctAnswer = numBank[0] * 1111;
                            break;
                        case 2:
                            numBank = [(getRandomInt(900) + 99)];
                            problemText = `111 x ${numBank[0]}`
                            correctAnswer = numBank[0] * 111;
                            break;
                    }
            }
            
        }
    ];

    operations[question]();
    document.getElementById("originTest").innerText = originTest;
    document.getElementById("problem").innerText = problemText;
    MathJax.typeset(); 
    document.getElementById("userAnswer").value = '';
    document.getElementById("right").innerText = 'Correct: ' + right;
    document.getElementById("attempted").innerText = 'Attempted: ' + attempted;
}

function checkAnswer() {
    correctAnswer = correctAnswer.toFixed(rounding)
    const userAnswer = parseFloat(document.getElementById("userAnswer").value);
    const resultMessage = (estimate) 
    ?  (userAnswer <= 1.05 * correctAnswer && userAnswer >= .95 * correctAnswer)
        ? `Correct! ${correctAnswer} is the answer.`
        : `Incorrect. Correct range was ${(.95 * correctAnswer).toFixed(rounding)} to ${(1.05 *correctAnswer).toFixed(rounding)}`
    :   userAnswer == correctAnswer
        ? `Correct! ${correctAnswer} is the answer.`
        : `Incorrect. ${correctAnswer} was the answer.`;
    attempted++
    if (/Correct/.test(resultMessage)) {
        right++
    }  
    alert(resultMessage);
    generateProblem();
}