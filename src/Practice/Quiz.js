import prepQuizData from "./PrepQuizData";
import TextInputExample from "./TextInput";
import {SafeAreaView} from 'react-native';

export default function Quiz({quizData, status, choices, setQuizData, setStatus}) {
    const questions = quizData.conjugations.map(question =>
      <TextInputExample pronoun={question.pronoun} answer={question.verb} showAnswer={status=='checkAnswers'} />)
    const buttonLabel = (status==='writeAnswers') ? 'Check' : 'Retry';
    const nextStatus = (status==='writeAnswers') ? 'checkAnswers' : 'writeAnswers';
    function handleNewVerbClick() {
      const newQuizData = prepQuizData(choices)
      setQuizData(newQuizData)
      setStatus('writeAnswers')
    }
    return(
      <div>
        <button onClick={() => setStatus('pickOptions')}>Return</button>
        <button onClick={() => setStatus(nextStatus)}>{buttonLabel}</button>
        <button onClick={handleNewVerbClick}>New Quiz</button>
        <br />
        <QuizPreamble quizData={quizData} />
        <SafeAreaView>
          {questions}
        </SafeAreaView>
      </div>
    )
  }

function QuizPreamble({quizData}) {
    const arabicDict = {
        perfect: "الماضِي",
        indicative: "المُضارِعِ المَرْفُوعِ",
        subjunctive: "المُضارِعِ المَنْصُوبِ",
        jussive: "المُضارِعِ المَجْزُومِ",
        imperative: "الأَمْرِ",
        active: "لمَعْلُومِ",
        passive: "لمَجْهُولِ",
        to: "لِ"
    }
    const tenseAndVoiceEnglish = (quizData.tense==="imperative") 
        ? quizData.tense 
        : quizData.voice.concat(" ", quizData.tense);

    const voiceArabic = (quizData.tense==="imperative") 
        ? ""
        : arabicDict['to'].concat("", arabicDict[quizData.voice]);
    return(
        <p>
          Conjugate the verb {quizData.infinitiveArabic} ("{quizData.infinitiveEnglish}") in the {tenseAndVoiceEnglish}.
          <br />
          اِمْلِأْ الفَرَاغَ بِشَكْلِ الفِعْلِ (({quizData.infinitiveArabic})) الصَّحِيحِ فِي {arabicDict[quizData.tense]} المَبْنِيّ {voiceArabic}
        </p>
    )

}
