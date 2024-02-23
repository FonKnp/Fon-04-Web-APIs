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

let questionIndex = 0;
let highscore = 0;
let timeLeft = 5;

//start quiz
function startQuiz() {
  startButton.classList.add('hide');
}

//countdown time
function setTime() {
  var timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + ' s';
    
    if(timeLeft === 0) {
      clearInterval(timerInterval);
      questionAll.textContent = 'Your time is up!';
      clearInterval(timerInterval);
      
    }
  }, 1000)
  showQustion();
}


function updateTimer() {
  timerEl.textContent = timeLeft + ' s';
}

function showQustion() {
  let currentQuestion = quiz[questionIndex];
  questionAll.textContent = currentQuestion.question;
  choicesAll.innerHTML = '';
  currentQuestion.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', () => {
      if (choice === currentQuestion.answer) {
        resultAll.textContent = 'You are correct!!!';
      } else {
        resultAll.textContent = 'WRONG ANSWER!!!';
        timeLeft -= 10;
        if (timeLeft < 0) {
          timeLeft = 0;
        }
        updateTimer();
      }
      setTimeout(() => {
        questionIndex++;
        if (questionIndex < quiz.length) {
          showQustion();
          resultAll.textContent = '';
        } else {
          questionAll.textContent = 'You are done with the quiz. Nice job!';
          choicesAll.innerHTML = '';
          
        }
      }, 1000);
    });
  });
}

startButton.addEventListener('click', setTime);

