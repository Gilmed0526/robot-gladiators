//variable object 
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },//always comma
  refillHealth: function(){
    this.health += 20;
    this.money -= 7;
  },//comma
  upgradeAttack: function(){
    this.attack += 6;
    this.money -= 7;
  }

};
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

// fight function
var fight = function(enemy) {
  
  while (playerInfo.health> 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money fromplayerInfo.money for skipping
       playerInfo.money = Math.max(0,playerInfo.money - 10);
        console.log("playerplayerInfo.money",playerInfo.money);
        break;
      }
    }

    // remove enemy health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.Name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy health
    if (enemy.health <= 0) {
      window.alert(enemy.Name + ' has died!');

      // award player money for winning
     playerInfo.money =playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.Name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health= Math.max(0, playerInfo.health- damage);
    console.log(
      enemy.Name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health+ ' health remaining.'
    );

    // check player's health
    if (playerInfo.health<= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health+ ' health left.');
    }
  }
};

// fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function(){
  //Reset player stats
  playerInfo.reset();
for (var i = 0; i <enemyInfo.length; i++) {
  // if player is still alive, keep fighting
  if (playerInfo.health> 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    // pick new enemy to fight based on the index of the enemy.Names array
    var pickedEnemyObj = enemyInfo[i];;

    // reset enemy.health before starting new fight
    pickedEnemyObj.health = randomNumber(40, 60);

    fight(pickedEnemyObj);
    if(playerInfo.health> 0 && i < enemyInfo.length - 1){
      //Ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over visit the store before next round?");
      //if yes take them to the store() function
     if(storeConfirm){
      shop();
     }
    }
  }
  // if player isn't alive, stop the game
  else {
    window.alert('You have lost your robot in battle! Game Over!');
    break;
  }
}
endGame();
};
// Function to end the game
var endGame = function(){
  //If player still alive, player wins!
  if (playerInfo.health> 0){
    window.alert("Great job, you've survive the game! You now have a score of" +playerInfo.money +  ".");
  }else{
    window.alert("You have lost the battle");
  }//ask the player to play again
  var playAgainConfirm = window.alert("Would you like to Play again?");
  if (playAgainConfirm){
    // Restart the game
    startGame();
  }else{
    window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
};
// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};
//shop function
var shop = function(){
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    
  );
  // uses the  switch to carry out action
  switch (shopOptionPrompt) {
    case 'REFILL':
    case 'refill':
      playerInfo.refillHealth();
      break;
    case 'UPGRADE':
    case 'upgrade':
      playerInfo.upgradeAttack();
      break;
    case 'LEAVE':
    case 'leave':
      window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
}
};
//Starts the game when loaded
startGame();