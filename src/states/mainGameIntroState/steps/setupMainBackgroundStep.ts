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
  Ticker,
} from "pixi.js";
import initializeApp from "../../../initializer";
import assets from "../../../models/Assets";
import floatingSignal from "../../../signal";
import userInterface from "../../../models/UserInterface";
import { updateState } from "../../../index";
import playerHealth from "../../../models/PlayerHealth";

export class SetupBackgroundStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  
  public start(signal: Signal): void {
    playerHealth.playerOneHealth = 0;
    playerHealth.playerTwoHealth = 0;
    updateState(true, "Ready?", "", true,
     playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
     -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth));
    userInterface.hasReadyBanner = true;
    const mainSceneContainer = new Container();
    const stageOneBackground = new Sprite();
    const reelContainer = new Container();
    const reelFrameColour = new Graphics();
    reelFrameColour.beginFill(0x746960);
    reelFrameColour.drawRect(-10, -10, 110 * 4 + 20, 110 * 4 + 20);
    reelFrameColour.endFill();
    reelContainer.addChild(reelFrameColour);

    reelContainer.pivot.set(0.5, 0.5);
    reelContainer.position.set(this.app.screen.width / 2 - 110 * 2, 0);
    for (let x = 0; x < 4; x++) {
      const tempReel = new Container();

      for (let y = 0; y < 4; y++) {
        let randomSymbolIndex = Math.floor(Math.random() * 10);
        //console.log(randomSymbolIndex);
        const tempSymbol = new Sprite();
        tempSymbol.texture = assets.symbolTextures[randomSymbolIndex];
        tempSymbol.width = 110;
        tempSymbol.height = 110;
        tempSymbol.position.set(x * 110, y * 110);
        tempReel.addChild(tempSymbol);
        tempReel.addChild(tempReel);
      }
      reelContainer.addChild(tempReel);
    }
    reelContainer.position.set(this.app.view.width / 2 - 110 * 2, -440);

    stageOneBackground.texture = assets.textures[4]; //6 - 16 random number
    stageOneBackground.width = this.app.screen.width;
    stageOneBackground.height = this.app.screen.height;

    mainSceneContainer.addChild(stageOneBackground);
    mainSceneContainer.addChild(reelContainer);
    this.app.stage.addChild(mainSceneContainer);

    // floatingSignal.add(() => {
    //   // add a pixi game instruction in here, the floating signal canbe exported to the UI
    //   console.log("floating signal");
    // });

    console.log(reelContainer.position.y);
    const reelContainerIntroAnimation = (): void => {
      reelContainer.position.y += 7;
      this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
      if (reelContainer.position.y > -400) {
        playerHealth.playerOneHealth = 10;
        playerHealth.playerTwoHealth = 10;
        updateState(true, "Ready?", "white", true, 
        playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
        -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth));
      }
      if (reelContainer.position.y > 70) {
        playerHealth.playerOneHealth = 10;
        playerHealth.playerTwoHealth = 10;
        updateState(true, "Fight!", "red", true, 
         playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
        -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth));
        ticker.stop();
        ticker.remove(reelContainerIntroAnimation)
        ticker.add(reelContainerExitAnimation);
        ticker.start();
      }
    };
    const ticker = new Ticker();
    let elapsedTime = 0;
    const reelContainerExitAnimation = (delta:number): void => {
      elapsedTime += delta;

      // Check if 1 second has passed
      if (elapsedTime >= 100) {
        console.log('ELAPSED');
        playerHealth.playerOneHealth = 10;
        playerHealth.playerTwoHealth = 10;
        updateState(false, "Fight!", "red", true, 
         playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
        -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth));
        ticker.stop();
        this.isComplete = true;
        signal.dispatch();
        console.log('end!');
      }
    };

    ticker.add(reelContainerIntroAnimation);
    ticker.start();
    // how to set up an animation??

   
  }
}
