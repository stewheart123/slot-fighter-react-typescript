import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import { Ticker } from "pixi.js";
import assets from "../../../models/Assets";

export class SpinStep implements IStep {
  public isComplete = false;
  public app = initializeApp();

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
      reelEndTargets: number[],
      reelDelay: number
    ) => {
      for (let z = 0; z < reelOne.length; z++) {
        if (reel[z].position.y < reelEndTargets[z]) {
          reel[z].position.set(reel[z].position.x, reel[z].position.y + 20);
        }
        if (reel[z].position.y >= reelEndTargets[z]) {
          reel[z].position.set(reel[z].position.x, reelStartTargets[z]);

          if (z === 4) {
            reel[4].texture = reel[3].texture;
            reel[4].value = reel[3].value;
            reel[3].texture = reel[2].texture;
            reel[3].value = reel[2].value;

            reel[2].texture = reel[1].texture;
            reel[2].value = reel[1].value;
            reel[1].texture = reel[0].texture;
            reel[1].value = reel[0].value;
            //12 is the number before inserting the next matirx of pre-defined numbers..//can be this instead of hard coded random number int ... assets.symbolTextures.length.
            let randomSymbolIndex = Math.floor(Math.random() * 2);
            // if(moveCount < 12) {
            //   //might need to add value in below this line?
            //   reel[0].setValue(reel[0].texture.textureCacheIds[0]);
            // } else {
            //   //this is where we can replace the random number with a number from our result card...
            //   reel[0].texture = assets.symbolTextures[0];
            // }

            reel[0].texture = assets.symbolTextures[randomSymbolIndex];
            reel[0].value = randomSymbolIndex;

            //set value is so slow- by the time it gets the figure its out of sync.. make an easier way of setting value....
            // reel[0].setValue(reel[0].texture.textureCacheIds[0]);

            moveCount++;
          }
        }
      }
      if (moveCount === 30) {
        //loop over contents and remove motion blur
        if (liveComponents.reelAnimation) {
          moveCount = 0;
          liveComponents.reelAnimation.stop();
          updateControls(false);
          setTimeout(() => {
            this.isComplete = true;
            signal.dispatch();
          }, 400);
        }
      }
    };

    //sets up the reel animation
    if (liveComponents.reelAnimationSet === false) {
      liveComponents.reelAnimationSet = true;
      liveComponents.reelAnimation.add(() => {
        animateReel(reelOne, symbolOneStartTargets, symbolOneEndTargets, 0);
      });
      liveComponents.reelAnimation.add(() => {
        animateReel(reelTwo, symbolTwoStartTargets, symbolTwoEndTargets, 0);
      });
      liveComponents.reelAnimation.add(() => {
        animateReel(
          reelThree,
          symbolThreeStartTargets,
          symbolThreeEndTargets,
          0
        );
      });
      liveComponents.reelAnimation.add(() => {
        animateReel(reelFour, symbolFourStartTargets, symbolFourEndTargets, 0);
      });
    }
    liveComponents.reelAnimation.start();

    //floatingSignal.removeAll();
    floatingSignal.add(() => {
      // updateControls(false);
      // // add a pixi game instruction in here, the floating signal canbe exported to the UI
      // this.isComplete = true;
      // signal.dispatch();
      //  signal.removeAll();
    });
  }
}
