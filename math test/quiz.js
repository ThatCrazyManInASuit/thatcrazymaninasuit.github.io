const questionBank = ['0', '1', '2', '3', '4']
let problemText, throwoffMargin, rounding, correctAnswer, originTest;
let numBank = []
let alphaBank = ['(A) ', '(B) ', '(C) ', '(D) ', '(E) ']
document.addEventListener('DOMContentLoaded', function() {
    generateProblem(); // Initialize the first problem on load
});
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
    let question = questionBank[Math.floor(Math.random() * questionBank.length)];
    
    switch (question) {
        case '0': 
            throwoffMargin = .02
            rounding = 2
            originTest = '2024 Region'
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
                            $${(rentRate * daysRented2 + miles2 * mileageRate).toFixed(rounding)}. Find the charge for each mile driven.`;
            correctAnswer = mileageRate.toFixed(rounding);
            break;
        case '1': 
            throwoffMargin = .2
            rounding = 1
            originTest = '2024 Region'
            let i = 0
            while (i < 8) {
                numBank.push(getRandomInt(21)-10)
                i++
            } 
            problemText = `Given points A(${numBank[0]},${numBank[1]}), B(${numBank[2]},${numBank[3]}), C(${numBank[4]},${numBank[5]}), D(a,b) and 
            E(${numBank[6]},c). \n Find the perimeter of triangle ABC. (nearest tenth)`
            correctAnswer = (Math.sqrt(Math.pow(numBank[0]-numBank[2], 2)+Math.pow(numBank[1]-numBank[3], 2))+Math.sqrt(Math.pow(numBank[2]-numBank[4], 2)+Math.pow(numBank[3]-numBank[5], 2))+Math.sqrt(Math.pow(numBank[0]-numBank[4], 2)+Math.pow(numBank[1]-numBank[5], 2))).toFixed(rounding)
            break;
        case '2':
            var num = getRandomInt(9)+1;    
            throwoffMargin = num
            rounding = 0
            originTest = 'UIL Math B 2008'
            var randomPow = getRandomInt(num)+1
            var randomMult = getRandomInt(Math.pow(num, randomPow)/num)+1
            problemText = `(${num})<sup>${num}</sup> &divide (${randomMult*num} + ${Math.pow(num, randomPow) - randomMult * num}) - ${num}! &times sqrt(${Math.pow(num, 2)})`
            correctAnswer = Math.pow(num, num-randomPow) - factorial(num) * num;
            break;
        case '3':
            throwoffMargin = 2
            rounding = 0
            originTest = 'UIL Math B 2008'
            var x = (getRandomInt(9)+1)
            var y = (getRandomInt(9)+1)
            problemText = `If x+y=${x+y} and xy=${x*y} then x<sup>3</sup>+y<sup>3</sup>=?`
            correctAnswer = Math.pow(x, 3) + Math.pow(y, 3)
            break;
        case '4':
            throwoffMargin = 176
            rounding = 0
            originTest = 'UIL Math B 2008'
            var num = (getRandomInt(30)+1) * 10
            problemText = `${num} miles per hour is equivalent to ___________ inches per second.`
            correctAnswer = (num * 17.6).toFixed(rounding)
            break;
    }

    let answers = new Set();
    answers.add(correctAnswer);
    let above = getRandomInt(4) + 1
    for (let i = 0; i < above; i++) {
        const wrongAnswer = (Number(correctAnswer) + throwoffMargin * (i + 1)).toFixed(rounding);
        answers.add(wrongAnswer);
    }
    for (let i = 0; i < 4-above; i++) {
        const wrongAnswer = (Number(correctAnswer) - throwoffMargin * (i + 1)).toFixed(rounding);
        answers.add(wrongAnswer);
    }

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    let options = Array.from(answers).sort()
    for (let i = 0; i < options.length; i++) {
        const button = document.createElement('button');
        button.textContent = alphaBank[i] + options[i];
        button.onclick = function() { checkAnswer(options[i], correctAnswer); };
        function checkAnswer(selectedAnswer, correctAnswer) {
            if (selectedAnswer === correctAnswer) {
                alert("Correct!");
            } else {
                alert("Wrong! Correct answer was " + correctAnswer);
            }
            generateProblem(); // generate a new problem automatically
        }
        optionsContainer.appendChild(button);
    }
    console.log(originTest)
    document.getElementById('problem').innerHTML = problemText;
    document.getElementById('debug').textContent = 'debug: ' + correctAnswer;
    document.getElementById('originTest').textContent = originTest;

}
