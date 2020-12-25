const problem = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
// CSS Starts
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")

let state = { score: 0, mistakes: 0 }
function Random(max) {return Math.floor(Math.random() * (max * 1))}
function rNumber() {return { nOne: Random(10), nTwo: Random(10), operator: ["+", "-", "x"][Random(2)] }}

function gQuestion() {
	// Storing in memory in state object so we can work with it later on in other functions
	state.cQuestion = rNumber()
	problem.innerHTML = `${state.cQuestion.nOne} ${state.cQuestion.operator} ${state.cQuestion.nTwo}`
	ourField.value = ""
	ourField.focus()
}gQuestion()

ourForm.addEventListener("submit", (e) => {
	e.preventDefault()
	let cAnswer;
	if (state.cQuestion.operator == "+") cAnswer = state.cQuestion.nOne + state.cQuestion.nTwo
	if (state.cQuestion.operator == "-") cAnswer = state.cQuestion.nOne - state.cQuestion.nTwo
	if (state.cQuestion.operator == "x") cAnswer = state.cQuestion.nOne * state.cQuestion.nTwo
	// === is to check for equality for (0-0 = 0 and not -0)
	if (parseInt(ourField.value, 10) === cAnswer) {
		state.score++
		// innerHTML should be used when setting html <p>, textContent if plain text
		pointsNeeded.textContent = 10 - state.score
		gQuestion()
		// CSS Styling
		renderProgressBar()
	} else {
		state.mistakes++
		mistakesAllowed.textContent = 2 - state.mistakes
		ourField.value = ""
		ourField.focus()
		problem.classList.add("animate-wrong")
		setTimeout(() => problem.classList.remove("animate-wrong"), 451)
	}
	cLogic();
});
function cLogic() {
	if (state.score == 10) {
		//CSS STYLING
		endMessage.textContent = "Congrats!"
		document.body.classList.add("overlay-is-open")
		setTimeout(() => resetButton.focus() , 331)
	}
	if (state.mistakes == 3) {
		//CSS STYLING
		endMessage.textContent = "Try Again!"
		document.body.classList.add("overlay-is-open")
		setTimeout(() => resetButton.focus() , 331)
	}
}
// CSS Styling 
resetButton.addEventListener("click", rGame)

function rGame() {
	document.body.classList.remove("overlay-is-open")
	gQuestion()
	state.score = 0
	state.mistakes = 0
	pointsNeeded.textContent = 10
	mistakesAllowed.textContent = 2
	renderProgressBar()
}
// CSS Styling
function renderProgressBar() {
	progressBar.style.transform = `scaleX(${state.score / 10})`
} 