import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Sprite,
  Spritesheet,
  Ticker,
  filters,
} from "pixi.js";
import initializeApp from "../../../initializer";
import assets from "../../../models/Assets";
import userInterface from "../../../models/UserInterface";
import { updateHealthBar, updateState } from "../../../index";
import playerHealth from "../../../models/PlayerHealth";
import liveComponents from "../../../models/liveComponents";
import { ValueSprite } from "../../../models/ValueSprite";
import animationCalibration from "../../../models/AnimationCalibration";
import maiAttackAnchors from "../../../models/MaiAttackAnchors";

export class SetupBackgroundStep implements IStep {
  public isComplete = false;
  public app = initializeApp();

  public reRenderCallback = () => {
    // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  };

  public start(signal: Signal): void {
  
    assets.levelSoundtrack?.play();
    // Load the tile animation frames
    const maiFrames2 = assets.mai2.spriteData.animations;
    const ironmanStanceFrames = assets.ironmanStance.spriteData.animations;
    const ironmanAttackFrames = assets.ironmanAttack.spriteData.animations;

    // Create a spritesheet from the frame names
    if (
      assets.mai2.spriteSheet &&
      assets.ironmanAttack.spriteSheet &&
      assets.ironmanStance.spriteSheet
    ) {

      const spriteSheet2 = new Spritesheet(
        assets.mai2.spriteSheet.baseTexture,
        assets.mai2.spriteData
      );

      const ironmanAttackSheet = new Spritesheet(
        assets.ironmanAttack.spriteSheet?.baseTexture,
        assets.ironmanAttack.spriteData
      );

      const ironmanStanceSheet = new Spritesheet(
        assets.ironmanStance.spriteSheet?.baseTexture,
        assets.ironmanStance.spriteData
      );

      ironmanStanceSheet.parse(() => {
        const IMreadyTextures = ironmanStanceFrames["ready"].map(
          (frameName: string | number) => ironmanStanceSheet.textures[frameName]
        );
        const IMdazedTextures = ironmanStanceFrames["dazed"].map(
          (frameName: string | number) => ironmanStanceSheet.textures[frameName]
        );
        const IMWinfist1Textures = ironmanStanceFrames["win_fist_1"].map(
          (frameName: string | number) => ironmanStanceSheet.textures[frameName]
        );
        const IMWinfist2Textures = ironmanStanceFrames["win_fist_2"].map(
          (frameName: string | number) => ironmanStanceSheet.textures[frameName]
        );
        
        liveComponents.ironmanReady = IMreadyTextures;
        liveComponents.ironmanDazed = IMdazedTextures;
        liveComponents.ironmanWinFist1 = IMWinfist1Textures;
        liveComponents.ironmanWinFist2 = IMWinfist2Textures;
        liveComponents.ironmanStanceAnimationCatalogue.push(
          liveComponents.ironmanReady,
          liveComponents.ironmanDazed,
          liveComponents.ironmanWinFist1,
          liveComponents.ironmanWinFist2
        );
      });
      
      ironmanAttackSheet.parse(() => {
        const IMBeamTextures = ironmanAttackFrames["beam"].map(
          (frameName: string | number) => ironmanAttackSheet.textures[frameName]
        );
        const IMBeamCannonTextures = ironmanAttackFrames["beam_cannon"].map(
          (frameName: string | number) => ironmanAttackSheet.textures[frameName]
        );
        const IMHoldOrbTextures = ironmanAttackFrames["hold_orb"].map(
          (frameName: string | number) => ironmanAttackSheet.textures[frameName]
        );
        const IMPlasmaSplashTextures = ironmanAttackFrames["plasma_splash"].map(
          (frameName: string | number) => ironmanAttackSheet.textures[frameName]
        );
        const IMSpikeBombTextures = ironmanAttackFrames["spike_bomb"].map(
          (frameName: string | number) => ironmanAttackSheet.textures[frameName]
        );
        const IMSuperKickTextures = ironmanAttackFrames["super_kick"].map(
          (frameName: string | number) => ironmanAttackSheet.textures[frameName]
        );
       

          liveComponents.ironmanBeam = IMBeamTextures;
          liveComponents.ironmanBeamCannon = IMBeamCannonTextures;
          liveComponents.ironmanHoldOrb = IMHoldOrbTextures;
          liveComponents.ironmanPlasmaSplash = IMPlasmaSplashTextures;
          liveComponents.ironmanSpikeBomb = IMSpikeBombTextures;
          liveComponents.ironmanSuperKick = IMSuperKickTextures;
          liveComponents.ironmanAttackAnimationCatalogue.push(
            liveComponents.ironmanBeam,
            liveComponents.ironmanBeamCannon,
            liveComponents.ironmanHoldOrb,
            liveComponents.ironmanPlasmaSplash,
            liveComponents.ironmanSpikeBomb,
            liveComponents.ironmanSuperKick
          );
       
      });

      // Load the spritesheet and parse the frame data - parse all animations right here only
      spriteSheet2.parse(() => {
        const cryTextures = maiFrames2["cry"].map(
          (frameName: string | number) => spriteSheet2.textures[frameName]
        );
        const maiFanGreet = maiFrames2["fan_greet"].map(
          (frameName: string | number) => spriteSheet2.textures[frameName]
        );
        const maiFanThrow = maiFrames2["fan_throw"].map(
          (frameName: string | number) => spriteSheet2.textures[frameName]
        );
        const maiFlyKick = maiFrames2["fly_kick"].map(
          (frameName: string | number) => spriteSheet2.textures[frameName]
        );
        const maiLieDown = maiFrames2["lie_down"].map(
          (frameName: string | number) => spriteSheet2.textures[frameName]
        );
        const maiReady = maiFrames2["ready"].map(
          (frameName: string | number) => spriteSheet2.textures[frameName]
        );
        const maiThrow = maiFrames2["throw"].map(
          (frameName: string | number) => spriteSheet2.textures[frameName]
        );
        //
        liveComponents.mai2Ready = maiReady;
        liveComponents.mai2Cry = cryTextures;
        liveComponents.mai2FanGreet = maiFanGreet;
        liveComponents.mai2FanThrow = maiFanThrow;
        liveComponents.mai2FlyKick = maiFlyKick;
        liveComponents.mai2LieDown = maiLieDown;
        liveComponents.mai2Throw = maiThrow;

        liveComponents.maiAttackAnimationCatalogue.push(
          liveComponents.mai2FanThrow,
          liveComponents.mai2FlyKick,
          liveComponents.mai2LieDown,
          liveComponents.mai2Throw
        );
        liveComponents.maiStanceAnimationCatalogue.push(
          liveComponents.mai2Ready,
          liveComponents.mai2Cry,
          liveComponents.mai2FanGreet
        ); 
      });
       
        // Create an AnimatedSprite using the textures
        const characterOne = new AnimatedSprite(liveComponents.mai2FanGreet);

        const characterTicker = new Ticker();

        // const characterOne = new AnimatedSprite(texturesArray);
        characterOne.position.set(350, this.app.view.height - 400);
        characterOne.animationSpeed = 0.15; // Adjust the speed as needed
        characterOne.play(); // Start the animation
        characterOne.scale.x *= 2.5;
        characterOne.scale.y *= 2.5;
       //characterOne.anchor.set(0.4,0.25);
        
        liveComponents.mai = characterOne;
        liveComponents.mai.anchor.set(animationCalibration.maiGreet[0], animationCalibration.maiGreet[1]);
      
        const characterTwo = new AnimatedSprite(liveComponents.ironmanWinFist1);
        characterTwo.height = 1;
        characterTwo.width = 300;
        characterTwo.anchor.set(animationCalibration.IMWinFist1[0], animationCalibration.IMWinFist1[1]);
       
        liveComponents.ironman = characterTwo;
        
        characterTwo.position.set(
          this.app.view.width - (characterTwo.width / 2),
          this.app.view.height - 250
        );
        characterTwo.animationSpeed = 0.2; // Adjust the speed as needed
        const referenceSize = 700; // Adjust this as needed
        const scaleFactorAnimation1 = referenceSize / characterTwo.width;
        
        // Apply the scale to the animated sprites
        characterTwo.scale.set(scaleFactorAnimation1);
        characterTwo.scale.x *= -1;

        characterTwo.play();

        liveComponents.playerOne = characterOne;
        liveComponents.playerTwo = characterTwo;

        characterTicker.add(this.reRenderCallback);
        characterTicker.start();

        playerHealth.playerOneHealth = 463;
        playerHealth.playerTwoHealth = -463;
        updateState(true, "Ready?", "", true);
        assets.voiceYou?.play();

        updateHealthBar(
          playerHealth.playerOneHealth,
          playerHealth.playerTwoHealth
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

          for (let y = 0; y < 5; y++) {
            //can be this instead of hard coded random number int ... assets.symbolTextures.length
            let randomSymbolIndex = Math.floor(Math.random() * 2);
            const tempSymbol = new ValueSprite();
            tempSymbol.symbolPosition = [x, y];
            //removed old 'setvalue' as its too expensive to process
            //tempSymbol.setValue(tempSymbol.texture.textureCacheIds[0]);
            tempSymbol.texture = assets.symbolTextures[randomSymbolIndex];
            tempSymbol.value = randomSymbolIndex;
            // tempSymbol.setValue(tempSymbol.texture.textureCacheIds[0]);
            tempSymbol.width = 110;
            tempSymbol.height = 110;
            tempSymbol.position.set(x * 110, y * 110 - 110);
            tempReel.addChild(tempSymbol);
            tempReel.addChild(tempReel);
          }
          reelContainer.addChild(tempReel);
        }
        reelContainer.position.set(this.app.view.width / 2 - 110 * 2, -440);
        reelContainer.name = "reel_container";
        liveComponents.reelContainer = reelContainer;

        //REEL MASK
        const redSq = new Graphics();
        redSq.beginFill(0xff0000);
        redSq.drawRect(10, 71, 900, 445);
        this.app.stage.addChild(redSq);
        liveComponents.reelContainer.mask = redSq;

        stageOneBackground.texture = assets.textures[4]; //6 - 16 random number
        stageOneBackground.width = this.app.screen.width;
        stageOneBackground.height = this.app.screen.height;

        mainSceneContainer.addChild(stageOneBackground);
        mainSceneContainer.addChild(reelContainer);
        this.app.stage.addChild(mainSceneContainer);

        mainSceneContainer.addChild(characterOne);
        mainSceneContainer.addChild(characterTwo);

        const reelContainerIntroAnimation = (): void => {
          reelContainer.position.y += 7;
          this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
          if (reelContainer.position.y > -400) {
            updateState(true, "Ready?", "white", true);
          }
          if (reelContainer.position.y > 70) {
            playerHealth.playerOneHealth = 0;
            playerHealth.playerTwoHealth = 0;
            updateState(true, "Fight!", "red", true);

            updateHealthBar(
              playerHealth.playerOneHealth,
              playerHealth.playerTwoHealth
            );
            ticker.stop();
            assets.voiceFight?.play();
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
            updateState(false, "Fight!", "red", true);
            ticker.stop();
            this.isComplete = true;
            signal.dispatch();
          }
        };

        ticker.add(reelContainerIntroAnimation);
        ticker.start();
     
    }
  }
}
