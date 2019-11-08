var multiplier = 10

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        // on correct answer, increase score and multiplier
        this.score += Math.round(1 * multiplier);
        multiplier += multiplier * 0.2;
    } else {
        // reset score multiplier
        multiplier = 10;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


function drawScreen() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // Question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // Option
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        // Current Score
        var element = document.getElementById("current_score");
        element.innerHTML = "<p>Your score is currently " + quiz.score + "</p>"

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        drawScreen();
    }
};


function showProgress() {
    var currentQuestion = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestion + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// shuffle
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// create questions here
var questions = [
    new Question("The Headless Horseman", ["POLTERGEIST", "NOTAGEIST"], "POLTERGEIST"),
    new Question("Agnes Sampson", ["POLTERGEIST", "NOTAGEIST"], "POLTERGEIST"),
    new Question("Muma Pădurii", ["POLTERGEIST", "NOTAGEIST"], "POLTERGEIST"),
    new Question("Drummer of Tedworth", ["POLTERGEIST", "NOTAGEIST"], "POLTERGEIST"),
    new Question("The Silbón", ["POLTERGEIST", "NOTAGEIST"], "POLTERGEIST"),
    new Question("The Child Catcher", ["POLTERGEIST", "NOTAGEIST"], "NOTAGEIST"),
    new Question("The Running Policeman", ["POLTERGEIST", "NOTAGEIST"], "NOTAGEIST"),
    new Question("Nurse Maxi", ["POLTERGEIST", "NOTAGEIST"], "NOTAGEIST"),
    new Question("The Headless Nun", ["POLTERGEIST", "NOTAGEIST"], "POLTERGEIST"),
    new Question("The Yellow Lady", ["POLTERGEIST", "NOTAGEIST"], "NOTAGEIST"),
    new Question("The Glaring Deer", ["POLTERGEIST", "NOTAGEIST"], "NOTAGEIST"),
    new Question("Limping Wizard", ["POLTERGEIST", "NOTAGEIST"], "NOTAGEIST"),

];

// shuffle the questions
questions = shuffle(questions)

// create quiz
var quiz = new Quiz(questions);

// display quiz
drawScreen();