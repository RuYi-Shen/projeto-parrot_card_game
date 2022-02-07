let cardNumber = 0;
let moves = 0;
let time = 0;

let myInterval;

let correctPairs = 0;
let currentSuit = "";
let firstCard = true;
let cardUntap = true;
let cardTap = true;

let cards = [];
let parrots = [
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot",
];

let firstCardIndex = 0;
let currentCardIndex = 0;


function startGame(){
    correctPairs = 0;
    cardNumber = 0;
    moves = 0;
    time = 0;
    
    currentSuit = "";
    firstCard = true;
    cardUntap = true;

    cards = [];
    document.querySelector("time").innerHTML = "";
    clearInterval(myInterval);

    ask4Cards();
}

function ask4Cards(){
    while(cardNumber > 14 || cardNumber < 4 || cardNumber%2 != 0){
        cardNumber = prompt("Com quantas cartas deseja jogar? (4 a 14)");
    } 
    createCards();
}

function createCards(){
    suffleCards(parrots);
    cards = parrots.slice(0,cardNumber/2);
    cards = cards.concat(cards);
    suffleCards(cards);

    document.querySelector(".cards").innerHTML = "";
    for(let i = 0; i < cardNumber ; i++){
        document.querySelector(".cards").innerHTML += 
        `<div class="card" data-identifier="card">
            <div class="back-face face" data-identifier="back-face" onclick = "turnCard(${i}, '${cards[i]}')">
                <img src="./media/front.png" alt="parrot">
            </div>
            <div class="front-face face" data-identifier="front-face">
                <img src="./media/${cards[i]}.gif" alt="${cards[i]}">
            </div>
        </div>`
    }
}

function suffleCards(deck){
    deck.sort(comparador);
}

function comparador() { 
	return Math.random() - 0.5; 
}

function turnCard(index,cardName){
    if(time == 0){
        document.querySelector("time").innerHTML = time;
        myInterval = setInterval(timeCounter, 1000);
    }
    if(cardUntap && cardTap){
        moves++;
        currentCardIndex = index;
        cardTap = false;
        turnFront();
        if(firstCard){
            currentSuit = cardName;
            firstCard = false;
            firstCardIndex = index;
        }
        else{
            if(currentSuit == cardName){
                correctPairs++;
                if(correctPairs == cardNumber/2){
                    clearInterval(myInterval);
                    setTimeout(endGameMessage, 500);
                }
            }
            else{
                cardUntap = false;
                setTimeout(turnBack, 1000);
            }
            firstCard = true;
        }
    }
}

function turnBack(){
    document.querySelectorAll(".front-face")[firstCardIndex].style.transform = "rotateY(180deg)";
    document.querySelectorAll(".back-face")[firstCardIndex].style.transform = "rotateY(0deg)";
    document.querySelectorAll(".front-face")[currentCardIndex].style.transform = "rotateY(180deg)";
    document.querySelectorAll(".back-face")[currentCardIndex].style.transform = "rotateY(0deg)";
    cardUntap = true;
}

function turnFront(){
    document.querySelectorAll(".front-face")[currentCardIndex].style.transform = "rotateY(0deg)";
    document.querySelectorAll(".back-face")[currentCardIndex].style.transform = "rotateY(-180deg)";
    setTimeout(delay500ms, 500);
}

function endGameMessage(){
    alert(`Você ganhou em ${moves} jogadas e em ${time} segundos!`);
    ask4Game();
    stopInterval();
}

function ask4Game(){
    let anotherGame = prompt("Quer jogar novamente? (S/n)");
    while(anotherGame != "S" && anotherGame != "n"){
        anotherGame = prompt("Quer jogar novamente? (S/n)");
    }
    if(anotherGame == "S"){
        // startGame();
        window.location.reload();
    }
    console.log(time);
}

function timeCounter(){
    time++;
    document.querySelector("time").innerHTML = time;
}

function delay500ms(){
    cardTap = true;
}

function stopInterval(){
    clearInterval(myInterval);
}

startGame();

