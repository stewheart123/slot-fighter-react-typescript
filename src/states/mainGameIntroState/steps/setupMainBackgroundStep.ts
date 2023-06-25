import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Loader,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";
import initializeApp from "../../../initializer";
import assets from "../../../models/Assets";
import  floatingSignal  from "../../../signal";

export class SetupBackgroundStep implements IStep {
  public isComplete = false;
  public app = initializeApp();

  public addGraphic(container : Container):void {
    //exmample of signal triggered game element from react
    const testgra = new Graphics();
    testgra.beginFill(0x00ff00, 1);
    testgra.drawRect(0, 0, 500, 500);
    testgra.endFill();
   container.addChild(testgra);
  }

  public start(signal: Signal): void {
    const mainSceneContainer = new Container();
    const stageOneBackground = new Sprite();
    stageOneBackground.texture = assets.textures[4];
    stageOneBackground.width = this.app.screen.width;
    stageOneBackground.height = this.app.screen.height;

    const testG = new Graphics();
  
    testG.beginFill(0x00ff00, 1);
    testG.endFill();
    testG.drawRect(0, 0, 500, 500);

    mainSceneContainer.addChild(testG);
   // console.log(testG);
    mainSceneContainer.addChild(stageOneBackground);
    this.app.stage.addChild(mainSceneContainer);
    floatingSignal.add(() =>{
      this.addGraphic(mainSceneContainer);
      this.app.renderer.render(this.app.stage);
    });
    //animation test

// Create a loader instance

// Use the `loader` to load the assets
// this.app.loader.load((loader, resources) => {
//     // Get the loaded spritesheet and animation JSON data
//       // Load the animation resources
//     const maiSheet = resources.maiSpritesheet;
//     const maiAnimation = resources.maiAnimationInf;
//     console.log('=======');
//     console.log(maiSheet);
//     console.log(maiAnimation);

//     const sheet = Loader.shared.resources["maiAnimationInfo"].spritesheet;
//     console.log(sheet);
//     if(sheet) {

//      // const sheet = new Spritesheet(maiSheet.texture.baseTexture, maiSheet.data);

//       // Parse the spritesheet
//       sheet.parse((textures) => {
//           // Access the generated textures within this callback
//           console.log(textures); // Prints the generated textures
  
//           // Create an array to hold the animation frames
//           const frames: Texture[] = [];
  
//           // Extract the animation frames from the loaded JSON data
//           for (const frameName in maiAnimation?.data.frames) {
//               frames.push(textures[frameName]);
//           }
  
//           // Create the animation from the frames
//           const animation = new AnimatedSprite(frames);
  
//           // Set the animation properties
//           animation.animationSpeed = 0.2;
//          // animation.scale.set(2);
//           animation.play();
  
//           // Add the animation to the stage
//            this.app.stage.addChild(animation);
//         });
//     }
//     // Create a spritesheet from the loaded texture


// });

    //end test
    //const sheet = await Assets.load('fighterAnimation');
    
    // const animatedSprite = new AnimatedSprite(
    //   assets.animationResources[1].animations["tile"]
    // );
    // animatedSprite.width = 200;
    // animatedSprite.height = 200;
    // animatedSprite.position.set(animatedSprite.width, animatedSprite.height);
    // animatedSprite.anchor.set(0.5, 0.5);
    // animatedSprite.scale.set(2);
    // animatedSprite.loop = true;
    // animatedSprite.animationSpeed = 0.1;
    // animatedSprite.play();
    // mainSceneContainer.addChild(animatedSprite);

    //end of test - move to new state / sequence

    this.isComplete = true;
    signal.dispatch();
    console.log(signal);
  }
}
