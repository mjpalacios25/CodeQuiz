var timerEl  = document.querySelector("#timer");
var highScoreEl = document.querySelector("#highScores");
var QuestionEl = document.querySelector("#questionText");
var ChoicesEl = document.querySelector("#answerChoices");
var rightWrong = document.querySelector("#answerFeedback");
var startQuiz = document.querySelector("#start");
var nextButton = document.querySelector("#next");
var modalEl = document.querySelector("#modal-container");
var closeEl = document.querySelector(".close");
var modalNameEl = document.querySelector("#modal-name");
var scoreListEl = document.querySelector("#scoreList");
var initialsEl = document.querySelector("#initials-Container");
var initialsText = document.querySelector("#initials-enter");
var finalScoreEl = document.querySelector("#testScore")
var saveBtn = document.querySelector("#save");


var userScore = 0
var totalSeconds = 0
var secondsElapsed = 0
var interval
var objIndex = 0
var highScoreArray = [
    {
        initials: "tc",
        score: "60"
    },
    {
        initials: "mp",
        score: "50"
    }
];

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
};
//setting question and answer elements with content from questions.js
function questionsnChoices() {
       QuestionEl.textContent = questions[objIndex].title;

       questions[objIndex].choices.forEach(function appendChoices(choice){
            var li = document.createElement("li");
            li.innerHTML = "<button>" + choice + "</button>";
            li.children[0].classList = "btn btn-primary my-1 col-12";
            li.children[0].setAttribute("answered", "false")
            ChoicesEl.append(li);
            }); 
    };

// local storage of scores
function getScores(){
    var storedScores = JSON.parse(localStorage.getItem("highScoreArray"));
    if(storedScores !== null){
        highScoreArray = storedScores
    } else {
        highScoreArray = []
    }
};
console.log(highScoreArray);

function storeScores() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
  };

function finalScore(){
    var secondsLeft = totalSeconds - secondsElapsed
    userScore = userScore + secondsLeft;
};

//modal events

function closeModal() {
    modalEl.style.display = "none";

};

function closeInitials() {
    initialsEl.style.display = "none";

};
  
function handleClick(event) {
    if (event.target.matches("p")) {
      event.preventDefault();
      modalEl.style.display = "block";
      modalNameEl.textContent = "High Scores";

      for(i=0; i < highScoreArray.length; i++){
      var li = document.createElement("li");  
      var initials = highScoreArray[i].initials;
      var testScore = highScoreArray[i].score;
      li.innerHTML = initials + " : " + testScore;
      scoreListEl.append(li)
    }
      
  }};

  function saveUserInfo(event){
    if(event.target.matches("button")) {
        event.preventDefault();
        scoreListEl.textContent = [];
        var initialsInput = initialsText.value;
        
        highScoreArray.push({initials: initialsInput, score: userScore});
        storeScores();
        closeInitials();
    }
  }

//start of clicking events

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
                console.log(userScore);
                this.children[0].setAttribute("disabled", true);
            } else
            {rightWrong.textContent = "Incorrect!";
            secondsElapsed += 15;
            console.log(userScore);
            this.children[0].setAttribute("disabled", true);
            };
        })
      
    })
console.log(userScore)  

});

nextButton.addEventListener("click", function(){
        ChoicesEl.textContent = ""
        objIndex += 1;

        if(objIndex >= questions.length ) {
            QuestionEl.textContent = "You're all done!";
            finalScore();
            console.log(userScore);
            initialsEl.style.display = "block";
            finalScoreEl.textContent = userScore;
            stopTimer();
            this.setAttribute("disabled", true);
            return;
        };

        questionsnChoices(); 
        document.querySelectorAll("li").forEach(function(listItem){
            listItem.addEventListener("click", function(){
                console.log(this.textContent)
                console.log(questions[objIndex].answer)
                
                if(this.textContent == questions[objIndex].answer) {
                    rightWrong.textContent = "Correct!";
                    userScore += 5;
                    console.log(userScore);
                } else
                {rightWrong.textContent = "Incorrect!";
                secondsElapsed += 15;
                console.log(userScore)
                };
                // trying to stop users from 
                // listItem.foreach(function(event){
                //     event.preventDefault()
                // });

                return;
    
            });
          
        });

        

    });

getScores();
highScoreEl.addEventListener("click", handleClick);
closeEl.addEventListener("click", closeModal);
document.addEventListener("click", function(event) {
    if (event.target === modalEl) {
      closeModal();
    }
  });

saveBtn.addEventListener("click", saveUserInfo);
