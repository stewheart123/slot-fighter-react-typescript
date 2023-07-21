import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import { AnimatedSprite, Graphics, Sprite, Ticker } from "pixi.js";
import assets from "../../../models/Assets";
import { Texture } from "pixi.js";

export class ExposeSpinButtonStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  
  public reRenderCallback = () => { // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  }

  public start(signal: Signal): void {
    const tick = new Ticker();
   
    console.log(assets.symbolTextures[0]);

    const texturesArray =  [assets.symbolTextures[3], assets.symbolTextures[1] ,assets.symbolTextures[2]];
    const animatedSprite = new AnimatedSprite(texturesArray);
    animatedSprite.animationSpeed = 0.010; // Adjust the speed as needed
animatedSprite.play(); // Start the animation
tick.add(this.reRenderCallback);



// Step 4: Add the AnimatedSprite to the stage
this.app.stage.addChild(animatedSprite);
    // Get the data from the JSON file
    // const spritesheetJsonData = JSON.parse(assets.animation.maiAnimationInf[0]);
    // console.log(spritesheetJsonData);

    // const animatedCapguy = new AnimatedSprite(spritesheetJsonData.animations["tile"]);

    // // set speed, start playback and add it to the stage
    // animatedCapguy.animationSpeed = 0.167; 
    // animatedCapguy.play();
    // this.app.stage.addChild(animatedCapguy);
    // // Extract each frame from the sprite sheet and store them in the frames array
    // for (let frameName in spritesheetJsonData["frames"]) {
    //   const texture = Texture.from(frameName);
    //   frames.push(texture);
    // }

    // // Create the sprite using the first frame of the animation
    // const sprite = new AnimatedSprite(frames);

    // // Set the animation speed and loop
    // sprite.animationSpeed = 0.2;
    // sprite.loop = true;

    // // Position the sprite on the canvas
    // sprite.x = instance.screen.width / 2 - sprite.width / 2;
    // sprite.y = instance.screen.height / 2 - sprite.height / 2;

    // // Start playing the animation
    // sprite.play();
    // instance.stage.addChild(sprite);

    // const square = new Graphics();
    // square.beginFill(0xff0000);
    // square.drawRect(0, 0, 400, 400);
    // square.endFill();
    // this.app.stage.addChild(square);
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!

    updateControls(true);

    floatingSignal.add(() => {
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      // this.isComplete = true;
      // signal.dispatch();
      // console.log("floating signal - expose spin button..");
      tick.start();
    });
  }
}
