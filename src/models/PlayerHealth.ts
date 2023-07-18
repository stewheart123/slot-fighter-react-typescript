const playerHealth = {
    playerOneHealth : undefined as undefined | number,
    playerTwoHealth : undefined as undefined | number,
    calculateHealthBarPosition : (input:number):number => {
        return 460 - input * 46;
    }
};


export default playerHealth;