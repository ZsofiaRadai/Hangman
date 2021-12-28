import './App.css';
import Game from './components/Game/Game';

function App() {
  return (
    <div className="App">
      <header>
        <h1>HANGMAN</h1>
        <h3>Hangman Game in React</h3>
        <h3>Use the alphabet below to guess the word before you run out of lives.</h3>
      </header>

      <div className="gameContainer">
        <Game />
      </div>
    </div>
  );
}

export default App;
