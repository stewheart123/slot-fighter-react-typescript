import { Sprite } from "pixi.js";

interface ValueSpriteInterface {
  value: number;
  setValue: (textureName: string) => void;
}

export class ValueSprite extends Sprite implements ValueSpriteInterface {
  value: number; // Declare the 'value' property in the class

  constructor() {
    super();

    this.value = 0;
  }

  setValue(inputTexture: string): void {
    switch (inputTexture) {
      case "symbol-h":
        this.value = 1;
        break;
      case "symbol-j":
        this.value = 2;
        break;
      case "symbol-k":
        this.value = 3;
        break;
      case "symbol-ke":
        this.value = 4;
        break;
      case "symbol-l":
        this.value = 5;
        break;
      case "symbol-o":
        this.value = 6;
        break;
      case "symbol-r":
        this.value = 7;
        break;
      case "symbol-r":
        this.value = 8;
        break;
      case "symbol-r":
        this.value = 9;
        break;
      case "symbol-r":
        this.value = 10;
        break;
      case "symbol-r":
        this.value = 11;
        break;
      case "symbol-r":
        this.value = 12;
        break;
      case "symbol-rt":
        this.value = 13;
        break;
      case "symbol-s":
        this.value = 14;
        break;
      case "symbol-st":
        this.value = 15;
        break;
      case "symbol-t":
        this.value = 16;
        break;
      case "symbol-w":
        this.value = 17;
        break;
      default:
        this.value = 0;
    }
  }
}
