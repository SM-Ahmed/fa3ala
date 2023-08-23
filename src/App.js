import logo1 from './logo1.png';
import logo2 from './logo2.png';
import logo3 from './logo3.png';
import logo4 from './logo4.png';
import logo5 from './logo5.png';
import logo6 from './logo6.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
          <div className="App-logo">
            <img id="f6" src={logo1}></img>
            <img id="f5" src={logo2}></img>
            <img id="f4" src={logo3}></img>
            <img id="f3" src={logo4}></img>
            <img id="f2" src={logo5}></img>
            <img id="f1" src={logo6}></img>
          </div>
        </>
        <p>
          Learn Arabic conjugations
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's go! يَلَّا
        </a>
      </header>
    </div>
  );
}

export default App;
