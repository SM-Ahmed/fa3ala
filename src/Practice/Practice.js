import React from "react";
import {SafeAreaView} from 'react-native';
import TextInputExample from "./TextInput";
import PickOptions from "./PickOptions";
import './Practice.css';


export default function Practice() {
  const [status, setStatus] = React.useState('pickOptions');
  const [quizData, setQuizData] = React.useState();

  switch(status) {
    case 'pickOptions':
      return (
        <div className="Practice">
          <Header />
          <PickOptions setStatus={setStatus} setQuizData={setQuizData} />
        </div>
      )
    default:
      return (
        <div className="Practice">
          <Header />
          <Quiz quizData={quizData} status={status} setStatus={setStatus}/>
        </div>
      )
  }
}

function Header() {
  return(
    <div>
      <header className="Practice-header">Practice</header>
      <br />
    </div>
  )
}

function Quiz({quizData, status, setStatus}) {
  const questions = quizData.conjugations.map(question =>
    <TextInputExample pronoun={question.pronoun} answer={question.verb} showAnswer={status=='checkAnswers'} />)
  const tense_voice = (quizData.tense==="imperative") ? quizData.tense : quizData.voice.concat(" ", quizData.tense);
  const buttonLabel = (status==='writeAnswers') ? 'Check' : 'Retry';
  const nextStatus = (status==='writeAnswers') ? 'checkAnswers' : 'writeAnswers';
  return(
    <div>
      <button onClick={() => setStatus('pickOptions')}>Return</button>
      <button onClick={() => setStatus(nextStatus)}>{buttonLabel}</button>
      <br />
      <p>
        Conjugate the verb {quizData.infinitiveArabic} ("{quizData.infinitiveEnglish}") in the {tense_voice}.
      </p>
      <SafeAreaView>
        {questions}
      </SafeAreaView>
    </div>
  )
}