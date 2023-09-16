import React from "react"
import { MultiSelect } from "react-multi-select-component";
import {optionsList} from "./data/OptionsList"
import prepQuizData from "./PrepQuizData"
import { fetchVerb } from "./PrepQuizData";
import {verbBank} from "./data/VerbBank"
import './PickOptions.css';

export default function PickOptions({setStatus, setChoices, setQuizData}) {
  const [formOptions, setFormOptions] = React.useState(optionsList.form.filter(item => item.disabled !== true));
  const [weaknessOptions, setWeaknessOptions] = React.useState(optionsList.weakness.filter(item => item.disabled !== true));
  const [verbRarityOptions, setVerbRarityOptions] = React.useState(optionsList.verbRarity);
  const [verbQuranicOptions, setVerbQuranicOptions] = React.useState(optionsList.verbQuranic);
  const [tenseOptions, setTenseOptions] = React.useState(optionsList.tense);
  const [voiceOptions, setVoiceOptions] = React.useState(optionsList.voice);
  const [orderByOptions, setOrderByOptions] = React.useState([optionsList.orderBy[0]]);

  const [errorStatus, setErrorStatus] = React.useState('noError');

  function handleStart() {
    setErrorStatus('noError') // Reset error status
    const choices = { // Parse choices
      form: getListFromChoices(formOptions),
      weakness: getListFromChoices(weaknessOptions),
      verbRarity: getListFromChoices(verbRarityOptions),
      verbQuranic: getListFromChoices(verbQuranicOptions),
      tense: getListFromChoices(tenseOptions),
      voice: getListFromChoices(voiceOptions),
      orderBy: getListFromChoices(orderByOptions),
    }
    if (checkEmptyChoice(choices)) { // Check that all choices are filled
      setErrorStatus('emptyChoice');
      return;
    }
    if (fetchVerb(choices, verbBank) === 'noVerbFound') { // Check that at least one suitable verb in verb bank
      setErrorStatus('noVerbFound');
      return;
    }
    const quizData = prepQuizData(choices) // Generate quiz data, then update parent props.
    setChoices(choices)
    setQuizData(quizData)
    setStatus('writeAnswers')
  }

  return (
    <div>
      <a href="/"><button>Return</button></a>
      <button onClick={() => handleStart()}>Start Quiz</button>
      <ErrorMessage errorStatus={errorStatus} />
      <h4>Verb Filters</h4>
      <div className="Menus">
        <p>Form / الوَزْن</p> 
        <MultiSelect options={optionsList.form} value={formOptions} onChange={setFormOptions} disableSearch />
        <p>Weakness / الضَعْف</p> 
        <MultiSelect options={optionsList.weakness} value={weaknessOptions} onChange={setWeaknessOptions} disableSearch />
        <p>Rarity / النُدْرَة</p> 
        <MultiSelect options={optionsList.verbRarity} value={verbRarityOptions} onChange={setVerbRarityOptions} disableSearch />
        <p>Quranic? / مِنْ القُرآن؟</p> 
        <MultiSelect options={optionsList.verbQuranic} value={verbQuranicOptions} onChange={setVerbQuranicOptions} disableSearch />
      </div>
      <h4>Quiz Filters</h4>
      <div className="Menus">
        <p>Tense & Mood / الحالَة</p> 
        <MultiSelect options={optionsList.tense} value={tenseOptions} onChange={setTenseOptions} disableSearch/>
        <p>Voice / الصِيغَة</p> 
        <MultiSelect options={optionsList.voice} value={voiceOptions} onChange={setVoiceOptions} disableSearch/>
        <p>Order By / التَرْتِيب</p>
        <MultiSelect options={optionsList.orderBy} value={orderByOptions} onChange={setOrderByOptions} disableSearch />
      </div>
    </div>
  )
}

function ErrorMessage({errorStatus}) {
  switch (errorStatus) {
    case 'emptyChoice':
      return(
        <p className="Error">
          ERROR! One or more options are empty.
        </p>
      )
    case 'noVerbFound':
      return(
        <p className="Error">
          ERROR! No verb in our verb bank satisfies your options.
        </p>
      )
  }
}

function getListFromChoices(choices) {
  const choiceList = [];
  for (const choice of choices) {
    choiceList.push(choice['value'])
  }
  return choiceList
}

function checkEmptyChoice(choices) {
  for (var key in choices){
    if (choices[key].length===0) {
      return(true)
    }
  }
  return(false)
}