import React from "react"
import logo1 from './images/logo1.png';
import logo2 from './images/logo2.png';
import logo3 from './images/logo3.png';
import logo4 from './images/logo4.png';
import logo5 from './images/logo5.png';
import logo6 from './images/logo6.png';
import logoBlank from './images/logoBlank.png';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <>
          <div className="Home-logo">
            <img id="f1" src={logo1}></img>
            <img id="f2" src={logo1}></img>
            <img id="f3" src={logo2}></img>
            <img id="f4" src={logo3}></img>
            <img id="f5" src={logoBlank}></img>
            <img id="f6" src={logo4}></img>
            <img id="f7" src={logo4}></img>
            <img id="f8" src={logo5}></img>
            <img id="f9" src={logo6}></img>
            <img id="f10" src={logoBlank}></img>
          </div>
        </>
        <br />
        <br />
        <br />
        <p>
          Learn Arabic conjugations
        </p>
        <br />
        <a href="/practice"><button>Let's go! يَلَّا</button></a>
      </header>
      <footer className="Home-footer">
        <p>Site created by Sayeed Ahmed</p>
      </footer>
    </div>
  );
}

export default Home;
