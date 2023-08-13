/**
 * somehow save the win lines to this, then play the animations as steps, removing health after the animation completes.
 * after animations are completed, the model needs to empty its contents
 * 
 * also need to animate the win lines with electricity / flames / some kind of effect
 */
let animationPlayer = {
    playerName : "",
    animationSequence : [] as string[],
    damageAmounts : [] as number[],
    reelPlots: [] as number[][]
};

export default animationPlayer;