import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import liveComponents from "../../../models/liveComponents";
import { SpinResultSequence } from "../spinResultSequence";
import stateChanger from "../../../stateChanger/stateChanger";

export class SpinResultStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  public hasWon = false;

  /**
   * -look at values at various win lines
   * if yes, place into an array and animate out ,
   * using the health models to update the health values
   * look at an earlier step to add more animations at that point.
   *
   * if no results, go back to the next sequence - perhaps spin ready needs to be a conditional?
   * i.e. if human player show spin button, else auto spin.
   *
   * spin results will need model for whos turn it is...
   */

  // might not need this
  public reRenderCallback = () => {
    // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  };

  //can i loop through each winline win configuration??
  private winLines = [
    {
      plot: [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      descripton: "top horizontal",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ],
      descripton: "second horizontal",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      descripton: "third horizontal",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
      ],
      descripton: "bottom horizontal",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ],
      descripton: "top bottom diagonal",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [0, 4],
        [1, 3],
        [2, 2],
        [3, 1],
      ],
      descripton: "bottom top diagonal",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
      descripton: "first vertical",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
      ],
      descripton: "second vertical",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
      ],
      descripton: "third vertical",
      symbolArray: [] as number[],
    },
    {
      plot: [
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
      ],
      descripton: "fourth vertical",
      symbolArray: [] as number[],
    },
  ];

  public start(signal: Signal): void {
    const spinResultSequence = new SpinResultSequence();
    //set symbol array up with each win line,
    //loop over the amount of win lines,
    //in each win line -set the symbolArray
    for (let z = 0; z < this.winLines.length; z++) {
      for (let p = 0; p < 4; p++) {
        let first = this.winLines[z].plot[p][0];
        let second = this.winLines[z].plot[p][1];
        this.winLines[z].symbolArray.push(
          liveComponents.reelContainer.children[first + 1].children[second]
            .value
        );
        
      }
      this.CheckWinLine(
        this.winLines[z].symbolArray,
        this.winLines[z].descripton
      );
    }

    //NO SIGNAL SEND FOR THIS STEP = THIS IS CORRECT.
    spinResultSequence.stateChange(); // might not need to reset here...
    if (this.hasWon) {
      stateChanger.stateChange("attackState");
    } else {
      stateChanger.stateChange("spinReadyState");
    }
    this.hasWon = false;
    this.ResetSymbolArrays();
  }

  private ResetSymbolArrays() {
    for (let z = 0; z < this.winLines.length; z++) {
      for (let p = 0; p < 4; p++) {
        this.winLines[z].symbolArray = [];
      }
    }
  }

  //this checks all symbols - I need to make a simple - if 4 or 3 in a row are same in array, say win..
  private CheckWinLine(symbols: any[], winMessage: string) {
    var isAWin = false;
    for (let i = 0; i < symbols.length; i++) {
      if (
        symbols[0] === symbols[1] &&
        symbols[2] === symbols[3] &&
        symbols[3] === symbols[0]
      ) {
        isAWin = true;
      }
    }
    if (isAWin) {
      //add in logic that stores the winline into a result animation.
      console.log(winMessage);
      this.hasWon = true;
    }
  }
}
