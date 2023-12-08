// Project name : a slot machine
// 1. Despot some money
// 2. Determine number of lines to bet on  
// 3. Collect a bet amount
// 4. Spin the slot mmachine
// 5. Check if the user won
// 6. give the user their winnings
// 7. play again
/* lession 
    there are two there to create a function in javascript
    create a function   
         function nameFunction()
         {

         }
    Another way to create a function in javascript 
        const nameFunction = () =>{ 

        }
*/

// block code of project 


// 1. Despot some money
//using packget to get user input 
const prompt = require("prompt-sync")();

//goble variable 

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUT ={
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

 const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}
//Create function 
const deposit = () =>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount : ");
        //convert sting to float 
        const numberDepositAmount = parseFloat(depositAmount);
            //isNaN = is not a number
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again.")
        }
        else{
            return numberDepositAmount;
        }
    }   
};
// 2. Determine number of line to bet on
const getNumberOfLine = () =>{
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3) : ");
        //convert sting to float 
        const numberOfLine = parseFloat(lines);
            //isNaN = is not a number
        if(isNaN(numberOfLine) || numberOfLine <= 0 || numberOfLine > 3){
            console.log("Invalid number of line , try again.")
        }
        else{
            return numberOfLine;
        }
    }   
};
// 3. Collect a bet amount
const getBet = (balence,lines) => {
    while(true){
        const bet = prompt("Enter the per lines : ");
        //convert sting to float 
        const numberBet = parseFloat(bet);
            //isNaN = is not a number
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balence / lines){
            console.log("Invalid bet , try again.")
        }
        else{
            return numberBet;
        }
    }   

};
//4. Spin the slot mmachine

const spin =() =>{
    //generate array

    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUT)){
        for (let i = 0 ; i < count ; i++){
            symbols.push(symbol)
        }
    }
    const reels =[];
    for (let i = 0 ; i < COLS ; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0 ; j <ROWS; j ++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymobl = reelSymbols[randomIndex];
            reels[i].push(selectedSymobl);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};
//5. Check if the user won
const transpose = (reels) => {
    const rows = [];

    for (let i = 0 ; i < ROWS ; i++){
        rows.push([]);
        for (let j = 0 ; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};
const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            //Checking the last index
            if (i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};
//6.give the user their winnings
const getWinnings = (rows ,bet, lines) => {
    let winnings = 0;
    
    for (let row = 0 ; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
};

const game = () =>{
    let  balence = deposit();
    while(true){
        console.log("You haave a  balnace of $"+ balence);
        const numberOfLine  = getNumberOfLine();
        const bet = getBet(balence,numberOfLine);
        balence -= bet * numberOfLine;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLine)
        balence += winnings;
        console.log("You won, $" + winnings.toString());

        if (balence  <= 0) {
            console.log("you ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again(y/n) : ");
        if (playAgain != "y") break;
    }
}

game();


