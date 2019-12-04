var timerEl  = document.querySelector("#timer");
var highScoreEl = document.querySelector("#highScores");
var QuestionEl = document.querySelector("#questionText");
var ChoicesEl = document.querySelector("#answerChoices");
var rightWrong = document.querySelector("#answerFeedback");
var startQuiz = document.querySelector("#start");
var nextButton = document.querySelector("#next");


var userScore = 0
var totalSeconds = 0
var secondsElapsed = 0
var interval
var objIndex = 0
var highScoreArray = [
    {
        initials: "tc",
        score: "10"
    },
    {
        initials: "mp",
        score: "9"
    }
];
localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));

//timer functions
function setTotalSeconds(){
    for (i = 0; i < questions.length; i++) {
            totalSeconds += 15
        };
   
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
//setting question and answer elements with content from questions.js
function questionsnChoices() {
    //for(i = 0; i < questions.length; i++) {
       QuestionEl.textContent = questions[objIndex].title;

       questions[objIndex].choices.forEach(function appendChoices(choice){
            var li = document.createElement("li");
            li.innerHTML = "<button>" + choice + "</button>";
            li.children[0].classList = "btn btn-primary my-1 col-12"
            ChoicesEl.append(li)
            }); 
       
    };
    
//};

// get stored high scores
function getScores(){
    var storedScores = JSON.parse(localStorage.getItem("highScoreArray"));
    if(storedScores !== null){
        highScoreArray = storedScores
    }
};
console.log(highScoreArray);

function storeScores() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
  };

function finalScore(){
    
}

startQuiz.addEventListener("click", function(){
    startQuiz.style.display = "none";
    nextButton.style.display = "inline";
   setTotalSeconds();
   startTimer(); 
   questionsnChoices(); 

    document.querySelectorAll("li").forEach(function(listItem){
        listItem.addEventListener("click", function(){
            console.log(this.textContent)
            console.log(questions[objIndex].answer)
            if(this.textContent == questions[objIndex].answer) {
                rightWrong.textContent = "Correct!";
                userScore += 5;
                console.log(userScore)
            } else
            {rightWrong.textContent = "Incorrect!";
            secondsElapsed += 15;
            console.log(userScore)
            };
            return;
        })
      
    })
console.log(userScore)  
    nextButton.addEventListener("click", function(){
        ChoicesEl.textContent = ""
        objIndex += 1;
        questionsnChoices(); 
        document.querySelectorAll("li").forEach(function(listItem){
            listItem.addEventListener("click", function(){
                console.log(this.textContent)
                console.log(questions[objIndex].answer)
                if(this.textContent == questions[objIndex].answer) {
                    rightWrong.textContent = "Correct!"
                } else
                {rightWrong.textContent = "Incorrect!"};
                
            })
            
        })

    })
   

})



// function startQuiz(){
//   
  
//   if(event.target)

// }




// for function once quiz starts
// if(event.target.matches( "button")) {
//     if(event.target.textContent === questions[i].answer){
//         rightWrong.textContent = "Correct!";
//         secondsElapsed++;
//     } else{
//         rightWrong.textContent = "Incorrect.";
//         secondsElapsed += 15

//     }
