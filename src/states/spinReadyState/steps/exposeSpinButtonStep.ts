import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import { AnimatedSprite, Graphics, Sprite, Ticker } from "pixi.js";
import assets from "../../../models/Assets";


export class ExposeSpinButtonStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  
  public reRenderCallback = () => { // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  }

  public start(signal: Signal): void {
    const tick = new Ticker();
   
    console.log(assets.symbolTextures[0]);

    const texturesArray =  [
      assets.akumaSprites[0], 
      assets.akumaSprites[1],
      assets.akumaSprites[2],
      assets.akumaSprites[3],
      assets.akumaSprites[4],
      assets.akumaSprites[5],
      assets.akumaSprites[6],
      assets.akumaSprites[7]
    ];
    const animatedSprite = new AnimatedSprite(texturesArray);
    animatedSprite.height = 300;
    animatedSprite.width = 300;
    animatedSprite.position.set(this.app.view.width - 10, this.app.view.height - 320);
    animatedSprite.animationSpeed = 0.2; // Adjust the speed as needed
    animatedSprite.scale.x *= -1; 
animatedSprite.play(); // Start the animation
tick.add(this.reRenderCallback);
tick.start();



// Step 4: Add the AnimatedSprite to the stage
this.app.stage.addChild(animatedSprite);

    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!

    updateControls(true);

    floatingSignal.add(() => {
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      // this.isComplete = true;
      // signal.dispatch();
      // console.log("floating signal - expose spin button..");
      tick.stop();
    });
  }
}
