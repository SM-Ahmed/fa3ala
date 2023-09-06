import React from "react"
import './Practice.css';
import './TextInput'
import DropdownMenus from "./DropdownMenus"
import TextInputExample from "./TextInput";
import {SafeAreaView, Button} from 'react-native';
import {verbTables} from "./VerbTables"

function Practice() {
  const [status, setStatus] = React.useState('pickOptions');
  const [form, setForm] = React.useState('I');
  const [tense, setTense] = React.useState('perfect');
  const [voice, setVoice] = React.useState('active');
  const [orderBy, setOrderBy] = React.useState('number');

  const verbTable = FetchVerbTable(form, tense, voice)
  const verbList = OrderVerbConjugations(verbTable.conjugations, orderBy, tense==="imperative")
  const quiz = verbList.map(question =>
    <TextInputExample pronoun={question.pronoun} answer={question.verb} showAnswer={status=='checkAnswers'} />)

  switch(status) {
    case 'pickOptions':
      return (
        <div className="Practice">
        <header className="Practice-header">Practice</header>
        <br />
        <a href="/"><button>Return</button></a>
        <button onClick={() => setStatus('writeAnswers')}>Begin</button>
        <SafeAreaView>
          <p>Choose options</p>
          <DropdownMenus
            form={form} setForm={setForm}
            tense={tense} setTense={setTense}
            voice={voice} setVoice={setVoice}
            orderBy={orderBy} setOrderBy={setOrderBy}
          />
        </SafeAreaView>
        </div>
      )
    case 'writeAnswers':
      return (
        <div className="Practice">
          <header className="Practice-header">Practice</header>
          <br />
          <button onClick={() => setStatus('pickOptions')}>Return</button>
          <button onClick={() => setStatus('checkAnswers')}>Check</button>
          <br />
          <QuizPreamble tense={tense} voice={voice} verbTable={verbTable} />
          <SafeAreaView>
            {quiz}
          </SafeAreaView>
        </div>
      )
    case 'checkAnswers':
      return (
          <div className="Practice">
            <header className="Practice-header">Practice</header>
            <br />
            <button onClick={() => setStatus('pickOptions')}>Return</button>
            <button onClick={() => setStatus('writeAnswers')}>Check</button>
            <br />
            <QuizPreamble tense={tense} voice={voice} verbTable={verbTable} />
            <SafeAreaView>
              {quiz}
            </SafeAreaView>
          </div>
      )
  }
}

function FetchVerbTable(form, tense, voice) {
  const chosenVerbTable = (tense=='imperative') 
    ? verbTables.filter(verbTable =>
        verbTable.form===form && verbTable.tense===tense)
    : verbTables.filter(verbTable =>
        verbTable.form===form && verbTable.tense===tense && verbTable.voice===voice)
  return(chosenVerbTable[0])
}

function OrderVerbConjugations(conjugations, orderBy, isImperative) {
  const pronounOrderDict = {
    'number': ['3sm', '3sf', '2sm', '2sf', '1s', '3dm', '3df', '2d', '3pm', '3pf', '2pm', '2pf', '1p'],
    'person': ['3sm', '3dm', '3pm', '3sf', '3df', '3pf', '2sm', '2d', '2pm', '2sf', '2d', '2pf', '1s', '1p'],
    'imperative': ['2sm', '2sf', '2d', '2pm', '2pf']
  }
  const pronounOrder = (isImperative) ? pronounOrderDict['imperative'] : pronounOrderDict[orderBy]
  const verbList = []
  for (const pronoun of pronounOrder) {
    verbList.push(
      {pronoun: pronoun, verb: conjugations[pronoun]}
    )
  }
  return(verbList)
}

function QuizPreamble({tense, voice, verbTable}) {
  if (tense=='imperative') {
    return(
      <div>
        <p>
          Conjugate the verb {verbTable.infinitiveArabic} ("{verbTable.infinitiveEnglish}") in the {tense}.
        </p>
        <p>
          e.g: أَنْتَ {verbTable.exampleArabic} ("{verbTable.exampleEnglish}")
        </p>
      </div>
    )
  } 
  else {
    return(
      <div>
        <p>
          Conjugate the verb {verbTable.infinitiveArabic} ("{verbTable.infinitiveEnglish}") in the {voice} {tense}.
        </p>
        <p>
          e.g: هُوَ {verbTable.exampleArabic} ("{verbTable.exampleEnglish}")
        </p>
      </div>
    )
  }
}

export default Practice;
