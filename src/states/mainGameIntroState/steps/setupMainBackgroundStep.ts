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

  public start(signal: Signal): void {
    const mainSceneContainer = new Container();
    const stageOneBackground = new Sprite();

    const reelContainer = new Container();
    reelContainer.pivot.set(0.5,0.5);
    reelContainer.position.set(this.app.screen.width / 2- (110 * 2), 0);

    for(let x = 0; x < 5; x++) {
      let randomSymbolIndex = Math.floor(Math.random() * 10);
      console.log(randomSymbolIndex);
      const tempReel = new Container();
      const tempSymbol = new Sprite();
      tempSymbol.texture = assets.symbolTextures[randomSymbolIndex];
      tempSymbol.width = 110;
      tempSymbol.height = 110;
      tempSymbol.position.set(0, (x * 110), );
      tempReel.addChild(tempSymbol);
      reelContainer.addChild(tempReel);
    }
    stageOneBackground.texture = assets.textures[4]; //6 - 16 random number
    stageOneBackground.width = this.app.screen.width;
    stageOneBackground.height = this.app.screen.height;

    //reels - build it  for the first time, use another state to re-enter the spin ready state
    

    // const reelOne = new Container();
    //  const symbolOne = new Sprite();
    //  symbolOne.width = 110;
    //  symbolOne.height = 110;
    //  symbolOne.position.set(0,0);
    //  symbolOne.texture = assets.textures[6];
    //  reelOne.addChild(symbolOne);
    //  reelContainer.addChild(reelOne);
    //  console.log(mainSceneContainer);
     //end of reels
     
     mainSceneContainer.addChild(stageOneBackground);
     mainSceneContainer.addChild(reelContainer);
    this.app.stage.addChild(mainSceneContainer);

    floatingSignal.add(() =>{
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      console.log('floating signal');
    });

    this.isComplete = true;
    signal.dispatch();
    console.log(signal);
  }
}
