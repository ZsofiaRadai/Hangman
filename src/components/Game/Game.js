import { useEffect, useState } from "react";
import "./Game.css";
import words from "../../resources/words";

function Game() {
	const [chosenWord, setChosenWord] = useState(
		words[Math.floor(Math.random() * words.length)]
	);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isGameWon, setIsGameWon] = useState(false);
	const [correctLetters, setCorrectLetters] = useState([]);
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [countCorrestGuesses, setCountCorrectGuesses] = useState(0);
	const [lives, setLives] = useState(10);

	let alphabet = "abcdefghijklmnopqrstuvwxyz";

	let gameStatus = isGameOver
		? isGameWon
			? "You win!"
			: "Game over!"
		: `You have ${lives} lives`;

	useEffect(() => {
		checkGameStatus();
	}, [guessedLetters]);

	function resetGame() {
		setChosenWord(words[Math.floor(Math.random() * words.length)]);
		setIsGameOver(false);
		setIsGameWon(false);
		setCountCorrectGuesses(0);
		setCorrectLetters([]);
		setGuessedLetters([]);
		setLives(10);
	}

	function checkGuess(guess) {
		if (chosenWord.includes(guess)) {
			let correctCharsArr = chosenWord
				.split("")
				.filter((char) => char === guess);
			setCorrectLetters((prevCorrect) => [...prevCorrect, guess]);
			setCountCorrectGuesses(
				countCorrestGuesses + correctCharsArr.length
			);
		} else if (!isGameOver) {
			setLives(lives - 1);
		}
		setGuessedLetters((prevGuesses) => [...prevGuesses, guess]);
	}

	function checkGameStatus() {
		if (countCorrestGuesses === chosenWord.replace(" ", "").length) {
			setIsGameOver(true);
			setIsGameWon(true);
		}
		if (lives === 0) {
			setIsGameOver(true);
		}
	}

	let disableLetter = (letter) =>
		guessedLetters.includes(letter) ? "guessedStyle" : "";

	let disableAllLetters = isGameOver ? "disabledGameField" : "";

	let alphabetButtons = (
		<ul className={`alphabet-container ${disableAllLetters}`}>
			{alphabet.split("").map((letter, i) => (
				<li
					onClick={() => checkGuess(letter)}
					key={i}
					className={`alphabet ${disableLetter(letter)}`}
				>
					{letter}
				</li>
			))}
		</ul>
	);

	let displayedChar = (char) => {
		const defaultChar = char === " " ? " " : "_";
		if (correctLetters.length === 0) {
			return defaultChar;
		} else {
			return correctLetters.includes(char) ? char : defaultChar;
		}
	};

	let result = (
		<ul className="guess">
			{chosenWord.split("").map((char, i) => (
				<li key={i}>{displayedChar(char)}</li>
			))}
		</ul>
	);

	let hangman = (
		<svg className="hangman" viewBox="0 0 10 12">
			{lives < 10 && <path d="M1,11 h8" />}
			{lives < 9 && <path d="M1,11 v-10" />}
			{lives < 8 && <path d="M5,1 h-4" />}
			{lives < 7 && <path d="M5,1 v2" />}
			{lives < 6 && <circle cx="5" cy="4" r="1" />}
			{lives < 5 && <path d="M5,5 v3" />}
			{lives < 4 && <path d="M5,5 l-2,2" />}
			{lives < 3 && <path d="M5,5 l2,2" />}
			{lives < 2 && <path d="M5,8 l-2,2" />}
			{lives < 1 && <path d="M5,8 l2,2" />}
		</svg>
	);

	return (
		<div>
			<div>{alphabetButtons}</div>
			<div>{result}</div>
			<h2>{gameStatus}</h2>
			<button onClick={() => resetGame()} className="resetButton">
				Play again
			</button>
			<div>{hangman}</div>
		</div>
	);
}

export default Game;
