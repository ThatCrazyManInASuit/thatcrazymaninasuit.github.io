const questionBank = []

let problemText, rounding, correctAnswer, originTest, estimate;
let numBank = []
let operBank = []
let operationList = ['+', '-', '*', '/']
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < 27 + 1; i++) {
        questionBank.push(i)
    }
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
    let question = questionBank[getRandomInt(questionBank.length) - 1];
    
    switch (question) {
        case 0: 
            rounding = 0
            originTest = 'Randomized Problem'
            operBank = [arithmetic()]
            numBank = [(getRandomInt(90)+9)*100, getRandomInt(9999), getRandomInt(9999)]
            var placeholder = applyOperator(operBank[0], numBank[1], numBank[2])
            console.log(placeholder)
            if (Math.sign(numBank[0] - placeholder) == 1) {
                problemText = `${numBank[1]} ${operBank[0]} ${numBank[2]} + ${numBank[0] - placeholder}`
            } else {
                problemText = `${numBank[1]} ${operBank[0]} ${numBank[2]} - ${Math.abs(numBank[0] - placeholder)}`
            }
            correctAnswer = numBank[0]
            break;
        case 1: 
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
        case 2:
            rounding = 0
            originTest = 'FOILing'
            numBank = [getRandomInt(90)+9, getRandomInt(90)+9]
            problemText = `${numBank[0]}*${numBank[1]}`
            correctAnswer = numBank[0]*numBank[1]
            break;
        case 3:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(919)+90]
            problemText = `${numBank[0]} * 11`
            correctAnswer = numBank[0]*11
            break;
        case 4:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(900)+99]
            problemText = `${numBank[0]} * 111`
            correctAnswer = numBank[0] * 111
            break;
        case 5:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(200)+99]
            problemText = `${numBank[0]*11} &divide 11`
            correctAnswer = numBank[0]
            break;
        case 6:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(9), getRandomInt(9), getRandomInt(19)]
            problemText = `${numBank[0]} * ${numBank[1]} * 11 * ${numBank[2]}`
            correctAnswer = numBank[0] * numBank[1] * 11 * numBank[2]
            break;
        case 7:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(9), getRandomInt(9), getRandomInt(9), getRandomInt(9)]
            problemText = `${numBank[0]} * ${numBank[1]} * ${numBank[2]} * ${numBank[3]} * 11`
            correctAnswer = numBank[0] * numBank[1] * numBank[2] * numBank[3] * 11 
            break;
        case 8:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(115)+9]
            problemText = `${numBank[0]} * 121`
            correctAnswer = numBank[0] * 121 
            break;
        case 9:
                rounding = 0
                originTest = 'FOILing'
                numBank = [getRandomInt(900)+99, getRandomInt(900)+99]
                problemText = `${numBank[0]} * ${numBank[1]}`
                correctAnswer = numBank[0]*numBank[1]
                break;
        case 10:
                rounding = 0
                originTest = 'FOILing'
                numBank = [getRandomInt(90)+9, getRandomInt(90)+9]
                problemText = `${numBank[0]} * ${numBank[1]}`
                correctAnswer = numBank[0]*numBank[1]
                break;
        case 11:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(9)]
            problemText = `11% of ${numBank[0]*11}`
            correctAnswer = numBank[0]*11*.11
            break;
        case 12:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(499)]
            problemText = `${getRandomInt(421)*111} &divide 111`
            correctAnswer = getRandomInt(421)
            break;
        case 13:
                rounding = 0
                originTest = 'FOILing'
                numBank = [getRandomInt(900)+99, getRandomInt(90)+9]
                problemText = `${numBank[0]}*${numBank[1]}`
                correctAnswer = numBank[0]*numBank[1]
                break;
        case 14:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(90)+9]
            problemText = `${numBank[0]} * 11`
            correctAnswer = numBank[0]*11
            break;
        case 15:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [(getRandomInt(90)+9)/10]
            problemText = `${numBank[0]} * 1.1`
            correctAnswer = numBank[0]*1.1
            break;
        case 16:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [(getRandomInt(90)+9)/100]
            problemText = `${numBank[0]} * 1.1`
            correctAnswer = numBank[0]*1.1
            break;
        case 17:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [(getRandomInt(90)+9)]
            problemText = `${numBank[0]} * 111`
            correctAnswer = numBank[0]*111
            break;
        case 18:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [(getRandomInt(90)+9)]
            problemText = `${numBank[0]} * 111`
            correctAnswer = numBank[0]*111
            break;
        case 19:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [(getRandomInt(9)), (getRandomInt(9))]
            problemText = `${numBank[0]}00${numBank[1]} * 111`
            correctAnswer = parseInt(`${numBank[0]}00${numBank[1]}`) * 111
            break;
        case 20:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [(getRandomInt(9000)+999)/100]
            problemText = `${numBank[0]} * 1.1`
            correctAnswer = numBank[0]*1.1
            break;
        case 21:
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(2)+2]
            problemText = `11<sup>${numBank[0]}</sup>`
            correctAnswer = 14641
            break;
        case 22:
            rounding = 3
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(4)+1]
            problemText = `(*) ${(numBank[0]+1)*11.1} * ${numBank[0]*11.1} * ${(numBank[0]-1)*11.1}`
            estimate = 1
            correctAnswer = (numBank[0]+1)*11.1 * numBank[0]*11.1 * (numBank[0]-1)*11.1
            break;
        case 23:
            originTest = 'Multiplying by 101'
            numBank = [getRandomInt(9000)+999]
            problemText = `${numBank[0]} * 101`
            estimate = 1
            correctAnswer = numBank[0] * 101
            break;
        case 24:
            originTest = 'Multiplying by 101'
            numBank = [getRandomInt(900)+99]
            problemText = `${numBank[0]} * 10.1`
            estimate = 1
            correctAnswer = numBank[0] * 10.1
            break;
        case 24:
            originTest = 'Multiplying by 101'
            numBank = [getRandomInt(900)+99]
            problemText = `${numBank[0]} * 101`
            estimate = 1
            correctAnswer = numBank[0] * 101
            break;
        case 25:
            rounding = 0
            originTest = 'Multiplying by 11'
            numBank = [getRandomInt(400)+99]
            problemText = `${numBank[0]*101} &divide 101`
            correctAnswer = numBank[0]
            break;
        case 26:
            originTest = 'Multiplying by 101'
            numBank = [getRandomInt(400)+99]
            problemText = `${numBank[0]} * 202`
            correctAnswer = numBank[0] * 101
            break;
        case 26:
            originTest = 'Multiplying by 101'
            numBank = [getRandomInt(24)+1, getRandomInt(24)+1]
            problemText = `If ${numBank[0]} balls cost $${numBank[0]/100}, then ${numBank[1]} balls cost: ($)`
            correctAnswer = numBank[1]/100
            break;
         case 27:
            originTest = 'Multiplying by 101'
            estimate = 1
            rounding = 0
            numBank = [getRandomInt(100), getRandomInt(400)+99]
            problemText = `(*) (${numBank[0]} + ${101 - numBank[0]}) * ${numBank[1]}`
            correctAnswer = (numBank[0] + (101 - numBank[0])) * numBank[1]
            break;
    }

    console.log(originTest)
    document.getElementById('problem').innerHTML = problemText;

    document.getElementById('originTest').textContent = originTest;
    document.getElementById('userAnswer').value = ''

}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('userAnswer').value);
    if (estimate == 1) {
        if (userAnswer <= 1.05 * correctAnswer && userAnswer >= .95 * correctAnswer) {
            alert("Correct!");
        } else {
            alert(`Wrong! Correct range was ${(.95 * correctAnswer).toFixed(rounding)} to ${(1.05 *correctAnswer).toFixed(rounding)}`);
        }
    } else if (userAnswer == correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong! Correct answer was " + correctAnswer);
    }
    generateProblem(); // Generate a new problem after checking the answer
}
