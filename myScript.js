var timerEl  = document.querySelector("#timer");
var highScoreEl = document.querySelector("#highScores");
var QuestionEl = document.querySelector("#questionText");
var ChoicesEl = document.querySelector("#answerChoices");
var rightWrong = document.querySelector("#answerFeedback");
var startQuiz = document.querySelector("#start");

var userScore = 0
var totalSeconds = 0
var secondsElapsed = 0
var interval

function setTotalSeconds(){
    for (i = 0; i < questions.length; i++) {
            totalSeconds += 15
        };
   // timerEl.textContent = "Timer " + totalSeconds 
}

function getMinutes(){
    var secondsLeft = totalSeconds - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft / 60);
    var formattedMinutes;
    if (minutesLeft < 10) {
        formattedMinutes = "0" + minutesLeft;
      } else {
        formattedMinutes = minutesLeft;
      }
    
      return formattedMinutes;
    };

function getSeconds(){
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;

    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
  
    return formattedSeconds;
};

function setTimer() {
    timerEl.textContent = "Timer " + getMinutes() + ":" + getSeconds();

    if(secondsElapsed >= totalSeconds){
        alert("Time is up!");
        stopTimer()
    };
};

function startTimer(){
    setTimer();

    interval = setInterval(function(){
        secondsElapsed++;
        setTimer();
    }, 1000)

};

function stopTimer(){
    secondsElapsed = 0;
    clearInterval(interval)
}

setTotalSeconds();
startTimer();


// for function once quiz starts
// if(event.target === "button") {
//     if(event.target.textContent === questions[i].answer){
//         rightWrong.textContent = "Correct!";
//         secondsElapsed++;
//     } else{
//         rightWrong.textContent = "Incorrect.";
//         secondsElapsed += 15

//     }
