import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import './TextInput.css';

const TextInputExample = ({pronoun, answer, showAnswer}) => {
  const [text, onChangeText] = React.useState('');
  const isCorrect = text == answer ? true : false;
  
  if (showAnswer && isCorrect) {
    return (
      <div className="TextInput">
        <p>
        </p>
        <p className="CorrectMark">
          ✓
        </p>
        <TextInput
          onChangeText={onChangeText}
          style={styles.input}
          value={text}
        />
        <p>
          {pronounsArabicDict[pronoun]}
        </p>
      </div>
    );
  } 
  else if (showAnswer==true && isCorrect==false) {
    return (
      <div className="TextInput">
        <p className="IncorrectAnswer">
          {answer}
        </p>
        <p className="IncorrectMark">
          ✗
        </p>
        <TextInput
          onChangeText={onChangeText}
          style={styles.input}
          value={text}
        />
        <p>
          {pronounsArabicDict[pronoun]}
        </p>
      </div>
    );
  }
  else {
    return (
      <div className="TextInput">
        <p>
        </p>
        <p>
        </p>
        <TextInput
          onChangeText={onChangeText}
          style={styles.input}
          value={text}
        />
        <p>
          {pronounsArabicDict[pronoun]}
        </p>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});

const pronounsArabicDict = {
  "3sm": "هُوَ",
  "3sf": "هِيَ",
  "2sm": "أَنْتَ",
  "2sf": "أَنْتِ",
  "1s": "أَنَا",
  "3dm": "(m) هُمَا",
  "3df": "(f) هُمَا",
  "2d": "أَنْتُمَا",
  "3pm": "هُمْ",
  "3pf": "هُنَّ",
  "2pm": "أَنْتُمْ",
  "2pf": "أَنْتُنَّ",
  "1p": "نَحْنُ",
}

export default TextInputExample;