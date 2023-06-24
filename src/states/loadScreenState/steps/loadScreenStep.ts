import { Step } from "../../../Step";
import appProps from "../../../models/App";
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
import symbolH from "../../../images/symbols/symbol-H.jpg";
import symbolJ from "../../../images/symbols/symbol-J.jpg";
import symbolK from "../../../images/symbols/symbol-K.jpg";
import symbolKE from "../../../images/symbols/symbol-KE.jpg";
import symbolL from "../../../images/symbols/symbol-L.jpg";
import symbolO from "../../../images/symbols/symbol-O.jpg";
import symbolR from "../../../images/symbols/symbol-R.jpg";
import symbolRT from "../../../images/symbols/symbol-RT.jpg";
import symbolS from "../../../images/symbols/symbol-S.jpg";
import symbolST from "../../../images/symbols/symbol-ST.jpg";
import symbolT from "../../../images/symbols/symbol-T.jpg";
import symbolW from "../../../images/symbols/symbol-W.jpg";
import initializeApp from "../../../initializer";

export class LoadScreenStep extends Step {
  public isComplete = false;
  public loaderBarFill = new Graphics();
  public app = initializeApp();
  
  public async start(signal: Signal): Promise<void> {
    const loadingContainer = new Container();

    const loaderBarWidth = this.app.screen.width ;
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
    //loaderBar.position.x = appProps.theApp.screen.width / 2;
    //loadingContainer.pivot.set(0.5, 0.5);
    loadingContainer.position.x =
      this.app.screen.width / 2 - loaderBarWidth / 2;
    loadingContainer.position.y =
      (this.app.screen.height - loaderBar.height) / 2;
    //loaderBar.pivot.set(0.5);
    loadingContainer.addChild(loaderBar);
    loadingContainer.addChild(this.loaderBarFill);
    this.app.stage.addChild(loadingContainer);
    liveComponents.loadScreen = loadingContainer;
    //console.log(liveComponents.loadScreen);

   await this.initializeLoader().then(() => {
      this.isComplete = true;

      //destroy the load screen
      loadingContainer.destroy();

      signal.dispatch();
    });
  }

  private async initializeLoader(): Promise<void> {
    return new Promise((resolve) => {

      // console.log("load function");
      
      //needs to load all the assets and have a download progress bar

    //how and where are the assets stored???
    const assetLoader = this.app.loader;
    this.app.loader.add([
      { name: "intro-screen-background", url: introScreenBackground },
      { name: "sf-background-dynamic", url: slotFighterBackgroundDynamic },
      { name: "sf-foreground-dynamic", url: slotFighterForegroundDynamic },
      { name: "stage-1-background", url: stageOneBackground },
      { name: "maiSpritesheet", url: maiSpriteSheet },
      { name: "maiAnimationInf", url: maiAnimationInfo },
      { name: "symbol-h", url: symbolH },
      { name: "symbol-j", url: symbolJ },
      { name: "symbol-k", url: symbolK },
      { name: "symbol-ke", url: symbolKE },
      { name: "symbol-l", url: symbolL },
      { name: "symbol-o", url: symbolO },
      { name: "symbol-r", url: symbolR },
      { name: "symbol-rt", url: symbolRT },
      { name: "symbol-s", url: symbolS },
      { name: "symbol-st", url: symbolST },
      { name: "symbol-w", url: symbolW },
    ]);

    assetLoader.onProgress.add(() => {
        this.downloadProgress(assetLoader.progress);
       // console.log('loading');
        // console.log(assetLoader.progress);
    });
    
    //saves the textures to the assets model
    assetLoader.load((loader, resources) => {
      const loadedTextures = [
        Texture.from("intro-screen-background"),
        Texture.from("sf-foreground-dynamic"),
        Texture.from("stage-1-background"),
        Texture.from("intro-screen-background"),
        Texture.from("symbol-h"),
        Texture.from("symbol-j"),
        Texture.from("symbol-k"),
        Texture.from("symbol-ke"),
        Texture.from("symbol-l"),
        Texture.from("symbol-o"),
        Texture.from("symbol-r"),
        Texture.from("symbol-rt"),
        Texture.from("symbol-s"),
        Texture.from("symbol-st"),
        Texture.from("symbol-w"),
      ];
      assets.textures = loadedTextures;
      const spritesheet = resources.maiSpriteSheet;
      const animationData = resources.maiAnimationInfo;
      assets.animationResources = [spritesheet, animationData];
    });
    assetLoader.onComplete.add(() => {
     resolve(); //something here?
    });
  });
    
  }
  private downloadProgress(progressRatio: number): void {
    // progressRatio goes from 0 to 1, so set it to scale
    this.loaderBarFill.scale.x = progressRatio;
  }
}


//think i need to add everything to a container, then put the container into the app...