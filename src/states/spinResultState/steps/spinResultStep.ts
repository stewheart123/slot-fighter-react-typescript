import { IStep } from "../../../IStep";
import initializeApp from "../../../initializer";
import liveComponents from "../../../models/liveComponents";
import { SpinResultSequence } from "../spinResultSequence";
import stateChanger from "../../../stateChanger/stateChanger";
import turnModel from "../../../models/TurnModel";
import playerHealth from "../../../models/PlayerHealth";
import { updateHealthBar } from "../../../";
import animationPlayer from "../../../models/AnimationPlayer";
import { Ticker, filters } from "pixi.js";
import assets from "../../../models/Assets";

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
      animationID: 0,
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
      animationID: 1,
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
      animationID: 2,
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
      animationID: 3,
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
      animationID: 4,
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
      animationID: 5,
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
      animationID: 6,
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
      animationID: 7,
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
      animationID: 8,
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
      animationID: 9,
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
  private SetWinlineLsd(symbolPositions: any[], undo: boolean) {
    let lsdFilter = new filters.ColorMatrixFilter();
    lsdFilter.lsd(false);
    for (let i = 0; i < symbolPositions.length; i++) {
      for (let x = 0; x < 4; x++)
        liveComponents.reelContainer.children[
          symbolPositions[i][x][0] + 1
        ].children[symbolPositions[i][x][1]].filters = [lsdFilter];
    }
  }
  private SetWinlineRed(symbolPosition: any[]) {
    let redFilter = new filters.ColorMatrixFilter();
    redFilter.matrix = [
      9,
      0,
      0,
      0,
      0, // Red channel
      0,
      1,
      0,
      0,
      0, // Green channel
      0,
      0,
      1,
      0,
      0, // Blue channel
      0,
      0,
      0,
      1,
      0, // Alpha channel
    ];
    for (let i = 0; i < symbolPosition.length; i++) {
      for (let x = 0; x < 4; x++)
        liveComponents.reelContainer.children[
          symbolPosition[i][0] + 1
        ].children[symbolPosition[i][1]].filters = [redFilter];
    }
  }
  private DamageFlashAnimation(player: any) {
    const flashTicker = new Ticker();
    let time = 0;
    let count = 0;
    let alphaFilter = new filters.AlphaFilter(0.6);
    flashTicker.add(() => {
      time++;
      if (time > 4) {
        time = 0;
        count++;
      }
      if (count % 2 === 0) {
        player.filters = [alphaFilter];
      } else {
        player.filters = [];
      }
      if (count > 30) {
        flashTicker.stop();
        liveComponents.playerTwo.filters = [];
      }
    });
    flashTicker.start();
  }

  async playAnimationsSequentially(animationIDArray: any[]) {
    let damagePlayer: any;
    let attackPlayer: any;
    if (turnModel.playerTurn === "playerOne") {
      damagePlayer = liveComponents.playerTwo;
      attackPlayer = liveComponents.playerOne;
    } else {
      damagePlayer = liveComponents.playerOne;
      attackPlayer = liveComponents.playerTwo;
    }

    for (var i = 0; i < animationIDArray.length; i++) {
      let animationToPlay: any;
      if (
        animationIDArray[i] < liveComponents.maiAttackAnimationCatalogue.length
      ) {
        animationToPlay =
          liveComponents.maiAttackAnimationCatalogue[animationIDArray[i]];
      } else {
        animationToPlay = liveComponents.maiAttackAnimationCatalogue[0];
      }
      this.SetWinlineRed(animationPlayer.reelPlots[i]);
      //WORKS WITH MAI AND WITH PLAYERONE --- WHY???

      if (turnModel.playerTurn === "playerOne") {
        //temp fix for no akuma animations - remove the conditionals
        const animationPromise = new Promise((resolve: any) => {
          attackPlayer.textures = animationToPlay;
          attackPlayer.loop = false;
          attackPlayer.play();
          this.updatePlayerHealth(i);
          this.DamageFlashAnimation(damagePlayer);
          attackPlayer.onComplete = () => {
            resolve(); // Resolve the promise when animation completes
          };
        });

        await animationPromise; // Wait for the animation to complete before moving on
      } /// remove this conditional
    }
    this.ToggleAllGrey(true);

    if (playerHealth.checkWin() === undefined) {
      stateChanger.stateChange("attackState");
    } else {
      stateChanger.stateChange("gameOverState");
      assets.levelSoundtrack?.stop();
      if(playerHealth.playerOneHealth != undefined) {
        if(playerHealth.playerOneHealth < 463 ) {
          assets.voiceYou?.on('end', () => {
            assets.voiceWin?.play();
          }); 
          assets.voiceYou?.play();
        }
        else {
          assets.voiceYou?.on('end', () => {
            assets.voiceLose?.play();
          }); 
          assets.voiceYou?.play();
        }
      } 

    }
  }

  updatePlayerHealth(index: number) {
    if (
      turnModel.playerTurn == "playerOne" &&
      playerHealth.playerTwoHealth != undefined
    ) {
      playerHealth.playerTwoHealth -= animationPlayer.damageAmounts[index];
    }
    if (
      turnModel.playerTurn == "playerTwo" &&
      playerHealth.playerOneHealth != undefined
    ) {
      playerHealth.playerOneHealth += animationPlayer.damageAmounts[index];
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
  }

  private PlayAnimations() {
    this.SetWinlineLsd(animationPlayer.reelPlots, false);
    setTimeout(() => {
      this.playAnimationsSequentially(animationPlayer.animationIDSequence);
    }, 1000);
  }

  private CheckWinLine(
    symbols: any[],
    winMessage: string,
    positioning: any[],
    animationID: number
  ) {
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
      animationPlayer.damageAmounts.push((symbols[0] + 10) * 5);
      animationPlayer.reelPlots.push(positioning);
      animationPlayer.animationSequence.push(symbols[0]);
      animationPlayer.animationIDSequence.push(animationID);
      this.hasWon = true;
    }
  }
}
