import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import { AnimatedSprite, Graphics, Sprite, Spritesheet, Ticker } from "pixi.js";
import assets from "../../../models/Assets";

export class ExposeSpinButtonStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  public reRenderCallback = () => {
    // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  };

  public start(signal: Signal): void {
    const tick = new Ticker();
    const tileFrames = assets.mai.spriteData.animations["ready"];
    if (assets.mai.spriteSheet) {
      const spritesheet = new Spritesheet(
        assets.mai.spriteSheet.baseTexture,
        assets.mai.spriteData
      ); // Replace with your spritesheet image path

      // Load the spritesheet and parse the frame data
      spritesheet.parse(() => {
        // Create an array of textures for the animation frames
        const textures = tileFrames.map(
          (frameName: string | number) => spritesheet.textures[frameName]
        );
        liveComponents.mai.textures = textures;
        liveComponents.mai.play();
      });
    }

    updateControls(true);

    floatingSignal.add(() => {
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      // this.isComplete = true;
      // signal.dispatch();
      // console.log("floating signal - expose spin button..");
    });
  }
}
