import { IStep } from "../../../IStep";
import { Signal } from "signals.js/lib/org/osflash/signals/Signal";
import { Sprite, Container, Graphics, Text } from "pixi.js";
//delete the old loading container from the game instance!
import initializeApp from "../../../initializer";
import assets from "../../../models/Assets";
import { Howl } from "howler";
//import "../../../../src/images"

export class StepSplashScreen implements IStep {
  public isComplete = false;
  public app = initializeApp();

  private completeStep(signal: Signal) {
    this.isComplete = true;
    signal.dispatch();
  }

  public start(signal: Signal): void {

    assets.introTheme?.play();
    const insertCoinSound = new Howl({
      src: [window.location.origin + "/coin_inserted.wav"],
      
       // Replace with the actual path to your audio file
       //C:/Users/stew_/Documents/CODING STUFF/PIXIJS/slot-fighter-react-typescript/assets/crunch.mp3
       //"https://s3-us-west-2.amazonaws.com/s.cdpn.io/596723/hit2.wav"
      autoplay: false, // Don't autoplay
      loop: false,
      volume: 1.0,
      onend: function () {
        console.log("howl Finished!");
      },
      onload: function (error) {
        console.log("loading the audio...");
      },

      onloaderror: function (error) {
        console.error("Error loading the audio file.", error);
      },
    });
    console.log(insertCoinSound);
   

    const splashContainer = new Container();
    const foregroundFighter = new Sprite();
    foregroundFighter.texture = assets.textures[1];
    foregroundFighter.width = this.app.screen.width;
    foregroundFighter.height = this.app.screen.height;
    const backgroundImage = new Sprite();
    backgroundImage.texture = assets.textures[2];
    backgroundImage.width = this.app.screen.width;
    backgroundImage.height = this.app.screen.width;
    splashContainer.addChild(backgroundImage);
    splashContainer.addChild(foregroundFighter);

    // foreground animation
    const startY = foregroundFighter.y;
    const amplitude = 2;
    const frequency = 0.05;
    let time = 0;
    let animationOn = true;
    // Animation loop
    this.app.ticker.add(() => {
      if (animationOn) {
        time += this.app.ticker.deltaTime;
        // Calculate the new Y position based on the time and amplitude
        const newY = startY + Math.sin(time * frequency) * amplitude;
        foregroundFighter.y = newY;
      }
    });

    const buttonContainer = new Container();
    const insertCoinButton = new Graphics();
    insertCoinButton.lineStyle(4, 0x000000, 6);
    insertCoinButton.beginFill(0xff7a00, 1);
    insertCoinButton.drawRect(0, 0, 250, 50);
    insertCoinButton.endFill();
    insertCoinButton.interactive = true;
    insertCoinButton.cursor = "pointer";
    insertCoinButton.on("pointerdown", () => {
      //  console.log("coin inserted");
      insertCoinSound.play();
      assets.introTheme?.stop();
      animationOn = false;
      insertCoinButton.visible = true;
      creditsText.text = "CREDITS 01";

      // this.app.stage.children[0].destroy();
    });

    buttonContainer.addChild(insertCoinButton);

    buttonContainer.x = this.app.screen.width / 2 - 125;
    buttonContainer.y = this.app.screen.height / 1.5;
    const buttonText = new Text("INSERT COIN", {
      fontFamily: "Bayon",
      fontSize: 36,
      fill: 0x000000, // black color
    });
    // Set the anchor of the text to center
    buttonText.anchor.set(0.5);

    const titleContainer = new Container();
    const titleSlotBackground = new Graphics();

    titleSlotBackground.beginFill(0x000000, 1);
    titleSlotBackground.drawRect(0, 0, 210, 88);
    titleSlotBackground.endFill();

    const titleSlot = new Text("SLOT", {
      fontFamily: "Tourney",
      fontSize: 80,
      fill: 0xffffff,
    });
    const titleFighter = new Text("FIGHTER", {
      fontFamily: "Permanent Marker",
      fontSize: 80,
      fill: 0xff5c00,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
    });
    titleSlot.position.x = 10;
    titleFighter.position.set(titleFighter.width / 1.85, -10);
    titleSlotBackground.addChild(titleSlot);
    titleContainer.addChild(titleSlotBackground);
    titleContainer.addChild(titleFighter);
    titleContainer.pivot.set(1, 1);
    titleContainer.position.set(
      this.app.screen.width / 2 - titleSlotBackground.width,
      this.app.screen.height / 2 - titleSlotBackground.height / 8
    );

    buttonText.x = buttonContainer.width / 2;
    buttonText.y = buttonContainer.height / 2;

    insertCoinButton.addChild(buttonText);
    insertCoinButton.visible = false;
    const flashDuration = 50;
    let isObjectVisible = false;
    let elapsedTime = 0;
    // Flashing animation loop for button
    this.app.ticker.add((delta) => {
      if (animationOn) {
        elapsedTime += delta;
        if (elapsedTime >= flashDuration) {
          isObjectVisible = !isObjectVisible;
          insertCoinButton.visible = isObjectVisible;
          elapsedTime = 0;
        }
      } else {
        // foregroundFighter.destroy();
        //  buttonContainer.destroy();
        this.isComplete = true;
        this.completeStep(signal);
        this.app.ticker.stop();
        splashContainer.destroy();
      }
    });

    const creditsText = new Text("CREDITS 00", {
      fontFamily: "Bayon",
      fontSize: 36,
      fill: 0xffffff, // black color
    });
    // Set the anchor of the text to center
    creditsText.anchor.set(1, 0);

    // Calculate the center position within the container
    creditsText.x = this.app.screen.width;
    creditsText.y = 0;

    splashContainer.addChild(titleContainer);
    splashContainer.addChild(buttonContainer);
    splashContainer.addChild(creditsText);

    this.app.stage.addChild(splashContainer);

    // refactor liveComponents.splashScreen = splashContainer;

    //place the dispatch inside a button event
    //this.isComplete = true;
  }
}
