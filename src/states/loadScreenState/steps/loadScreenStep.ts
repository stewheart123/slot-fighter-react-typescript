import { Step } from "../../../Step";
// import appProps from "../../../models/App";
import assets from "../../../models/Assets";
import { Graphics, Container, Texture } from "pixi.js";
import { Signal } from "signals.js";
import liveComponents from "../../../models/liveComponents";
import introScreenBackground from "../../../images/scene/into-screen-background.jpg";
import slotFighterBackgroundDynamic from "../../../images/scene/slot-fighter-background-dynamic.jpg";
import slotFighterForegroundDynamic from "../../../images/scene/slot-fighter-foreground-dynamic.png";
import stageOneBackground from "../../../images/scene/stage-1-background.jpg";
import maiSpriteSheet from "../../../images/character/mai-sprites.png";
import maiAnimationInfo from "../../../images/character/mai-sprites.json";
import maiSpriteSheet2 from "../../../images/character/mai_complete_range.png";
import maiAnimationInfo2 from "../../../images/character/mai_complete_range.json";
import ironmanStanceSpriteSheet from "../../../images/character/iron_man_stance_range.png";
import ironmanStanceInfo from "../../../images/character/iron_man_stance_range.json";
import ironmanAttackSpriteSheet from "../../../images/character/iron_man_attack_range.png";
import ironmanAttackInfo from "../../../images/character/iron_man_attack_range.json";
import symbolH from "../../../images/symbols/symbol-H.jpg";
import symbolJ from "../../../images/symbols/symbol-J.jpg";
import initializeApp from "../../../initializer";

export class LoadScreenStep extends Step {
  
  public isComplete = false;
  public loaderBarFill = new Graphics();
  public app = initializeApp();
  public async start(signal: Signal): Promise<void> {
    const loadingContainer = new Container();

    const loaderBarWidth = this.app.screen.width;
    // the fill of the bar.
    this.loaderBarFill.beginFill(0xff7a00, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 25);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0; // we draw the filled bar and with scale we set the %

    // The border of the bar.
    let loaderBarProgress = new Graphics();
    loaderBarProgress.beginFill(0x332e2e, 1);
    loaderBarProgress.endFill();
    loaderBarProgress.drawRect(0, 0, loaderBarWidth, 25);

    // Now we keep the border and the fill in a container so we can move them together.
    let loaderBar = new Container();
    loaderBar.addChild(this.loaderBarFill);
    loaderBar.addChild(loaderBarProgress);
    //Looks complex but this just centers the bar on screen.
    loadingContainer.position.x =
      this.app.screen.width / 2 - loaderBarWidth / 2;
    loadingContainer.position.y =
      (this.app.screen.height - loaderBar.height) / 2;
    loadingContainer.addChild(loaderBar);
    loadingContainer.addChild(this.loaderBarFill);
    this.app.stage.addChild(loadingContainer);
    liveComponents.loadScreen = loadingContainer;
    assets.introTheme = new Howl({
      src: [window.location.origin + "/intro_theme.mp3"],
      loop: true,
      autoplay: true,
      volume: 0.2
    });
    assets.levelSoundtrack = new Howl({
      src: [window.location.origin + "/level_soundtrack.mp3"],
      loop: true,
      autoplay: false,
      volume: 0.1
    });
    assets.voiceFight = new Howl({
      src: [window.location.origin + "/fight.mp3"],
      loop: false,
      autoplay: false,
      volume: 0.5
    });
    assets.voiceYou = new Howl({
      src: [window.location.origin + "/you.mp3"],
      loop: false,
      autoplay: false,
      volume: 0.5
    });
    assets.voiceWin = new Howl({
      src: [window.location.origin + "/win.mp3"],
      loop: false,
      autoplay: false,
      volume: 0.5
    });
    assets.voiceLose = new Howl({
      src: [window.location.origin + "/lose.mp3"],
      loop: false,
      autoplay: false,
      volume: 0.5
    });
    assets.clunkClick = new Howl({
      src: [window.location.origin + "/clunk_click.wav"],
      loop: false,
      autoplay: false,
      volume: 0.3
    });
    assets.evilSpin = new Howl({
      src: [window.location.origin + "/evil_spin.wav"],
      loop: false,
      autoplay: false,
      volume: 0.2
    });

    await this.initializeLoader().then(() => {
      this.isComplete = true;

      //destroy the load screen
      loadingContainer.destroy();

      signal.dispatch();
    });
  }

  private async initializeLoader(): Promise<void> {
    return new Promise((resolve) => {
      //assets stored to Assets file, use 'live components' to manage game objects which can be referenced by different files
      const assetLoader = this.app.loader;
      this.app.loader.add([
        { name: "intro-screen-background", url: introScreenBackground },
        { name: "sf-background-dynamic", url: slotFighterBackgroundDynamic },
        { name: "sf-foreground-dynamic", url: slotFighterForegroundDynamic },
        { name: "stage-1-background", url: stageOneBackground },
        { name: "maiSpritesheet", url: maiSpriteSheet },
        { name: "maiSpritesheet2", url: maiSpriteSheet2 },
        { name: "ironmanStanceSpriteSheet", url: ironmanStanceSpriteSheet },
        { name: "ironmanAttackSpriteSheet", url: ironmanAttackSpriteSheet },
        { name: "symbol-h", url: symbolH },
        { name: "symbol-j", url: symbolJ },
      ]);

      assetLoader.onProgress.add(() => {
        this.downloadProgress(assetLoader.progress);
      });
      //saves the textures to the assets model
      assetLoader.load((loader, resources) => {
        const gameTextures = [
          Texture.from("intro-screen-background"),
          Texture.from("sf-foreground-dynamic"),
          Texture.from("sf-background-dynamic"),
          Texture.from("intro-screen-background"),
          Texture.from("stage-1-background"),
        ];
        const symbolTextures = [
          Texture.from("symbol-h"),
          Texture.from("symbol-j"),
        ];

        assets.textures = gameTextures;
        assets.symbolTextures = symbolTextures;
        assets.mai.spriteData = maiAnimationInfo;
        assets.mai2.spriteData = maiAnimationInfo2;
        assets.ironmanStance.spriteData = ironmanStanceInfo;
        assets.ironmanAttack.spriteData = ironmanAttackInfo;
        assets.mai.spriteSheet = Texture.from("maiSpritesheet");
        assets.mai2.spriteSheet = Texture.from("maiSpritesheet2");
        assets.ironmanStance.spriteSheet = Texture.from("ironmanStanceSpriteSheet");
        assets.ironmanAttack.spriteSheet = Texture.from("ironmanAttackSpriteSheet");
      });
      assetLoader.onComplete.add(() => {
        resolve(); //something here?
      });
    });
  }
  private downloadProgress(progressRatio: number): void {
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
    // progressRatio goes from 0 to 1, so set it to scale
    this.loaderBarFill.scale.x = progressRatio;
  }
}
