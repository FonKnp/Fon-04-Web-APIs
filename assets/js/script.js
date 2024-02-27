// add quiz variable that contain arrays of question, choices, and correct answer
const quiz = [
  {
    question: 'What HTML tag element do we put the JavaScript in?',
    choices: ['<script>','<javascript>','<link>','<link rel=javascript>'],
    answer: '<script>'
  },
  {
    question: '1',
    choices: ['1','1','2','1'],
    answer: '2'
  },
  {
    question: '1',
    choices: ['1','1','3','1'],
    answer: '3'
  },
  {
    question: 'Is JavaScript is case-sensitive?',
    choices: ['Yes','No'],
    answer: 'Yes'
  },
]

var questionAll = document.getElementById('question');
var choicesAll = document.getElementById('choices');
var resultAll = document.getElementById('result');
var timerEl = document.getElementById('time');
var startButton = document.getElementById('start-button');
var restartButton = document.getElementById('restart-button');
var highscoreList = document.getElementById('scores-list');

let questionIndex = 0;
let highscore = 0;
let timeLeft = 5;

//start quiz
function startQuiz() {
  startButton.style.display = 'none';
  setTime();
  showQustion();
}
// show question
function showQustion() {
  let currentQuestion = quiz[questionIndex];
  questionAll.textContent = currentQuestion.question;
  choicesAll.innerHTML = '';
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', () => {
      checkAnswer();
    });
    choicesAll.appendChild(button);
  });
}

//check answer function
function checkAnswer() {

}

//countdown time
function setTime() {
  var timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + ' s';
    
    //times run out
    if(timeLeft === 0) {
      questionAll.textContent = 'Your time is up!';
      choicesAll.innerHTML = '';
      clearInterval(timerInterval);
    }
  }, 1000)
}

//highscore function
var scores = '';

function renderHighscores() {
  highscoreList.innerHTML = '';

  for (var i =o; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement('li');
    li.textContent = score;
    
    highscoreList.appendChild(li);
  }
}



function updateTimer () {
  
}
startButton.addEventListener('click', startQuiz);

