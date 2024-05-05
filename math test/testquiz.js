let problemText = ''
let throwoffMargin = ''
let rounding = ''
function generateProblem() {
    const operationTypes = ['0', '1', '*'];
    const operation = operationTypes[Math.floor(Math.random() * operationTypes.length)];
    
    const correctAnswer = evaluateAnswer(operation);
    
    displayProblem(problemText);
    
    generateOptions(correctAnswer);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function evaluateAnswer(operation) {
    switch (operation) {
        case '0': 
            throwoffMargin = .02
            rounding = 2
            let rentRate = getRandomInt(84) + 14
            let mileageRate = ((getRandomInt(91) + 10) / 100)
            let daysRented = getRandomInt(20) + 2
            let miles = getRandomInt(2970) + 30
            let daysRented2 = getRandomInt(20) + 2
            let miles2 = getRandomInt(2970) + 30
            problemText = `The rental fee from Blue Devil Car Rentals includes a charge for each day the car is 
                            rented as well as a charge for each mile is driven. Will rented a car for ${daysRented} 
                            days, drove ${miles} miles, and his bill was $${(rentRate * daysRented + miles * mileageRate).toFixed(2)}. 
                            David rented a car for ${daysRented2} days, drove ${miles2} miles, and his bill was 
                            $${(rentRate * daysRented2 + miles2 * mileageRate).toFixed(rounding)}. Find the charge for each mile driven (debug:${mileageRate}, ${rentRate})`;
            return mileageRate;
        case '1': 
            throwoffMargin = .2
            rounding = 1
            var num1 = getRandomInt(21)-10;
            var num2 = getRandomInt(21)-10;
            var num3 = getRandomInt(21)-10;
            var num4 = getRandomInt(21)-10;
            var num5 = getRandomInt(21)-10;
            var num6 = getRandomInt(21)-10;
            var num7 = getRandomInt(21)-10;
            problemText = `Given points A(${num1},${num2}), B(${num3},${num4}), C(${num5},${num6}), D(a,b) and 
            E(${num7},c). \n Find the perimeter of triangle ABC. (nearest tenth) (debug: ${(Math.sqrt(Math.pow(num1-num3, 2)+Math.pow(num2-num4, 2))+Math.sqrt(Math.pow(num3-num5, 2)+Math.pow(num4-num6, 2))+Math.sqrt(Math.pow(num1-num5, 2)+Math.pow(num2-num6, 2))).toFixed(rounding)})`
            return (Math.sqrt(Math.pow(num1-num3, 2)+Math.pow(num2-num4, 2))+Math.sqrt(Math.pow(num3-num5, 2)+Math.pow(num4-num6, 2))+Math.sqrt(Math.pow(num1-num5, 2)+Math.pow(num2-num6, 2))).toFixed(rounding)
        case '*':
            throwoffMargin = 1
            rounding = 0
            var num1 = getRandomInt(10)+1;
            var num2 = getRandomInt(10)+1;
            problemText = `${num1} * ${num2}`
            return num1 * num2;
            
    }
}

function displayProblem(problemText) {
    document.getElementById('problem').textContent = problemText;
}

function debug(text) {
    document.getElementById('debug').textContent = text;
}

function debug2(text) {
    document.getElementById('debug2').textContent = text;
}

function generateOptions(correctAnswer) {
    let answers = new Set();
    answers.add(correctAnswer);
    
    let above = getRandomInt(4) + 1
    for (let i = 0; i < above; i++) {
        const wrongAnswer = (correctAnswer + (throwoffMargin * (i + 1)));
        answers.add(wrongAnswer);
    }
    debug([...answers].join(' '))
    while (answers.size < 6) {
        const wrongAnswer = (correctAnswer - (throwoffMargin * (i + 1)));
        answers.add(wrongAnswer);
    }
    const shuffledAnswers = Array.from(answers).sort();

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = function() { checkAnswer(answer, correctAnswer); };
        optionsContainer.appendChild(button);
    });
    
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong! Correct answer was " + correctAnswer);
    }
    generateProblem(); // generate a new problem automatically
}

document.addEventListener('DOMContentLoaded', function() {
    generateProblem(); // Initialize the first problem on load
});
