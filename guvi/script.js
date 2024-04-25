const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '3', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'London', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Berlin', correct: false },
            { text: 'Rome', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;

startQuiz();

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                showQuestion(questions[currentQuestionIndex]);
            }, 1000);
        } else {
            nextButton.innerText = 'Finish';
            nextButton.onclick = finishQuiz;
        }
    } else {
        nextButton.style.display = 'block';
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function finishQuiz() {
    // You can add finishing logic here, like showing the user's score
    alert('Quiz finished!');
}
