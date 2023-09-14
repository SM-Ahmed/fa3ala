import React from "react"
import { MultiSelect } from "react-multi-select-component";
import {optionsList} from "./data/OptionsList"
import {verbBank} from "./data/VerbBank"
import {verbTables} from "./data/VerbTables"
import './Practice.css';
import './PickOptions.css';

function PickOptions({setStatus, setQuizData}) {
  const [formOptions, setFormOptions] = React.useState(optionsList.form);
  const [weaknessOptions, setWeaknessOptions] = React.useState(optionsList.weakness);
  const [verbRarityOptions, setVerbRarityOptions] = React.useState(optionsList.verbRarity);
  const [verbQuranicOptions, setVerbQuranicOptions] = React.useState(optionsList.verbQuranic);
  const [tenseOptions, setTenseOptions] = React.useState(optionsList.tense);
  const [voiceOptions, setVoiceOptions] = React.useState(optionsList.voice);
  const [orderByOptions, setOrderByOptions] = React.useState([optionsList.orderBy[0]]);

  function handleStart() {
    const choices = {
      form: getListFromChoices(formOptions),
      weakness: getListFromChoices(weaknessOptions),
      verbRarity: getListFromChoices(verbRarityOptions),
      verbQuranic: getListFromChoices(verbQuranicOptions),
      tense: getListFromChoices(tenseOptions),
      voice: getListFromChoices(voiceOptions),
      orderBy: getListFromChoices(orderByOptions),
    }
    const quizData = prepQuizData(choices, verbBank, verbTables)
    setQuizData(quizData)
    setStatus('writeAnswers')
  }

  return (
    <div>
      <a href="/"><button>Return</button></a>
      <button onClick={() => handleStart()}>Begin</button>
      <h4>Verb Options</h4>
      <div className="Menus">
        <p>Form / الوَزْن</p> 
        <MultiSelect options={optionsList.form} value={formOptions} onChange={setFormOptions} disableSearch />
        <p>Type / النَوْع</p> 
        <MultiSelect options={optionsList.weakness} value={weaknessOptions} onChange={setWeaknessOptions} disableSearch />
        <p>Rarity / </p> 
        <MultiSelect options={optionsList.verbRarity} value={verbRarityOptions} onChange={setVerbRarityOptions} disableSearch />
        <p>Quranic? / مِنْ القُرآن؟</p> 
        <MultiSelect options={optionsList.verbQuranic} value={verbQuranicOptions} onChange={setVerbQuranicOptions} disableSearch />
      </div>
      <h4>Quiz Options</h4>
      <div className="Menus">
        <p>Tense & Mood / الحالَة</p> 
        <MultiSelect options={optionsList.tense} value={tenseOptions} onChange={setTenseOptions} disableSearch/>
        <p>Voice / الصِيغَة</p> 
        <MultiSelect options={optionsList.voice} value={voiceOptions} onChange={setVoiceOptions} disableSearch/>
        <p>Order By / </p>
        <MultiSelect options={optionsList.orderBy} value={orderByOptions} onChange={setOrderByOptions} disableSearch />
      </div>
    </div>
  )
}

function getListFromChoices(choices) {
  const choiceList = [];
  for (const choice of choices) {
    choiceList.push(choice['value'])
  }
  return choiceList
}

function prepQuizData (choices, verbBank, verbTables) {
  const verb = fetchVerb(choices, verbBank) // Pick random verb from verb bank
  const verbTable = fetchVerbTable(verb.form, verb.weakness, verbTables) // Pick verb table corresponding to chosen verb 
  const tense = getRandomFromList(choices.tense); // Pick random tense from user choices
  const voice = (tense==="imperative") ? 'passive' : getRandomFromList(choices.voice); // Pick random voice from user choices
  const pronounOrder = getPronounOrder(choices.orderBy, tense);
  const verbRoots = identifyRoots(verb.infinitiveArabic, verbTable.rootIndices);
  const conjugations = verbTable.conjugations[tense][voice];
  const verbConjugations = [];
  for (const pronoun of pronounOrder) {
    verbConjugations.push(
      {
        pronoun: pronoun, 
        verb: mapRootLetters(verbTable.dummyRoots, verbRoots, conjugations[pronoun])
      }
    )
  }
  const quizData = {
    infinitiveArabic: verb.infinitiveArabic,
    infinitiveEnglish: verb.infinitiveEnglish,
    tense: tense,
    voice: voice,
    conjugations: verbConjugations
  }
  return(quizData)
}

function fetchVerb(verbChoices, verbBank) {
  const verbList = verbBank.filter(verb =>
    verbChoices.form.includes(verb.form)
    && verbChoices.weakness.includes(verb.weakness)
    && verbChoices.verbRarity.includes(verb.verbRarity)
    && verbChoices.verbQuranic.includes(verb.verbQuranic)
  );
  const randomVerb = getRandomFromList(verbList);
  return(randomVerb)
}

function fetchVerbTable(form, weakness, verbTables) {
  const verbTable = verbTables.filter(verbTable =>
    verbTable.form===form && verbTable.weakness===weakness)[0];
  return(verbTable)
}

function getRandomFromList(list) {
  const randomItem = list[Math.floor(Math.random() * list.length)];
  return(randomItem)
  }

function getPronounOrder(orderByList, tense) {
  const pronounOrderDict = {
    'number': ['3sm', '3sf', '2sm', '2sf', '1s', '3dm', '3df', '2d', '3pm', '3pf', '2pm', '2pf', '1p'],
    'person': ['3sm', '3dm', '3pm', '3sf', '3df', '3pf', '2sm', '2d', '2pm', '2sf', '2d', '2pf', '1s', '1p'],
    'imperative': ['2sm', '2sf', '2d', '2pm', '2pf']
  }
  const orderBy = getRandomFromList(orderByList)
  if (orderBy ==='random') {
    let pronounOrder = (tense==="imperative") 
      ? shuffleArray(pronounOrderDict['imperative']) 
      : shuffleArray(pronounOrderDict['number']);
    return pronounOrder
  } else {
    let pronounOrder = (tense==="imperative") ? pronounOrderDict['imperative'] : pronounOrderDict[orderBy];
    return pronounOrder
  }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return(array)
}

function identifyRoots(infinitiveArabic, rootIndices) {
  const charList = infinitiveArabic.split('');
  const roots = [];
  for (const index of rootIndices) {
    roots.push(charList[index])
  }
  return roots
}

function mapRootLetters(dummyRoots, verbRoots, verb) {
  const charList = verb.split('');
  for(let i = 0; i < dummyRoots.length; i++){
    const index = charList.indexOf(dummyRoots[i])
    charList[index] = verbRoots[i] // verbRoots and dummyRoots should have same length.
  }
  const verbMapped = charList.join('')
  return(verbMapped)
}

export default PickOptions;

    