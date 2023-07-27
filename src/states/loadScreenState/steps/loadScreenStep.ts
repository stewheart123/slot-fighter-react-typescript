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
//akuma sprites can be refactored to its own spritesheet - same as mai
import akuma0 from "../../../images/akuma/frame_0.png";
import akuma1 from "../../../images/akuma/frame_1.png";
import akuma2 from "../../../images/akuma/frame_2.png";
import akuma3 from "../../../images/akuma/frame_3.png";
import akuma4 from "../../../images/akuma/frame_4.png";
import akuma5 from "../../../images/akuma/frame_5.png";
import akuma6 from "../../../images/akuma/frame_6.png";
import akuma7 from "../../../images/akuma/frame_7.png";

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
        { name: "symbol-h", url: symbolH },
        { name: "symbol-j", url: symbolJ },
        { name: "symbol-k", url: symbolK },
        { name: "symbol-ke", url: symbolKE },
        { name: "symbol-l", url: symbolL },
        { name: "symbol-o", url: symbolO },
        { name: "symbol-r", url: symbolR },
        { name: "symbol-rt", url: symbolRT },
        { name: "symbol-s", url: symbolS },
        { name: "symbol-t", url: symbolT },
        { name: "symbol-w", url: symbolW },
        { name: "symbol-st", url: symbolST },
        //replace akuma individuals here too
        { name: "akuma-0", url: akuma0 },
        { name: "akuma-1", url: akuma1 },
        { name: "akuma-2", url: akuma2 },
        { name: "akuma-3", url: akuma3 },
        { name: "akuma-4", url: akuma4 },
        { name: "akuma-5", url: akuma5 },
        { name: "akuma-6", url: akuma6 },
        { name: "akuma-7", url: akuma7 },
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
          Texture.from("symbol-k"),
          Texture.from("symbol-ke"),
          Texture.from("symbol-l"),
          Texture.from("symbol-o"),
          Texture.from("symbol-r"),
          Texture.from("symbol-rt"),
          Texture.from("symbol-s"),
          Texture.from("symbol-st"),
          Texture.from("symbol-t"),
          Texture.from("symbol-w"),
        ];

        const akuma = [
          Texture.from("akuma-0"),
          Texture.from("akuma-1"),
          Texture.from("akuma-2"),
          Texture.from("akuma-3"),
          Texture.from("akuma-4"),
          Texture.from("akuma-5"),
          Texture.from("akuma-6"),
          Texture.from("akuma-7"),
        ];
        assets.textures = gameTextures;
        assets.symbolTextures = symbolTextures;
        assets.animation = resources;
        assets.akumaSprites = akuma;
        assets.mai.spriteData = maiAnimationInfo;
        assets.mai.spriteSheet = Texture.from("maiSpritesheet");
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
