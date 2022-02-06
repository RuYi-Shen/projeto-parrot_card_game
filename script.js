let cardNumber = 0;
let moves = 0;
let time = 0;
let correctPairs = 0;
let currentCard;
let currentSuit = "";
let firstCard = true;

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

ask4Cards();
ask4Game();

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

    for(let i = 0; i < cardNumber ; i++){
        document.querySelector(".cards").innerHTML += 
        `<div class="card ${cards[i]}" data-identifier="card">
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

function turnCard(index,cardName){
    moves++;
    currentCardIndex = index;
    turnFront();
    if(firstCard){
        currentSuit = cardName;
        firstCard = false;
        firstCardIndex = index;
    }
    else{
        if(currentSuit == cardName){
            correctPairs++;
            console.log(cardName);
        }
        else{
            setTimeout(turnBack, 1000);
        }
        firstCard = true;
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function ask4Game(){

}

function turnBack(){
    document.querySelectorAll(".front-face")[firstCardIndex].style.transform = "rotateY(180deg)";
    document.querySelectorAll(".back-face")[firstCardIndex].style.transform = "rotateY(0deg)";
    document.querySelectorAll(".front-face")[currentCardIndex].style.transform = "rotateY(180deg)";
    document.querySelectorAll(".back-face")[currentCardIndex].style.transform = "rotateY(0deg)";
}

function turnFront(){
    document.querySelectorAll(".front-face")[currentCardIndex].style.transform = "rotateY(0deg)";
    document.querySelectorAll(".back-face")[currentCardIndex].style.transform = "rotateY(-180deg)";
}