import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
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
          {pronoun}
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
          {pronoun}
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
          {pronoun}
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

export default TextInputExample;