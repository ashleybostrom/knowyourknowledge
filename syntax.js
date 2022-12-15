// HTML Elements
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz questions
var quizQuestions = [{
    question: "Using if/else is an example of:",
    choiceA: "Iteration",
    choiceB: "Sequencing",
    choiceC: "Selection",
    choiceD: "Indecision",
    correctAnswer: "c"
},
{
    question: "Common attribute types include:",
    choiceA: "Image",
    choiceB: "Link",
    choiceC: "Global",
    choiceD: "All of the above",
    correctAnswer: "d"
},
{
    question: "In flexbox, the area that controls the width and height of the material inside is:",
    choiceA: "Content",
    choiceB: "Padding",
    choiceC: "Border",
    choiceD: "Margin",
    correctAnswer: "a"
},
{
    question: "When creating a closing tag, the opening angle bracket is followed by:",
    choiceA: "?",
    choiceB: "/",
    choiceC: ".",
    choiceD: "`",
    correctAnswer: "b"
},
{
    question: "HTML is what type of language?",
    choiceA: "Scripting",
    choiceB: "Markup",
    choiceC: "Network",
    choiceD: "Programming",
    correctAnswer: "b"
},
{
    question: "What is wireframing?",
    choiceA: "A visual representation of our page layout and design",
    choiceB: "A way to wrap the flexbox in thin lines",
    choiceC: "How we transmit the data between frameworks",
    choiceD: "The last steps of web design",
    correctAnswer: "a"
},

];
// Other global vars
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score;
var correct;

// Cycle through the object array containing the quiz questions to generate questions and answers.
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts TimeRanges, hides start button, and displays first quiz question.
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// End page screen that displays score after either completing quiz or upon time running out.
function showScore() {
    score = timeLeft
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score;
}

// On click of submit button, run function highscore that saves and stringifies array of high scores in local storage
// also pushes the new user name and score into array to go to local storage. Then run function to show high scores.

submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// Clear the list for the high scores and generate a new high score list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Display the high scores page while hiding all of the other pages 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clear local storage of high scores and the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Set all vars back to original values and show the home page to enable replay
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Check response 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        timeLeft += 5;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in results div answer is correct and add 5 seconds to the score.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        timeLeft -= 5;
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in results div answer is incorrect and subtract 5 seconds from the score.
    } else {
        showScore();
    }
}

// Quiz start
startQuizButton.addEventListener("click", startQuiz);