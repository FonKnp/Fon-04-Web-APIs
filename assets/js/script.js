var questions = [
  {
    question: 'What HTML tag element do we put the JavaScript in?',
    choices: ['<script>','<javascript>','<link>','<link rel=javascript>'],
    correctAnswer: '<script>'
  },
  {
    question: 'Array in JavaScript could be use to store________.',
    choices: ['number','string','boolean','All of the above'],
    correctAnswer: 'All of the above'
  },
  {
    question: 'What will log if you console.log(typeof NaN);',
    choices: ['NaN','undefined','number','null'],
    correctAnswer: 'number'
  },
  {
    question: 'Is JavaScript is case-sensitive?',
    choices: ['Yes','No','Maybe','I don\'t know'],
    correctAnswer: 'Yes'
  },
  {
    question: 'How to get a random number from 1 to 10 in JavaScript?',
    choices: ['Math.floor(Math.random()*10) + 1','Math.ceil(random()++)','Math.random(Math.floor()*10)','None of the above'],
    correctAnswer: 'Math.floor(Math.random()*10) + 1'
  }
];

var currentQuestion = 0;
var score = '';
var timeLeft = 60;
var timerInterval;

var startBt = document.getElementById("start-btn");
var restartBt = document.getElementById("restart-btn");
var quizContainer = document.getElementById("quiz-container");
var questionAll = document.getElementById("question");
var choicesAll = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var initialInput = document.getElementById("initial-input");
var submitBt = document.getElementById("submit-initials");
var scorePoint = document.getElementById("highscore");
var highscoreContainer = document.getElementById('highscore-container');
var clearBt = document.getElementById("clear-highscores-btn");
var navBar = document.querySelector('nav');
var viewscores = document.getElementById('viewscores');
var titleEl = document.getElementById('titleEl');

startBt.addEventListener("click", startQuiz);
clearBt.style.display = 'none';
highscoreContainer.style.display = 'none';

viewscores.addEventListener("click", function () {
    var initials = document.getElementById("initials").value;
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort(function (a, b) { return b.score - a.score; });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    navBar.style.display = 'none';
    quizContainer.style.display = "none";
    startBt.style.display = "none";
    titleEl.style.display = 'none';
    restartBt.style.display = "block";
    highscoreContainer.style.display = 'block';
    showHighscores(highscores);
});

function startQuiz() {
    startBt.style.display = "none";
    restartBt.style.display = "none";
    quizContainer.style.display = 'flex';
    titleEl.style.display = 'none';
    score = 0;
    timeLeft = 60;
    currentQuestion = 0;
    showQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

function showQuestion() {
    var q = questions[currentQuestion];
    questionAll.textContent = q.question;
    questionAll.setAttribute('style', 'font-size: 25px; font-weight: bold;');
    choicesAll.innerHTML = "";
    var choicesList = document.createElement("ol");
    q.choices.forEach(function (choice) {
        var listItem = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", function () {
            checkAnswer(choice);
        });
        listItem.appendChild(button);
        choicesList.appendChild(listItem);
    });
    choicesAll.appendChild(choicesList);
}

function checkAnswer(answer) {
    var correctAnswer = questions[currentQuestion].correctAnswer;
    var resultContainer = document.createElement("div");
    resultContainer.setAttribute("id", "result-container");

    if (answer === correctAnswer) {
        score += 20;
        resultContainer.textContent = "Correct!";
    } else {
        timeLeft -= 15;
        if (timeLeft < 0) timeLeft = 0;
        resultContainer.textContent = "Wrong!";
    }

    choicesAll.appendChild(resultContainer);

    setTimeout(function () {
        resultContainer.remove();
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = 'Out!';
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    initialInput.style.display = "block";
    highscoreContainer.style.display = 'block';
    scorePoint.textContent = "Your score: " + score;
    restartBt.style.display = "block";
}

submitBt.addEventListener("click", function () {
    var initials = document.getElementById("initials").value;
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ initials : initials, score : score });
    highscores.sort(function (a, b) { return b.score - a.score; });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    initialInput.style.display = 'none';
    navBar.style.display = 'none';
    highscoreContainer.style.display = 'block';
    showHighscores(highscores);
});

function showHighscores(highscores) {
    scorePoint.innerHTML = "<h3>High Scores:</h3>";
    highscores.forEach(function (item, index) {
        var div = document.createElement("div");
        div.textContent = index + 1 + ". " + item.initials + " - " + item.score;
        scorePoint.appendChild(div);
        clearBt.removeAttribute('style');
    });
}

restartBt.addEventListener("click", function () {
    window.location.reload();
});

clearBt.addEventListener("click", function () {
    localStorage.removeItem("highscores");
    scorePoint.textContent = "High scores cleared!";
});