// let questions = document.querySelector('.info-question');
// fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`)
//     .then((response) => response.json())
//     .then(({results}) => {
//         let fragment = document.createDocumentFragment();
//         results.forEach((data,index)=>{
//             let div = document.createElement('div');
//            div.textContent = `Question ${index+1}: ${data.question}`;
//            div.className = 'choice';
//            div.id = index;
//            fragment.appendChild(div);
//         })
//         questions.appendChild(fragment);

//     });
function getRandomString({length}) { 
    const characterChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 "; 
    const characters = [];
    while (characters.length < length) {
      const randomIndex = Math.floor(Math.random() * characterChoices.length);
      characters.push(characterChoices[randomIndex]);
    }
    return characters.join('');
  }
  
  function getRandomInteger({min, max}) {
    return Math.floor(Math.random() * (max - min) + min);
  }

function generateSuggestion(prefix) {
  const RATIO_EXACT_MATCH = 0.3;
  const RATIO_AUTOCORRECT = 0.1;
  
  if (Math.random() < RATIO_AUTOCORRECT) {
    return getRandomString({ length: getRandomInteger({min: 1, max: prefix.length}) });
  }
  
  if (Math.random() < RATIO_EXACT_MATCH) {
    return prefix;
  }
  return prefix + getRandomString({ length: getRandomInteger({min: 1, max: 10}) });
}
function getAutoCompletionResult(data){
    const MAX_CHARS = 10;
    const NUM_AUTOCOMPLETE_RESULTS = 10;
    const RATIO_AUXILLERY_DATA = 0.1;
    if (data.length > MAX_CHARS) {
        return [];
    }
    const results = [];
    while(results.length < NUM_AUTOCOMPLETE_RESULTS){
        const suggestion = generateSuggestion(data);
        if(results.find((result)=>result.suggestion == suggestion)){
            continue;
        }
        if (Math.random() < RATIO_AUXILLERY_DATA) {
        for (let i = 0; i < 2; i++) {
            results.push({
            suggestion, 
            auxillery: getRandomString({ length: getRandomInteger({min: 5, max: 15}) }) 
            });
        }
        } else {
        results.push({ suggestion, auxillery: "" });
        }
    }
    return results;
}
function createSuggestionElement({searchInput,suggestion, auxiliaryData}) {
    const auxiliaryString = auxiliaryData ? ` - ${auxiliaryData}` : "";
    const boldProcessedSuggestion = wrapBoldedCharacters({
      inputValue: searchInput.value,
      suggestion
    });
    return `<li class="search__suggestions__list__result">${boldProcessedSuggestion}${auxiliaryString}</li>`
  }
function wrapBoldedCharacters({inputValue, suggestion}) {
    if (suggestion.startsWith(inputValue)) {
      return `${suggestion.substring(0, inputValue.length)}<b>${suggestion.substring(inputValue.length, suggestion.length)}</b>`;
    }
    return `<b>${suggestion}</b>`;
  }
document.querySelector('.search_bar_input').addEventListener("input", (event)=>{
    const result = getAutoCompletionResult(event.target.value);
    let suggestInnerHtml = "";
    const suggestionsElement = document.getElementsByClassName('search_suggestions_list')[0];
    for (const suggestion of result) {
        suggestInnerHtml += createSuggestionElement({
        searchInput : event.target,
        suggestion: suggestion.suggestion,
        auxiliaryData: suggestion.auxiliary
        });
    }
    suggestionsElement.innerHTML = suggestInnerHtml;
    // for(let res of result){
    //     suggestInnerHtml += `<li class = "search_suggestions_list_result"></li>`
    //     let auxdata = res.auxillery == "" ? "":` - ${res.auxillery}`;
    //     if(res.suggestion.startsWith(event.target.value)){
    //         suggestInnerHtml += `<li class = "search_suggestions_list_result"> ${res.suggestion.substring(0, event.target.value.length)}<b>${res.suggestion.substring(event.target.value.length , res.suggestion.length)}</b>}${auxdata}</li>`
    //     }
    //     else{
    //         suggestInnerHtml += `<li class = "search_suggestions_list_result"> ${res.suggestion}${auxdata}</li>`
    //     }
    // }
    // suggestionElement.innerHTML = suggestInnerHtml;
})