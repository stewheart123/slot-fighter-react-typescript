import { IStep } from "../../../IStep";
import initializeApp from "../../../initializer";
import liveComponents from "../../../models/liveComponents";
import { SpinResultSequence } from "../spinResultSequence";
import stateChanger from "../../../stateChanger/stateChanger";
import turnModel from "../../../models/TurnModel";
import playerHealth from "../../../models/PlayerHealth";
import { updateHealthBar } from "../../../";
import animationPlayer from "../../../models/AnimationPlayer";
import { filters } from "pixi.js";

export class SpinResultStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  public hasWon = false;

  // might not need this
  public reRenderCallback = () => {
    // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  };

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
      animationID : 0
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
      animationID : 1
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
      animationID : 2
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
      animationID : 3
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
      animationID : 4
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
      animationID : 5
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
      animationID : 6
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
      animationID : 7
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
      animationID : 8
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
      animationID : 9
    },
  ];

  public start(): void {
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
        this.winLines[z].descripton,
        this.winLines[z].plot,
        this.winLines[z].animationID
      );
    }

    //NO SIGNAL SEND FOR THIS STEP = THIS IS CORRECT.
    spinResultSequence.stateChange(); // might not need to reset here...

    if (this.hasWon) {
      this.ToggleAllGrey(false);
      this.PlayAnimations();
    } else {
      setTimeout(() => {
        stateChanger.stateChange("spinReadyState");
      }, 2000);
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

  private ToggleAllGrey(undo: boolean) {
   
    let specialFilter = new filters.ColorMatrixFilter();
    specialFilter.greyscale(0.3, false);
    for (var i = 1; i < liveComponents.reelContainer.children.length; i++) {
      for (var y = 0; y < 5; y++) {
        if (undo) {
          liveComponents.reelContainer.children[i].children[y].filters = [];
        } else {
          liveComponents.reelContainer.children[i].children[y].filters = [
            specialFilter,
          ];
        }
      }
    }
  }

  private SetWinlineLsd(symbolPositions: any[], undo:boolean) {
    let lsdFilter = new filters.ColorMatrixFilter();
    lsdFilter.lsd(false);
      for(let i = 0; i < symbolPositions.length; i++ ) {
        for(let x = 0; x < 4; x++)
        liveComponents.reelContainer.children[(symbolPositions[i][x][0])+1].children[symbolPositions[i][x][1]].filters = [lsdFilter];
      }
  }

  private SetWinlineRed(symbolPosition: any[]) {
    let redFilter = new filters.ColorMatrixFilter();
    redFilter.matrix = [
         9, 0, 0, 0, 0, // Red channel
         0, 1, 0, 0, 0, // Green channel
         0, 0, 1, 0, 0, // Blue channel
         0, 0, 0, 1, 0, // Alpha channel
      ];
      for(let i = 0; i < symbolPosition.length; i++ ) {
        for(let x = 0; x < 4; x++)
        liveComponents.reelContainer.children[(symbolPosition[i][0])+1].children[symbolPosition[i][1]].filters = [redFilter];
      }
  }

  async playAnimationsSequentially(animationIDArray: any[]) {

    for (var i = 0; i < animationIDArray.length; i++) {
      let animationToPlay : any;
     // console.log( liveComponents.maiAttackAnimationCatalogue);
      if(animationIDArray[i] < liveComponents.maiAttackAnimationCatalogue.length) {
        console.log('inner');
          animationToPlay = liveComponents.maiAttackAnimationCatalogue[animationIDArray[i]]
      }
      else {
        animationToPlay = liveComponents.maiAttackAnimationCatalogue[0];
      }
     // animationToPlay = liveComponents.maiLieDown;
      this.SetWinlineRed(animationPlayer.reelPlots[i]);
      const animationPromise = new Promise((resolve:any) => {
        liveComponents.mai.textures = animationToPlay;
        liveComponents.mai.loop = false;
        liveComponents.mai.play();
        liveComponents.mai.onComplete = () => {
          resolve(); // Resolve the promise when animation completes
  
        };
      });
      
        await animationPromise; // Wait for the animation to complete before moving on
    }
    this.ToggleAllGrey(true);
      
      if (playerHealth.checkWin() === undefined) {
        stateChanger.stateChange("attackState");
      } else {
        stateChanger.stateChange("gameOverState");
      }
}

  private PlayAnimations() {
    this.SetWinlineLsd(animationPlayer.reelPlots, false);
    if(turnModel.playerTurn === "playerOne") {
      // console.log(animationPlayer.animationSequence); 
    setTimeout(() => {
      this.playAnimationsSequentially(animationPlayer.animationIDSequence);
    },1000);
    }

    //sets all winlines to LSD
    for (let i = 0; i < animationPlayer.animationSequence.length; i++) {
      setTimeout(() => {

     //   this.SetWinlineRed(animationPlayer.reelPlots[i]);   --- this might be important to put back!
        //updates the health bar
        if (
          turnModel.playerTurn == "playerOne" &&
          playerHealth.playerTwoHealth != undefined
        ) {
          playerHealth.playerTwoHealth -= animationPlayer.damageAmounts[i];
        }
        if (
          turnModel.playerTurn == "playerTwo" &&
          playerHealth.playerOneHealth != undefined
        ) {
          playerHealth.playerOneHealth += animationPlayer.damageAmounts[i];
        }
        if (
          playerHealth.playerOneHealth != undefined &&
          playerHealth.playerTwoHealth != undefined
        ) {
          updateHealthBar(
            playerHealth.playerOneHealth,
            playerHealth.playerTwoHealth
          );
        }
      }, 2000 * (i + 1));
    }
    if(turnModel.playerTurn === "playerTwo") {
      setTimeout(() => {
        this.ToggleAllGrey(true);
        
        if (playerHealth.checkWin() === undefined) {
          stateChanger.stateChange("attackState");
        } else {
          stateChanger.stateChange("gameOverState");
        }
      }, (2100 * animationPlayer.animationIDSequence.length) + 1800); // this time sets the delay from last animation to next turn

    }
  }

  //this checks all symbols - I need to make a simple - if 4 or 3 in a row are same in array, say win..
  private CheckWinLine(symbols: any[], winMessage: string, positioning: any[], animationID: number) {
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
      //console.log(animationID);
      animationPlayer.damageAmounts.push((symbols[0] + 10) * 5);
      animationPlayer.reelPlots.push(positioning);
      animationPlayer.animationSequence.push(symbols[0]);
      animationPlayer.animationIDSequence.push(animationID);
      this.hasWon = true;

      // console.log('----------------------');
      console.log(animationPlayer.animationSequence);
      console.log(animationPlayer.animationIDSequence);
    }
  }
}
