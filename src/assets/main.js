let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    
    if (answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }

    if (validateInput(input.value)) {
        attempt.value++;
    } else {
        return false;
    }

    if (getResults(input.value)) {
        setMessage("Winner!");
        showAnswer(true);
        showReplay();
    } else if (attempt > 9) {
        setMessage("Loser!");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again!");
    }

}

//implement new functions here

function setHiddenFields() {
    min = 0;
    max = 9999;
    random = Math.floor(Math.random() * (max - min)) + min;
    random = random.toString();

    while (random.length < 4) {
        random = "0" + random;
    }

    answer.value = random;
    attempt.value = 0;
}

function setMessage(input) {
    document.getElementById('message').innerHTML = input;

}

function validateInput(input) {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}

function getResults(input) {
    correctCount = 0;
    resultsElement = document.getElementById('results');
    results = '<div class="row"><span class="col-md-6">' + input 
        + '</span><div class="col-md-6">';

    for (i = 0; i < input.length; i++) {
        if (input[i] === answer.value[i]) {
            results += '<span class="glyphicon glyphicon-ok"></span>';
            correctCount++;
        } else if (answer.value.includes(input[i])) {
            results += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            results += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }

    results += '</div></div>';
    resultsElement.innerHTML = results;

    if (correctCount === input.length)
        return true;
    return false;
}

function showAnswer(input) {
    code = document.getElementById('code');
    code.innerHTML = answer.value;

    if (input) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
}

function showReplay() {
    guessingDiv = document.getElementById('guessing-div');
    replayDiv = document.getElementById('replay-div');

    guessingDiv.style.display = "none";
    replayDiv.style.display = "block";
}

