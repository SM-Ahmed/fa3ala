import React from "react"
import './About.css';

export default function About () {
    return (
        <div className="About">
            <Header />
            <p>
                This website is designed for Arabic language students who wish to improve their verb conjugations.<br />
                Test yourself from a broad bank of verbs taken from Nahmad & Haywood ("A New Arabic Grammar").<br />
                Personalise your learning by making use of a wide range of filters, including form, verb weakness, tense, and voice.<br />
                Please note that answers must be typed in Arabic, including all vowellings.
            </p>
            <h4>Acknowledgements</h4>
            <p>
                With special thanks to James Wrathall for his support and assistance throughout the development of this website. 
            </p>
            <footer>
                <a href="/"><button>Return</button></a>
            </footer>
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
