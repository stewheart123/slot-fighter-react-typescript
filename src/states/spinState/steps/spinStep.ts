import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import { AnimatedSprite, Graphics, Sprite, Spritesheet, Ticker } from "pixi.js";
import assets from "../../../models/Assets";
import { ValueSprite } from "../../../models/ValueSprite";

export class SpinStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  // public reRenderCallback = () => {
  // // Use an arrow function here
  // this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  // };

  public start(signal: Signal): void {
    this.isComplete = false;
    if (liveComponents.reelAnimation === undefined) {
      const reelticker = new Ticker();
      liveComponents.reelAnimation = reelticker;
    }
    const reelSymbols = liveComponents.reelContainer.children;
    let reelOne: any[] = [];
    for (let y = 0; y < reelSymbols.length; y++) {
      reelOne.push(reelSymbols[1].children[y]);
    }

    let symbolOneStartTargets: any[] = [];
    for (let i = 0; i < reelOne.length; i++) {
      symbolOneStartTargets.push(reelOne[i].position.y);
    }
    let symbolOneEndTargets: any[] = [];
    for (let i = 0; i < reelOne.length; i++) {
      symbolOneEndTargets.push(symbolOneStartTargets[i] + reelOne[i].height);
    }
    let reelTwo: any[] = [];
    for (let y = 0; y < reelSymbols.length; y++) {
      reelTwo.push(reelSymbols[2].children[y]);
    }
    let symbolTwoStartTargets: any[] = [];
    for (let i = 0; i < reelTwo.length; i++) {
      symbolTwoStartTargets.push(reelTwo[i].position.y);
    }
    let symbolTwoEndTargets: any[] = [];
    for (let i = 0; i < reelTwo.length; i++) {
      symbolTwoEndTargets.push(symbolTwoStartTargets[i] + reelTwo[i].height);
    }
    let reelThree: any[] = [];
    for (let y = 0; y < reelSymbols.length; y++) {
      reelThree.push(reelSymbols[3].children[y]);
    }
    let symbolThreeStartTargets: any[] = [];
    for (let i = 0; i < reelOne.length; i++) {
      symbolThreeStartTargets.push(reelThree[i].position.y);
    }
    let symbolThreeEndTargets: any[] = [];
    for (let i = 0; i < reelOne.length; i++) {
      symbolThreeEndTargets.push(
        symbolThreeStartTargets[i] + reelThree[i].height
      );
    }
    let reelFour: any[] = [];
    for (let y = 0; y < reelSymbols.length; y++) {
      reelFour.push(reelSymbols[4].children[y]);
    }
    let symbolFourStartTargets: any[] = [];
    for (let i = 0; i < reelFour.length; i++) {
      symbolFourStartTargets.push(reelFour[i].position.y);
    }
    let symbolFourEndTargets: any[] = [];
    for (let i = 0; i < reelFour.length; i++) {
      symbolFourEndTargets.push(symbolFourStartTargets[i] + reelFour[i].height);
    }

    let moveCount = 0;

    const animateReel = (
      reel: any[],
      reelStartTargets: number[],
      reelEndTargets: number[]
    ) => {
      for (let z = 0; z < reelOne.length; z++) {
        if (reel[z].position.y < reelEndTargets[z]) {
          reel[z].position.set(reel[z].position.x, reel[z].position.y + 10);
        }
        if (reel[z].position.y >= reelEndTargets[z]) {
          reel[z].position.set(reel[z].position.x, reelStartTargets[z]);

          if (z === 4) {
            reel[4].texture = reel[3].texture;
            reel[3].texture = reel[2].texture;
            reel[2].texture = reel[1].texture;
            reel[1].texture = reel[0].texture;
            let randomSymbolIndex = Math.floor(Math.random() * 10);
            reel[0].texture = assets.symbolTextures[randomSymbolIndex];
            reel[0].setValue(reel[0].texture.textureCacheIds[0]);
            moveCount++;
          }
        }
      }
      if (moveCount === 30) {
        if (liveComponents.reelAnimation) {
          liveComponents.reelAnimation.stop();
        }
        updateControls(true);
        moveCount = 0;
      }
    };

    if (liveComponents.reelAnimationSet === false) {
      liveComponents.reelAnimationSet = true;
      liveComponents.reelAnimation.add(() => {
        animateReel(reelOne, symbolOneStartTargets, symbolOneEndTargets);
      });
      liveComponents.reelAnimation.add(() => {
        animateReel(reelTwo, symbolTwoStartTargets, symbolTwoEndTargets);
      });
      liveComponents.reelAnimation.add(() => {
        animateReel(reelThree, symbolThreeStartTargets, symbolThreeEndTargets);
      });
      liveComponents.reelAnimation.add(() => {
        animateReel(reelFour, symbolFourStartTargets, symbolFourEndTargets);
      });
    }
    liveComponents.reelAnimation.start();

    //floatingSignal.removeAll();
    floatingSignal.add(() => {
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      this.isComplete = true;
      signal.dispatch();
    //  signal.removeAll();
      updateControls(false);
    });
  }
}
