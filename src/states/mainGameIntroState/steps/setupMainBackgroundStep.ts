import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import { AnimatedSprite, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import initializeApp from "../../../initializer";
import assets from "../../../models/Assets";

export class SetupBackgroundStep implements IStep {
  public isComplete = false;
  public app = initializeApp();

  public async start(signal: Signal): Promise<void> {
    const mainSceneContainer = new Container();

    const stageOneBackground = new Sprite();
    stageOneBackground.texture = assets.textures[3];
    stageOneBackground.width = this.app.screen.width;
    stageOneBackground.height = this.app.screen.height;
    mainSceneContainer.addChild(stageOneBackground);
    this.app.stage.addChild(mainSceneContainer);

    //animation test
    //const sheet = await Assets.load('fighterAnimation');
    const sheet = new Spritesheet(
      assets.animationResources[0].texture.baseTexture,
      assets.animationResources[0].data
    );

    // Parse the spritesheet
    sheet.parse((textures) => {
      // Create an array to hold the animation frames
      const frames: Texture[] = [];

      // Extract the animation frames from the loaded JSON data
      for (const frameName in assets.animationResources[1].frames) {
        frames.push(textures[frameName]);
      }

      // Create the animation from the frames
      const animatedSprite = new AnimatedSprite(frames);

      //const animatedSprite = new AnimatedSprite(sheet.animations['tile']);
      animatedSprite.width = 200;
      animatedSprite.height = 200;
      animatedSprite.position.set(animatedSprite.width, animatedSprite.height);
      animatedSprite.anchor.set(0.5, 0.5);
      animatedSprite.scale.set(2);
      animatedSprite.loop = true;
      animatedSprite.animationSpeed = 0.1;
      animatedSprite.play();
      mainSceneContainer.addChild(animatedSprite);

      //end of test - move to new state / sequence

      this.isComplete = true;
      signal.dispatch();
    });
  }
}
