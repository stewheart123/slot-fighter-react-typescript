//player 1 zero = full , 463 = empty
//player 2 - zero = full, -463 = empty 
const playerHealth = {
    playerOneHealth : undefined as undefined | number,
    playerTwoHealth : undefined as undefined | number,
    calculateHealthBarPosition : (input:number):number => {
        return 460 - input * 46;
    },
    checkWin : () => { 
        var resultObject;
        if(playerHealth.playerOneHealth != undefined && playerHealth.playerTwoHealth != undefined) {
            if( playerHealth.playerOneHealth >= 463 && playerHealth.playerTwoHealth > -463 ) {        
                resultObject = {
                    winner: "playerTwo"
                };
            }
            if( playerHealth.playerOneHealth < 463 && playerHealth.playerTwoHealth <= -463 ) {        
                resultObject = {
                    winner: "playerOne"
                };
            }
            
        } else {
            resultObject = {
                winner: undefined
            }
        }
        return(resultObject)
    }
};


export default playerHealth;