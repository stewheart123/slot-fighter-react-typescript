import { Step } from "../../../Step";
import appProps from "../../../models/App";
import assets from "../../../models/Assets";
import { Graphics, Container, Texture } from "pixi.js";
import { Signal } from "signals.js";
import liveComponents from "../../../models/liveComponents";
import introScreenBackground from "../../../images/scene/into-screen-background.jpg";
export class LoadScreenStep extends Step {
  public isComplete = false;
  public loaderBarFill = new Graphics();

  public start(signal: Signal): void {
    console.log('loadscreenstep');
    const loadingContainer = new Container();

    const loaderBarWidth = appProps.theApp.screen.width; // just an auxiliar variableconst
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
      appProps.theApp.screen.width / 2 - loaderBarWidth / 2;
    loadingContainer.position.y =
      (appProps.theApp.screen.height - loaderBar.height) / 2;
    //loaderBar.pivot.set(0.5);
    loadingContainer.addChild(loaderBar);
    loadingContainer.addChild(this.loaderBarFill);
    appProps.theApp.stage.addChild(loadingContainer);
    liveComponents.loadScreen = loadingContainer;

    this.initializeLoader().then(() => {
      this.isComplete = true;

      //destroy the load screen

      signal.dispatch();
    });
  }

  private async initializeLoader(): Promise<void> {
    console.log("load function");

    //needs to load all the assets and have a download progress bar

    //how and where are the assets stored???
    const assetLoader = appProps.theApp.loader;
    appProps.theApp.loader.add([
      { name: "intro-screen-background", url: introScreenBackground },
    ]);

    assetLoader.onProgress.add(() => {
        this.downloadProgress(assetLoader.progress);
        console.log('loading');
        console.log(assetLoader.progress);
    });

    //saves the textures to the assets model
    assetLoader.load(() => {
      const loadedTextures = [Texture.from("intro-screen-background")];
      assets.textures = loadedTextures;
    });
    
  }
  private downloadProgress(progressRatio: number): void {
    // progressRatio goes from 0 to 1, so set it to scale
    this.loaderBarFill.scale.x = progressRatio;
}
}