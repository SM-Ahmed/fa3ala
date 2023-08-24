import React from "react"
import logo1 from './logo1.png';
import logo2 from './logo2.png';
import logo3 from './logo3.png';
import logo4 from './logo4.png';
import logo5 from './logo5.png';
import logo6 from './logo6.png';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <>
          <div className="Home-logo">
            <img id="f6" src={logo1}></img>
            <img id="f5" src={logo2}></img>
            <img id="f4" src={logo3}></img>
            <img id="f3" src={logo4}></img>
            <img id="f2" src={logo5}></img>
            <img id="f1" src={logo6}></img>
          </div>
        </>
        <br />
        <br />
        <br />
        <p>
          Learn Arabic conjugations
        </p>
        <br />
        <a
          className="Home-link"
          href="/practice"
        >
          Let's go! يَلَّا
        </a>
      </header>
      <footer className="Home-footer">
        <p>Site created by Sayeed Ahmed</p>
      </footer>
    </div>
  );
}

export default Home;
