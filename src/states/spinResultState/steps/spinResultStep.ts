import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Sprite,
  Spritesheet,
  Ticker,
} from "pixi.js";
import initializeApp from "../../../initializer";
import assets from "../../../models/Assets";
import floatingSignal from "../../../signal";
import userInterface from "../../../models/UserInterface";
import { updateState } from "../../../index";
import playerHealth from "../../../models/PlayerHealth";
import liveComponents from "../../../models/liveComponents";
import { ValueSprite } from "../../../models/ValueSprite";
import mai from "../../../images/character/mai-sprites.json";

export class SpinResultStep implements IStep {
  public isComplete = false;
  public app = initializeApp();

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
    console.log('in spin result step');
   // this.CheckReels(liveComponents.reelContainer, 1,1);
    //console.log(liveComponents.reelContainer);

    //set symbol array up with each win line,
    //loop over the amount of win lines, 
    //in each win line -set the symbolArray
    for(let z = 0; z < this.winLines.length; z++) {
      for(let p = 0; p < 4; p++) {
        let first = this.winLines[z].plot[p][0];
        let second = this.winLines[z].plot[p][1];
        this.winLines[z].symbolArray.push(
         //liveComponents.reelContainer.children[this.winLines[z].plot[0]].children[this.winLines[z].plot[1]].value
         liveComponents.reelContainer.children[first+1].children[second].value
        );
      //  console.log(this.winLines[z].symbolArray);
      }
      this.CheckWinLine(this.winLines[z].symbolArray, this.winLines[z].descripton);
    }
   // console.log(this.winLines);

  }

  //this checks all symbols - I need to make a simple - if 4 or 3 in a row are same in array, say win..

  private CheckWinLine(symbols : any[], winMessage: string) {
    var isAWin = false;
    for(let i = 0; i < symbols.length; i++ ) {
      
      if(symbols[0] === symbols[1] && symbols[2] === symbols[3] && symbols[3] === symbols[0] ) {
        isAWin = true;
      }
    }
    if(isAWin) {
      //add in logic that stores the winline into a result animation.
      console.log(winMessage);
    }
  }

  
}