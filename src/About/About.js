import React from "react"
import './About.css';

export default function About () {
    return (
        <div className="About">
            <Header />
            <div className="About-text">
                <p>
                    This website is designed for Arabic language students who wish to improve their verb conjugations.<br /><br />
                    Test yourself from a broad bank of verbs taken from Nahmad & Haywood ("A New Arabic Grammar").<br /><br />
                    Personalise your learning by making use of a wide range of filters, including form, verb weakness, tense, and voice.<br /><br />
                    Note that answers must be typed in Arabic, including all vowellings except long alifs (e.g. فاعَلَ). <br /><br />
                    This site is still in development. Look forward to more verb forms and weak verbs in the future!
                </p><br />
                <h4>Acknowledgements</h4>
                <p>
                    With special thanks to James Wrathall for his support and assistance throughout the development of this website. 
                </p><br />
                <footer>
                    <a href="/"><button>Return</button></a>
                </footer>
            </div>
        </div>
    )
}

function Header() {
    return(
      <div>
        <h1 className="About-header">About (المعلومات)</h1>
      </div>
    )
  }
