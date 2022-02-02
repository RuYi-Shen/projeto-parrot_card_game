let cardNumber = 0;

ask4Cards();

function ask4Cards(){
    while(cardNumber > 14 || cardNumber < 4 || cardNumber%2 != 0){
        cardNumber = prompt("Com quantas cartas deseja jogar? (4 a 14)");
    } 
}