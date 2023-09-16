import {verbBank} from "./data/VerbBank"
import {verbTables} from "./data/VerbTables"

export default function prepQuizData (choices) {
    const verb = fetchVerb(choices, verbBank) // Pick random verb from verb bank
    const verbTable = fetchVerbTable(verb, verbTables) // Pick verb table corresponding to chosen verb 
    const tense = getRandomFromList(choices.tense); // Pick random tense from user choices
    const voice = (tense==="imperative") ? 'passive' : getRandomFromList(choices.voice); // Pick random voice from user choices
    const pronounOrder = getPronounOrder(choices.orderBy, tense);
    const verbRoots = identifyRoots(verb.infinitiveArabic, verbTable.rootIndices);
    console.log(verbRoots)
    const conjugations = verbTable.conjugations[tense][voice];
    console.log(conjugations)
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


export function fetchVerb(verbChoices, verbBank) {
const verbList = verbBank.filter(verb =>
    verbChoices.form.includes(verb.form)
    && verbChoices.weakness.includes(verb.weakness)
    && verbChoices.verbRarity.includes(verb.verbRarity)
    && verbChoices.verbQuranic.includes(verb.verbQuranic)
);
if (verbList.length===0) { // Check if verb found in verb bank. Raise error otherwise.
    return("noVerbFound")
}
const randomVerb = getRandomFromList(verbList);
return(randomVerb)
}

function fetchVerbTable(verb, verbTables) {
const verbTable = verbTables.filter(verbTable =>
    verbTable.form===verb.form 
    && verbTable.weakness===verb.weakness 
    && checkVowelling(verb, verbTable)
    )[0]; // Final list should only have one element.
return(verbTable)
}

function checkVowelling(verb, verbTable) {
    if (verb.form === "I") {
        const isVowelsMatching = ((verb.pastVowel === verbTable.pastVowel) 
            && (verb.presentVowel === verbTable.presentVowel))
        return(isVowelsMatching)
    }
    return(true)
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