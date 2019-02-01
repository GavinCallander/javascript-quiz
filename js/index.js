console.log("JS file is linked up!");

//variables

var questionBox = document.querySelector(".question-box");
var answers = document.querySelectorAll(".answer");

var scoreSpan = document.querySelector("#score-span");

var nextBtn = document.querySelector("#next-button");

var playerScore = 0;
var currentQuestion = 0;

// array of questions
//    question object
var questions = [];
document.addEventListener("DOMContentLoaded", function() {
fetch(
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple"
)
  .then(function(data) {
    return data.json();
  })
  .then(function(json) {
    //console.log(json.results); //array of object
    var resultsArr = json.results;

    resultsArr.forEach(function(result) {
      let myQuestion = {};
      myQuestion.question = result.question;
      myQuestion.correctAnswer = result.correct_answer;
      myQuestion.answers = [];
      myQuestion.answers.push(result.incorrect_answers[0]);
      myQuestion.answers.push(result.incorrect_answers[1]);
      myQuestion.answers.push(result.incorrect_answers[2]);
      // randomize adding correct_answer
      let randnum = Math.floor(Math.random() * 4);
      myQuestion.answers.splice(randnum, 0, result.correct_answer);

      questions.push(myQuestion);
    });

    updateQuestion();
  });
});

nextBtn.addEventListener("click", updateQuestion);

function updateQuestion() {
  // update question
  questionBox.querySelector("p").innerHTML =
    questions[currentQuestion].question;
  // update each answer, clear classes, add event listener
  answers.forEach(function(answer, i) {
    answer.innerHTML = questions[currentQuestion].answers[i];
    answer.classList.remove("correct");
    answer.classList.remove("incorrect");
    answer.addEventListener("click", selectAnswer);
  });
}

// function to select answer & compare player vs correct
function selectAnswer() {
  // once clicked, remove all click events
  answers.forEach(function(answer) {
    answer.removeEventListener("click", selectAnswer);
  });
  // compare answer
  if (
    this.textContent === questions[currentQuestion].correctAnswer
  ) {
    console.log("correct");
    this.classList.add("correct");
    playerScore++;
    scoreSpan.textContent = `${playerScore}`;
  } else {
    console.log("Incorrect");
    this.classList.add("incorrect");
  }
  // when to end game
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
  } else {
    endGame();
  }
}

// MODAL end game

var modal = document.querySelector("#end-modal");

function endGame() {
  modal.classList.toggle("hidden");
  modal.querySelector("h2").textContent =
    "You scored " + playerScore + "/" + questions.length;
}

document
  .querySelector("#close")
  .addEventListener("click", function() {
    modal.classList.toggle("hidden");
  });

// start modal
var start = document.querySelector("#start");

document.querySelector("#start-button").addEventListener("click", function () {
  console.log('start');
  start.classList.toggle("hidden");
});