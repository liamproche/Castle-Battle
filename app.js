const prompt = require('prompt-sync')();
const playerPeonNames = [];
let gameInProgress = true;
let selectedPeon;
const playerBarracks = {
    peons: [],
    hitPoints: 10,
    generatePeon: generatePeon
}
const computerBarracks = {
    name: "Vlad's Fortress",
    peons: [],
    hitPoints: 10,

}

function generatePeon(){
    const peon = {}
    const peonName = prompt("Please enter a name for your peon: ")
    if(playerPeonNames.includes(peonName) === true){
        console.log(`Sir, you already have a ${peonName}.`)
        mainMenu();
    }
    else{
        peon.name = peonName;
        peon.job = "nothing";
        playerBarracks.peons.push(peon)
        playerPeonNames.push(peonName)
        console.log(`${peonName} is happy to be at your service.`)
    }
}


function mainMenu(){
    let playerSelection = prompt('Would you like to [C]reate a peon, [S]elect a peon, [P]ut peons to work, [V]iew peons, or [Q]uit: ').toUpperCase();
    if(playerSelection !== "C" && playerSelection !== "S" && playerSelection !== "P" && playerSelection !== "V" && playerSelection !== "Q"){
        iBegYePardon();
        mainMenu();
    }
    if(playerSelection === "C"){
        playerBarracks.generatePeon();
        mainMenu();
    }
    else if(playerSelection === "S"){
        console.log("select peon");
        playerSelectsPeon();
    }
    else if(playerSelection === "P"){
        playerFightsAndRepairs();
    }
    
    else if(playerSelection === "V"){
        printPeons();
        mainMenu();
    }
    else if(playerSelection === "Q"){
        console.log('You retreat and are pursued by Vlad and his forces. You end up impaled on a stick.')
    }
}


function printPeons(){
    if(playerBarracks.peons.length === 0){
        haventBred();
    }
    else{
        for (peon of playerBarracks.peons){
            console.log(`${peon.name} assigned to ${peon.job}.`)
    
        }
    }
}


function playerSelectsPeon(){
    if(playerBarracks.peons.length === 0){
        haventBred();
        mainMenu();
    }
    else{
        console.log("Your peons are:");
        printPeons();
        let playerSelection = prompt("M'lord, please type the name of the lowly servant who's life you'd like to provide meaning to: ")
        if(playerPeonNames.includes(playerSelection) === false){
            iBegYePardon();
            playerSelectsPeon();
        }
        else{
            for(peon of playerBarracks.peons){
                if(peon.name === playerSelection){
                    selectedPeon = peon;
                    peonIndex = playerBarracks.peons.indexOf(selectedPeon)
                    console.log(`How may ${selectedPeon.name} serve you?`)
                    playerAssignsPeon();
                }   
            }
        }
    }
}


function playerAssignsPeon(){
    let playerResponse = prompt(`Would you like ${selectedPeon.name} to [F]ight, or [R]epair? `).toUpperCase();
    if(playerResponse !== "F" && playerResponse !== "R"){
        iBegYePardon();
        playerAssignsPeon();
    }
    else if(playerResponse === "F"){
        selectedPeon.job = "fight";
        playerBarracks.peons.splice(peonIndex, 1, selectedPeon);
        displayAssignment();
        mainMenu();
    }
    else{
        selectedPeon.job = "repair";
        playerBarracks.peons.splice(peonIndex, 1, selectedPeon);
        displayAssignment();
        mainMenu();
    }
}


function playerFightsAndRepairs(){
    for(peon of playerBarracks.peons){
        if(peon.job === "repair"){
            playerBarracks.hitPoints += 1;
        }
        else if(peon.job === "fight"){
            computerBarracks.hitPoints -= 1;
        }
    }
    console.log(`Your peons go to work. Those assigned to fight do so valiantly.\nThose assigned to repair make imporvements to your infrastructure.`)
    computersTurn();
}


function evaluateGameStatus(){
    if(computerBarracks.hitPoints <= 0 || playerBarracks.hitPoints <= 0){
        if(playerBarracks.hitPoints <= 0 && computerBarracks.hitPoints > 0){
            console.log(`${computerBarracks.name} wins. You are impaled on a stick.`)
            gameInProgress = false
        }
        else if(computerBarracks.hitPoints <= 0 && playerBarracks.hitPoints > 0){
            console.log(`The player wins! You have defeated ${computerBarracks.name}.`)
            gameInProgress = false
        }
        else{
            console.log("The game is a tie!")
            gameInProgress = false
        }
    }
}


function computersTurn(){
    let computersHitPoints = Math.floor(Math.random() * 5);
    let computerStrategy = Math.floor(Math.random() * (500 - 1) + 1);
    if(computerStrategy < 250){
        computerBarracks.hitPoints += computersHitPoints;
        console.log(`${computerBarracks.name} rushes to repair.`)
    }
    else{
        playerBarracks.hitPoints -= computersHitPoints;
        console.log(`${computerBarracks.name} returns the attack!`)
    }
    evaluateGameStatus();
    displayHitPoints();
    if (gameInProgress === true){
        mainMenu();
    }
   
}


//displays hit points as 0 if hitpoints are negavtive
function scoreCorrector(){
    if(computerBarracks.hitPoints < 0){
        computerBarracks.hitPoints = 0;
    }
    if(playerBarracks.hitPoints < 0){
        playerBarracks.hitPoints = 0;
    }
}

function iBegYePardon(){
    console.log(`I beg ye pardon. M'lord?`);
}


function haventBred(){
   console.log("Sir, you haven't bred any peons.");
}


function displayAssignment(){
    console.log(`${selectedPeon.name} is assigned to ${selectedPeon.job}.`);
}


function displayHitPoints(){
    scoreCorrector();
    console.log(`You have ${playerBarracks.hitPoints} hitpoints remaining. ${computerBarracks.name} has ${computerBarracks.hitPoints} hitpoints remaining.`)
}


function getPlayerName(){
    username = prompt(`Please enter your name: `);
}


function greetPlayer(){
    console.log(`Welcome to castle ${username}! Vlad the Impaler and his troops are running around impaling everyone!\nYou've commanded the peasentry to start breeding as to shore up your numbers.\nIt is your duty to provide meaning to thier lives by assigning them tasks\nand seeing to it that they complete them!`);
}


function startGame(){
    getPlayerName();
    greetPlayer();
    mainMenu();
}


startGame();
