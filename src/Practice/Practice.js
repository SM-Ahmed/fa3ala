import React from "react";
import PickOptions from "./PickOptions";
import Quiz from "./Quiz"
import './Practice.css';


export default function Practice() {
  const [status, setStatus] = React.useState('pickOptions');
  const [choices, setChoices] = React.useState();
  const [quizData, setQuizData] = React.useState();

  switch(status) {
    case 'pickOptions':
      return (
        <div className="Practice">
          <Header />
          <PickOptions setStatus={setStatus} setChoices={setChoices} setQuizData={setQuizData} />
        </div>
      )
    default: // either 'writeAnswers' or 'checkAnswers'
      return (
        <div className="Practice">
          <Header />
          <Quiz quizData={quizData} status={status} choices={choices} setStatus={setStatus} setQuizData={setQuizData}/>
        </div>
      )
  }
}

function Header() {
  return(
    <div>
      <header>
        <h1 className="Practice-header">Practice (مارس)</h1>
      </header>
    </div>
  )
}