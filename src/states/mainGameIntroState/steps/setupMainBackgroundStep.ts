import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Loader,
  Rectangle,
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
import liveComponents from "../../../models/liveComponents";
import { ValueSprite} from "../../../models/ValueSprite";
import mai from "../../../images/character/mai-sprites.json";

export class SetupBackgroundStep implements IStep {
  public isComplete = false;
  public app = initializeApp();

  public reRenderCallback = () => {
    // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  };
  
  public start(signal: Signal): void {
    let animationFrame : any;
    let sp: any;
    let a = this.app.stage;
   
     // const jsondata = Loader.shared.resources["jsonData"].data;
      const textureImage = assets.akumaSprites[9];
     
      console.log(mai['frames']['tile000.png']);

      animationFrame = new Texture(textureImage.baseTexture, new Rectangle(mai['frames']['tile000.png'].frame.x, mai['frames']['tile000.png'].frame.y, mai['frames']['tile000.png'].frame.h, mai['frames']['tile000.png'].frame.w));
     // console.log(jsondata['frames']['Explosion_Sequence_A 3.png']);
      sp = new Sprite();
      sp.texture = animationFrame;
      a.addChild(sp);
    
    
    
    const characterTicker = new Ticker();

    let texturesArray = [
      animationFrame,
      animationFrame,
      // assets.akumaSprites[0],
      // assets.akumaSprites[1],
      // assets.akumaSprites[2],
      // assets.akumaSprites[3],
      // assets.akumaSprites[4],
      // assets.akumaSprites[5],
      // assets.akumaSprites[6],
      // assets.akumaSprites[7],
    ];
    const characterOne = new AnimatedSprite(texturesArray);
    characterOne.height = 300;
    characterOne.width = 300;
    characterOne.position.set(10, this.app.view.height - 320);
    characterOne.animationSpeed = 0.2; // Adjust the speed as needed
    characterOne.play(); // Start the animation
    const characterTwo = new AnimatedSprite(texturesArray);
    characterTwo.height = 300;
    characterTwo.width = 300;
    characterTwo.position.set(
      this.app.view.width - 10,
      this.app.view.height - 320
    );
    characterTwo.animationSpeed = 0.2; // Adjust the speed as needed
    characterTwo.scale.x *= -1;
    characterTwo.play();
    liveComponents.playerOne = characterOne;
    liveComponents.playerTwo = characterTwo;

    characterTicker.add(this.reRenderCallback);
    characterTicker.start();

    playerHealth.playerOneHealth = 0;
    playerHealth.playerTwoHealth = 0;
    updateState(
      true,
      "Ready?",
      "",
      true,
      playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
      -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth)
    );
    userInterface.hasReadyBanner = true;
    const mainSceneContainer = new Container();
    mainSceneContainer.name = "main_scene_container";
    const stageOneBackground = new Sprite();
    stageOneBackground.name = "stage_one_background";
    const reelContainer = new Container();
    const reelFrameColour = new Graphics();
    reelFrameColour.name = "reel_frame";
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
        const tempSymbol = new ValueSprite();
        tempSymbol.texture = assets.symbolTextures[randomSymbolIndex];
        tempSymbol.setValue(tempSymbol.texture.textureCacheIds[0]);
        tempSymbol.width = 110;
        tempSymbol.height = 110;
        tempSymbol.position.set(x * 110, y * 110);
        tempReel.addChild(tempSymbol);
        tempReel.addChild(tempReel);
      }
      reelContainer.addChild(tempReel);
    }
    reelContainer.position.set(this.app.view.width / 2 - 110 * 2, -440);
    reelContainer.name = "reel_container";
    liveComponents.reelContainer = reelContainer;

    stageOneBackground.texture = assets.textures[4]; //6 - 16 random number
    stageOneBackground.width = this.app.screen.width;
    stageOneBackground.height = this.app.screen.height;

    mainSceneContainer.addChild(stageOneBackground);
    mainSceneContainer.addChild(reelContainer);
    this.app.stage.addChild(mainSceneContainer);

    mainSceneContainer.addChild(characterOne);
    mainSceneContainer.addChild(characterTwo);
    console.log(reelContainer.position.y);
    const reelContainerIntroAnimation = (): void => {
      reelContainer.position.y += 7;
      this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
      if (reelContainer.position.y > -400) {
        playerHealth.playerOneHealth = 10;
        playerHealth.playerTwoHealth = 10;
        updateState(
          true,
          "Ready?",
          "white",
          true,
          playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
          -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth)
        );
      }
      if (reelContainer.position.y > 70) {
        playerHealth.playerOneHealth = 10;
        playerHealth.playerTwoHealth = 10;
        updateState(
          true,
          "Fight!",
          "red",
          true,
          playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
          -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth)
        );
        ticker.stop();
        ticker.remove(reelContainerIntroAnimation);
        ticker.add(reelContainerExitAnimation);
        ticker.start();
      }
    };
    const ticker = new Ticker();
    let elapsedTime = 0;
    const reelContainerExitAnimation = (delta: number): void => {
      elapsedTime += delta;

      // Check if 1 second has passed
      if (elapsedTime >= 100) {
        console.log("ELAPSED");
        playerHealth.playerOneHealth = 10;
        playerHealth.playerTwoHealth = 10;
        updateState(
          false,
          "Fight!",
          "red",
          true,
          playerHealth.calculateHealthBarPosition(playerHealth.playerOneHealth),
          -playerHealth.calculateHealthBarPosition(playerHealth.playerTwoHealth)
        );
        ticker.stop();
        this.isComplete = true;
        signal.dispatch();
        console.log("end!");
      }
    };

    ticker.add(reelContainerIntroAnimation);
    ticker.start();
  }
}
