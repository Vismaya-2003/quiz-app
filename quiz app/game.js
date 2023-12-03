const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What are the large rocks that orbit the sun between Mars and Jupiter called?',
        choice1: 'Planets',
        choice2: 'Stars',
        choice3: 'Asteroids',
        choice4: 'Galaxy',
        answer: 3,
    },
    {
        question: 'How many inches are in a foot?',
        choice1: '11',
        choice2: '12',
        choice3: '13',
        choice4: '14',
        answer: 2,
    },
    {
        question: 'What land mass on earth is known as the "Island Continent"??',
        choice1: 'Zimbabwe',
        choice2: 'Carribean Islands',
        choice3: 'South Africa',
        choice4: 'Australia',
        answer: 4,
    },
    {
        question: 'Which is the largest planet of the solar system?',
        choice1: 'Jupiter',
        choice2: 'Saturn',
        choice3: 'Uranus',
        choice4: 'Neptune',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ?  'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        },1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

