var gameAnswer = "";
var gameWindow = document.querySelector('#game-screen');
var gameStatus = document.querySelector('#game-status');

async function getPokemonAPI() {
    var res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    var pokeData = await res.json();
    gameWindow.innerHTML = "";
    gameStatus.innerText = "";
    getAnswers(pokeData.results)

    console.log(pokeData.results);
    return pokeData
}



async function getAnswers(arr) {
    let answer = "";
    let pokeOptions = [];

    for (let i = 0; i < 5; i++) {
        let rand = Math.ceil(Math.random() * arr.length)
        pokeOptions.push(arr[rand])
    }

    answer = pokeOptions[Math.floor(Math.random() * 5)]

    let answerRes = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${answer.name}`)).json()
    gameAnswer = answerRes.name
    gameWindow.innerHTML +=
        `
    <img src='${answerRes.sprites.front_default}' class='poke-sprite-hidden'>
    `


    // Itterate through an array with a for (of) shorthand
    for (let pokemon of pokeOptions) {
        gameWindow.innerHTML +=
            `
    <button class='nes-btn is-primary' onclick='answerCheck(this)'>${pokemon.name}</button>
    `
    }
    console.log(answerRes)
    return pokeOptions
}


function answerCheck(element) {
    if (element.innerText == gameAnswer) {
        gameStatus.innerText = 'Correct!'
        document.querySelector('.poke-sprite-hidden').style.filter = 'contrast(100%)'
    } else {
        gameStatus.innerText = 'Incorrect!'
    }
}


