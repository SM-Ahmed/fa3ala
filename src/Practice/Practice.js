import React from "react"
import './Practice.css';
import './TextInput'
import TextInputExample from "./TextInput";
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {verbTables} from "./VerbTables"

function Practice() {
  const conjugations = FetchConjugations('I', 'perfect', 'active')
  const quiz = conjugations.map(question =>
    <TextInputExample pronoun={question.pronoun} answer={question.verb} showAnswer={true} />)
  return (
    <div className="Practice">
      <header className="Practice-header">Practice</header>
      <SafeAreaView>
        {quiz}
      </SafeAreaView>
    </div>
  );
}

function FetchConjugations(form, tense, voice) {
  const chosenVerbTable = verbTables.filter(verbTable =>
    verbTable.form===form && verbTable.tense===tense && verbTable.voice===voice)
  return(chosenVerbTable[0].conjugations)
}

export default Practice;
