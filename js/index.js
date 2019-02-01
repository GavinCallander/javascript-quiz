console.log("JS file is linked up!");


//variables



//totalScore


//array of player answer

// array of questions
//    question object

var questions = [

]

fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple")
  .then(function (data) {
    return data.json();
  }).then(function (json) {
    //console.log(json.results); //array of object
    var resultsArr = json.results

    resultsArr.forEach(function (result) {
      let myQuestion = {};
      myQuestion.question = result.question;
      myQuestion.correctAnswer = result.correct_answer;
      myQuestion.answers = [];
      myQuestion.answers.push(result.incorrect_answers[0]);
      myQuestion.answers.push(result.incorrect_answers[1]);
      myQuestion.answers.push(result.incorrect_answers[2]);
      myQuestion.answers.push(result.correct_answer);

      questions.push(myQuestion);
    });

    updateQuestion();


  });

// var questions = [
//   {
//     question: "this is the question",
//     answers: ["one", "two", "three", "four"],
//     correctAnswer: "one"
//   },
//   {
//     question: "this is another question",
//     answers: ["a", "b", "c", "d"],
//     correctAnswer: "b"
//   },
//   {
//     question: "this is yet another question",
//     answers: ["a1", "b2", "c3", "d4"],
//     correctAnswer: "d4"
//   }
// ];
var questionBox = document.querySelector('.question-box');
//select all answer divs -> change textContent
var answers = document.querySelectorAll('.answer');

function updateQuestion() {
  questionBox.textContent = questions[0].question;
  answers.forEach(function (answer, i) {
    answer.textContent = questions[0].answers[i];
    answer.addEventListener('click', selectAnswer);
  })
}


var nextBtn = document.querySelector("#next-button");
nextBtn.addEventListener("click", nextQuestion);

// var prevBtn = document.querySelector("#back-button");
// prevBtn.addEventListener("click", prevQuestion);


// function to change question, answer
function nextQuestion() {
  questionBox.textContent = questions[currentQuestion].question;

  answers.forEach(function (answer, i) {
    answer.textContent = questions[currentQuestion].answers[i];
  });

}

// function prevQuestion() {
//   currentQuestion--;
//   questionBox.textContent = questions[currentQuestion].question;

//   answers.forEach(function (answer, i) {
//     answer.textContent = questions[currentQuestion].answers[i];
//   });
// }

var playerAnswers = [];
var playerScore = 0;
var currentQuestion = 0;

// function to select answer
function selectAnswer() {
  playerAnswers.push(this.textContent);
  console.log(playerAnswers);
  compareAnswer();
}

// function to compare player vs correct
function compareAnswer() {
  if (playerAnswers[currentQuestion] === questions[currentQuestion].correctAnswer) {
    console.log("correct");
    playerScore++;
    console.log(playerScore);
  } else {
    console.log("Incorrect")
  }

  if (currentQuestion < questions.length) {
    currentQuestion++;
  } else {
    endGame();
  }
}

var modal = document.querySelector('.modal');


function endGame() {
  modal.classList.toggle('hidden');
  modal.querySelector('h2').textContent = "You scored " + playerScore;
}

document.querySelector('#close').addEventListener('click', function () {
  modal.classList.toggle('hidden');
})



